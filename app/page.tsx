import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  Hand,
  MousePointerClick,
  Sparkles,
  Store,
} from 'lucide-react';
import CTA from '@/components/CTA';
import FAQ from '@/components/FAQ';
import FeatureCard from '@/components/FeatureCard';
import LocationList from '@/components/LocationList';
import Section from '@/components/Section';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { machineLocations } from '@/lib/locations';
import { siteConfig } from '@/lib/site';

const buySteps = [
  {
    icon: <MousePointerClick size={22} />,
    title: '1. Pick your pack',
    description: 'Browse what is in the machine on the screen and choose the set you want.',
  },
  {
    icon: <CreditCard size={22} />,
    title: '2. Tap to pay',
    description: 'Tap, insert, or swipe a card, or pay with your phone. The machines are cashless.',
  },
  {
    icon: <Hand size={22} />,
    title: '3. Grab it and rip',
    description: 'Your pack drops right out. Open it on the spot or take it home sealed.',
  },
];

const faqItems = [
  {
    question: 'Are the packs real and sealed?',
    answer:
      'Yes. Every pack comes out of sealed booster boxes and bundles bought from reputable shops and distributors. We never weigh, scan, or search packs, so whatever is inside is whatever the manufacturer put there.',
  },
  {
    question: 'How do I pay?',
    answer:
      'Tap, chip, swipe, or pay with your phone. The machines do not take cash.',
  },
  {
    question: 'The machine took my payment but nothing came out. What now?',
    answer: `Email ${siteConfig.supportEmail} with the machine location and roughly when it happened. Every transaction is logged, so we can look it up and make it right.`,
  },
  {
    question: 'Which sets are in the machines?',
    answer:
      'We keep current sets stocked and rotate in what collectors ask for, so the selection changes. If a machine near you is missing something you want, let us know.',
  },
  {
    question: 'How often are machines restocked?',
    answer:
      'Every machine reports its stock to us, so we refill it before it runs dry. We are local, so a restock is a short drive, not a shipment.',
  },
  {
    question: 'Can you put a machine near me?',
    answer:
      'Tell us the business you have in mind and we will reach out to them. Hosting costs the business nothing, so it is an easy conversation.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-4 pb-16 pt-32 md:pb-24 md:pt-40">
          <div className="grid-texture pointer-events-none absolute inset-0 opacity-60" />
          <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-wave/25 blur-[140px]" />
          <div className="pointer-events-none absolute -bottom-32 right-0 h-[380px] w-[380px] rounded-full bg-bolt/15 blur-[130px]" />

          <div className="relative mx-auto grid max-w-6xl gap-x-12 gap-y-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="animate-fade-up lg:col-start-1 lg:row-start-1 lg:self-end">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-bolt/40 bg-bolt/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-bolt">
                <Sparkles size={14} />
                Pokémon card vending in the Lehigh Valley
              </p>
              <h1 className="display text-4xl leading-[1.05] md:text-6xl">
                Fresh Pokémon packs,{' '}
                <span className="text-gradient-bolt">right around the corner.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
                Sealed booster packs in vending machines across the Lehigh Valley. Walk up, pick a
                pack, tap to pay, and rip it right there.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-[440px] animate-fade-up lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
              <div className="pointer-events-none absolute -inset-8 animate-pulse-glow rounded-[48px] bg-bolt/20 blur-3xl" />
              <div className="relative aspect-5/4 overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] lg:aspect-4/5">
                <Image
                  src="/LVPVendingPokemonMachine2.png"
                  alt="Lehigh Valley Pokémon card vending machine on a store wall"
                  fill
                  priority
                  sizes="(min-width: 1024px) 440px, 92vw"
                  className="object-cover object-[62%_26%] lg:object-center"
                />
              </div>
            </div>

            <div className="animate-fade-up lg:col-start-1 lg:row-start-2 lg:self-start">
              <div className="flex flex-col gap-3 sm:flex-row">
                <CTA href="#machines">
                  Find a Machine <ArrowRight size={16} />
                </CTA>
                <CTA href="/authenticity" variant="ghost">
                  Our pack policy
                </CTA>
              </div>
            </div>
          </div>
        </section>

        {/* Machines */}
        <Section
          id="machines"
          panel
          eyebrow="Find a machine"
          title={`${machineLocations.length} machines and counting.`}
          subtitle="Tap a location for photos, a map, and directions."
          width="wide"
        >
          <LocationList headingLevel="h3" />
          <p className="mx-auto mt-10 max-w-xl text-center leading-relaxed text-white/60">
            More machines are going in across Lehigh and Northampton counties.
          </p>
        </Section>

        {/* How buying works */}
        <Section eyebrow="How it works" title="Three steps to a fresh pack." width="wide">
          <div className="grid gap-5 md:grid-cols-3">
            {buySteps.map((step) => (
              <FeatureCard key={step.title} {...step} accent="wave" />
            ))}
          </div>
        </Section>

        {/* Pack promise */}
        <Section panel eyebrow="Straight dealing" title="We want you to pull the hits.">
          <div className="card-surface mx-auto max-w-3xl p-7 text-center md:p-10">
            <p className="text-lg leading-relaxed text-white/80">
              A great pull is the best thing that can happen at one of our machines. You have fun,
              you show your friends, and you come back for the next pack. That is the whole business,
              so every pack goes in exactly as it came out of a sealed box.
            </p>
          </div>
          <div className="mt-8 text-center">
            <CTA href="/authenticity" variant="ghost">
              Read our full pack policy
            </CTA>
          </div>
        </Section>

        {/* FAQ */}
        <Section eyebrow="Questions" title="Before you head out">
          <FAQ items={faqItems} />
          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-white/55">
            Problem with a machine?{' '}
            <Link href="/support" className="font-bold text-bolt underline underline-offset-4">
              Get support
            </Link>
            .
          </p>
        </Section>

        {/* Businesses */}
        <Section panel width="wide">
          <div className="card-surface mx-auto flex max-w-4xl flex-col items-center gap-6 p-8 text-center md:flex-row md:p-10 md:text-left">
            <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-bolt/15 text-bolt">
              <Store size={26} />
            </span>
            <div className="flex-1">
              <h2 className="display text-2xl text-white md:text-3xl">Own a business?</h2>
              <p className="mt-2 leading-relaxed text-white/70">
                We install a machine at no cost, keep it stocked, and pay you{' '}
                {siteConfig.revenueSharePercent}% of every sale.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3">
              <CTA href="/host-a-machine">
                Host a Machine <ArrowRight size={16} />
              </CTA>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-white/65 hover:text-white"
              >
                <BadgeCheck size={15} className="text-bolt" />
                Or suggest a spot near you
              </Link>
            </div>
          </div>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
