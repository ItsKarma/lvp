import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  BatteryCharging,
  CalendarClock,
  CreditCard,
  Handshake,
  MapPin,
  Package,
  Ruler,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react';
import CTA from '@/components/CTA';
import Countdown from '@/components/Countdown';
import EarningsEstimator from '@/components/EarningsEstimator';
import FAQ from '@/components/FAQ';
import FeatureCard from '@/components/FeatureCard';
import HostLeadForm from '@/components/HostLeadForm';
import Section from '@/components/Section';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';

const steps = [
  {
    icon: <MapPin size={22} />,
    title: '1. We look at your spot',
    description:
      'Tell us what kind of business you run and roughly how many people walk through. We tell you straight whether the numbers work. No pitch, no pressure.',
  },
  {
    icon: <Wrench size={22} />,
    title: '2. We install it free',
    description:
      'We buy the machine, deliver it, mount it, and plug it in. It needs a wall or a few square feet and a standard outlet. Install takes under an hour.',
  },
  {
    icon: <Banknote size={22} />,
    title: '3. You get paid monthly',
    description: `We stock it, service it, and handle every dollar. You get ${siteConfig.revenueSharePercent}% of gross sales, paid every month, with a sales report so you can see exactly where it came from.`,
  },
];

const handled = [
  { icon: <Package size={20} />, title: 'Inventory', description: 'We buy every pack. You never front a dollar of product.' },
  { icon: <BatteryCharging size={20} />, title: 'Restocking', description: 'Remote monitoring tells us when to come. It never sits empty.' },
  { icon: <Wrench size={20} />, title: 'Repairs', description: 'Anything breaks, we fix it. Your staff never touches the machine.' },
  { icon: <CreditCard size={20} />, title: 'Payments', description: 'Cashless card and mobile wallet. No cash box, no skimming risk.' },
  { icon: <ShieldCheck size={20} />, title: 'Insurance & liability', description: 'The machine is ours, insured by us, and our responsibility.' },
  { icon: <Handshake size={20} />, title: 'Removal', description: `Not working after ${siteConfig.trialDays} days? We pull it out free, no hard feelings.` },
];

const locationTypes = [
  'Bars & taverns',
  'Convenience stores',
  'Laundromats',
  'Barbershops',
  'Pizza shops & delis',
  'Smoke & vape shops',
  'Arcades',
  'Bowling alleys',
  'Car washes',
  'Gyms & rec centers',
  'Hobby & game shops',
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
    answer:
      `Try it for ${siteConfig.trialDays} days. If it is not earning or you just do not want it anymore, we remove it within 48 hours at no cost to you. There is no binding contract.`,
  },
  {
    question: 'Can I get more than one?',
    answer:
      'Yes. If you run multiple locations, we would rather do all of them at once. Mention it when you reach out.',
  },
];

export default function HomePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

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
                Serving the Lehigh Valley
              </p>
              <h1 className="display text-4xl leading-[1.05] md:text-6xl">
                Let the unused space in your business{' '}
                <span className="text-gradient-bolt">generate revenue.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
                We put a Pokémon card vending machine in your location for free. We buy it, stock it,
                service it, and insure it. You earn{' '}
                <strong className="font-bold text-white">
                  {siteConfig.revenueSharePercent}% of every single sale
                </strong>{' '}
                for doing absolutely nothing.
              </p>
            </div>

            {/* Sits between the pitch and the CTA on mobile so ad traffic sees the product immediately. */}
            <div className="relative mx-auto w-full max-w-[440px] animate-fade-up lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
              <div className="pointer-events-none absolute -inset-8 animate-pulse-glow rounded-[48px] bg-bolt/20 blur-3xl" />
              <div className="relative aspect-5/4 overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] lg:aspect-4/5">
                <Image
                  src="/LVPVendingPokemonMachine2.png"
                  alt="Pokémon card vending machine mounted on a convenience store wall beside the lottery machines"
                  fill
                  priority
                  sizes="(min-width: 1024px) 440px, 92vw"
                  className="object-cover object-[62%_26%] lg:object-center"
                />
              </div>
            </div>

            <div className="animate-fade-up lg:col-start-1 lg:row-start-2 lg:self-start">
              <div className="flex flex-col gap-3 sm:flex-row">
                <CTA href="/host-a-machine#apply">
                  See If My Location Qualifies <ArrowRight size={16} />
                </CTA>
                <CTA href="/skill-games" variant="ghost">
                  Replacing skill games?
                </CTA>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-white/60">
                <span>$0 to install</span>
                <span>$0 monthly</span>
                <span>No contract</span>
                <span>Locally owned</span>
              </div>
            </div>
          </div>
        </section>

        {/* Skill game urgency band */}
        <section className="border-y border-flare/30 bg-flare/10 px-4 py-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-start gap-4">
              <CalendarClock size={28} className="mt-1 shrink-0 text-flare" />
              <div>
                <p className="display text-lg text-white md:text-xl">
                  Had skill games? Pennsylvania's grace period ends{' '}
                  {siteConfig.skillGameDeadlineLabel}.
                </p>
                <Link
                  href="/skill-games"
                  className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-flare underline underline-offset-4"
                >
                  See how to replace that revenue <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <Countdown target={siteConfig.skillGameDeadline} compact />
          </div>
        </section>

        {/* The numbers */}
        <Section width="wide">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { number: '$0', label: 'Your cost', detail: 'Machine, install, product, repairs, all ours.' },
              {
                number: `${siteConfig.revenueSharePercent}%`,
                label: 'Your cut',
                detail: 'Of gross sales, paid monthly, every month.',
              },
              { number: '0 hrs', label: 'Your work', detail: 'You never restock, fix, or staff anything.' },
            ].map((stat) => (
              <div key={stat.label} className="card-surface p-8 text-center">
                <p className="display text-5xl text-bolt md:text-6xl">{stat.number}</p>
                <p className="display mt-3 text-lg text-white">{stat.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{stat.detail}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* How it works */}
        <Section
          id="how-it-works"
          panel
          eyebrow="How it works"
          title="Three steps. One of them is yours."
          subtitle="This is the least complicated money your business will make this year."
          width="wide"
        >
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <FeatureCard key={step.title} {...step} accent="wave" />
            ))}
          </div>
          <div className="mt-10 text-center">
            <CTA href="/host-a-machine">
              See the full partner offer <ArrowRight size={16} />
            </CTA>
          </div>
        </Section>

        {/* Why Pokemon */}
        <Section
          eyebrow="Why Pokémon"
          title="It is not a fad. It is the biggest collectible on earth."
          width="wide"
        >
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

        {/* Who it works for */}
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

        {/* Estimator */}
        <Section eyebrow="The math" title="What could this actually pay?">
          <EarningsEstimator />
        </Section>

        {/* We handle everything */}
        <Section
          panel
          eyebrow="Zero hassle"
          title="Everything on this list is our problem, not yours."
          width="wide"
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {handled.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </Section>

        {/* Trust */}
        <Section eyebrow="Straight dealing" title="We sell packs the right way." width="wide">
          <div className="grid gap-5 md:grid-cols-2">
            <FeatureCard
              icon={<ShieldCheck size={22} />}
              title="No weighing. No scanning. No picking."
              description="We never try to identify what is inside a pack before it sells. Customers get a real, untouched chance at a good pull, which is the entire point."
              accent="mint"
            />
            <FeatureCard
              icon={<Ruler size={22} />}
              title="Sealed product from reputable sources"
              description="We buy sealed booster boxes and bundles from reputable shops and distributors. No marketplace loose packs, no shelf-clearing, no mystery history."
              accent="mint"
            />
          </div>
          <div className="mt-8 text-center">
            <CTA href="/authenticity" variant="ghost">
              Read our full pack policy
            </CTA>
          </div>
        </Section>

        {/* FAQ */}
        <Section panel eyebrow="Questions" title="The things owners always ask">
          <FAQ items={faqItems} />
        </Section>

        {/* Final CTA */}
        <Section id="apply" eyebrow="Next step" title="Find out if your location qualifies.">
          <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-lg leading-relaxed text-white/75">
                Takes about 30 seconds. We will look at your location, tell you honestly whether the
                foot traffic supports a machine, and if it does, walk you through the install.
              </p>
              <ul className="mt-7 space-y-3 text-white/75">
                {[
                  'No cost and no obligation to ask',
                  'Answer back within one business day',
                  'We tell you no if it is not a fit',
                  `${siteConfig.trialDays}-day risk-free trial if it is`,
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <BadgeCheck size={18} className="mt-0.5 shrink-0 text-bolt" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <HostLeadForm source="home" />
          </div>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
