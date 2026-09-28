import { ogContentType, ogSize, renderOgImage } from '@/lib/og';
import { siteConfig } from '@/lib/site';

export const alt = 'Replace your skill games before the Pennsylvania deadline';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: `Deadline: ${siteConfig.skillGameDeadlineLabel}`,
    title: 'Skill games are going away. Your revenue does not have to.',
    footer: 'Replace the corner. Keep the income.',
    accent: '#FF3B5C',
  });
}
