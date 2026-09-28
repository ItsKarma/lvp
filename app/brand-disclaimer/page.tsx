import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/Section';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';

const title = 'Brand & Trademark Disclaimer';
const description = `Brand and trademark disclaimer for ${siteConfig.name} regarding third-party trademarks, brand names, and product references.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/brand-disclaimer' },
};

export default function BrandDisclaimerPage() {
  return (
    <>
      <SiteHeader />

      <main className="pt-20">
        <Section eyebrow="Legal" title="Brand & Trademark Disclaimer">
          <div className="card-surface mx-auto max-w-3xl space-y-6 p-7 leading-8 text-white/75 md:p-10">
            <p>
              {siteConfig.name} is an independently owned and operated vending business, a brand of{' '}
              {siteConfig.parentCompany}. We are not affiliated with, sponsored by, endorsed by, or an
              authorized agent or distributor of Nintendo, Creatures Inc., GAME FREAK inc., The
              Pokémon Company, or any of their affiliates.
            </p>

            <p>
              Pokémon and all associated names, characters, logos, and trademarks are the property of
              Nintendo, Creatures Inc., and GAME FREAK inc. References to Pokémon on this website are
              used solely to describe the retail products sold through our machines and do not imply
              any endorsement, partnership, or other formal relationship with the brand owner.
            </p>

            <p>
              All products sold through our machines are purchased through legitimate retail and
              wholesale channels and resold unopened, as originally packaged by the manufacturer. We
              do not alter, repackage, or guarantee the contents of any individual pack. Booster pack
              contents are randomized by the manufacturer at the time of production, and we make no
              representation or guarantee regarding the specific cards, rarities, or value contained
              within any pack.
            </p>

            <p>
              All trademarks, logos, and brand names referenced on this site remain the property of
              their respective owners. {siteConfig.name} claims no ownership interest in any
              third-party intellectual property.
            </p>

            <h2 className="display text-xl text-white">Not legal advice</h2>
            <p>
              Pages on this site that discuss Pennsylvania skill game regulation summarize publicly
              reported developments for general informational purposes. {siteConfig.name} is not a law
              firm and nothing on this site is legal advice. Consult your own attorney regarding your
              specific circumstances, contracts, and obligations.
            </p>

            <div className="border-t border-white/10 pt-6">
              <Link
                href="/"
                className="text-sm font-bold uppercase tracking-[0.12em] text-white/70 underline underline-offset-4 hover:text-white"
              >
                Return Home
              </Link>
            </div>
          </div>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
