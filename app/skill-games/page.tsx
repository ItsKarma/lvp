import {
  AlertTriangle,
  ArrowRight,
  Banknote,
  Check,
  Clock,
  Gavel,
  Scale,
  ShieldCheck,
  Truck,
  Users,
  X,
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

const comparison: { label: string; skill: string; cards: string }[] = [
  {
    label: 'Legal standing in PA',
    skill: 'Unlicensed machines ruled to function as illegal slot machines',
    cards: 'A retail sale of a sealed product, the same as a candy machine',
  },
  { label: 'Deadline hanging over it', skill: siteConfig.skillGameDeadlineLabel, cards: 'None' },
  { label: 'Permits or licensing', skill: 'Contested, evolving, and expensive to get wrong', cards: 'None needed for retail vending' },
  { label: 'Who can legally use it', skill: 'Adults only, and you have to police it', cards: 'Everyone who walks in the door' },
  { label: 'Cash on site', skill: 'Cash box to empty, count, secure, and defend', cards: 'Fully cashless, nothing to steal' },
  { label: 'Your upfront cost', skill: 'Depends entirely on your operator agreement', cards: '$0. We buy the machine and the product' },
  { label: 'Your ongoing work', skill: 'Payout disputes, jams, cash runs, customer friction', cards: 'None. We stock and service everything' },
  { label: 'Floor space needed', skill: 'A full cabinet plus a chair', cards: 'A 24" x 42" patch of wall' },
  { label: 'How it looks to your community', skill: 'Complicated conversation', cards: 'A trading card machine kids get excited about' },
  { label: 'What you take home', skill: 'A negotiated split, if the machine stays legal', cards: `${siteConfig.revenueSharePercent}% of gross sales, paid monthly` },
];

const timeline = [
  {
    icon: <Gavel size={20} />,
    heading: 'The ruling',
    body: 'The Pennsylvania Supreme Court ruled that unlicensed skill games function as illegal slot machines under state law. That is not a proposal or a pending bill. It is the current reading of the law.',
  },
  {
    icon: <Clock size={20} />,
    heading: 'The grace period',
    body: `The court allowed a 120-day grace period. ${siteConfig.skillGameDeadlineLabel} is the final day of it. After that, the machines are exposed.`,
  },
  {
    icon: <Truck size={20} />,
    heading: 'The gap',
    body: 'Whatever that cabinet was contributing to your monthly numbers disappears on the same day, and the floor space it occupied goes back to earning nothing.',
  },
];

const faqItems = [
  {
    question: 'Is a Pokémon card machine legally different from a skill game?',
    answer:
      'Yes, fundamentally. A skill game takes a wager and can pay out cash. A card machine is a vending sale: a customer pays a fixed retail price and receives a sealed product worth what it is worth, exactly like buying it off a shelf. There is no wager, no payout, and no chance-based prize. We are not attorneys and nothing here is legal advice, but the distinction is the difference between gaming and retail.',
  },
  {
    question: 'But is it not still random what is in the pack?',
    answer:
      'Randomized contents are a property of the product itself, set by the manufacturer, the same as any sealed trading card pack sold in every big box store and hobby shop in Pennsylvania. The customer pays retail price and receives retail product. The machine does not pay anyone anything.',
  },
  {
    question: 'Do I need a license or permit for this?',
    answer:
      'Retail vending does not require a gaming license. Your local rules on machines in a business vary, and we will work with whatever your municipality requires, but this is the same category as a snack or drink machine.',
  },
  {
    question: 'How fast can you get a machine in?',
    answer:
      'Once we confirm your location is a fit, we can typically schedule installation within a week or two. Install itself takes under an hour. If you are removing skill games, we can often time our install to the week they come out so the corner is never dead.',
  },
  {
    question: 'What if my skill game operator disputes the removal?',
    answer:
      'That is between you and them, and you should read your agreement. We do not touch or remove anyone else\'s equipment. We just show up with ours when you are ready.',
  },
  {
    question: 'Will this replace all of the skill game revenue?',
    answer:
      'We are not going to insult you by promising that. A card machine is a different animal with a different ceiling. What it does is turn dead square footage into recurring income with zero cost, zero labor, and zero legal gray area, and for a lot of locations it brings in a customer the skill games never did.',
  },
  {
    question: 'What if it does not work in my spot?',
    answer:
      'Sixty days, risk free. If it is not earning, we pull it out within 48 hours at no cost to you. There is no contract locking you in.',
  },
];

export default function SkillGamesPage() {
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
        <section className="relative overflow-hidden px-4 pb-16 pt-32 md:pb-20 md:pt-40">
          <div className="grid-texture pointer-events-none absolute inset-0 opacity-60" />
          <div className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-flare/25 blur-[150px]" />

          <div className="relative mx-auto max-w-4xl text-center">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-flare/50 bg-flare/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-flare">
              <AlertTriangle size={14} />
              Pennsylvania skill game deadline
            </p>
            <h1 className="display text-4xl leading-[1.05] md:text-6xl">
              Your skill games have a deadline.{' '}
              <span className="text-gradient-bolt">Your revenue doesn't have to.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              When the machines come out, that corner stops earning. We will fill it with a Pokémon
              card vending machine at no cost to you, stock it, service it, and pay you{' '}
              {siteConfig.revenueSharePercent}% of every sale. No license. No cash box. No gray area.
            </p>

            <div className="mt-10">
              <Countdown
                target={siteConfig.skillGameDeadline}
                label={`Grace period ends ${siteConfig.skillGameDeadlineLabel}`}
              />
            </div>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <CTA href="#apply">
                Claim My Install Slot <ArrowRight size={16} />
              </CTA>
              <CTA href="#compare" variant="ghost">
                Compare side by side
              </CTA>
            </div>
          </div>
        </section>

        {/* What happened */}
        <Section
          panel
          eyebrow="Where things stand"
          title="The short version, without the legalese."
          width="wide"
        >
          <div className="grid gap-5 md:grid-cols-3">
            {timeline.map((item) => (
              <FeatureCard
                key={item.heading}
                icon={item.icon}
                title={item.heading}
                description={item.body}
                accent="flare"
              />
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl rounded-xl border border-white/10 bg-ink px-6 py-4 text-center text-sm leading-relaxed text-white/55">
            This page summarizes publicly reported developments for business owners weighing their
            options. {siteConfig.name} is not a law firm and none of this is legal advice. Talk to
            your attorney about your specific situation and your operator agreement.
          </p>
        </Section>

        {/* The pivot */}
        <Section eyebrow="The opportunity" title="Every owner in the valley is about to have the same empty corner.">
          <div className="card-surface p-7 md:p-10">
            <p className="text-lg leading-relaxed text-white/80">
              Here is the honest read. Thousands of Pennsylvania businesses are losing a revenue line
              on the same day. Most of them will do nothing, leave the space empty, and just absorb
              the hit.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-white/80">
              The ones who move first replace that income with something that has{' '}
              <strong className="text-white">no deadline attached to it.</strong> A card machine is
              not a workaround or a loophole. It is a completely different business: retail vending,
              the same legal category as the drink cooler behind your counter.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-white/80">
              We install a limited number of machines per month and we are booking around{' '}
              {siteConfig.skillGameDeadlineLabel} now. Getting in line early is free.
            </p>
          </div>
        </Section>

        {/* Comparison */}
        <Section
          id="compare"
          panel
          eyebrow="Side by side"
          title="Same wall. Very different situation."
          width="wide"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-separate border-spacing-0 text-left">
              <thead>
                <tr>
                  <th className="w-1/4 px-5 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white/45">
                    &nbsp;
                  </th>
                  <th className="w-[37.5%] rounded-t-xl border border-b-0 border-white/10 bg-ink px-5 py-4">
                    <span className="display text-base text-white/70">Unlicensed skill game</span>
                  </th>
                  <th className="w-[37.5%] rounded-t-xl border border-b-0 border-bolt/40 bg-bolt/10 px-5 py-4">
                    <span className="display text-base text-bolt">Pokémon card machine</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, index) => {
                  const isLast = index === comparison.length - 1;
                  return (
                    <tr key={row.label}>
                      <th
                        scope="row"
                        className="px-5 py-4 align-top text-sm font-bold text-white/65"
                      >
                        {row.label}
                      </th>
                      <td
                        className={`border-x border-t border-white/10 bg-ink px-5 py-4 align-top text-sm text-white/65 ${
                          isLast ? 'rounded-b-xl border-b' : ''
                        }`}
                      >
                        <span className="flex gap-2.5">
                          <X size={16} className="mt-0.5 shrink-0 text-flare" />
                          {row.skill}
                        </span>
                      </td>
                      <td
                        className={`border-x border-t border-bolt/40 bg-bolt/10 px-5 py-4 align-top text-sm text-white ${
                          isLast ? 'rounded-b-xl border-b' : ''
                        }`}
                      >
                        <span className="flex gap-2.5">
                          <Check size={16} className="mt-0.5 shrink-0 text-mint" />
                          {row.cards}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Why it is the natural swap */}
        <Section eyebrow="Why this swap works" title="It fits the exact hole the cabinet leaves." width="wide">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Scale size={22} />}
              title="No license required"
              description="Retail vending, not gaming. Nothing to apply for, nothing to renew, nothing to defend."
              accent="mint"
            />
            <FeatureCard
              icon={<Banknote size={22} />}
              title="Recurring, not one-time"
              description={`${siteConfig.revenueSharePercent}% of gross sales every month, with a statement showing exactly what sold.`}
            />
            <FeatureCard
              icon={<Users size={22} />}
              title="A wider customer"
              description="Kids, parents, teens, and adult collectors. Not restricted by age, and it brings families in the door."
              accent="wave"
            />
            <FeatureCard
              icon={<ShieldCheck size={22} />}
              title="Zero liability for you"
              description="We own it, insure it, stock it, and repair it. Your staff never touches it and never handles cash."
              accent="mint"
            />
          </div>
        </Section>

        {/* Estimator */}
        <Section panel eyebrow="Run the numbers" title="What the corner could be worth instead.">
          <EarningsEstimator />
        </Section>

        {/* FAQ */}
        <Section eyebrow="Straight answers" title="What skill game locations ask us first">
          <FAQ items={faqItems} />
        </Section>

        {/* CTA */}
        <Section
          id="apply"
          panel
          eyebrow={`Booking around ${siteConfig.skillGameDeadlineLabel}`}
          title="Get your replacement lined up before the deadline."
        >
          <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-lg leading-relaxed text-white/75">
                Tell us about your location and we will tell you honestly whether a card machine
                works there. If it does, we will schedule the install so the space never sits empty.
              </p>
              <div className="mt-8">
                <Countdown target={siteConfig.skillGameDeadline} compact label="Time remaining" />
              </div>
              <ul className="mt-8 space-y-3 text-white/75">
                {[
                  'No cost, no lease, no contract',
                  'We can time the install to your removal',
                  '60 day risk-free trial',
                  'Answer back within one business day',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <Check size={18} className="mt-0.5 shrink-0 text-mint" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <HostLeadForm
              source="skill-games"
              skillGameContext
              submitLabel="Claim My Install Slot"
            />
          </div>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
