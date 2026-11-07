import { ogContentType, ogSize, renderOgImage } from '@/lib/og';
import { siteConfig } from '@/lib/site';

export const alt = `Host a free Pokémon card machine and earn ${siteConfig.revenueSharePercent}% of every sale`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: 'Host a machine',
    title: 'Let the unused space in your business generate revenue.',
    footer: `Free machine. We stock it. You earn ${siteConfig.revenueSharePercent}% of every sale.`,
  });
}
