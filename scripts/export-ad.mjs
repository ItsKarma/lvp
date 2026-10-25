import { spawn, spawnSync } from 'node:child_process';
import { once } from 'node:events';
import { mkdir, rename, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import ffmpeg from 'ffmpeg-static';
import { ads, adGroups, adDurations, adDownloadFilename } from '../public/assets/ad-catalog.js';

const args = process.argv.slice(2);
if (args.includes('--help')) {
  console.log(`Usage: npm run export:ad -- [--ad <id>|all | --group ${adGroups.map((group) => group.id).join('|')}] [--duration ${adDurations.join('|')}] [--url http://localhost:3000] [--output path.mp4]\nAd IDs: ${ads.map((ad) => ad.id).join(', ')}`);
  process.exit(0);
}
const options = { url: 'http://localhost:3000', output: '', ad: 'original', group: '', duration: '10' };
for (let index = 0; index < args.length; index += 2) {
  const key = args[index]?.slice(2);
  if (!Object.hasOwn(options, key) || !args[index + 1]) {
    throw new Error(`Invalid argument: ${args[index]}. Use --help for supported options.`);
  }
  options[key] = args[index + 1];
}
const seconds = Number(options.duration);
if (!adDurations.includes(seconds)) {
  throw new Error(`Unsupported duration: ${options.duration}. Choose ${adDurations.join(', ')} seconds.`);
}
if (options.ad === 'all' || options.group) {
  if (options.output) throw new Error('--output cannot be used with --ad all or --group; each design has its own download file.');
  if (options.group && !adGroups.some((group) => group.id === options.group)) {
    throw new Error(`Unknown group: ${options.group}. Choose ${adGroups.map((group) => group.id).join(', ')}.`);
  }
  for (const ad of options.group ? ads.filter((entry) => entry.group === options.group) : ads) {
    const result = spawnSync(process.execPath,
      [fileURLToPath(import.meta.url), '--ad', ad.id, '--url', options.url, '--duration', String(seconds)], { stdio: 'inherit' });
    if (result.error) throw result.error;
    if (result.status !== 0) process.exit(result.status ?? 1);
  }
  process.exit(0);
}
const url = new URL('/assets/pokemon-cards.html?clean=1&export=1', options.url);
const ad = ads.find((entry) => entry.id === options.ad);
if (!ad) throw new Error(`Unknown ad: ${options.ad}. Choose ${ads.map((entry) => entry.id).join(', ')}.`);
if (ad.theme) url.searchParams.set('theme', ad.id);
const output = resolve(options.output || `exports/${adDownloadFilename(ad, seconds)}`);
if (!output.endsWith('.mp4')) throw new Error('--output must end in .mp4');
if (!ffmpeg) throw new Error('No FFmpeg binary is available for this platform.');
const temporary = `${output}.${process.pid}.tmp.mp4`;
const extended = `${output}.${process.pid}.extended.tmp.mp4`;
const fps = 30;
const renderSeconds = Math.min(seconds, 10);
let browser;
let encoder;
let encoderDone;
let encoderError = '';

try {
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1920 },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
  });
  const response = await page.goto(url.href, { waitUntil: 'networkidle' });
  if (!response?.ok()) throw new Error(`Ad page returned HTTP ${response?.status()}. Start the site first.`);
  await page.waitForFunction((id) => document.documentElement.dataset.adReady === id, ad.id);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((image) => image.decode()));
    for (const animation of document.querySelector('.screen').getAnimations({ subtree: true })) {
      animation.pause();
    }
  });
  // Chromium can rasterize the very first captured frame slightly differently from
  // later ones. Render one throwaway mid-loop frame so frame 0 matches the loop's end.
  await page.evaluate(() => {
    for (const animation of document.querySelector('.screen').getAnimations({ subtree: true })) {
      animation.currentTime = 5000;
    }
  });
  await page.locator('.screen').screenshot({ type: 'png', animations: 'allow' });
  await mkdir(dirname(output), { recursive: true });
  encoder = spawn(ffmpeg, [
    '-hide_banner', '-loglevel', 'error', '-y',
    '-f', 'image2pipe', '-vcodec', 'png', '-framerate', String(fps), '-i', 'pipe:0',
    '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', temporary,
  ], { stdio: ['pipe', 'ignore', 'pipe'] });
  encoder.stderr.on('data', (chunk) => { encoderError += chunk.toString(); });
  let failure;
  // Retain early pipe/process failures while the browser is still rendering.
  encoder.stdin.on('error', (error) => { failure = error; });
  encoderDone = new Promise((accept) => {
    encoder.once('error', (error) => { failure = error; accept(-1); });
    encoder.once('close', (code) => { accept(code); });
  });
  console.log(`Rendering ${fps * renderSeconds} source frames at 1080 × 1920 from ${url.href} for a ${seconds}-second export`);
  for (let frame = 0; frame < fps * renderSeconds; frame++) {
    if (failure || encoder.exitCode !== null) throw failure ?? new Error(`FFmpeg stopped: ${encoderError}`);
    await page.evaluate((milliseconds) => {
      for (const animation of document.querySelector('.screen').getAnimations({ subtree: true })) {
        animation.currentTime = milliseconds;
      }
    }, frame * 1000 / fps);
    const png = await page.locator('.screen').screenshot({ type: 'png', animations: 'allow' });
    if (!encoder.stdin.write(png)) await once(encoder.stdin, 'drain');
    if (frame % fps === 0) console.log(`${frame / fps}/${renderSeconds} source seconds rendered`);
  }
  encoder.stdin.end();
  const code = await encoderDone;
  if (code !== 0 || failure) throw new Error(`FFmpeg failed (${code}): ${encoderError || failure?.message}`);
  if (seconds > renderSeconds) {
    console.log(`Repeating the freshly rendered 10-second animation to exactly ${seconds} seconds`);
    const result = spawnSync(ffmpeg, [
      '-hide_banner', '-loglevel', 'error', '-y', '-stream_loop', '-1', '-i', temporary,
      '-frames:v', String(fps * seconds), '-an', '-c:v', 'libx264', '-preset', 'medium',
      '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', extended,
    ], { encoding: 'utf8' });
    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error(`FFmpeg duration conversion failed (${result.status}): ${result.stderr}`);
    await rename(extended, output);
  } else {
    await rename(temporary, output);
  }
  console.log(`Saved ${output}\nH.264 MP4 · 1080 × 1920 · 30 fps · ${seconds} seconds · No audio`);
} catch (error) {
  console.error(`Export failed: ${error instanceof Error ? error.message : String(error)}`);
  console.error('Ensure the site is running and run: npx playwright install chromium');
  process.exitCode = 1;
} finally {
  if (encoder && encoder.exitCode === null) {
    encoder.kill('SIGTERM');
    await encoderDone;
  }
  await browser?.close();
  await rm(temporary, { force: true });
  await rm(extended, { force: true });
}
