# Machine ad creation guide

This is the project reference for creating and maintaining the vending-machine
screen ads. Read this before adding another design, and update it when the
workflow changes.

## Goal and current decisions

- HTML/CSS is the editable source of truth; MP4s are disposable rendered outputs.
- Ads are portrait 9:16, exported at 1080 x 1920, 30 fps, H.264, yuv420p, silent.
- The normal animation cycle is 10 seconds. Export lengths are 5, 10, 15, 30,
  45, or 60 seconds.
- Keep rendering local. Save outputs to the top-level, Git-ignored `exports/`
  directory. Do not commit rendered MP4s.
- Website downloads were intentionally removed. Vercel Blob hosting is a future
  option, not an existing integration.
- The website previews individual ads; the machine's own media playlist controls
  alternating between uploaded videos.
- Do not add vending-company branding unless requested.

## How we arrived here

We started with a similar-style HTML/CSS recreation of a supplied Pokemon
vending-machine ad, rather than using frames from that video as the artwork.
The reference was:

https://foreign-custom.s3.us-east-2.amazonaws.com/noDelete/adlib/20261012/pokemon-cards-ad-10s.mp4

The original Electric Blue design was refined interactively: rotating rays,
headline typography, real booster-pack photos, a tighter floating pack fan,
outward-bursting card photos, and a continuously pulsing purchase prompt.
We then added four alternatives, followed by ten more, sharing the same markup
and controls rather than duplicating fifteen pages. A third batch added eighteen
Pokémon-type themes (`type-*`) and ten host-location themes (`spot-*`: bowling,
pizza, laundromat, gym, hotel, convenience store, car wash, salon, bar/game room,
theater), for forty-three in total.

The library was then reorganized into collections. `/assets` lists three sections
(Standard, Pokémon Types, Locations); each collection has its own page at
`/assets/<collection-id>` listing its ads, with tiles linking to the other collections
in the same section. Every type and location collection has eight ads: the
original design (classic layout) plus seven more, each with its own copy and one of
seven shared layouts. An Ice Cream Shop collection (`spot-icecream`) was added,
and the salon collection is labelled "Barbershop & Salon".

A fourth section, Seasons & Holidays, added four seasons (`season-*`) and nine
holidays (`holiday-*`: New Year's, Valentine's Day, St. Patrick's Day, Easter,
Fourth of July, Back to School, Halloween, Thanksgiving, and a non-denominational
Winter Holidays), eight ads each. Their collections carry a
`when` field (e.g. "October") shown on the library tiles to help plan rotations.

A fifth section, Airport, has one collection per machine spot in a terminal
(`airport-departures`, `airport-checkpoint` before security, `airport-gates` after
security, `airport-foodcourt`, `airport-kids` for the kids' play area, and
`airport-baggage`), eight ads each, for 399 ads in total. Airport kickers are
styled as yellow wayfinding signs. Copy avoids claims about security rules
beyond "fits in your carry-on".

The original's established visual preferences:

- Carter One headline, bundled locally with its SIL Open Font License.
- Large "BUY", emphasized "POKEMON", smaller "CARDS" and "HERE"
  (the actual artwork uses the accented spelling from the catalog).
- Slowly rotating blue rays on a 10-second loop.
- Five overlapping booster packs, each floating/rocking independently.
- Nine card images blasting from the center, mostly upward and sideways.
  Keep the lower packs and purchase prompt relatively calm.
- "TAP TO BUY!" continuously pulses on a 2-second cycle. The finger icon is
  on the right, with independent press/ripple motion, not a scaling bounce.
- Footer: "100% Authentic", "Choose a pack", "Keep collecting".

Preserve the original when experimenting with new themes. Different copy,
palettes, backgrounds, and compositions are welcome in new variants.

## Source map

All paths below are relative to the repository root.

| File | Responsibility |
| --- | --- |
| [ad-catalog.js](../public/assets/ad-catalog.js) | Sections, collections, layouts, and the generated ad list: IDs, titles, descriptions, four headline lines, kicker, pack tag, badge, filenames, supported durations |
| [pokemon-cards.html](../public/assets/pokemon-cards.html) | Shared screen markup, images, CTA, footer, preview controls |
| [pokemon-cards.css](../public/assets/pokemon-cards.css) | Original artwork, shared layout, pack/card/CTA animations |
| [ad-themes.css](../public/assets/ad-themes.css) | Shared non-original layout and neon/sunset/holo/gold styles |
| [ad-more-themes.css](../public/assets/ad-more-themes.css) | Shared palette rules and the next ten themes |
| [ad-type-themes.css](../public/assets/ad-type-themes.css) | Prefix-matched palette for `type-*`/`spot-*` themes, plus the eighteen type themes |
| [ad-location-themes.css](../public/assets/ad-location-themes.css) | The eleven location themes |
| [ad-seasonal-themes.css](../public/assets/ad-seasonal-themes.css) | The four season and nine holiday themes; small shapes are inline SVG data URIs |
| [ad-airport-themes.css](../public/assets/ad-airport-themes.css) | The six airport-spot themes and the shared sign-style kicker |
| [ad-variants.css](../public/assets/ad-variants.css) | The eight shared layouts, selected by `data-variant` |
| [asset collection page](../app/assets/%5Bgroup%5D/page.tsx) | One page per collection |
| [AdCard.tsx](../components/AdCard.tsx) / [AdGroupTile.tsx](../components/AdGroupTile.tsx) | Library ad card and collection tile |
| [pokemon-cards.js](../public/assets/pokemon-cards.js) | Catalog selection, ready signal, playback controls, clean/export modes |
| [asset library](../app/assets/page.tsx) | Next.js index of sections and collections |
| [AdExportOptions.tsx](../components/AdExportOptions.tsx) | Duration selector and local export command |
| [export-ad.mjs](../scripts/export-ad.mjs) | Deterministic Chromium capture and FFmpeg encoding |
| [ad.test.mjs](../scripts/ad.test.mjs) | Browser, layout, animation, controls, and CLI checks |
| [export-ad.test.mjs](../scripts/export-ad.test.mjs) | Real render/decode checks for every supported length |
| [asset package.json](../public/assets/package.json) | Scoped ES-module declaration for browser/Node shared JavaScript |

The HTML supplies fallback text, but the catalog supplies the active headline,
kicker, and tag at runtime. Edit the catalog for copy changes.

Pack images are the five `public/booster_*.jpg` files; flying cards use the nine
`public/card_*.jpg` files. Explicit HTML image references determine what appears:
adding a file alone does not add it to the animation. Preserve font licensing
and confirm rights to any new imagery.

Standard IDs: `original`, `neon`, `sunset`, `holo`, `gold`, `forest`, `electric`,
`ocean`, `galaxy`, `candy`, `fire`, `blueprint`, `citrus`, `mono`, `festival`.
Type, location, season, holiday, and airport collection IDs are listed in `adGroups`; their ads are
`<collection-id>` (classic) and `<collection-id>-2` … `-8`.
The catalog is authoritative; see the [README theme table](../README.md#fifteen-display-options)
for their display names.

## Preview and render

Install project dependencies for a fresh checkout, then install the capture browser:

```bash
npm ci
npx playwright install chromium
```

Start a server if one is not already running:

```bash
npm run dev -- --port 3100
```

Use the actual running port, not necessarily 3100. The exporter defaults to
3000; it does not start or discover a server.

- Library: `http://localhost:3100/assets`
- Original controls: `http://localhost:3100/assets/pokemon-cards.html`
- Collection page: `http://localhost:3100/assets/type-fire`
- Theme controls: `http://localhost:3100/assets/pokemon-cards.html?theme=forest`
  (the `theme` parameter is the ad ID, e.g. `?theme=type-fire-3`)
- Artwork only: append `clean=1` using `?` or `&` as appropriate.
- `export=1` explicitly enables animation even with reduced-motion preferences.

In another terminal:

```bash
# Original, one minute
npm run export:ad -- --ad original --duration 60 --url http://localhost:3100

# One theme, ten seconds
npm run export:ad -- --ad forest --duration 10 --url http://localhost:3100

# All catalog entries at a selected length
npm run export:ad -- --ad all --duration 15 --url http://localhost:3100

# Every ad in one collection
npm run export:ad -- --group spot-bowling --duration 10 --url http://localhost:3100

# Optional custom path, individual design only
npm run export:ad -- --ad neon --url http://localhost:3100 --output exports/neon-review.mp4
```

Defaults: `original`, 10 seconds, output under `exports/`. Ten-second names
come from the catalog, e.g. `pokemon-cards.mp4` or `pokemon-forest.mp4`.
Other lengths add a suffix, e.g. `pokemon-cards-60s.mp4`.
A successful rerender replaces the same output filename. Use a custom filename
if an earlier render needs to be retained.

The duration selector on the library prepares a command; it is not an online
converter. Do not run `npm run build` to render: that script includes a
Formspree deployment step. The local dev server is sufficient.

## Add ads to a type or location collection

Collections and their copy live in `ad-catalog.js`. The first ad of a collection is
its `firstAds` entry; ads two through eight come from that collection's `moreCopy`
list (title, optional kicker, four headline lines, tag, and a badge for the sticker
ad). The list position picks the layout from `adVariants`. To add a new location,
add its first ad to `firstAds`, a collection to `adGroups`, seven entries to
`moreCopy`, and a `[data-theme="spot-..."]` palette in `ad-location-themes.css`.
Layouts draw only on the `.deco` layer and `.sticker`, so they combine with any
theme. Headline lines wider than the artwork are shrunk automatically after the
font loads, so long copy no longer needs per-theme font-size overrides. Headline
lines never wrap (`white-space: nowrap`); each line shrinks to fit its centered
headline box (an overlong unwrapped line would otherwise spill to the right), and
a test asserts every line renders on one line.

## Add a new theme

1. Add an entry to the catalog with a unique `id`, matching `theme`, title,
   description, exactly four headline strings, kicker, tag, and unique `.mp4`
   filename. Only the original uses an empty `theme`.
2. Add scoped CSS using `[data-theme="your-id"]`. Reuse the shared markup,
   card paths, pack fan, and CTA unless the new brief requires otherwise.
   Existing `.buy`, `.pokemon`, `.cards`, and `.here` class names represent
   headline positions, not necessarily those literal words.
3. If using the palette-based rules in `ad-more-themes.css`, add the new ID to
   **each applicable explicit shared selector list**, not just the first one.
   Set `--paper`, `--base`, `--accent`, `--second`, and `--type`, then define
   the background/pattern and any copy-specific size adjustments.
   Alternatively write fully scoped overrides without joining that group.
   Themes whose ID starts with `type-`, `spot-`, `season-`, `holiday-`, or
   `airport-` join the palette in `ad-type-themes.css` automatically by prefix. Besides the five colors they
   accept `--note` (kicker and fourth line), `--stroke` (headline outline),
   `--tag-bg`/`--tag-ink`, `--dots` (halftone color), and `--spark` (a string,
   usually an emoji, that replaces the ✦ sparkles). `type-*` kickers render as a
   type badge.
4. Keep overrides in an existing theme stylesheet when practical. If a new
   stylesheet is necessary, link it in the shared HTML after its dependencies.
5. Preview both desktop/export and narrow-screen layouts, including long copy.
   Ensure the headline clears the packs, CTA clears the footer, and text does
   not wrap unintentionally. Check contrast over moving cards.
6. Update the ad count assertion in `ad.test.mjs` (currently hard-coded to
   399), the README table/heading, and any descriptive counts in this guide.
   The library list, per-theme tests, and `--ad all` read the catalog automatically.
7. Run browser checks, render a sample MP4, and inspect it before uploading to
   a machine. Adding a catalog entry alone is not a finished design.

For a fundamentally different layout, first evaluate whether the shared
four-line template still fits. A new playback page requires explicit exporter
routing and tests; adding a catalog entry does not create that integration.

## Animation and capture details

The screen uses container-relative units (`cqw`) to scale a single composition.
Keep independent animation tracks for background, packs, cards, CTA, and finger.
Prefer CSS animations under `.screen`: the exporter can seek those reliably.
Wall-clock JavaScript, random values on each frame, or unseeded particles are
not part of the deterministic capture model.

The exporter waits for `data-ad-ready`, fonts, and image decoding, pauses the
screen's animations, then sets their times to `frame * 1000 / 30`. It captures
PNG frames and feeds bundled FFmpeg. No manual screen recording is needed.
Temporary outputs are renamed into place only after successful encoding.

Only up to ten seconds is freshly captured per export. Longer videos repeat
that newly rendered ten-second master and re-encode to the requested frame count;
they do not slow the animation or reuse an old MP4. Animations longer than ten
seconds will therefore be truncated/repeated by the current exporter.
5, 15, and 45-second cuts can stop mid-cycle; the user accepted this.

For a seamless ten-second cycle, all visible properties at 0 and 10000 ms must
match, including repeating background offsets. Motion that looks approximately
periodic can still produce a visible cut.

Known pitfalls from development:

- CSS specificity: low-specificity `:where(...) h1 span` rules do not necessarily
  override `.pokemon` stroke color. Check computed styles, not just rule order.
- Smaller subtitle text can inherit an oversized drop shadow; clear or resize it.
- Negative delays stagger cards/packs. Keep card `animation-fill-mode: both`
  so deterministic time-zero captures do not show uninitialized cards.
- The first screenshot after a page load can rasterize slightly differently from
  later frames. The exporter and the loop tests render a throwaway mid-loop
  frame first; keep that warm-up if you change either.
- The reduced-motion rule must cover any animated `.screen::before` or
  `.screen::after` layer, or the reduced-motion test fails.
- For a screenshot at 2.5 seconds, pause and set `currentTime = 2500`;
  do not set the animation's duration to 2500.
- To sample an animation's local phase in tests, account for its delay:
  `currentTime = desiredLocalTime + effect.getTiming().delay`.

## Validation and troubleshooting

With the server running on the selected port:

```bash
AD_BASE_URL=http://localhost:3100 npm run test:ad
npx tsc --noEmit
npm run lint

# Slower: actual renders and full decodes for all six lengths
AD_BASE_URL=http://localhost:3100 npm run test:ad:export
```

The export test currently exercises the forest design through the shared
duration pipeline and removes its temporary videos. It expects 150, 300, 450,
900, 1350, and 1800 decoded frames respectively. It does not substitute for
visually checking every new design or testing physical-machine compatibility.

- **Connection refused:** start the site or correct `--url` to its actual port.
- **Chromium missing:** run `npx playwright install chromium`.
- **Module-type warning for the catalog:** preserve the scoped
  `public/assets/package.json`; do not change the whole project's module mode
  just to fix the shared asset script.
- **Copy clips or pack/CTA overlap:** inspect multiple animation times and
  viewport sizes, not just one still frame.
- **Stale video:** changing HTML/CSS does not change an already rendered MP4;
  render again and upload the new file.

Keep the catalog, editable art, tests, and this guide in source control.
Keep local MP4s out. Revisit hosting/download UI together when Blob storage is
actually implemented, rather than restoring links to missing public files.
