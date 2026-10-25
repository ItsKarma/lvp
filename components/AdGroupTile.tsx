import Link from 'next/link';
import { adGroupPath } from '@/public/assets/ad-catalog';

type Group = { id: string; title: string; emoji: string; swatch: string[]; when?: string };

export default function AdGroupTile({ group, count, active = false }: { group: Group; count: number; active?: boolean }) {
  return (
    <Link
      href={adGroupPath(group)}
      aria-current={active ? 'page' : undefined}
      className={`group block overflow-hidden rounded-xl border bg-ink-800 transition ${active ? 'border-bolt' : 'border-white/10 hover:border-white/40'}`}
    >
      <span
        aria-hidden="true"
        className="flex h-20 items-center justify-center text-4xl transition group-hover:scale-105"
        style={{ background: `linear-gradient(135deg, ${group.swatch[0]}, ${group.swatch[1]})` }}
      >
        {group.emoji}
      </span>
      <span className="block px-3 py-2">
        <span className="block font-semibold">{group.title}</span>
        <span className="block text-xs text-white/55">{group.when ? `${group.when} · ` : ''}{count} designs</span>
      </span>
    </Link>
  );
}
