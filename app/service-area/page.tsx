import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import CTA from '@/components/CTA';
import Section from '@/components/Section';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { serviceCities } from '@/lib/serviceCities';
import { siteConfig } from '@/lib/site';

const title = 'Service Area';
const description =
  'Lehigh Valley Pokémon installs and services Pokémon card vending machines across Lehigh and Northampton counties, including Allentown, Bethlehem, Easton, and surrounding towns.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/service-area' },
  openGraph: { title, description, url: `${siteConfig.url}/service-area` },
};

export default function ServiceAreaPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden px-4 pb-12 pt-32 text-center md:pt-40">
          <div className="grid-texture pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative mx-auto max-w-3xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-bolt">
              Where we operate
            </p>
            <h1 className="display text-4xl leading-[1.05] md:text-6xl">
              The whole <span className="text-gradient-bolt">Lehigh Valley.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              We install and service machines across Lehigh and Northampton counties. Close enough
              that a restock is a drive, not a dispatch ticket.
            </p>
          </div>
        </section>

        <Section width="wide">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-area/${city.slug}`}
                className="card-surface flex items-center gap-3 px-5 py-4 transition-colors hover:border-bolt/50"
              >
                <MapPin size={18} className="shrink-0 text-bolt" />
                <span className="font-semibold text-white">{city.name}</span>
              </Link>
            ))}
          </div>
        </Section>

        <Section panel eyebrow="Not listed?" title="If you are close, ask anyway.">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-8 text-lg leading-relaxed text-white/75">
              We regularly work just outside these towns. If your business is in the greater Lehigh
              Valley, send it over and we will tell you if we can service it properly.
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
