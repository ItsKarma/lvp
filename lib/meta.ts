export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void };
    _fbq?: unknown;
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fires the Meta "Lead" standard event. Safe to call when the pixel is not configured. */
export function trackMetaLead(params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  if (!META_PIXEL_ID || typeof window.fbq !== 'function') return;

  window.fbq('track', 'Lead', params);
}
