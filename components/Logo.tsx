'use client';

interface LogoProps {
  /** Renders a compact mark only, for tight spaces. */
  markOnly?: boolean;
  className?: string;
}

/**
 * Custom mark: a tilted trading card with an energy bolt. Deliberately original
 * artwork, not derived from any third-party brand asset.
 */
export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect x="2" y="2" width="44" height="44" rx="12" fill="#0D1330" />
      <rect x="2" y="2" width="44" height="44" rx="12" stroke="#FFC800" strokeWidth="2" />
      <g transform="rotate(-12 24 24)">
        <rect x="14" y="9" width="20" height="30" rx="3.5" fill="#2F6FED" />
        <rect x="16.5" y="11.5" width="15" height="25" rx="2" fill="#0D1330" />
      </g>
      <path
        d="M26.6 13.5 16.8 26.2h6.1l-2.2 9.1 10.1-13.1h-6.3l2.1-8.7Z"
        fill="#FFC800"
        stroke="#0D1330"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Logo({ markOnly = false, className = '' }: LogoProps) {
  if (markOnly) return <LogoMark />;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <div className="flex flex-col leading-none">
        <span className="display text-[15px] uppercase tracking-[0.2em] text-white/70">
          Lehigh Valley
        </span>
        <span className="display text-xl uppercase tracking-[0.08em] text-bolt">Pokémon</span>
      </div>
    </div>
  );
}
