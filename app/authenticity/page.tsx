import type { Metadata } from 'next';
import { BadgeCheck, PackageCheck, ShieldCheck, Store } from 'lucide-react';
import CTA from '@/components/CTA';
import FeatureCard from '@/components/FeatureCard';
import Section from '@/components/Section';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';

const title = 'Our Pack Policy';
const description =
  'How Lehigh Valley Pokémon sources trading card packs: sealed product from reputable sources, no pack weighing, no scanning, no searching.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/authenticity' },
  openGraph: { title, description, url: `${siteConfig.url}/authenticity` },
};

export default function AuthenticityPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden px-4 pb-12 pt-32 text-center md:pt-40">
          <div className="grid-texture pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative mx-auto max-w-3xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-bolt">
              Trust policy
            </p>
            <h1 className="display text-4xl leading-[1.05] md:text-6xl">
              We do not touch the packs.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              Every machine in the valley runs on trust. Here is exactly how we source and handle
              product, in plain language, so you never have to wonder.
            </p>
          </div>
        </section>

        <Section width="wide">
          <div className="grid gap-5 md:grid-cols-2">
            <FeatureCard
              icon={<BadgeCheck size={22} />}
              title="No weighing or pack scanning"
              description="We do not weigh individual packs or use scans, lights, or any other method to guess what is inside before it sells. Not for inventory decisions, not for anything."
              accent="mint"
            />
            <FeatureCard
              icon={<PackageCheck size={22} />}
              title="Packs come from sealed product"
              description="Our packs come out of sealed booster boxes and bundles. That keeps a clean chain from factory-sealed product straight to machine inventory."
              accent="mint"
            />
            <FeatureCard
              icon={<Store size={22} />}
              title="Reputable sources only"
              description="We buy sealed product from reputable shops and distributors. No loose marketplace packs, no backdoor deals, no camping restocks and clearing shelves that local kids were counting on."
              accent="mint"
            />
            <FeatureCard
              icon={<ShieldCheck size={22} />}
              title="Unopened and unaltered"
              description="Packs are sold exactly as the manufacturer packaged them. We do not open, repackage, or make any claim about what is inside. Contents are randomized at the factory."
              accent="mint"
            />
          </div>
        </Section>

        <Section panel eyebrow="Why we bother" title="Because the pull is the whole product.">
          <div className="card-surface mx-auto max-w-3xl p-7 text-center md:p-10">
            <p className="text-lg leading-relaxed text-white/80">
              Searched packs ruin the only thing that makes this fun. A customer who gets burned once
              never buys from a machine again, and they tell everyone. The long game for us is simple:
              people trust the machines, enjoy what they pull, and come back. That only works if we
              are boring and honest about sourcing.
            </p>
            <div className="mt-8">
              <CTA href="/find-a-machine" variant="ghost">
                Find a machine near you
              </CTA>
            </div>
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-white/45">
            {siteConfig.name} makes no representation or guarantee regarding the specific cards,
            rarities, or resale value contained in any individual pack.
          </p>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
