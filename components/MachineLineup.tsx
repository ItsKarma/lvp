import Image from 'next/image';
import { machineModels, type MachineModel } from '@/lib/machines';

/**
 * How each cut-out sits in the lineup, as a share of the lineup's height.
 * Tower stands tallest in the middle; the wall unit hangs at mount height.
 */
const layout: Record<MachineModel['slug'], { height: string; lift: string; order: number; front: boolean }> = {
  wall: { height: '58%', lift: '27%', order: 0, front: true },
  tower: { height: '100%', lift: '0%', order: 1, front: false },
  pedestal: { height: '94%', lift: '0%', order: 2, front: true },
};

/** All three machine models side by side on a shared floor, labelled underneath. */
export default function MachineLineup({ priority = false }: { priority?: boolean }) {
  const models = [...machineModels].sort((a, b) => layout[a.slug].order - layout[b.slug].order);

  return (
    <div className="relative mx-auto w-full max-w-xl pb-10">
      <div className="pointer-events-none absolute inset-x-6 bottom-6 h-10 rounded-[50%] bg-black/60 blur-xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bolt/15 blur-3xl" />

      <div className="relative flex aspect-[6/5] items-end justify-center">
        {models.map((model) => {
          const spot = layout[model.slug];
          return (
            <figure
              key={model.slug}
              className={`relative flex h-full flex-col items-center justify-end ${
                spot.front ? 'z-10' : '-mx-[5%] z-0'
              }`}
            >
              <Image
                src={model.cutout}
                alt={model.alt}
                priority={priority}
                sizes="(min-width: 640px) 240px, 34vw"
                className="w-auto drop-shadow-[0_24px_30px_rgba(0,0,0,0.55)]"
                style={{ height: spot.height }}
              />
              <div aria-hidden style={{ height: spot.lift }} />
              <figcaption className="absolute top-full mt-3 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.08em] text-white/70 sm:text-xs sm:tracking-[0.14em]">
                {model.name}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
