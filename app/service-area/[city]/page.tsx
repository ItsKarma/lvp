import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Banknote, MapPin, ShieldCheck, Wrench } from 'lucide-react';
import CTA from '@/components/CTA';
import FeatureCard from '@/components/FeatureCard';
import HostLeadForm from '@/components/HostLeadForm';
import Section from '@/components/Section';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { getServiceCity, serviceCities, type ServiceCity } from '@/lib/serviceCities';
import { siteConfig } from '@/lib/site';

interface CityPageProps {
  params: Promise<{ city: string }>;
}

export function generateStaticParams() {
  return serviceCities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getServiceCity(slug);
  if (!city) return {};

  const title = `Pokémon Card Vending Machines in ${city.name}, PA`;
  const description = `Host a free Pokémon card vending machine at your ${city.name}, PA business and earn ${siteConfig.revenueSharePercent}% of every sale. We install, stock, and service it across ${city.county}.`;

  return {
    title,
    description,
    alternates: { canonical: `/service-area/${city.slug}` },
    openGraph: { title, description, url: `${siteConfig.url}/service-area/${city.slug}` },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { city: slug } = await params;
  const city = getServiceCity(slug);
  if (!city) notFound();

  const nearby = city.nearby
    .map((name) => serviceCities.find((candidate) => candidate.name === name))
    .filter((candidate): candidate is ServiceCity => Boolean(candidate));

  return (
    <>
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden px-4 pb-12 pt-32 text-center md:pt-40">
          <div className="grid-texture pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative mx-auto max-w-3xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-bolt">
              {city.county}
            </p>
            <h1 className="display text-4xl leading-[1.05] md:text-6xl">
              Pokémon card vending in{' '}
              <span className="text-gradient-bolt">{city.name}, PA</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              We install Pokémon card machines in {city.name} businesses at no cost, stock them,
              service them, and pay the location {siteConfig.revenueSharePercent}% of every sale.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <CTA href="#apply">
                Check My {city.name} Location <ArrowRight size={16} />
              </CTA>
              <CTA href="/skill-games" variant="ghost">
                Replacing skill games?
              </CTA>
            </div>
          </div>
        </section>

        <Section width="wide">
          <div className="grid gap-5 md:grid-cols-3">
            <FeatureCard
              icon={<Banknote size={22} />}
              title={`${siteConfig.revenueSharePercent}% of every sale`}
              description={`Paid monthly, with a statement. No cost to install, no product to buy, and nothing out of pocket for your ${city.name} location.`}
            />
            <FeatureCard
              icon={<Wrench size={22} />}
              title="Serviced locally"
              description={`We are based in the Lehigh Valley, so restocks and repairs in ${city.county} are a short drive, not a support ticket.`}
              accent="wave"
            />
            <FeatureCard
              icon={<ShieldCheck size={22} />}
              title="60 days, risk free"
              description="If it is not earning, we remove it within 48 hours at no cost. There is no binding contract to sign."
              accent="mint"
            />
          </div>
        </Section>

        {nearby.length > 0 && (
          <Section panel eyebrow="Nearby" title={`We also serve around ${city.name}`} width="wide">
            <div className="flex flex-wrap justify-center gap-3">
              {nearby.map((town) => (
                <Link
                  key={town.slug}
                  href={`/service-area/${town.slug}`}
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-ink px-5 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:border-bolt/50 hover:text-white"
                >
                  <MapPin size={15} className="text-bolt" />
                  {town.name}
                </Link>
              ))}
            </div>
          </Section>
        )}

        <Section id="apply" eyebrow="Apply" title={`Bring a machine to ${city.name}.`}>
          <div className="mx-auto max-w-2xl">
            <HostLeadForm source={`service-area-${city.slug}`} skillGameContext />
          </div>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
