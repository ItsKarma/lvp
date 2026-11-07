import type { Metadata } from 'next';
import { ArrowRight, MapPin, PackageCheck, Sparkles } from 'lucide-react';
import CTA from '@/components/CTA';
import FeatureCard from '@/components/FeatureCard';
import LocationList from '@/components/LocationList';
import Section from '@/components/Section';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';

const title = 'Pokémon Card Vending Machine Locations';
const description =
  'Find a Pokémon card vending machine in the Lehigh Valley. Sealed booster packs at locations in Allentown and Northampton, PA, including Lehigh Valley International Airport.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/locations' },
  openGraph: { title, description, url: `${siteConfig.url}/locations` },
};

export default function LocationsPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden px-4 pb-8 pt-32 text-center md:pb-10 md:pt-40">
          <div className="grid-texture pointer-events-none absolute inset-0 opacity-60" />
          <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-wave/25 blur-[140px]" />
          <div className="relative mx-auto max-w-3xl">
            <h1 className="display text-4xl leading-[1.05] md:text-6xl">
              Packs, <span className="text-gradient-bolt">around the corner.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
              Find a machine near you.
            </p>
          </div>
        </section>

        <Section width="wide" className="!pt-2 md:!pt-4">
          <LocationList />
          <p className="mx-auto mt-10 max-w-xl text-center leading-relaxed text-white/60">
            More machines are going in across Lehigh and Northampton counties. Check back here for
            new locations.
          </p>
          <div className="mt-6 flex justify-center">
            <CTA href="/authenticity" variant="ghost">
              How we source our packs
            </CTA>
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
              icon={<PackageCheck size={22} />}
              title="Restocked before it runs dry"
              description="Every machine reports its stock to us, so we refill it before the shelves go empty."
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
