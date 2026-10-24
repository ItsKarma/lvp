import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { after, before, test } from 'node:test';
import { chromium } from 'playwright';
import { ads, adPreviewPath, adDurations, adDownloadFilename } from '../public/assets/ad-catalog.js';

const base = process.env.AD_BASE_URL || 'http://localhost:3000';
let browser;
before(async () => { browser = await chromium.launch(); });
after(async () => { await browser?.close(); });

test('library links to the preview and clean playback', async () => {
  const page = await browser.newPage();
  try {
    const response = await page.goto(`${base}/assets`);
    assert.equal(response.status(), 200);
    assert.equal(await page.locator('h1').textContent(), 'Assets');
    assert.equal(await page.locator('article').count(), 15);
    for (const ad of ads) {
      assert.equal(await page.getByRole('heading', { name: ad.title, exact: true }).count(), 1);
      assert.equal(await page.locator(`a[href="/assets/downloads/${ad.file}"]`).count(), 0);
    }
    assert.equal(await page.locator('a[href="/assets/pokemon-cards.html"]').count(), 1);
    assert.equal(await page.locator('a[href="/assets/pokemon-cards.html?clean=1"]').count(), 1);
    assert.match(await page.locator('meta[name="robots"]').getAttribute('content'), /noindex/);
  } finally { await page.close(); }
});

test('all designs offer all six local export durations without hosted downloads', async () => {
  const page = await browser.newPage();
  try {
    await page.goto(`${base}/assets`);
    for (const ad of ads) {
      const article = page.locator('article').filter({ has: page.getByRole('heading', { name: ad.title, exact: true }) });
      const select = article.getByRole('combobox');
      assert.deepEqual(await select.locator('option').allTextContents(), adDurations.map((duration) => `${duration} seconds`));
      for (const duration of adDurations) {
        await select.selectOption(String(duration));
        assert.match(await article.locator('code').textContent(), new RegExp(`--ad ${ad.id} --duration ${duration}$`));
        assert.equal(await article.locator('a[download]').count(), 0);
        assert.equal(adDownloadFilename(ad, duration), duration === 10 ? ad.file : ad.file.replace('.mp4', `-${duration}s.mp4`));
      }
    }
  } finally { await page.close(); }
});

test('exporter rejects unsupported durations and documents supported values', () => {
  const help = spawnSync(process.execPath, ['scripts/export-ad.mjs', '--help'], { encoding: 'utf8' });
  assert.equal(help.status, 0);
  assert.doesNotMatch(help.stderr, /MODULE_TYPELESS_PACKAGE_JSON/);
  assert.match(help.stdout, /--duration 5\|10\|15\|30\|45\|60/);
  for (const duration of ['0', '-5', '7', 'abc', 'Infinity']) {
    const result = spawnSync(process.execPath, ['scripts/export-ad.mjs', '--duration', duration], { encoding: 'utf8' });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Unsupported duration/);
  }
});

test('library and previews offer local rendering instead of missing downloads', async () => {
  const page = await browser.newPage();
  try {
    for (const ad of ads) {
      for (const route of ['/assets', adPreviewPath(ad)]) {
        await page.goto(`${base}${route}`);
        assert.equal(await page.locator('a[download], a[href^="/assets/downloads/"]').count(), 0);
        if (route !== '/assets') {
          assert.equal(await page.locator('#export-command').textContent(), `npm run export:ad -- --ad ${ad.id}`);
        }
      }
    }
  } finally { await page.close(); }
});

for (const ad of ads.filter((entry) => entry.theme)) {
  test(`${ad.title} has a distinct responsive design, working controls, and a seamless ten-second loop`, async () => {
    const page = await browser.newPage({ viewport: { width: 540, height: 960 } });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    try {
      const preview = adPreviewPath(ad);
      await page.goto(`${base}${preview}&clean=1&export=1`);
      await page.waitForFunction((id) => document.documentElement.dataset.adReady === id, ad.id);
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all([...document.images].map((image) => image.decode()));
        for (const animation of document.querySelector('.screen').getAnimations({ subtree: true })) animation.pause();
      });
      assert.equal(await page.locator('html').getAttribute('data-theme'), ad.theme);
      assert.deepEqual(await page.locator('h1 span').allTextContents(), ad.headline);
      assert.equal(await page.locator('#export-command').textContent(), `npm run export:ad -- --ad ${ad.id}`);
      const seek = (time) => page.evaluate((position) => {
        for (const animation of document.querySelector('.screen').getAnimations({ subtree: true })) animation.currentTime = position;
      }, time);
      await seek(0);
      const first = await page.locator('.screen').screenshot();
      await seek(10000);
      assert.ok(first.equals(await page.locator('.screen').screenshot()), 'Ten-second loop must return to identical pixels');
      await seek(2500);
      assert.ok(!first.equals(await page.locator('.screen').screenshot()), 'Artwork must animate');
      for (const viewport of [{ width: 1080, height: 1920 }, { width: 390, height: 844 }]) {
        await page.setViewportSize(viewport);
        const fit = await page.evaluate(() => {
          const screen = document.querySelector('.screen').getBoundingClientRect();
          const headline = document.querySelector('.headline').getBoundingClientRect();
          const packs = document.querySelector('.packs').getBoundingClientRect();
          const footer = document.querySelector('.features').getBoundingClientRect();
          const cta = document.querySelector('.call-to-action').getBoundingClientRect();
          return {
            clearPacks: headline.bottom < packs.top,
            clearFooter: cta.bottom < footer.top,
            textFits: [...document.querySelectorAll('h1 span')].every((span) => {
              const range = document.createRange();
              range.selectNodeContents(span);
              const rect = range.getBoundingClientRect();
              return rect.left > screen.left + screen.width * .015 && rect.right < screen.right - screen.width * .015;
            }),
          };
        });
        assert.ok(fit.clearPacks, 'Headline must clear packs');
        assert.ok(fit.clearFooter, 'CTA must clear footer');
        assert.ok(fit.textFits, 'Headline text must fit within the artwork');
      }
      await page.goto(`${base}${preview}`);
      await page.getByRole('button', { name: 'Pause', exact: true }).click();
      assert.equal(await page.getByRole('button', { name: 'Play', exact: true }).count(), 1);
      assert.ok((await page.locator('#clean-playback').getAttribute('href')).includes(`theme=${ad.theme}`));
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.reload();
      assert.ok(await page.evaluate(() => document.querySelector('.screen').getAnimations({ subtree: true })
        .every((animation) => animation.playState === 'paused')));
      assert.deepEqual(errors, []);
    } finally { await page.close(); }
  });
}

test('preview controls pause, seek, restart and resume CSS animations', async () => {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  try {
    await page.goto(`${base}/assets/pokemon-cards.html`);
    await page.getByRole('button', { name: 'Pause', exact: true }).click();
    assert.ok(await page.evaluate(() => document.querySelector('.screen')
      .getAnimations({ subtree: true }).every((animation) => animation.playState === 'paused')));
    await page.locator('#timeline').fill('5');
    assert.equal(await page.locator('#time').textContent(), '5.0s');
    assert.ok(await page.evaluate(() => document.querySelector('.screen')
      .getAnimations({ subtree: true }).every((animation) => animation.currentTime === 5000)));
    await page.getByRole('button', { name: 'Restart', exact: true }).click();
    assert.ok(await page.evaluate(() => document.querySelector('.screen')
      .getAnimations({ subtree: true }).every((animation) => animation.currentTime === 0)));
    await page.getByRole('button', { name: 'Play', exact: true }).click();
    assert.ok(await page.evaluate(() => document.querySelector('.screen')
      .getAnimations({ subtree: true }).every((animation) => animation.playState === 'running')));
    assert.deepEqual(errors, []);
  } finally { await page.close(); }
});

test('clean artwork fits portrait and mobile displays, loops seamlessly, and has no branding', async () => {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  try {
    await page.goto(`${base}/assets/pokemon-cards.html?clean=1&export=1`);
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map((image) => image.decode()));
      for (const animation of document.querySelector('.screen').getAnimations({ subtree: true })) animation.pause();
    });
    assert.equal(await page.locator('.controls').isVisible(), false);
    assert.ok(await page.evaluate(() => document.fonts.check('24px "Carter One"')));
    assert.match(await page.locator('h1').evaluate((element) => getComputedStyle(element).fontFamily), /Carter One/);
    assert.equal(await page.locator('.packs img').count(), 5);
    assert.deepEqual(await page.locator('.features span').allTextContents(),
      ['100% Authentic', 'Choose a pack', 'Keep collecting']);
    const ctaFontSizes = await page.evaluate(() => ({
      tap: parseFloat(getComputedStyle(document.querySelector('.tap')).fontSize),
      purchase: parseFloat(getComputedStyle(document.querySelector('.purchase')).fontSize),
    }));
    assert.ok(Math.abs(ctaFontSizes.tap - 106.92) < .1, 'Tap text must be ten percent larger');
    assert.ok(Math.abs(ctaFontSizes.purchase - 154.44) < .1, 'Buy text must be ten percent larger');
    assert.equal(await page.locator('img[src*="LVPVendingPokemonClearBackground"]').count(), 0);
    assert.equal(await page.getByText('Touch the screen to shop', { exact: true }).count(), 0);
    assert.doesNotMatch(await page.locator('.screen').innerText(), /VTM|LVP|Vending|lehigh/i);
    const size = await page.locator('.screen').boundingBox();
    assert.equal(size.width, 1080);
    assert.equal(size.height, 1920);
    const seek = (milliseconds) => page.evaluate((position) => {
      for (const animation of document.querySelector('.screen').getAnimations({ subtree: true })) animation.currentTime = position;
    }, milliseconds);
    await seek(0);
    const first = await page.locator('.screen').screenshot();
    await seek(10000);
    assert.ok((await page.locator('.screen').screenshot()).equals(first), 'The 10-second loop must return to the same pixels');
    await seek(5000);
    assert.ok(!(await page.locator('.screen').screenshot()).equals(first), 'The animation must actually move');
    for (const viewport of [{ width: 1080, height: 1920 }, { width: 390, height: 844 }, { width: 1440, height: 900 }]) {
      await page.setViewportSize(viewport);
      for (const position of [0, 2500, 5000, 7500, 9999]) {
        await seek(position);
        const cta = await page.locator('.call-to-action').boundingBox();
        const icon = await page.locator('.tap-icon').boundingBox();
        const footer = await page.locator('.features').boundingBox();
        assert.ok(cta.y + cta.height < footer.y, 'CTA must not be hidden by the footer');
        assert.ok(icon.x > cta.x + cta.width / 2, 'Tap icon must sit on the right side of the CTA');
        const artwork = await page.locator('.screen').boundingBox();
        const headline = await page.locator('.headline').boundingBox();
        const tag = await page.locator('.product-tag').boundingBox();
        assert.ok(headline.y >= artwork.y + artwork.height * .09, 'Enlarged headline must retain breathing room above it');
        assert.ok(Math.abs(headline.width / artwork.width - .99) < .001, 'Headline must be enlarged by ten percent');
        let previousPack;
        for (const pack of await page.locator('.packs img').all()) {
          const box = await pack.boundingBox();
          if (previousPack) assert.ok(box.x < previousPack.x + previousPack.width, 'Adjacent packs must slightly overlap');
          previousPack = box;
          assert.ok(box.y > headline.y + headline.height, 'Packs must sit below the headline');
          assert.ok(box.y >= artwork.y + artwork.height * .575, 'Packs must stay beneath the headline');
          assert.ok(box.height < artwork.height * .18, 'Packs must remain a little smaller');
          assert.ok(box.y + box.height < tag.y + box.height * .15, 'The banner may overlap only the bottom of the packs');
          assert.ok(box.x >= artwork.x && box.x + box.width <= artwork.x + artwork.width, 'Packs must stay inside the artwork');
        }
        assert.ok(icon.x + icon.width <= artwork.x + artwork.width, 'Tap icon must stay inside the artwork');
        assert.ok(artwork.x >= -1 && artwork.y >= -1);
        assert.ok(artwork.x + artwork.width <= viewport.width + 1);
        assert.ok(artwork.y + artwork.height <= viewport.height + 1);
      }
    }
  } finally { await page.close(); }
});

test('real card artwork bursts outward behind the content on staggered seamless cycles', async () => {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  try {
    await page.goto(`${base}/assets/pokemon-cards.html?clean=1&export=1`);
    await page.evaluate(async () => {
      await Promise.all([...document.images].map((image) => image.decode()));
    });
    assert.equal(await page.locator('.card-burst img').count(), 9);
    assert.equal(await page.locator('.card').count(), 0);
    assert.doesNotMatch(await page.locator('.screen').innerText(), /\bTCG\b/);
    const result = await page.evaluate(() => {
      const layer = document.querySelector('.card-burst');
      const screen = document.querySelector('.screen').getBoundingClientRect();
      const cards = [...layer.querySelectorAll('img')];
      const timings = cards.map((card) => card.getAnimations()[0].effect.getTiming());
      const samples = cards.map((card) => {
        const animation = card.getAnimations()[0];
        animation.pause();
        const delay = animation.effect.getTiming().delay;
        return [0, 2500, 5000, 9000, 10000].map((time) => {
          animation.currentTime = time + delay;
          const box = card.getBoundingClientRect();
          return {
            centerY: box.y + box.height / 2,
            bottom: box.bottom,
            distance: Math.hypot(box.x + box.width / 2 - (screen.x + screen.width / 2),
              box.y + box.height / 2 - (screen.y + screen.height / 2)),
            width: box.width,
            opacity: Number(getComputedStyle(card).opacity),
          };
        });
      });
      return {
        timings,
        samples,
        packTop: document.querySelector('.packs').getBoundingClientRect().top,
        z: Number(getComputedStyle(layer).zIndex),
        foreground: ['.headline', '.product', '.call-to-action'].map((selector) =>
          Number(getComputedStyle(document.querySelector(selector)).zIndex)),
      };
    });
    assert.equal(new Set(result.timings.map((timing) => timing.delay)).size, 9);
    assert.ok(result.foreground.every((z) => z > result.z), 'Cards must stay behind the ad content');
    for (const timing of result.timings) assert.equal(timing.duration, 10000);
    for (const samples of result.samples) {
      assert.ok(samples[0].distance < 1, 'Cards must start at the center');
      assert.ok(samples[1].distance > samples[0].distance);
      assert.ok(samples[2].distance > samples[1].distance);
      assert.ok(samples[3].distance > samples[2].distance, 'Cards must travel outward rather than float in place');
      assert.ok(samples[1].centerY < samples[0].centerY
        && samples[2].centerY < samples[1].centerY
        && samples[3].centerY < samples[2].centerY, 'Every burst must travel upward');
      assert.ok(samples.every((sample) => sample.bottom < result.packTop), 'Burst cards must stay above the pack fan');
      assert.ok(samples[3].width > samples[1].width, 'Cards must grow as they approach the edges');
      assert.ok(samples[3].distance > 500, 'Cards must reach the edges');
      assert.equal(samples[0].opacity, 0, 'Cards must be invisible at the restart');
      assert.deepEqual(samples[4], samples[0], 'Each burst must loop without jumping');
    }
  } finally { await page.close(); }
});

test('packs float independently with subtle movement', async () => {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  try {
    await page.goto(`${base}/assets/pokemon-cards.html?clean=1&export=1`);
    const result = await page.evaluate(() => {
      const group = document.querySelector('.packs');
      const packs = [...group.querySelectorAll('img')];
      const animations = group.getAnimations({ subtree: true });
      for (const animation of animations) {
        animation.pause();
        animation.currentTime = 0;
      }
      const transforms = packs.map((pack) => getComputedStyle(pack).transform);
      const samples = [0, 2500, 5000, 7500, 10000].flatMap((time) => {
        for (const animation of animations) animation.currentTime = time;
        return packs.map((pack) => {
          const matrix = new DOMMatrixReadOnly(getComputedStyle(pack).transform);
          return { y: matrix.f, angle: Math.atan2(matrix.b, matrix.a) * 180 / Math.PI };
        });
      });
      return {
        groupTransform: getComputedStyle(group).transform,
        transforms,
        samples,
        timings: animations.map((animation) => animation.effect.getTiming()),
      };
    });
    assert.equal(result.groupTransform, 'none', 'The fan must not move as one unit');
    assert.equal(result.timings.length, 5);
    assert.equal(new Set(result.timings.map((timing) => timing.delay)).size, 5);
    assert.ok(new Set(result.transforms).size >= 3, 'Packs must have staggered motion');
    for (const timing of result.timings) assert.equal(timing.duration, 10000);
    for (const sample of result.samples) {
      assert.ok(Math.abs(sample.y) <= 8.65, 'Vertical motion must stay under 0.8% of screen width');
      assert.ok(Math.abs(sample.angle) <= .401, 'Rocking must stay within 0.4 degrees');
    }
  } finally { await page.close(); }
});

test('finger taps independently without inheriting the text pulse', async () => {
  const page = await browser.newPage();
  try {
    await page.goto(`${base}/assets/pokemon-cards.html?clean=1&export=1`);
    const states = await page.evaluate(() => {
      const screen = document.querySelector('.screen');
      const cta = document.querySelector('.call-to-action');
      const text = document.querySelector('.cta-text');
      const finger = document.querySelector('.tap-icon');
      const ripples = document.querySelector('.tap-ripples');
      const animations = screen.getAnimations({ subtree: true });
      for (const animation of animations) animation.pause();
      return [0, 2000, 2100, 5000, 7000, 1000, 3000, 500].map((position) => {
        for (const animation of animations) animation.currentTime = position;
        const matrix = new DOMMatrixReadOnly(getComputedStyle(finger).transform);
        return {
          container: getComputedStyle(cta).transform,
          text: getComputedStyle(text).transform,
          finger: getComputedStyle(finger).transform,
          fingerScale: Math.hypot(matrix.a, matrix.b),
          ripples: Number(getComputedStyle(ripples).opacity),
        };
      });
    });
    for (const state of states) {
      assert.equal(state.container, 'none', 'The shared container must not scale the finger');
      assert.ok(Math.abs(state.fingerScale - 1) < .00001, 'The finger must not scale');
    }
    assert.notEqual(states[1].finger, states[0].finger, 'The finger must press');
    assert.equal(states[3].finger, states[0].finger, 'The finger must rest during the text pulse');
    assert.notEqual(states[5].text, states[0].text, 'The text must pulse at one second');
    assert.equal(states[6].text, states[5].text, 'The text pulse must repeat every two seconds');
    assert.equal(states[1].text, states[0].text, 'The text must return to rest between pulses');
    assert.notEqual(states[7].text, states[0].text, 'The text must keep moving between pulse peaks');
    assert.notEqual(states[7].text, states[5].text, 'The text must grow smoothly toward the peak');
    assert.ok(states[2].ripples > states[0].ripples, 'Tap ripples must brighten on contact');
    assert.equal(states[4].finger, states[1].finger, 'The second tap must match the first');
  } finally { await page.close(); }
});

test('background streaks rotate slowly and repeat every ten seconds', async () => {
  const page = await browser.newPage({ viewport: { width: 540, height: 960 } });
  try {
    await page.goto(`${base}/assets/pokemon-cards.html?clean=1&export=1`);
    await page.evaluate(async () => {
      await Promise.all([...document.images].map((image) => image.decode()));
      for (const animation of document.querySelector('.screen').getAnimations({ subtree: true })) {
        animation.pause();
        animation.currentTime = 0;
      }
    });
    const timing = await page.locator('.rays').evaluate((element) => {
      const animation = element.getAnimations()[0];
      return {
        duration: animation.effect.getTiming().duration,
        iterations: animation.effect.getTiming().iterations,
        easing: animation.effect.getTiming().easing,
        transforms: animation.effect.getKeyframes().map((frame) => frame.transform),
      };
    });
    assert.equal(timing.duration, 10000);
    assert.equal(timing.iterations, Infinity);
    assert.equal(timing.easing, 'linear');
    // The gradient repeats every 40 degrees, so one sector is a seamless turn.
    assert.deepEqual(timing.transforms, ['rotate(0deg)', 'rotate(40deg)']);
    const first = await page.locator('.screen').screenshot();
    await page.locator('.rays').evaluate((element) => { element.getAnimations()[0].currentTime = 5000; });
    assert.ok(!(await page.locator('.screen').screenshot()).equals(first), 'Streaks must visibly rotate');
    await page.locator('.rays').evaluate((element) => { element.getAnimations()[0].currentTime = 10000; });
    assert.ok((await page.locator('.screen').screenshot()).equals(first), 'Streaks must repeat after ten seconds');
  } finally { await page.close(); }
});

test('reduced motion pauses playback but permits an explicit opt-in', async () => {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  try {
    await page.goto(`${base}/assets/pokemon-cards.html`);
    assert.ok(await page.evaluate(() => document.querySelector('.screen')
      .getAnimations({ subtree: true }).every((animation) => animation.playState === 'paused')));
    await page.getByRole('button', { name: 'Play', exact: true }).click();
    assert.ok(await page.evaluate(() => document.querySelector('.screen')
      .getAnimations({ subtree: true }).every((animation) => animation.playState === 'running')));
  } finally { await page.close(); }
});
