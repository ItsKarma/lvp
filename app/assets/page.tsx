import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ads, adCategories, adGroups } from '@/public/assets/ad-catalog';
import AdGroupTile from '@/components/AdGroupTile';

export default function AssetsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-14 md:py-24">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
        <ArrowLeft size={16} /> Back to site
      </Link>
      <p className="mt-12 text-xs font-bold uppercase tracking-[0.24em] text-bolt">Creative library</p>
      <h1 className="display mt-4 text-5xl md:text-6xl">Assets</h1>
      <p className="mt-5 max-w-2xl text-lg text-white/65">
        Editable screen ads. Pick a collection to preview its animations, open a clean playback view, or render
        MP4s locally for your machine.
      </p>

      <p className="mt-4 text-sm text-white/55">
        {ads.length} displays in {adGroups.length} collections, with local exports in 5, 10, 15, 30, 45, or 60 seconds.
        Rendered videos stay in the Git-ignored exports folder; website downloads are not currently hosted.
      </p>
      {adCategories.map((category) => {
        const groups = adGroups.filter((group) => group.category === category.id);
        return (
          <section key={category.id} className="mt-14" aria-labelledby={`category-${category.id}`}>
            <h2 id={`category-${category.id}`} className="display text-3xl">{category.title}</h2>
            <p className="mt-2 text-white/60">{category.description}</p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {groups.map((group) => (
                <AdGroupTile key={group.id} group={group} count={ads.filter((ad) => ad.group === group.id).length} />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
