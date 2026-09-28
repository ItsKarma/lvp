import type { Metadata } from 'next';
import { ArrowRight, Megaphone, MapPin, Sparkles } from 'lucide-react';
import CTA from '@/components/CTA';
import FeatureCard from '@/components/FeatureCard';
import Section from '@/components/Section';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';

const title = 'Find a Machine';
const description =
  'Looking for Pokémon booster packs in the Lehigh Valley? Our card vending machines are rolling out across Allentown, Bethlehem, Easton, and the surrounding area.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/find-a-machine' },
  openGraph: { title, description, url: `${siteConfig.url}/find-a-machine` },
};

export default function FindAMachinePage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden px-4 pb-12 pt-32 text-center md:pt-40">
          <div className="grid-texture pointer-events-none absolute inset-0 opacity-60" />
          <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-wave/25 blur-[140px]" />
          <div className="relative mx-auto max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-wave/40 bg-wave/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-wave">
              <Sparkles size={14} />
              For collectors
            </p>
            <h1 className="display text-4xl leading-[1.05] md:text-6xl">
              Packs, <span className="text-gradient-bolt">around the corner.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              We are putting Pokémon card machines in local businesses across the Lehigh Valley.
              Sealed product, fair prices, and no waiting for a restock truck at a big box store.
            </p>
          </div>
        </section>

        <Section width="wide">
          <div className="card-surface p-8 text-center md:p-12">
            <MapPin size={36} className="mx-auto mb-5 text-bolt" />
            <h2 className="display text-2xl text-white md:text-3xl">Locations are rolling out now.</h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/70">
              We are installing new machines across Lehigh and Northampton counties. Follow along on
              Instagram for every new drop, and we will publish the full location map here as sites
              go live.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <CTA href="/service-area" variant="secondary">
                Browse our service area <ArrowRight size={16} />
              </CTA>
              <CTA href="/authenticity" variant="ghost">
                How we source our packs
              </CTA>
            </div>
          </div>
        </Section>

        <Section panel eyebrow="What to expect" title="No games. Just packs." width="wide">
          <div className="grid gap-5 md:grid-cols-3">
            <FeatureCard
              icon={<Sparkles size={22} />}
              title="Sealed and untouched"
              description="We never weigh, scan, or search packs before they go in a machine. Whatever is in there is whatever the manufacturer put there."
              accent="mint"
            />
            <FeatureCard
              icon={<MapPin size={22} />}
              title="Rotating selection"
              description="We keep current sets stocked and mix in what collectors are actually asking for. If a machine near you is missing something, tell us."
            />
            <FeatureCard
              icon={<Megaphone size={22} />}
              title="Restocks announced"
              description="New sets and new locations get posted as they happen, so you are not guessing when it is worth a trip."
              accent="wave"
            />
          </div>
        </Section>

        <Section eyebrow="Know a spot?" title="Want a machine at your local shop?">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-8 text-lg leading-relaxed text-white/75">
              If there is a business near you that should have one, tell them about us, or send us
              the name and we will reach out. Hosting costs them nothing and they earn{' '}
              {siteConfig.revenueSharePercent}% of every sale.
            </p>
            <CTA href="/contact">
              Suggest a location <ArrowRight size={16} />
            </CTA>
          </div>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
