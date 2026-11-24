import type { MachineModel, PublishedDimensions } from '@/lib/machines';

function DimensionGroup({ label, dims }: { label: string; dims: PublishedDimensions }) {
  const cells = [
    { label: 'Width', value: `${dims.widthIn}"` },
    { label: 'Height', value: `${dims.heightIn}"` },
    { label: 'Depth', value: `${dims.depthIn}"` },
    { label: 'Weight', value: `${dims.weightLbs} lbs` },
  ];

  return (
    <div>
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/40">{label}</p>
      <dl className="grid grid-cols-4 gap-1.5">
        {cells.map((cell) => (
          <div
            key={cell.label}
            className="flex min-h-[3.25rem] flex-col items-center justify-center rounded-lg bg-black/25 px-1 py-2 text-center ring-1 ring-inset ring-white/10"
          >
            <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/40">
              {cell.label}
            </dt>
            <dd className="mt-1 text-[13px] font-semibold leading-none text-white">{cell.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Fact({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="grid grid-cols-[4.5rem_1fr] items-baseline gap-x-3">
      <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">{label}</dt>
      <dd className="text-[13px] leading-snug text-white/75">
        <span className="font-semibold text-white">{value}</span>
        {detail && <span className="mt-0.5 block text-white/50">{detail}</span>}
      </dd>
    </div>
  );
}

/** Official size, weight, space, and power for one machine. Cabinet and stand stay separate. */
export default function MachineSpecs({ model }: { model: MachineModel }) {
  const { specs } = model;

  return (
    <div className="mt-5 border-t border-white/10 pt-5">
      <div className="space-y-4">
        <DimensionGroup label={specs.stand ? 'Cabinet' : 'Dimensions'} dims={specs.cabinet} />
        {specs.stand && <DimensionGroup label="Stand" dims={specs.stand} />}
      </div>
      {specs.stand && (
        <p className="mt-3 text-xs leading-relaxed text-white/45">
          Cabinet and stand are measured separately.
        </p>
      )}
      <dl className="mt-4 space-y-3 border-t border-white/10 pt-4">
        <Fact label="Space" value={specs.space} />
        <Fact
          label="Power"
          value={specs.power.outlet}
          detail={
            specs.power.rating && specs.stand
              ? `${specs.power.rating} (cabinet)`
              : specs.power.rating
          }
        />
        <Fact label="Install" value={specs.install} />
      </dl>
    </div>
  );
}
