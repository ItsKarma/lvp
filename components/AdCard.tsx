import { ArrowUpRight, Film } from 'lucide-react';
import { adPreviewPath } from '@/public/assets/ad-catalog';
import AdExportOptions from '@/components/AdExportOptions';

type Ad = { id: string; title: string; description: string; theme: string };

export default function AdCard({ ad }: { ad: Ad }) {
  const preview = adPreviewPath(ad);
  const clean = `${preview}${ad.theme ? '&' : '?'}clean=1`;
  return (
    <article className="card-surface mt-12 grid gap-8 p-6 md:grid-cols-[260px_1fr] md:p-8">
      <iframe
        src={clean}
        title={`${ad.title} animated preview`}
        loading="lazy"
        className="aspect-[9/16] w-full rounded-xl border border-white/10 bg-black"
      />
      <div className="self-center">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-bolt">
          <Film size={18} /> Machine screensaver
        </span>
        <h2 className="display mt-4 text-3xl">{ad.title}</h2>
        <p className="mt-4 leading-relaxed text-white/65">
          {ad.description}{' '}
          No vending-company branding. The design and animation are HTML/CSS, not a video.
        </p>
        <p className="mt-5 text-sm text-white/55">1080 × 1920 · 10-second seamless loop · Silent</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={preview} className="rounded-lg border border-white/20 px-5 py-3 font-semibold">
            Preview &amp; controls
          </a>
          <a href={clean} className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 font-semibold">
            Clean playback <ArrowUpRight size={16} />
          </a>
        </div>
        <p className="mt-3 text-sm text-white/55">
          Local export: H.264 MP4 · 30 fps · No audio.
        </p>
        <AdExportOptions adId={ad.id} />
      </div>
    </article>
  );
}
