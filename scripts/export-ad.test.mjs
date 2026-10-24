import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import ffmpeg from 'ffmpeg-static';
import { adDurations } from '../public/assets/ad-catalog.js';

test('all six durations produce the exact requested frame count and machine video format', { timeout: 900_000 }, async () => {
  const directory = await mkdtemp(join(tmpdir(), 'lvp-ad-export-'));
  try {
    for (const seconds of adDurations) {
      const output = join(directory, `forest-${seconds}s.mp4`);
      const render = spawnSync(process.execPath, [
        'scripts/export-ad.mjs', '--ad', 'forest', '--duration', String(seconds),
        '--url', process.env.AD_BASE_URL || 'http://localhost:3000', '--output', output,
      ], { encoding: 'utf8', timeout: 180_000 });
      assert.ifError(render.error);
      assert.equal(render.status, 0, render.stderr);
      const decode = spawnSync(ffmpeg, ['-hide_banner', '-i', output, '-f', 'null', '-'], {
        encoding: 'utf8', timeout: 90_000,
      });
      assert.ifError(decode.error);
      assert.equal(decode.status, 0, decode.stderr);
      assert.match(decode.stderr, /Video: h264/);
      assert.match(decode.stderr, /yuv420p/);
      assert.match(decode.stderr, /1080x1920/);
      assert.match(decode.stderr, /30 fps/);
      assert.doesNotMatch(decode.stderr, /Stream #0:\d+.*Audio:/);
      const counts = [...decode.stderr.matchAll(/frame=\s*(\d+)/g)];
      assert.equal(Number(counts.at(-1)?.[1]), seconds * 30, `Wrong decoded frame count at ${seconds} seconds`);
      assert.ok(render.stdout.includes(`${seconds} seconds`));
      console.log(`Verified ${seconds}s: ${seconds * 30} decoded frames, H.264, 1080x1920, 30 fps, silent`);
    }
    assert.ok((await readdir(directory)).every((file) => !file.includes('.tmp.')), 'Successful exports must clean temporary files');
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
