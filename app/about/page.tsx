import type { Metadata } from 'next';
import { ArrowRight, Handshake, MapPin, ShieldCheck } from 'lucide-react';
import CTA from '@/components/CTA';
import FeatureCard from '@/components/FeatureCard';
import Section from '@/components/Section';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';

const title = 'About Us';
const description = `${siteConfig.name} is a locally owned Pokémon card vending operation serving Lehigh and Northampton counties, operated by ${siteConfig.parentCompany}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/about' },
  openGraph: { title, description, url: `${siteConfig.url}/about` },
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden px-4 pb-12 pt-32 text-center md:pt-40">
          <div className="grid-texture pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative mx-auto max-w-3xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-bolt">
              Who we are
            </p>
            <h1 className="display text-4xl leading-[1.05] md:text-6xl">
              Local operators, <span className="text-gradient-bolt">not a franchise.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              {siteConfig.name} is the trading card side of {siteConfig.parentCompany}, a vending
              business based right here in the Lehigh Valley.
            </p>
          </div>
        </section>

        <Section width="wide">
          <div className="card-surface p-7 md:p-10">
            <p className="text-lg leading-relaxed text-white/80">
              We already run smart vending for businesses across Lehigh and Northampton counties.
              Pokémon started as one machine, in one store, as an experiment. It worked better than
              anything else we had put on a wall, so we built a whole brand around it.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-white/80">
              When you contact us, you get an owner, not a call center in another state. When a
              machine needs attention, somebody drives there. That is the entire advantage of doing
              this locally, and it is the reason we will never take on more locations than we can
              actually service well.
            </p>
          </div>
        </Section>

        <Section panel eyebrow="How we operate" title="Three things we do not compromise on" width="wide">
          <div className="grid gap-5 md:grid-cols-3">
            <FeatureCard
              icon={<ShieldCheck size={22} />}
              title="We sell packs straight"
              description="No weighing, no scanning, no picking through product. Customers get a real shot at what is inside, every time."
              accent="mint"
            />
            <FeatureCard
              icon={<Handshake size={22} />}
              title="We tell you no"
              description="If your location will not do the volume, we say so instead of installing a machine that embarrasses both of us."
            />
            <FeatureCard
              icon={<MapPin size={22} />}
              title="We stay close to home"
              description="Lehigh and Northampton counties. Close enough that service is a drive, not a dispatch ticket."
              accent="wave"
            />
          </div>
        </Section>

        <Section eyebrow="Get in touch" title="Want a machine, or just have a question?">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-8 text-lg leading-relaxed text-white/75">
              Reach out directly at{' '}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-bold text-bolt underline underline-offset-4"
              >
                {siteConfig.email}
              </a>{' '}
              or start with the location form. Either one reaches an actual person.
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
