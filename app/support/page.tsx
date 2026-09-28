import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/Section';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';

const title = 'Support';
const description = `Support for ${siteConfig.name} customers and location partners.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/support' },
};

const subject = 'Lehigh Valley Pokemon Support Request';
const body = [
  'Hello,',
  '',
  'I need help with the following:',
  '',
  'Machine location:',
  'Date/time of the issue:',
  'What happened:',
  '',
  'Best way to reach me:',
  '',
  'Thank you.',
].join('\n');

const mailtoHref = `mailto:${siteConfig.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export default function SupportPage() {
  return (
    <>
      <SiteHeader />

      <main className="pt-20">
        <Section eyebrow="Support" title="Something wrong with a machine?">
          <div className="card-surface mx-auto max-w-2xl p-8 text-center md:p-10">
            <p className="leading-relaxed text-white/75">
              If a machine took your payment and did not dispense, or anything else went wrong, email
              us with as much detail as you can. Every transaction is logged, so we can look it up and
              make it right.
            </p>
            <a
              href={mailtoHref}
              className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-bolt px-6 py-4 text-sm font-bold uppercase tracking-[0.06em] text-ink transition-colors hover:bg-bolt-600"
            >
              Email Support
            </a>
            <p className="mt-5 text-sm text-white/55">
              Direct email:{' '}
              <span className="font-bold text-white">{siteConfig.supportEmail}</span>
            </p>
            <div className="mt-8 border-t border-white/10 pt-6">
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
