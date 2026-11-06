import type { Metadata } from 'next';
import { ArrowRight, BadgeCheck, Check, X } from 'lucide-react';
import CTA from '@/components/CTA';
import ReferralForm from '@/components/ReferralForm';
import Section from '@/components/Section';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { referralConfig, siteConfig } from '@/lib/site';

const money = (amount: number) => `$${amount.toLocaleString('en-US')}`;

const maxPayout = money(
  referralConfig.trialPayout + referralConfig.retentionBonus + referralConfig.salesBonus,
);

const trialPassed = `passes its ${siteConfig.trialDays}-day trial and both we and the location decide to keep it`;

const title = 'Referral Program';
const description = `Know a Lehigh Valley business that would be a great home for a Pokémon card vending machine? Refer it to ${siteConfig.name} and earn up to ${maxPayout} when the machine sticks.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/referral' },
  openGraph: { title, description, url: `${siteConfig.url}/referral` },
};

const steps = [
  {
    step: '01',
    title: 'Tell us about the spot',
    body: 'Fill out the form on this page with the business name, the address, and who runs it.',
  },
  {
    step: '02',
    title: 'Introduce us',
    body: 'Connect us with the owner or manager by name before we reach out, so it is clear you brought the lead in.',
  },
  {
    step: '03',
    title: 'Get paid',
    body: `You earn your first payout once the machine ${trialPassed}. Bonuses follow as the location hits each milestone.`,
  },
];

const payouts = [
  {
    milestone: `The machine ${trialPassed}`,
    amount: money(referralConfig.trialPayout),
  },
  {
    milestone: `The location is still active ${referralConfig.retentionDays} days after install`,
    amount: `+${money(referralConfig.retentionBonus)}`,
  },
  {
    milestone: `The location grosses over ${money(referralConfig.salesBonusThreshold)} in its first ${referralConfig.salesBonusDays} days`,
    amount: `+${money(referralConfig.salesBonus)}`,
  },
];

const greatFits = [
  'Barbershops',
  'Bowling alleys',
  'Trampoline parks',
  'Arcades',
  'Gyms',
  'Sports centers',
  'Family entertainment venues',
];

const rules = [
  {
    heading: 'New locations only.',
    body: 'Places we are already talking to do not count, and we decide whether a lead is new.',
  },
  {
    heading: 'Not your own business.',
    body: 'You cannot refer a business you own or manage.',
  },
  {
    heading: 'Introduce us first.',
    body: 'Introduce us to the owner or manager by name before we reach out, so it is clear who brought the lead in.',
  },
  {
    heading: 'Lehigh Valley area only.',
    body: 'Allentown, Bethlehem, Easton, and surrounding towns.',
  },
  {
    heading: 'No machine, no payout.',
    body: `Nothing is paid unless a machine is placed and passes its ${siteConfig.trialDays}-day trial.`,
  },
  {
    heading: 'Paid by milestone.',
    body: 'We pay after each milestone is reached.',
  },
  {
    heading: 'The program can change.',
    body: 'We can change or end the program at any time. Changes do not affect referrals already submitted.',
  },
];

export default function ReferralPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden px-4 pb-14 pt-32 text-center md:pb-20 md:pt-40">
          <div className="grid-texture pointer-events-none absolute inset-0 opacity-60" />
          <div className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-bolt/15 blur-[150px]" />

          <div className="relative mx-auto max-w-3xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-bolt">
              Referral program
            </p>
            <h1 className="display text-4xl leading-[1.05] md:text-6xl">
              Know a great spot?
              <br />
              <span className="text-gradient-bolt">Get paid for it.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              Point us to a Lehigh Valley business that would be a good home for a Pokémon card
              machine. If we place one there and it sticks, you can earn up to {maxPayout}. Vendors,
              business owners, friends, and customers are all welcome.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <CTA href="#refer">
                Refer a Location <ArrowRight size={16} />
              </CTA>
              <CTA href="#payouts" variant="ghost">
                See the payouts
              </CTA>
            </div>
          </div>
        </section>

        <Section panel eyebrow="How it works" title="Three steps to a payout" width="wide">
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((item) => (
              <div key={item.step} className="card-surface p-6">
                <span className="display text-3xl text-bolt/40">{item.step}</span>
                <h3 className="display mt-3 text-lg text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{item.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="payouts" eyebrow="The payouts" title="What you earn">
          <div className="card-surface mx-auto max-w-3xl overflow-hidden">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th
                    scope="col"
                    className="px-5 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white/45 md:px-7"
                  >
                    Milestone
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-5 py-4 text-right text-xs font-bold uppercase tracking-[0.16em] text-white/45 md:px-7"
                  >
                    You earn
                  </th>
                </tr>
              </thead>
              <tbody>
                {payouts.map((row) => (
                  <tr key={row.milestone} className="border-b border-white/10 last:border-b-0">
                    <th
                      scope="row"
                      className="px-5 py-4 align-middle text-[15px] font-normal leading-relaxed text-white/80 md:px-7"
                    >
                      {row.milestone}
                    </th>
                    <td className="display whitespace-nowrap px-5 py-4 text-right align-middle text-xl text-bolt md:px-7">
                      {row.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-white/55">
            Nothing is paid unless a machine is placed and passes its {siteConfig.trialDays}-day
            trial.
          </p>
        </Section>

        <Section
          panel
          eyebrow="Self check"
          title="What makes a great location"
          subtitle="Look for places where people wait or hang out, and where kids, families, and collectors come through."
        >
          <div className="flex flex-wrap justify-center gap-3">
            {greatFits.map((type) => (
              <span
                key={type}
                className="rounded-full border border-white/15 bg-ink px-5 py-2.5 text-sm font-semibold text-white/80"
              >
                {type}
              </span>
            ))}
          </div>
          <p className="mx-auto mt-8 flex max-w-xl items-start justify-center gap-2.5 text-sm leading-relaxed text-white/65">
            <X size={16} className="mt-0.5 shrink-0 text-flare" />
            <span>Not a great fit: places that already sell Pokémon cards.</span>
          </p>
        </Section>

        <Section eyebrow="The fine print" title="The rules, in plain English">
          <ul className="card-surface mx-auto max-w-3xl space-y-4 p-7 md:p-10">
            {rules.map((rule) => (
              <li key={rule.heading} className="flex items-start gap-3 leading-relaxed text-white/75">
                <Check size={18} className="mt-1 shrink-0 text-mint" />
                <span>
                  <strong className="text-white">{rule.heading}</strong> {rule.body}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="refer" panel eyebrow="Submit a referral" title="Send us the spot.">
          <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-lg leading-relaxed text-white/75">
                Tell us about the business and who runs it. We will check whether it is new to us and
                take it from there.
              </p>
              <ul className="mt-7 space-y-3 text-white/75">
                {[
                  'No cost to you or the owner',
                  'Answer back within one business day',
                  'We are local, so you talk to an owner',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <BadgeCheck size={18} className="mt-0.5 shrink-0 text-bolt" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-7 text-sm text-white/55">
                Questions about the program? Write us at{' '}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-bold text-bolt underline underline-offset-4"
                >
                  {siteConfig.email}
                </a>
                .
              </p>
            </div>
            <ReferralForm />
          </div>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
