import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Megaphone, MapPin, Sparkles } from 'lucide-react';
import CTA from '@/components/CTA';
import FeatureCard from '@/components/FeatureCard';
import Section from '@/components/Section';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { formatAddress, machineLocations } from '@/lib/locations';
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
          <div className="mx-auto grid max-w-4xl gap-3 md:grid-cols-2 md:gap-4">
            {machineLocations.map((location) => (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}`}
                className="card-surface group flex items-center gap-4 p-3 transition-colors hover:border-bolt/50"
              >
                <div className="relative aspect-[3/4] w-16 shrink-0 overflow-hidden rounded-lg bg-ink-800 md:w-20">
                  <Image
                    src={location.photo}
                    alt={location.photoAlt}
                    placeholder={location.photo.blurDataURL ? 'blur' : 'empty'}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-bold leading-snug text-white">{location.name}</h2>
                  <p className="mt-1 flex items-start gap-1.5 text-sm leading-snug text-white/65">
                    <MapPin size={14} className="mt-0.5 shrink-0 text-bolt" />
                    {formatAddress(location)}
                  </p>
                </div>
                <ArrowRight
                  size={18}
                  className="mr-1 shrink-0 text-bolt transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-xl text-center leading-relaxed text-white/60">
            More machines are going in across Lehigh and Northampton counties. Follow along on
            Instagram for new locations and restocks.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <CTA href="/service-area" variant="secondary">
              Browse our service area <ArrowRight size={16} />
            </CTA>
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
