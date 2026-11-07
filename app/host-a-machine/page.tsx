import Image from 'next/image';
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  BarChart3,
  CalendarCheck,
  Check,
  CreditCard,
  MapPin,
  Package,
  Plug,
  ShieldCheck,
  Sparkles,
  Undo2,
  Wrench,
} from 'lucide-react';
import CTA from '@/components/CTA';
import EarningsEstimator from '@/components/EarningsEstimator';
import FAQ from '@/components/FAQ';
import FeatureCard from '@/components/FeatureCard';
import HostLeadForm from '@/components/HostLeadForm';
import Section from '@/components/Section';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';

const weBring = [
  { icon: <Package size={20} />, title: 'The machine', description: 'Purchased, delivered, and mounted by us.' },
  { icon: <Banknote size={20} />, title: 'The inventory', description: 'Every pack in it is bought and owned by us.' },
  { icon: <Wrench size={20} />, title: 'The labor', description: 'Restocking, cleaning, repairs, and customer support.' },
  { icon: <BarChart3 size={20} />, title: 'The reporting', description: 'Monthly statements so your cut is never a guess.' },
  { icon: <CreditCard size={20} />, title: 'The payments', description: 'Tap, chip, swipe, and mobile wallet. No cash on site.' },
  { icon: <ShieldCheck size={20} />, title: 'The insurance', description: 'The machine is ours, insured by us, and our responsibility.' },
];

const youBring = [
  { icon: <MapPin size={20} />, title: 'A few square feet', description: 'Roughly 24" of wall, or floor space for a pedestal unit.' },
  { icon: <Plug size={20} />, title: 'A standard outlet', description: 'Normal 110v. No special wiring, no plumbing, no network drop needed.' },
  { icon: <CalendarCheck size={20} />, title: 'Your open hours', description: 'The machine earns whenever your doors are open. That is it.' },
];

const timeline = [
  { step: '01', title: 'You reach out', body: 'Thirty second form. Business type and rough foot traffic is enough to start.' },
  { step: '02', title: 'We qualify it', body: 'We look at your location and tell you honestly if the volume supports a machine. We say no when it is a no.' },
  { step: '03', title: 'We schedule install', body: 'Usually within a week or two of approval. On site time is under an hour and we work around your hours.' },
  { step: '04', title: 'It starts earning', body: 'We monitor sales remotely, restock before it runs dry, and send your payout monthly.' },
];

const stats = [
  { number: '$0', label: 'Your cost', detail: 'Machine, install, product, repairs, all ours.' },
  {
    number: `${siteConfig.revenueSharePercent}%`,
    label: 'Your cut',
    detail: 'Of gross sales, paid monthly, every month.',
  },
  { number: '0 hrs', label: 'Your work', detail: 'You never restock, fix, or staff anything.' },
];

const locationTypes = [
  'Bars & taverns',
  'Convenience stores',
  'Barbershops',
  'Pizza shops & delis',
  'Arcades',
  'Bowling alleys',
  'Gyms & rec centers',
  'Hotel lobbies',
];

const faqItems = [
  {
    question: 'What does this cost me?',
    answer:
      'Nothing. There is no purchase, no lease, no monthly fee, and no product to buy. We carry the entire cost of the machine and the inventory. You provide the wall space and the foot traffic.',
  },
  {
    question: 'How much space does it take?',
    answer:
      'Our wall-mounted unit is roughly 24" wide by 42" tall and 11" deep, about the footprint of a small poster. If wall mounting is not an option, we have a freestanding pedestal version.',
  },
  {
    question: 'How do I actually get paid?',
    answer: `You get ${siteConfig.revenueSharePercent}% of gross sales, calculated automatically from the machine's payment processing and paid monthly. You also get a statement showing units sold so the number is never a mystery.`,
  },
  {
    question: 'Do my employees have to do anything?',
    answer:
      'No. The machine is fully self-service and cashless. Your staff does not restock it, does not handle money, and does not troubleshoot it. If a customer has an issue, there is a support number right on the machine.',
  },
  {
    question: 'Is this gambling? Do I need a license?',
    answer:
      'No. This is straight retail. A customer pays a fixed price and receives a sealed trading card product, the same as buying it off a shelf at any store. There is no wager, no chance-based payout, and no cash prize. We are not attorneys and this is not legal advice, but a card machine is a vending sale, not a game of chance.',
  },
  {
    question: 'Are the packs legit?',
    answer:
      'Yes. Every pack is sealed, unopened, and purchased through reputable channels. We do not weigh packs, scan them, or pick through them. Read our full pack policy for exactly how we source.',
  },
  {
    question: 'What if it does not work out?',
    answer: `Try it for ${siteConfig.trialDays} days. If it is not earning or you just do not want it anymore, we remove it within 48 hours at no cost to you. There is no binding contract.`,
  },
  {
    question: 'Can I get more than one?',
    answer:
      'Yes. If you run multiple locations, we would rather do all of them at once. Mention it when you reach out.',
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

export default function HostPage() {
  return (
    <>
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main>
        <section className="relative overflow-hidden px-4 pb-14 pt-32 md:pb-20 md:pt-40">
          <div className="grid-texture pointer-events-none absolute inset-0 opacity-60" />
          <div className="pointer-events-none absolute -top-40 right-10 h-[420px] w-[420px] rounded-full bg-wave/25 blur-[140px]" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-bolt">
                The partner offer
              </p>
              <h1 className="display text-4xl leading-[1.05] md:text-6xl">
                We handle everything.{' '}
                <span className="text-gradient-bolt">You take {siteConfig.revenueSharePercent}%.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
                We provide the machine, the product, and all the upkeep. You have nothing to buy,
                stock, or fix. Just give us a small spot in your business and collect a check every
                month.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <CTA href="#apply">
                  Check My Location <ArrowRight size={16} />
                </CTA>
                <CTA href="/machines" variant="ghost">
                  See the machines
                </CTA>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[360px]">
              <div className="pointer-events-none absolute inset-0 animate-pulse-glow rounded-full bg-bolt/20 blur-3xl" />
              <Image
                src="/LVPVendingPokemonWall.png"
                alt="Pokémon card vending machine with a touchscreen and tap-to-pay reader"
                width={1024}
                height={1535}
                priority
                sizes="(min-width: 1024px) 360px, 80vw"
                className="relative w-full drop-shadow-2xl"
              />
            </div>
          </div>
        </section>

        <Section width="wide" className="!pt-0">
          <div className="grid gap-5 md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="card-surface p-8 text-center">
                <p className="display text-5xl text-bolt md:text-6xl">{stat.number}</p>
                <p className="display mt-3 text-lg text-white">{stat.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{stat.detail}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section panel eyebrow="The split" title="Who brings what" width="wide">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="display mb-5 text-xl text-bolt">We bring</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {weBring.map((item) => (
                  <FeatureCard key={item.title} {...item} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="display mb-5 text-xl text-wave">You bring</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {youBring.map((item) => (
                  <FeatureCard key={item.title} {...item} accent="wave" />
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section eyebrow="Why Pokémon" title="The biggest collectible on earth." width="wide">
          <div className="grid gap-5 md:grid-cols-3">
            <FeatureCard
              icon={<Sparkles size={22} />}
              title="Three generations of buyers"
              description="Kids want them. Teens trade them. Adults who collected in the 90s now have disposable income and buy for themselves and their kids."
            />
            <FeatureCard
              icon={<Banknote size={22} />}
              title="Perfect impulse price point"
              description="A pack costs about what a fancy coffee does. It is an easy yes at the counter, and the payoff feeling brings people back."
              accent="mint"
            />
            <FeatureCard
              icon={<BadgeCheck size={22} />}
              title="It pulls people in"
              description="Collectors actively hunt for machines and tell each other where they are. A machine is a reason to walk into your business specifically."
              accent="flare"
            />
          </div>

          <div className="card-surface mt-10 p-7 md:p-9">
            <p className="text-lg leading-relaxed text-white/80">
              Here is the part most owners miss: this is not just the{' '}
              {siteConfig.revenueSharePercent}% check. A card machine creates{' '}
              <strong className="text-white">new trips</strong> to your location. Somebody stopping
              in to grab a pack is somebody standing in your store, looking at everything else you
              sell. The vending revenue is the floor, not the ceiling.
            </p>
          </div>
        </Section>

        <Section
          panel
          eyebrow="Where these work"
          title="If people walk past a wall, that wall can pay rent."
          subtitle="We have a fit for almost any location with steady foot traffic and a few square feet to spare."
          width="wide"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {locationTypes.map((type) => (
              <span
                key={type}
                className="rounded-full border border-white/15 bg-ink px-5 py-2.5 text-sm font-semibold text-white/80"
              >
                {type}
              </span>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-white/55">
            Not on the list? Ask anyway. Some of our best performing spots were places nobody
            expected.
          </p>
        </Section>

        <Section eyebrow="Timeline" title="From first message to first payout" width="wide">
          <div className="grid gap-5 md:grid-cols-4">
            {timeline.map((item) => (
              <div key={item.step} className="card-surface p-6">
                <span className="display text-3xl text-bolt/40">{item.step}</span>
                <h3 className="display mt-3 text-lg text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{item.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section panel eyebrow="Your safety net" title={`${siteConfig.trialDays} days, and we mean it.`} width="wide">
          <div className="grid gap-5 md:grid-cols-3">
            <FeatureCard
              icon={<Undo2 size={22} />}
              title={`${siteConfig.trialDays}-day trial, free removal`}
              description={`Try it for ${siteConfig.trialDays} days. If it is not earning or you change your mind, say the word. We pull it out within 48 hours at no cost.`}
              accent="mint"
            />
            <FeatureCard
              icon={<BadgeCheck size={22} />}
              title="No binding contract"
              description="You are not signing a multi-year agreement to try this. The arrangement stays because it works, not because paperwork traps you."
              accent="mint"
            />
            <FeatureCard
              icon={<Check size={22} />}
              title="Nothing out of pocket. Ever."
              description="Not for install, not for product, not for repairs, not for removal. There is no scenario where this costs you money."
              accent="mint"
            />
          </div>
        </Section>

        <Section eyebrow="The math" title="What your wall could be earning">
          <EarningsEstimator />
        </Section>

        <Section panel eyebrow="Questions" title="The things owners always ask">
          <FAQ items={faqItems} />
        </Section>

        <Section id="apply" eyebrow="Apply" title="Let's see if your spot works.">
          <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-lg leading-relaxed text-white/75">
                We install a limited number of machines each month and we place them where they will
                actually perform. Tell us about your location and we will give you a straight answer.
              </p>
              <ul className="mt-7 space-y-3 text-white/75">
                {[
                  'Takes about 30 seconds',
                  'No cost and no obligation',
                  'Answer back within one business day',
                  'We are local, so you talk to an owner',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <BadgeCheck size={18} className="mt-0.5 shrink-0 text-bolt" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <HostLeadForm source="host-a-machine" />
          </div>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
