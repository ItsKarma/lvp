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

const title = 'Pokémon Card Vending Machines for Lehigh Valley Businesses';
const description =
  'Put a Pokémon card vending machine in your business for free and earn 10% of every sale. We buy it, stock it, service it, and insure it. You just collect the check.';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description,
  applicationName: siteConfig.name,
  keywords: [
    'Pokemon vending machine',
    'Lehigh Valley Pokemon',
    'skill game replacement Pennsylvania',
    'passive income for small business',
    'trading card vending machine',
    'Allentown Pokemon cards',
    'Bethlehem Pokemon cards',
    'Easton Pokemon cards',
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
        {children}
        <Analytics />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
