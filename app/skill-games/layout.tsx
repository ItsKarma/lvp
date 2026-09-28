import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

const title = 'Replacing Skill Games in PA Before the October 13, 2026 Deadline';
const description = `Pennsylvania's skill game grace period ends ${siteConfig.skillGameDeadlineLabel}. Replace that corner with a Pokémon card vending machine: no license, no cash box, no cost to you, and ${siteConfig.revenueSharePercent}% of every sale.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/skill-games' },
  openGraph: { title, description, url: `${siteConfig.url}/skill-games` },
  twitter: { card: 'summary_large_image', title, description },
};

export default function SkillGamesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
