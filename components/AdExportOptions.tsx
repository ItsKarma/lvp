'use client';

import { useState } from 'react';
import { adDurations } from '@/public/assets/ad-catalog';

export default function AdExportOptions({ adId }: { adId: string }) {
  const [duration, setDuration] = useState(10);

  return (
    <div className="mt-8 rounded-lg bg-black/25 p-4 text-sm">
      <label className="flex flex-wrap items-center justify-between gap-3 font-semibold">
        Export duration
        <select
          aria-label={`Export duration for ${adId}`}
          value={duration}
          onChange={(event) => setDuration(Number(event.target.value))}
          className="rounded-md border border-white/20 bg-ink px-3 py-2 text-white"
        >
          {adDurations.map((seconds) => (
            <option key={seconds} value={seconds}>{seconds} seconds</option>
          ))}
        </select>
      </label>
      <p className="mt-3 text-white/65">Run locally with the preview server running:</p>
      <code className="mt-2 block break-all text-bolt">
        npm run export:ad -- --ad {adId} --duration {duration}
      </code>
      <p className="mt-2 leading-relaxed text-white/55">
        This selector prepares a local export command, saving to the Git-ignored exports
        folder. Website downloads are not currently hosted. Longer exports repeat
        the animation at its normal speed. Files ending at 5, 15, or 45 seconds may cut mid-motion.
        Use --url http://localhost:3100 if your preview runs on port 3100.
      </p>
    </div>
  );
}
