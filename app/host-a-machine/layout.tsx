import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

const title = 'Host a Pokémon Card Machine';
const description = `We install a Pokémon card vending machine in your Lehigh Valley business for free, stock it, service it, and pay you ${siteConfig.revenueSharePercent}% of every sale. No cost, no contract, 60 day risk-free trial.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/host-a-machine' },
  openGraph: { title, description, url: `${siteConfig.url}/host-a-machine` },
};

export default function HostLayout({ children }: { children: React.ReactNode }) {
  return children;
}
