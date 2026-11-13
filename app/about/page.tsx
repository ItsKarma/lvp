import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin, Truck, Wand2 } from 'lucide-react';
import CTA from '@/components/CTA';
import FeatureCard from '@/components/FeatureCard';
import Section from '@/components/Section';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';

const title = 'About Us';
const description = `${siteConfig.name} is a locally owned Pokémon card vending business in the Lehigh Valley. We stock the machines ourselves and rotate in the sets collectors ask for.`;

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
              Your local pack machines, <span className="text-gradient-bolt">run by locals.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              {siteConfig.name} is a small, locally owned business here in the Lehigh Valley. We
              stock every machine ourselves.
            </p>
          </div>
        </section>

        <Section width="wide">
          <div className="card-surface p-7 md:p-10">
            <p className="text-lg leading-relaxed text-white/80">
              It started as one Pokémon machine in one store, as an experiment. Collectors kept
              showing up for it, so we kept adding machines in places you already go: gas stations,
              barbershops, card shops, and the airport.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-white/80">
              We want opening a pack at one of our machines to be fun every time. That means fresh
              sets, full machines, and new spots close to home.
            </p>
          </div>
        </Section>

        <Section panel eyebrow="What that means for you" title="Why local makes a difference" width="wide">
          <div className="grid gap-5 md:grid-cols-3">
            <FeatureCard
              icon={<Truck size={22} />}
              title="Always stocked"
              description="Every machine reports its stock to us and is a short drive away, so it gets refilled before it runs dry."
              accent="mint"
            />
            <FeatureCard
              icon={<Wand2 size={22} />}
              title="You help pick the sets"
              description="We rotate in what collectors ask for. If a set is missing from your machine, tell us and we will look into it."
            />
            <FeatureCard
              icon={<MapPin size={22} />}
              title="More machines on the way"
              description="We keep adding spots across Lehigh and Northampton counties. Know a place that needs one? Tell us."
              accent="wave"
            />
          </div>
        </Section>

        <Section eyebrow="Come find us" title="There is probably a machine near you.">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-8 text-lg leading-relaxed text-white/75">
              Questions, set requests, or just want to show off a pull? Email{' '}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-bold text-bolt underline underline-offset-4"
              >
                {siteConfig.email}
              </a>
              . Curious how we handle the packs? Read{' '}
              <Link href="/authenticity" className="font-bold text-bolt underline underline-offset-4">
                our pack policy
              </Link>
              .
            </p>
            <CTA href="/locations">
              Find a Machine <ArrowRight size={16} />
            </CTA>
            <p className="mt-8 text-sm text-white/55">
              Own a business and want a machine?{' '}
              <Link href="/host-a-machine" className="font-bold text-bolt underline underline-offset-4">
                Host a machine
              </Link>
              .
            </p>
          </div>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
