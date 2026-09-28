import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/Section';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';

const title = 'Privacy Policy';
const description = `Privacy policy for ${siteConfig.name} covering data collection, analytics, and advertising practices.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />

      <main className="pt-20">
        <Section eyebrow="Legal" title="Privacy Policy">
          <div className="card-surface mx-auto max-w-3xl space-y-6 p-7 leading-8 text-white/75 md:p-10">
            <p>
              {siteConfig.name} ("we", "us"), a brand operated by {siteConfig.parentCompany},
              respects your privacy. This policy explains what information we collect through this
              website and how it is used.
            </p>

            <h2 className="display text-xl text-white">Information we collect</h2>
            <p>
              When you submit a form on this site, we collect the information you provide, such as
              your name, business name, email address, phone number, and details about your location.
              We use this only to respond to your inquiry and evaluate whether your location is a fit.
            </p>
            <p>
              We also collect standard usage data such as pages visited, general location at the city
              or region level, device type, and how you interact with the site. We do not collect
              payment information through this website, and we do not knowingly collect personal
              information from children.
            </p>

            <h2 className="display text-xl text-white">Analytics and advertising</h2>
            <p>
              We use Vercel Analytics, Google Analytics (GA4), and the Meta Pixel to measure site
              performance and the results of our advertising on Facebook and Instagram. These tools
              use cookies and similar identifiers to understand how visitors arrive at and use the
              site, and to show relevant ads to people who have previously visited (remarketing).
            </p>
            <p>
              You can learn more about how Meta uses this data at{' '}
              <a
                href="https://www.facebook.com/privacy/policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bolt underline underline-offset-4"
              >
                facebook.com/privacy/policy
              </a>{' '}
              and how Google uses it at{' '}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bolt underline underline-offset-4"
              >
                policies.google.com/technologies/partner-sites
              </a>
              .
            </p>

            <h2 className="display text-xl text-white">Your choices</h2>
            <p>
              You can opt out of personalized advertising through your{' '}
              <a
                href="https://www.facebook.com/adpreferences"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bolt underline underline-offset-4"
              >
                Meta ad preferences
              </a>{' '}
              and{' '}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bolt underline underline-offset-4"
              >
                Google Ads settings
              </a>
              , or by adjusting your browser's cookie and tracking preferences. Most browsers let you
              block or clear cookies at any time.
            </p>

            <h2 className="display text-xl text-white">Sharing</h2>
            <p>
              We do not sell your personal information. Form submissions are processed by our form
              provider and delivered to us by email. We share information only with service providers
              who help us operate this site, or where required by law.
            </p>

            <h2 className="display text-xl text-white">Contact</h2>
            <p>
              Questions about this policy can be sent to{' '}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-bolt underline underline-offset-4"
              >
                {siteConfig.email}
              </a>
              .
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
