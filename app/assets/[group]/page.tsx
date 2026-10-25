import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { ads, adCategories, adGroups } from '@/public/assets/ad-catalog';
import AdCard from '@/components/AdCard';
import AdGroupTile from '@/components/AdGroupTile';

export const dynamicParams = false;

export function generateStaticParams() {
  return adGroups.map((group) => ({ group: group.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ group: string }> }): Promise<Metadata> {
  const { group: id } = await params;
  const group = adGroups.find((entry) => entry.id === id);
  return { title: group ? `${group.title} — Creative Assets` : 'Creative Assets' };
}

export default async function AssetGroupPage({ params }: { params: Promise<{ group: string }> }) {
  const { group: id } = await params;
  const group = adGroups.find((entry) => entry.id === id);
  if (!group) notFound();
  const category = adCategories.find((entry) => entry.id === group.category);
  const siblings = adGroups.filter((entry) => entry.category === group.category);
  const groupAds = ads.filter((ad) => ad.group === group.id);

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-14 md:py-24">
      <Link href="/assets" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
        <ArrowLeft size={16} /> All collections
      </Link>
      <p className="mt-12 text-xs font-bold uppercase tracking-[0.24em] text-bolt">{category?.title}</p>
      <h1 className="display mt-4 text-5xl md:text-6xl">{group.emoji} {group.title}</h1>
      <p className="mt-5 max-w-2xl text-lg text-white/65">
        {groupAds.length} screen ads. Render the whole collection locally with:
      </p>
      <code className="mt-3 block break-all rounded-lg bg-black/25 p-4 text-sm text-bolt">
        npm run export:ad -- --group {group.id}
      </code>

      {siblings.length > 1 && (
        <nav aria-label={`Other ${category?.title} collections`} className="mt-10">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {siblings.map((entry) => (
              <AdGroupTile
                key={entry.id}
                group={entry}
                count={ads.filter((ad) => ad.group === entry.id).length}
                active={entry.id === group.id}
              />
            ))}
          </div>
        </nav>
      )}

      {groupAds.map((ad) => <AdCard key={ad.id} ad={ad} />)}
    </main>
  );
}
