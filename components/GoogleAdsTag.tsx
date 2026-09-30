'use client';

import Script from 'next/script';
import { GOOGLE_ADS_ID } from '@/lib/analytics';

/** Loads the site-wide Google Ads tag when an Ads ID is configured. */
export default function GoogleAdsTag() {
  if (!GOOGLE_ADS_ID) return null;

  return (
    <>
      <Script
        id="google-ads-gtag-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}', { allow_enhanced_conversions: true });
        `}
      </Script>
    </>
  );
}
