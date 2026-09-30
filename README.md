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
| `/service-area/[city]` | Local SEO pages generated from `lib/serviceCities.ts` |

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

