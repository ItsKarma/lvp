'use client';

import { useId, useState } from 'react';
import { siteConfig } from '@/lib/site';

const DAYS_PER_MONTH = 30;

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export default function EarningsEstimator() {
  const sliderId = useId();
  const [packsPerDay, setPacksPerDay] = useState(5);

  const monthlySales = packsPerDay * siteConfig.averagePackPrice * DAYS_PER_MONTH;
  const monthlyPayout = (monthlySales * siteConfig.revenueSharePercent) / 100;

  return (
    <div className="card-surface mx-auto max-w-2xl p-6 md:p-8">
      <p className="display mb-1 text-xs uppercase tracking-[0.2em] text-bolt">
        Estimate your share
      </p>
      <h3 className="display mb-6 text-2xl text-white md:text-3xl">
        Move the slider. See what the wall pays you.
      </h3>

      <label htmlFor={sliderId} className="mb-3 block text-sm font-semibold text-white/70">
        Packs sold per day at your location:{' '}
        <span className="display text-bolt">{packsPerDay}</span>
      </label>
      <input
        id={sliderId}
        type="range"
        min={3}
        max={60}
        step={1}
        value={packsPerDay}
        onChange={(event) => setPacksPerDay(Number(event.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-bolt"
      />
      <p className="mt-3 text-sm text-white/70">
        Estimated vend price per pack: <span className="font-bold text-white">${siteConfig.averagePackPrice}</span>
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-ink px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">
            Machine sales / month
          </p>
          <p className="display mt-1 text-2xl text-white">{currency.format(monthlySales)}</p>
        </div>
        <div className="rounded-xl border border-bolt/40 bg-bolt/10 px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-bolt">
            Your {siteConfig.revenueSharePercent}% / month
          </p>
          <p className="display mt-1 text-2xl text-bolt">{currency.format(monthlyPayout)}</p>
        </div>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-white/45">
        Illustration only, not a guarantee of earnings. Assumes ${siteConfig.averagePackPrice} per pack
        across {DAYS_PER_MONTH} operating days. Real volume depends on your foot traffic,
        placement, and hours. We will give you a realistic read on your specific location before we
        install anything.
      </p>
    </div>
  );
}
