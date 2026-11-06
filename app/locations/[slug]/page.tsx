import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, MapPin, Navigation, ShieldCheck, Sparkles } from 'lucide-react';
import CTA from '@/components/CTA';
import FeatureCard from '@/components/FeatureCard';
import Section from '@/components/Section';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import {
  directionsUrl,
  formatAddress,
  getMachineLocation,
  machineLocations,
  mapEmbedUrl,
} from '@/lib/locations';
import { siteConfig } from '@/lib/site';

interface LocationPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return machineLocations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getMachineLocation(slug);
  if (!location) return {};

  const title = `Pokémon Card Vending Machine at ${location.name}`;
  const description = `Sealed Pokémon booster packs at ${location.name}, ${formatAddress(location)}. Get directions and see the machine.`;
  const path = `/locations/${location.slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: `${siteConfig.url}${path}` },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = getMachineLocation(slug);
  if (!location) notFound();

  const otherLocations = machineLocations.filter((other) => other.slug !== location.slug);

  return (
    <>
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden px-4 pb-10 pt-32 md:pt-40">
          <div className="grid-texture pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative mx-auto max-w-6xl">
            <Link
              href="/locations"
              className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft size={15} /> All locations
            </Link>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-bolt">
              Pokémon card vending machine
            </p>
            <h1 className="display text-4xl leading-[1.05] md:text-6xl">{location.name}</h1>
            <p className="mt-5 flex items-start gap-2 text-lg text-white/75">
              <MapPin size={20} className="mt-1 shrink-0 text-bolt" />
              {formatAddress(location)}
            </p>
            {location.placement && <p className="mt-2 text-white/60">{location.placement}</p>}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTA href={directionsUrl(location)}>
                Get directions <Navigation size={16} />
              </CTA>
            </div>
          </div>
        </section>

        <Section width="wide" className="!pt-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="card-surface relative aspect-[3/4] overflow-hidden">
              <Image
                src={location.photo}
                alt={location.photoAlt}
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="card-surface min-h-80 overflow-hidden">
              <iframe
                title={`Map of ${location.name}`}
                src={mapEmbedUrl(location)}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </Section>

        <Section panel eyebrow="What to expect" title="Sealed packs, fair prices." width="wide">
          <div className="grid gap-5 md:grid-cols-2">
            <FeatureCard
              icon={<ShieldCheck size={22} />}
              title="Never searched"
              description="We never weigh, scan, or search packs before they go in a machine. What is in the pack is what the manufacturer put there."
              accent="mint"
            />
            <FeatureCard
              icon={<Sparkles size={22} />}
              title="Restocked locally"
              description="We are based in the Lehigh Valley and keep current sets stocked. If this machine is missing something you want, tell us."
              accent="wave"
            />
          </div>
          <div className="mt-10 text-center">
            <CTA href="/authenticity" variant="ghost">
              How we source our packs
            </CTA>
          </div>
        </Section>

        {otherLocations.length > 0 && (
          <Section eyebrow="More machines" title="Other locations" width="wide">
            <div className="flex flex-wrap justify-center gap-3">
              {otherLocations.map((other) => (
                <Link
                  key={other.slug}
                  href={`/locations/${other.slug}`}
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-ink px-5 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:border-bolt/50 hover:text-white"
                >
                  <MapPin size={15} className="text-bolt" />
                  {other.name}
                </Link>
              ))}
            </div>
            <div className="mt-10 text-center">
              <CTA href="/support" variant="secondary">
                Problem with a machine? <ArrowRight size={16} />
              </CTA>
            </div>
          </Section>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
