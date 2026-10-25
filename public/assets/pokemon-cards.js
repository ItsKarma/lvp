import { ads } from './ad-catalog.js';

const params = new URLSearchParams(location.search);
const ad = ads.find((entry) => entry.id === (params.get('theme') || 'original'));
if (!ad) {
  document.querySelector('#error').textContent = 'Unknown ad theme. Return to the asset library to choose a display.';
  throw new Error(`Unknown ad theme: ${params.get('theme')}`);
}
document.documentElement.dataset.theme = ad.theme;
if (ad.variant) document.documentElement.dataset.variant = ad.variant;
document.title = `${ad.title} — Pokémon Screen Ad`;
document.querySelector('.controls h2').textContent = ad.title;
document.querySelector('.theme-kicker').textContent = ad.kicker;
document.querySelectorAll('h1 span').forEach((span, index) => { span.textContent = ad.headline[index]; });
document.querySelector('.product-tag').textContent = ad.tag;
document.querySelector('.sticker').textContent = ad.badge ?? '';
document.querySelector('#export-command').textContent = `npm run export:ad -- --ad ${ad.id}`;
const cleanParams = new URLSearchParams(location.search);
cleanParams.set('clean', '1');
document.querySelector('#clean-playback').href = `?${cleanParams}`;
document.documentElement.classList.toggle('clean', params.get('clean') === '1');
document.documentElement.classList.toggle('export', params.get('export') === '1');

const screen = document.querySelector('.screen');
const pause = document.querySelector('#pause');
const timeline = document.querySelector('#timeline');
const time = document.querySelector('#time');
const error = document.querySelector('#error');
const animations = () => screen.getAnimations({ subtree: true });
let paused = matchMedia('(prefers-reduced-motion: reduce)').matches && params.get('export') !== '1';

function updateButton() {
  pause.textContent = paused ? 'Play' : 'Pause';
}

pause.addEventListener('click', () => {
  paused = !paused;
  if (!paused) document.documentElement.classList.add('export');
  for (const animation of animations()) {
    if (paused) animation.pause();
    else animation.play();
  }
  updateButton();
});

document.querySelector('#restart').addEventListener('click', () => {
  for (const animation of animations()) animation.currentTime = 0;
});

timeline.addEventListener('input', () => {
  paused = true;
  for (const animation of animations()) {
    animation.pause();
    animation.currentTime = Number(timeline.value) * 1000;
  }
  time.value = `${Number(timeline.value).toFixed(1)}s`;
  updateButton();
});

document.querySelector('#fullscreen').addEventListener('click', async () => {
  try {
    await screen.requestFullscreen();
  } catch (cause) {
    error.textContent = `Fullscreen could not start: ${cause instanceof Error ? cause.message : String(cause)}. Use clean playback instead.`;
  }
});

function updateTimeline() {
  if (!paused) {
    const position = (Number(animations()[0]?.currentTime ?? 0) % 10000) / 1000;
    timeline.value = String(position);
    time.value = `${position.toFixed(1)}s`;
  }
  requestAnimationFrame(updateTimeline);
}
// Shrink any headline line wider than its (centered) headline box, in container
// units so the result scales with the screen. Lines never wrap, so an overlong
// line would otherwise spill out to the right. Runs once the headline font has loaded.
function fitHeadline() {
  for (const span of document.querySelectorAll('h1 span')) {
    span.style.fontSize = '';
    const limit = span.clientWidth;
    const range = document.createRange();
    range.selectNodeContents(span);
    const width = range.getBoundingClientRect().width;
    if (width > limit) {
      const size = parseFloat(getComputedStyle(span).fontSize) * limit / width;
      span.style.fontSize = `${size / screen.clientWidth * 100}cqw`;
    }
  }
}

updateButton();
if (params.get('clean') !== '1') requestAnimationFrame(updateTimeline);
try {
  await document.fonts.load('400 16px "Carter One"');
  await document.fonts.ready;
} catch {
  // Fall back to measuring with whatever font is available.
}
fitHeadline();
document.documentElement.dataset.adReady = ad.id;
