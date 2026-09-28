/**
 * Placeholder illustration of a wall-mounted card machine, used until real
 * product photography is dropped into /public.
 */
export default function MachineArt({ className = '' }: { className?: string }) {
  const packs = Array.from({ length: 12 });

  return (
    <svg
      viewBox="0 0 260 420"
      className={className}
      role="img"
      aria-label="Illustration of a wall-mounted Pokémon card vending machine"
    >
      <defs>
        <linearGradient id="cabinet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1B2450" />
          <stop offset="100%" stopColor="#0B1130" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5B8CF5" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0B1130" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      <rect x="10" y="10" width="240" height="400" rx="20" fill="url(#cabinet)" stroke="#FFC800" strokeWidth="2" />

      {/* Header */}
      <rect x="26" y="26" width="208" height="52" rx="10" fill="#FFC800" />
      <text
        x="130"
        y="59"
        textAnchor="middle"
        fontSize="19"
        fontWeight="800"
        fill="#070B1F"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        letterSpacing="1.5"
      >
        TRADING CARDS
      </text>

      {/* Display window */}
      <rect x="26" y="92" width="208" height="200" rx="10" fill="url(#glass)" stroke="#2F6FED" strokeWidth="1.5" />
      {packs.map((_, index) => {
        const column = index % 4;
        const row = Math.floor(index / 4);
        return (
          <rect
            key={index}
            x={38 + column * 49}
            y={104 + row * 62}
            width="38"
            height="52"
            rx="4"
            fill={['#2F6FED', '#FF3B5C', '#2ED47A', '#FFC800'][index % 4]}
            opacity="0.85"
          />
        );
      })}

      {/* Card reader */}
      <rect x="26" y="306" width="120" height="44" rx="9" fill="#0B1130" stroke="#ffffff" strokeOpacity="0.18" />
      <rect x="40" y="322" width="40" height="12" rx="6" fill="#2ED47A" />
      <circle cx="104" cy="328" r="6" fill="#FFC800" />
      <text
        x="130"
        y="333"
        fontSize="10"
        fill="#ffffff"
        fillOpacity="0.5"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        TAP
      </text>

      {/* Dispense slot */}
      <rect x="26" y="364" width="208" height="30" rx="8" fill="#050818" stroke="#ffffff" strokeOpacity="0.12" />
      <rect x="44" y="376" width="172" height="6" rx="3" fill="#ffffff" fillOpacity="0.14" />
    </svg>
  );
}
