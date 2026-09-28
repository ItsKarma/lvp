import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, CreditCard, Monitor, Ruler, ShieldCheck, Wifi, Wrench } from 'lucide-react';
import CTA from '@/components/CTA';
import FeatureCard from '@/components/FeatureCard';
import Section from '@/components/Section';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';

const title = 'Our Machines';
const description =
  'Compact wall-mounted and freestanding Pokémon card vending machines. Cashless, remotely monitored, and sized to fit almost any Lehigh Valley business.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/machines' },
  openGraph: { title, description, url: `${siteConfig.url}/machines` },
};

const models = [
  {
    name: 'Wall Mount',
    badge: 'Smallest footprint',
    placement: 'Wall mounted',
    image: '/pokemon-tcg-wrap-mini-tcg-vending-machine-front-view.jpeg',
    alt: 'Wall mounted Pokémon card vending machine, front view',
    description:
      'Hangs flat on the wall and takes zero floor space, which makes it the easy yes for counters, checkout lines, and tight entryways. Available in two sizes depending on how much selection you want.',
  },
  {
    name: 'Pedestal',
    badge: 'No wall needed',
    placement: 'Freestanding',
    image:
      '/pokemon-tcg-wrap-mini-wall-tcg-vending-machine-with-tcg-wrap-pedestal-stand.jpeg',
    alt: 'Pokémon card vending machine on a freestanding pedestal stand',
    description:
      'The same cabinet on a weighted stand. For glass storefronts, brick, or leased space where drilling into the wall is not an option.',
  },
  {
    name: 'Tower',
    badge: 'Highest visibility',
    placement: 'Freestanding',
    image: '/pokemon-card-pack-vending-machine-24-selection-touchscreen.jpeg',
    alt: 'Freestanding Pokémon card vending tower with a full-height touchscreen',
    description:
      'A full-height tower with a large touchscreen and up to 24 selections. Built to be seen from across the room in arcades, lobbies, and open retail floors.',
  },
];

const specs = [
  { icon: <CreditCard size={20} />, title: 'Cashless payments', description: 'Tap, chip, and mobile wallet. No cash box, nothing on site worth stealing.' },
  { icon: <Wifi size={20} />, title: 'Remote monitoring', description: 'We see stock levels and sales in real time, so it gets refilled before it runs dry.' },
  { icon: <Monitor size={20} />, title: 'Clear product display', description: 'Customers see exactly what they are buying before they pay. No mystery selections.' },
  { icon: <ShieldCheck size={20} />, title: 'Locked and secured', description: 'Reinforced cabinet with a secured dispensing mechanism. Your staff never needs a key.' },
  { icon: <Wrench size={20} />, title: 'Serviced by us', description: 'Every repair, part, and service call is ours. There is no maintenance line item for you.' },
  { icon: <Ruler size={20} />, title: 'Fits where you need it', description: 'Standard outlet, no plumbing, no special wiring, no network drop required.' },
];

export default function MachinesPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden px-4 pb-12 pt-32 text-center md:pt-40">
          <div className="grid-texture pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative mx-auto max-w-3xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-bolt">
              The hardware
            </p>
            <h1 className="display text-4xl leading-[1.05] md:text-6xl">
              Small footprint. <span className="text-gradient-bolt">Serious presence.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              Clean, modern, and built to look like it belongs in your business, not like something
              somebody dragged into the corner.
            </p>
          </div>
        </section>

        <Section width="wide">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {models.map((model, index) => (
              <div key={model.name} className="card-surface overflow-hidden">
                <div className="relative aspect-square w-full">
                  <Image
                    src={model.image}
                    alt={model.alt}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-bolt">
                      {model.badge}
                    </p>
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">
                      {model.placement}
                    </span>
                  </div>
                  <h2 className="display text-2xl text-white">{model.name}</h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                    {model.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center leading-relaxed text-white/60">
            Every model is touchscreen, cashless, remotely monitored, and wrapped to get noticed.
            Tell us about your space and we will spec the one that fits.
          </p>
        </Section>

        <Section panel eyebrow="Specs" title="What is actually inside" width="wide">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {specs.map((spec) => (
              <FeatureCard key={spec.title} {...spec} />
            ))}
          </div>
        </Section>

        <Section eyebrow="Next step" title="Not sure which one fits your space?">
          <div className="text-center">
            <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-white/75">
              Send us a photo of the spot you have in mind. We will tell you which configuration
              works and what the install would look like.
            </p>
            <CTA href="/host-a-machine#apply">
              Check My Location <ArrowRight size={16} />
            </CTA>
          </div>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
