import { ogContentType, ogSize, renderOgImage } from '@/lib/og';

export const alt = 'Lehigh Valley Pokémon: earn 10% of every sale with a free Pokémon card machine';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: 'Lehigh Valley Pokémon',
    title: 'Let the unused space in your business generate revenue.',
    footer: 'Free machine. We stock it. You earn 10% of every sale.',
  });
}
