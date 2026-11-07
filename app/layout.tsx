import type { Metadata } from 'next';
import { Geist, Outfit } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import GoogleAdsTag from '@/components/GoogleAdsTag';
import MetaPixel from '@/components/MetaPixel';
import { siteConfig } from '@/lib/site';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const outfit = Outfit({ variable: '--font-outfit', subsets: ['latin'], weight: ['600', '700', '800'] });

const title = 'Pokémon Card Vending Machines in the Lehigh Valley';
const description =
  'Sealed Pokémon booster packs from vending machines across the Lehigh Valley. Walk up, pick a pack, tap to pay, and rip it right there. Find a machine near you.';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description,
  applicationName: siteConfig.name,
  keywords: [
    'Lehigh Valley Pokemon',
    'Pokemon card vending machine',
    'Pokemon packs near me',
    'Allentown Pokemon cards',
    'Northampton PA Pokemon cards',
    'Bethlehem Pokemon cards',
    'Easton Pokemon cards',
    'sealed Pokemon booster packs',
  ],
  alternates: { canonical: '/' },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: `${siteConfig.name} | ${title}`,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | ${title}`,
    description,
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  url: siteConfig.url,
  image: `${siteConfig.url}/opengraph-image`,
  email: siteConfig.email,
  parentOrganization: { '@type': 'Organization', name: siteConfig.parentCompany },
  description,
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Lehigh County, Pennsylvania' },
    { '@type': 'AdministrativeArea', name: 'Northampton County, Pennsylvania' },
  ],
};

/** Tells Google the site's name, including the unaccented spelling people actually type. */
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  alternateName: ['Lehigh Valley Pokemon', siteConfig.shortName],
  url: siteConfig.url,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${outfit.variable} scroll-smooth antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="bg-ink font-sans text-white">
        <MetaPixel />
        <GoogleAdsTag />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
        <Analytics />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
