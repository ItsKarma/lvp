'use client';

import { useSyncExternalStore } from 'react';

interface CountdownProps {
  /** ISO date string for the target moment. */
  target: string;
  label?: string;
  compact?: boolean;
}

function subscribeToSeconds(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

/** Stable within a given second, which keeps useSyncExternalStore from looping. */
function currentSecond() {
  return Math.floor(Date.now() / 1000);
}

function diff(targetMs: number, nowSeconds: number) {
  const ms = Math.max(0, targetMs - nowSeconds * 1000);
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

export default function Countdown({ target, label, compact = false }: CountdownProps) {
  const targetMs = new Date(target).getTime();
  // Null during SSR and hydration so server and client markup always match.
  const nowSeconds = useSyncExternalStore<number | null>(
    subscribeToSeconds,
    currentSecond,
    () => null,
  );
  const time = nowSeconds === null ? null : diff(targetMs, nowSeconds);

  const units = [
    { value: time?.days, suffix: 'Days' },
    { value: time?.hours, suffix: 'Hrs' },
    { value: time?.minutes, suffix: 'Min' },
    { value: time?.seconds, suffix: 'Sec' },
  ];

  return (
    <div className={compact ? '' : 'text-center'}>
      {label && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-flare">{label}</p>
      )}
      <div
        className={`flex gap-2 ${compact ? '' : 'justify-center'} sm:gap-3`}
        role="timer"
        aria-live="off"
      >
        {units.map((unit) => (
          <div
            key={unit.suffix}
            className={`rounded-xl border border-white/15 bg-ink-800 text-center ${
              compact ? 'min-w-[58px] px-2.5 py-2' : 'min-w-[74px] px-3 py-3 sm:min-w-[88px]'
            }`}
          >
            <span
              className={`display block tabular-nums text-bolt ${
                compact ? 'text-xl' : 'text-3xl sm:text-4xl'
              }`}
            >
              {unit.value === undefined ? '--' : String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">
              {unit.suffix}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
