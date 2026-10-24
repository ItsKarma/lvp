# Lehigh Valley Pokémon

Marketing site for **lehighvalleypokemon.com**, the Pokémon card vending brand
operated by LVP Vending. Built with Next.js and deployed on Vercel.

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4 (theme lives in `app/globals.css`, no `tailwind.config.ts`)
- Formspree for lead capture
- Meta Pixel, Google Analytics, and Vercel Analytics for ad measurement

## Local development

```bash
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:3000

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `FORMSPREE_DEPLOY_KEY` | yes | `npm run build` runs `formspree deploy` first |
| `NEXT_PUBLIC_FORMSPREE_PROJECT` | yes | Renders the lead forms |
| `NEXT_PUBLIC_META_PIXEL_ID` | for Meta ads | Meta Pixel and `Lead` conversion events |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | recommended | GA4 |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | for Google Ads | Site-wide Google Ads tag (`AW-...`) |
| `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` | for Google Ads | Conversion label; required alongside the Ads ID |

Set the same variables in the Vercel project settings.

All three destinations are wired through `trackLead()` in `lib/analytics.ts` and
fire together on form submit. Each one is skipped independently when its ID is
not set, so you can turn channels on as you go.

## Structure

```text
app/           App Router pages, robots, sitemap, OG images
components/    Shared UI (header, footer, forms, countdown, estimator)
lib/           Site config, service cities, Meta helpers, OG renderer
public/        Static assets
```

## Key pages

| Route | Purpose |
| --- | --- |
| `/` | Main pitch: free machine, 10% of every sale |
| `/skill-games` | Paid-traffic page for PA skill game locations (Oct 13, 2026 deadline) |
| `/host-a-machine` | Full partner offer and application form |
| `/machines` | Hardware and specs |
| `/find-a-machine` | Collector-facing page |
| `/assets` | Screen-ad library with previews and export instructions (not indexed) |
| `/service-area/[city]` | Local SEO pages generated from `lib/serviceCities.ts` |

## Editable machine ads

See the [machine ad creation guide](docs/machine-ads.md) for design history,
source structure, adding themes, rendering, testing, and troubleshooting.

### Fifteen display options

Visit `/assets` for all fifteen previews, clean playback links, and local MP4
export commands. Every display is silent, portrait 1080 × 1920, and loops in 10 seconds.

| Export ID | Design | Preview |
| --- | --- | --- |
| `original` | Electric Blue — original comic burst | `/assets/pokemon-cards.html` |
| `neon` | Neon Arcade — cyan/pink grid and glowing rings | `/assets/pokemon-cards.html?theme=neon` |
| `sunset` | Sunset Pop — peach/red striped sun and print texture | `/assets/pokemon-cards.html?theme=sunset` |
| `holo` | Holographic Ice — mint/lavender rotating crystal facets | `/assets/pokemon-cards.html?theme=holo` |
| `gold` | Golden Hour — black/gold collector-inspired spotlights | `/assets/pokemon-cards.html?theme=gold` |
| `forest` | Emerald Expedition — forest green, mint, canopy-like light | `/assets/pokemon-cards.html?theme=forest` |
| `electric` | Lightning Strike — yellow, charcoal, angular light | `/assets/pokemon-cards.html?theme=electric` |
| `ocean` | Ocean Drift — teal, seafoam, drifting bubbles | `/assets/pokemon-cards.html?theme=ocean` |
| `galaxy` | Cosmic Quest — violet, indigo, starfield | `/assets/pokemon-cards.html?theme=galaxy` |
| `candy` | Candy Cloud — pink, lavender, drifting dots | `/assets/pokemon-cards.html?theme=candy` |
| `fire` | Crimson Forge — crimson, orange, drifting embers | `/assets/pokemon-cards.html?theme=fire` |
| `blueprint` | Collector Blueprint — cobalt, white, drafting grid | `/assets/pokemon-cards.html?theme=blueprint` |
| `citrus` | Citrus Splash — lime, tangerine, citrus rings | `/assets/pokemon-cards.html?theme=citrus` |
| `mono` | Ink & Paper — black, cream, red, print lines | `/assets/pokemon-cards.html?theme=mono` |
| `festival` | Confetti Club — purple, coral, gold, confetti | `/assets/pokemon-cards.html?theme=festival` |

Copy, titles, and export filenames live in `public/assets/ad-catalog.js`.
The themes share the existing HTML/controls and have separate style
sections in `public/assets/ad-themes.css` and `public/assets/ad-more-themes.css`; original artwork styling remains in
`pokemon-cards.css`. Add `&clean=1` to a themed URL for artwork-only playback.
There is no vending-company branding in any design.

To alternate ads on a machine, render the desired MP4s locally and place them in the
machine's media playlist in order (for example, original then neon). Each file
plays for 10 seconds. The web previews loop individually; they do not configure
the machine playlist automatically.

The first ad is served at `/assets/pokemon-cards.html`. Its source is ordinary
HTML, CSS, and a small preview-controls script in `public/assets/`. Text lives in
`pokemon-cards.html`; colors, layout, and keyframes live in `pokemon-cards.css`.
It uses the five `public/booster_*.jpg` pack photos, with no vending-company branding.
Each pack floats and rocks subtly on its own staggered 10-second cycle.
The headline uses locally bundled Carter One; its SIL Open Font License is
included in `public/assets/fonts/carter-one-OFL.txt`.
The nine `public/card_*.jpg` images burst outward from the screen center on
staggered 10-second cycles, growing and rotating toward the upper and side edges behind the
headline and packs. They fade out before restarting to preserve the seamless
loop. No reference-video frames are used. Update the image/text as your machine
inventory changes.

- `/assets` — creative library.
- `/assets/pokemon-cards.html` — preview with pause, restart, timeline, and fullscreen.
- `/assets/pokemon-cards.html?clean=1` — artwork only, letterboxed to a 9:16 portrait
  display. Use this for screen recording. No site navigation or controls appear.
- Reduced-motion preferences pause the preview by default; Play explicitly opts
  into motion. Exports always render the full animation.
- Background light streaks rotate slowly through one repeating 40-degree sector
  every 10 seconds, matching the rest of the ad's loop.
- The tap-to-buy text pulses continuously on a 2-second cycle; the finger presses and releases twice
  per loop with brightening tap ripples, without scaling.

### Export an MP4

One-time setup after installing dependencies:

```bash
npx playwright install chromium
```

Start the site with `npm run dev`, then in a second terminal:

```bash
npm run export:ad
```

Export a specific design, or refresh all fifteen:

```bash
npm run export:ad -- --ad neon --url http://localhost:3100
npm run export:ad -- --ad all --url http://localhost:3100
npm run export:ad -- --ad forest --duration 30 --url http://localhost:3100
```

`--ad` defaults to `original`; `--duration` defaults to `10` and accepts exactly
**5, 10, 15, 30, 45, or 60** seconds for **any** of the fifteen designs.
The library's duration dropdown displays the appropriate local export command;
it does not perform browser-side conversion. Website MP4 downloads are not currently hosted.

10-second exports keep their existing filenames (`pokemon-cards.mp4` for the
original, `pokemon-<theme>.mp4` for the others). Other lengths use suffixes such
as `pokemon-forest-30s.mp4` or `pokemon-cards-5s.mp4`, under
`exports/`. All videos are created on demand by the local command, not by a website
service. This top-level directory is Git-ignored and is not served by the site.
`--ad all --duration 30` renders every design at that duration.
`--output` is supported for individual designs
only, not `--ad all`.

The exporter renders up to 10 seconds of CSS animation at deterministic timestamps, then
encodes `exports/pokemon-cards.mp4` by default: **1080 × 1920, 30 fps, 10 seconds, silent
H.264, yuv420p**, with fast-start metadata. FFmpeg is bundled as a development
dependency; there is no server-side rendering service or manual screen capture.
5-second exports render the first 150 frames; longer exports repeat the freshly
rendered 10-second animation at its original speed and encode the exact requested
frame count. No pre-existing/stale MP4 is used as the source. 5, 15, and 45-second
versions can end mid-cycle; no seamless cut is promised for those lengths.
The MP4 is a generated output, not the editable source. Confirm your machine's
codec/resolution requirements before uploading; physical-machine playback must
still be checked on the device.

```bash
npm run export:ad -- --url http://localhost:3001 --output exports/pokemon-cards-v2.mp4
```

After changing the HTML/CSS, run the exporter again and load the local video through
your machine's usual media-upload workflow. Commit only the editable source, not
rendered MP4s. Outputs under `exports/` remain ignored; legacy
`public/assets/downloads/*.mp4` paths are also ignored to prevent accidental commits.
Public MP4s and their download buttons have been removed. Vercel Blob hosting is
deferred; no storage service is configured.
Using `--output` writes only that custom path. Do not run the Formspree deployment
build just to export an ad; the local dev server is sufficient.

With the dev server running, `npm run test:ad` checks library links, preview
controls, reduced motion, responsive fitting, CTA visibility, and the loop seam
in Chromium. Set `AD_BASE_URL=http://localhost:3001` to test another local port.
`npm run test:ad:export` performs a slower real render/decode check for all six
durations, validates exact frame counts, and removes its temporary videos.

## Deployment

```bash
vercel link
vercel env pull .env.local
vercel --prod
```

Point `lehighvalleypokemon.com` at the project in Vercel, and keep
`siteConfig.url` in `lib/site.ts` in sync with the canonical hostname.

## Placeholder assets

Machine visuals are currently the generated SVG in `components/MachineArt.tsx`.
Drop real photography into `public/` and swap it out when available.
