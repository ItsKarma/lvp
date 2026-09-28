import type { Metadata } from 'next';
import { ArrowRight, CreditCard, Monitor, Ruler, ShieldCheck, Wifi, Wrench } from 'lucide-react';
import CTA from '@/components/CTA';
import FeatureCard from '@/components/FeatureCard';
import MachineArt from '@/components/MachineArt';
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
    badge: 'Most popular',
    dimensions: '24"W × 42.5"H × 11"D',
    description:
      'Mounts flat on a wall and takes zero floor space. Ideal for counters, checkout lines, entryways, and anywhere square footage is tight.',
  },
  {
    name: 'Pedestal',
    badge: 'No wall needed',
    dimensions: 'Same cabinet, freestanding base',
    description:
      'The same machine on a weighted stand. For glass storefronts, brick walls, leased spaces where you cannot mount, or open floor areas.',
  },
  {
    name: 'Double Bank',
    badge: 'High traffic',
    dimensions: 'Two units, side by side',
    description:
      'Twice the capacity and twice the selection for busy locations. Fewer restock visits and more sets available at once.',
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
          <div className="grid gap-6 md:grid-cols-3">
            {models.map((model) => (
              <div key={model.name} className="card-surface overflow-hidden">
                <div className="flex justify-center bg-ink-800 px-6 py-8">
                  <MachineArt className="h-56 w-auto" />
                </div>
                <div className="p-6">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-bolt">
                    {model.badge}
                  </p>
                  <h2 className="display text-2xl text-white">{model.name}</h2>
                  <p className="mt-1 font-mono text-xs text-white/50">{model.dimensions}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-white/70">
                    {model.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-white/45">
            Product photography coming soon. Ask us for current photos of an installed unit.
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
