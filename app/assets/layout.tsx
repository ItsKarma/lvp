import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creative Assets',
  robots: { index: false, follow: false },
  alternates: { canonical: '/assets' },
};

export default function AssetsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
