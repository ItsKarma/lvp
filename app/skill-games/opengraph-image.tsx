import { ogContentType, ogSize, renderOgImage } from '@/lib/og';
import { siteConfig } from '@/lib/site';

export const alt = 'The skill games are gone. That corner can still earn.';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: 'Pennsylvania skill game replacement',
    title: 'The skill games are gone. That corner can still earn.',
    footer: `No cost to you. ${siteConfig.revenueSharePercent}% of every sale.`,
    accent: '#FF3B5C',
  });
}
