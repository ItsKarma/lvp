import { sendGAEvent } from '@next/third-parties/google';

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
export const GOOGLE_ADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL;

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void };
    _fbq?: unknown;
    gtag?: (...args: unknown[]) => void;
  }
}

function trackMetaLead(params: Record<string, unknown>) {
  if (!META_PIXEL_ID || typeof window.fbq !== 'function') return;
  window.fbq('track', 'Lead', params);
}

function trackGoogleAdsLead(params: Record<string, unknown>) {
  if (!GOOGLE_ADS_ID || !GOOGLE_ADS_LEAD_LABEL) return;
  if (typeof window.gtag !== 'function') return;

  window.gtag('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LEAD_LABEL}`,
    ...params,
  });
}

/**
 * Reports a converted lead to Meta, Google Ads, and GA4. Each destination is
 * skipped independently when its ID is not configured.
 */
export function trackLead({ source, formName }: { source: string; formName: string }) {
  if (typeof window === 'undefined') return;

  trackMetaLead({ content_name: source, value: 1.0, currency: 'USD' });
  trackGoogleAdsLead({ value: 1.0, currency: 'USD' });
  sendGAEvent('event', 'generate_lead', { form_name: formName, source });
}
