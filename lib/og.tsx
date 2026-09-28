import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

interface OgOptions {
  eyebrow: string;
  title: string;
  footer: string;
  accent?: string;
}

/** Shared social card renderer so every page ships a proper Meta/OG preview. */
export function renderOgImage({ eyebrow, title, footer, accent = '#FFC800' }: OgOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(135deg, #070B1F 0%, #161E45 60%, #0B1130 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 24,
              height: 56,
              borderRadius: 6,
              background: accent,
            }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: accent,
              fontWeight: 700,
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div
          style={{
            fontSize: 74,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 980,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 28,
            color: 'rgba(255,255,255,0.72)',
          }}
        >
          <span>{footer}</span>
          <span style={{ color: accent, fontWeight: 700 }}>lehighvalleypokemon.com</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
