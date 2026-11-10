import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, CreditCard, Monitor, Ruler, ShieldCheck, Wifi, Wrench } from 'lucide-react';
import CTA from '@/components/CTA';
import FeatureCard from '@/components/FeatureCard';
import Section from '@/components/Section';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { machineModels } from '@/lib/machines';
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

const specs = [
  { icon: <CreditCard size={20} />, title: 'Cashless payments', description: 'Tap, chip, swipe, and mobile wallet. No cash on site.' },
  { icon: <Wifi size={20} />, title: 'Remote monitoring', description: 'We see stock levels and sales in real time, so it gets refilled before it runs dry.' },
  { icon: <Monitor size={20} />, title: 'Clear product display', description: 'Customers see exactly what they are buying before they pay.' },
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
            {machineModels.map((model) => (
              <div key={model.slug} id={model.slug} className="card-surface scroll-mt-24 overflow-hidden">
                <div className="relative flex aspect-square w-full items-center justify-center p-8">
                  <Image
                    src={model.cutout}
                    alt={model.alt}
                    sizes="(min-width: 1024px) 240px, (min-width: 640px) 35vw, 70vw"
                    className="h-full w-auto object-contain"
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
