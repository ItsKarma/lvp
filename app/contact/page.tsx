import type { Metadata } from 'next';
import { Mail } from 'lucide-react';
import HostLeadForm from '@/components/HostLeadForm';
import Section from '@/components/Section';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';

const title = 'Contact';
const description = `Get in touch with ${siteConfig.name} about hosting a Pokémon card vending machine, suggesting a location, or anything else.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/contact' },
  openGraph: { title, description, url: `${siteConfig.url}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden px-4 pb-12 pt-32 text-center md:pt-40">
          <div className="grid-texture pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative mx-auto max-w-3xl">
            <h1 className="display text-4xl leading-[1.05] md:text-6xl">
              Talk to an <span className="text-gradient-bolt">actual owner.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              Use the form and we will respond within one business day. Prefer email? Write us at{' '}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-bold text-bolt underline underline-offset-4"
              >
                {siteConfig.email}
              </a>
              .
            </p>
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-white/55">
              <Mail size={16} className="text-bolt" />
              Machine already installed and having an issue? Use our support page.
            </p>
          </div>
        </section>

        <Section>
          <div className="mx-auto max-w-2xl">
            <HostLeadForm source="contact" skillGameContext submitLabel="Send It Over" />
          </div>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
