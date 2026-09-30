import Image from 'next/image';
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  BarChart3,
  CalendarCheck,
  Check,
  MapPin,
  Package,
  Plug,
  Undo2,
  Wrench,
} from 'lucide-react';
import CTA from '@/components/CTA';
import EarningsEstimator from '@/components/EarningsEstimator';
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

export default function HostPage() {
  return (
    <>
      <SiteHeader />

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
                We take all the risk.{' '}
                <span className="text-gradient-bolt">You take {siteConfig.revenueSharePercent}%.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
                There is no catch buried in this. We buy the machine, we buy the product, we do the
                work, and we eat the loss if it flops. You lend us a patch of wall and collect a
                check every month.
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
                src="/LVPVendingPokemonClearBackground.png"
                alt="Pokémon card vending machine with a touchscreen and tap-to-pay reader"
                width={1024}
                height={1536}
                priority
                sizes="(min-width: 1024px) 360px, 80vw"
                className="relative w-full drop-shadow-2xl"
              />
            </div>
          </div>
        </section>

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

        <Section id="apply" panel eyebrow="Apply" title="Let's see if your spot works.">
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
            <HostLeadForm source="host-a-machine" skillGameContext />
          </div>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
