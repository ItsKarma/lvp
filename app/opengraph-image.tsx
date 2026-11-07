import { ogContentType, ogSize, renderOgImage } from '@/lib/og';

export const alt = 'Lehigh Valley Pokémon: sealed Pokémon packs from vending machines across the Lehigh Valley';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: 'Lehigh Valley Pokémon',
    title: 'Fresh Pokémon packs, right around the corner.',
    footer: 'Sealed booster packs across the Lehigh Valley. Find a machine near you.',
  });
}
