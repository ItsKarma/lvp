'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Check, Headphones, Package, RotateCcw, Wrench } from 'lucide-react';
import { siteConfig } from '@/lib/site';
import './HostVsl.css';

const share = `${siteConfig.revenueSharePercent}%`;

function StorefrontArt() {
  return (
    <svg viewBox="0 0 300 220" className="vsl-storefront" aria-hidden="true">
      <rect x="20" y="52" width="260" height="160" fill="#E9EEFA" />
      <rect x="10" y="20" width="280" height="38" rx="6" fill="#14204F" />
      <text x="150" y="46" textAnchor="middle" fontSize="20" fontWeight="800" fill="#fff" fontFamily="ui-sans-serif, system-ui, sans-serif">
        YOUR BUSINESS
      </text>
      {Array.from({ length: 7 }).map((_, index) => (
        <path
          key={index}
          d={`M${20 + index * 37.14} 58h37.14v18a18.57 18.57 0 0 1-37.14 0z`}
          fill={index % 2 ? '#fff' : '#E0202E'}
        />
      ))}
      <rect x="40" y="108" width="130" height="80" rx="4" fill="#BBD0F7" />
      <path d="M52 176l40-56h22l-40 56zM96 176l40-56h10l-40 56z" fill="#fff" opacity="0.55" />
      <rect x="192" y="108" width="68" height="104" rx="4" fill="#14204F" />
      <rect x="201" y="118" width="50" height="46" rx="2" fill="#BBD0F7" />
      <circle cx="250" cy="178" r="4" fill="#FFC800" />
      <rect x="0" y="210" width="300" height="8" rx="4" fill="#14204F" />
    </svg>
  );
}

function VanArt() {
  return (
    <svg viewBox="0 0 220 110" className="vsl-van" aria-hidden="true">
      <path d="M8 16a8 8 0 0 1 8-8h126a8 8 0 0 1 8 8v72H8z" fill="#fff" stroke="#14204F" strokeWidth="4" />
      <path d="M150 28h28a10 10 0 0 1 8 4l22 28a10 10 0 0 1 2 6v22h-60z" fill="#E0202E" stroke="#14204F" strokeWidth="4" />
      <path d="M162 38h15l18 23h-33z" fill="#BBD0F7" />
      <rect x="8" y="52" width="142" height="12" fill="#E0202E" />
      <text x="79" y="40" textAnchor="middle" fontSize="20" fontWeight="800" fill="#14204F" fontFamily="ui-sans-serif, system-ui, sans-serif">
        LVP
      </text>
      <circle cx="48" cy="90" r="16" fill="#14204F" />
      <circle cx="48" cy="90" r="6" fill="#E9EEFA" />
      <circle cx="170" cy="90" r="16" fill="#14204F" />
      <circle cx="170" cy="90" r="6" fill="#E9EEFA" />
    </svg>
  );
}

function PackArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 84" className={className} aria-hidden="true">
      <path d="M4 7l5-4 5 4 5-4 5 4 6-4 6 4 5-4 5 4 5-4 5 4v70l-5 4-5-4-5 4-5-4-6 4-6-4-5 4-5-4-5 4-5-4z" fill="#14204F" />
      <rect x="4" y="16" width="52" height="52" fill="#E0202E" />
      <path d="M30 24l5.5 11.5L48 37.300l-9 8.700 2.100 12.500L30 52.500 18.900 58.500 21 46l-9-8.700 12.500-1.800z" fill="#FFC800" />
    </svg>
  );
}

function OwnerArt() {
  return (
    <svg viewBox="0 0 100 120" className="vsl-owner-art" aria-hidden="true">
      <circle cx="50" cy="34" r="24" fill="#F2C9A5" />
      <path d="M26 32a24 24 0 0 1 48 0c-8-2-14-8-18-12-6 6-18 11-30 12z" fill="#14204F" />
      <path d="M10 116c0-30 16-46 40-46s40 16 40 46z" fill="#14204F" />
      <path d="M50 70l9 12-9 8-9-8z" fill="#fff" />
    </svg>
  );
}

function TellArt() {
  return (
    <div className="vsl-art">
      <StorefrontArt />
      <div className="vsl-form">
        <div className="vsl-field vsl-field-1">
          <span className="vsl-label">Business type</span>
          <span className="vsl-input"><span className="vsl-typed">Bowling alley</span></span>
        </div>
        <div className="vsl-field vsl-field-2">
          <span className="vsl-label">Foot traffic</span>
          <span className="vsl-input"><span className="vsl-typed">Busy weekends</span></span>
        </div>
        <span className="vsl-send">
          <span>Send</span>
          <span className="vsl-sent"><Check /> Sent</span>
        </span>
      </div>
    </div>
  );
}

function MatchArt() {
  return (
    <div className="vsl-art">
      <div className="vsl-lineup vsl-lineup-1">
        <div className="vsl-lineup-dim">
          <Image src="/LVPVendingPokemonPedestal.png" alt="" width={1254} height={1254} loading="eager" sizes="25vw" />
          <span>Pedestal</span>
        </div>
      </div>
      <div className="vsl-lineup vsl-lineup-2">
        <div className="vsl-lineup-match">
          <Image src="/LVPVendingPokemonWall.png" alt="" width={1024} height={1535} loading="eager" sizes="25vw" />
          <span>Wall Mount</span>
        </div>
        <span className="vsl-match-badge"><Check /> Your match</span>
      </div>
      <div className="vsl-lineup vsl-lineup-3">
        <div className="vsl-lineup-dim">
          <Image src="/LVPVendingPokemonSlimTower.png" alt="" width={1254} height={1254} loading="eager" sizes="25vw" />
          <span>Tower</span>
        </div>
      </div>
    </div>
  );
}

function InstallArt() {
  return (
    <div className="vsl-art">
      <div className="vsl-panel">
        <div className="vsl-street">
          <div className="vsl-road" />
          <div className="vsl-door" />
          <VanArt />
          <Image
            src="/LVPVendingPokemonWall.png"
            alt=""
            width={1024}
            height={1535}
            loading="eager"
            sizes="20vw"
            className="vsl-rolling"
          />
        </div>
        <Image
          src="/LVPVendingPokemonWide1.png"
          alt="Pokémon card vending machine installed on the wall of a convenience store"
          width={1717}
          height={916}
          loading="eager"
          sizes="(min-width: 1024px) 340px, 60vw"
          className="vsl-installed"
        />
      </div>
      <div className="vsl-duties">
        <span className="vsl-duty vsl-duty-1"><Package /> Restocking</span>
        <span className="vsl-duty vsl-duty-2"><Wrench /> Maintenance</span>
        <span className="vsl-duty vsl-duty-3"><Headphones /> Support</span>
      </div>
      <div className="vsl-zero"><strong>$0</strong><span>to you</span></div>
    </div>
  );
}

function ShareArt() {
  return (
    <div className="vsl-art">
      <Image
        src="/LVPVendingPokemonWall.png"
        alt="Pokémon card vending machine with a touchscreen and tap-to-pay reader"
        width={1024}
        height={1535}
        loading="eager"
        sizes="(min-width: 1024px) 260px, 45vw"
        className="vsl-sale-machine"
      />
      <span className="vsl-ripple" />
      <div className="vsl-tap-card"><span /></div>
      <PackArt className="vsl-drop-pack" />
      <span className="vsl-coin vsl-coin-1">+{share}</span>
      <span className="vsl-coin vsl-coin-2">+{share}</span>
      <span className="vsl-coin vsl-coin-3">+{share}</span>
      <div className="vsl-owner">
        <OwnerArt />
        <span>You</span>
      </div>
    </div>
  );
}

function ReportArt() {
  return (
    <div className="vsl-art">
      <div className="vsl-calendar">
        <span className="vsl-calendar-rings" />
        <span className="vsl-calendar-new"><b>JUL</b><i>1</i></span>
        <span className="vsl-calendar-old"><b>JUN</b><i>30</i></span>
      </div>
      <div className="vsl-payout">
        <span>Monthly payout</span>
        <strong>Your {share}</strong>
        <Check />
      </div>
      <div className="vsl-report">
        <span className="vsl-report-title">Sales report <em>Sample</em></span>
        {[
          { name: 'Items sold', width: '82%' },
          { name: 'Total sales', width: '64%' },
          { name: `Your ${share}`, width: '38%' },
        ].map((row) => (
          <span key={row.name} className="vsl-report-row">
            <span>{row.name}</span>
            <span className="vsl-report-track"><span style={{ width: row.width }} /></span>
          </span>
        ))}
      </div>
    </div>
  );
}

function EndCard() {
  return (
    <div className="vsl-end">
      <div className="vsl-end-copy">
        <p className="vsl-end-title">
          Host a machine. <span>Never pay a thing.</span>
        </p>
        <a href="#apply" className="vsl-end-cta">
          Get Started <ArrowRight />
        </a>
        <p className="vsl-end-domain">{siteConfig.domain.replace(/^www\./, '')}</p>
      </div>
      <Image
        src="/LVPVendingPokemonSlimTower.png"
        alt="Freestanding slim Pokémon card vending tower with a large touchscreen"
        width={1254}
        height={1254}
        loading="eager"
        sizes="(min-width: 1024px) 340px, 60vw"
        className="vsl-end-machine"
      />
    </div>
  );
}

interface Scene {
  id: string;
  /** Seconds the animation runs before the Next button starts pulsing. */
  seconds: number;
  headline?: string;
  caption?: string;
  art: ReactNode;
}

const scenes: Scene[] = [
  { id: 'tell', seconds: 4, headline: 'Tell us about your business', art: <TellArt /> },
  { id: 'match', seconds: 3.5, headline: 'We pick the right machine', art: <MatchArt /> },
  { id: 'install', seconds: 5, headline: 'Free install. We handle everything.', art: <InstallArt /> },
  { id: 'share', seconds: 4.5, headline: `You get ${share} of every sale`, art: <ShareArt /> },
  {
    id: 'report',
    seconds: 4.5,
    headline: 'Paid monthly, with a full sales report',
    caption: 'No guesswork. No questions.',
    art: <ReportArt />,
  },
  { id: 'end', seconds: 1.5, art: <EndCard /> },
];

const lastStep = scenes.length - 2;

function sceneLabel(index: number) {
  return scenes[index].headline ?? 'Host a machine. Never pay a thing';
}

/**
 * Click-through sales video for the host page. Each scene plays its CSS
 * animation once, then holds until the visitor presses Next or the right arrow.
 */
export default function HostVsl() {
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const isLast = index === scenes.length - 1;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.4,
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const target = event.target as HTMLElement;
      if (target.closest('input, textarea, select, [contenteditable="true"]')) return;
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setIndex((current) => Math.min(current + 1, scenes.length - 1));
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setIndex((current) => Math.max(current - 1, 0));
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [inView]);

  return (
    <div
      ref={rootRef}
      className="vsl"
      data-playing={inView}
      role="group"
      aria-roledescription="slideshow"
      aria-label="How hosting a machine works"
      style={{ '--vsl-seconds': `${scenes[index].seconds}s` } as CSSProperties}
    >
      <div className="vsl-stage">
        {scenes.map((scene, sceneIndex) => (
          // Hidden scenes are display:none, so their animations restart each time they are shown.
          <div key={scene.id} className="vsl-scene" data-scene={scene.id} hidden={sceneIndex !== index}>
            {scene.headline && (
              <div className="vsl-copy">
                <p className="vsl-headline">{scene.headline}</p>
                {scene.caption && <p className="vsl-caption">{scene.caption}</p>}
              </div>
            )}
            {scene.art}
          </div>
        ))}
      </div>

      <div className="vsl-controls">
        <div className="vsl-progress">
          {scenes.map((scene, sceneIndex) => (
            <button
              key={scene.id}
              type="button"
              className="vsl-segment"
              aria-label={`Go to slide ${sceneIndex + 1}: ${sceneLabel(sceneIndex)}`}
              aria-current={sceneIndex === index ? 'step' : undefined}
              onClick={() => setIndex(sceneIndex)}
            >
              <span className="vsl-segment-track">
                {sceneIndex < index && <span className="vsl-segment-done" />}
                {sceneIndex === index && <span className="vsl-segment-fill" />}
              </span>
            </button>
          ))}
        </div>

        <div className="vsl-buttons">
          <button
            type="button"
            className="vsl-button vsl-back"
            disabled={index === 0}
            onClick={() => setIndex(index - 1)}
          >
            <ArrowLeft size={16} /> Back
          </button>
          <p className="vsl-counter" aria-live="polite">
            <span className="sr-only">{sceneLabel(index).replace(/\.$/, '')}. </span>
            {index <= lastStep ? `Step ${index + 1} of ${lastStep + 1}` : 'Your turn'}
          </p>
          <button
            type="button"
            className="vsl-button vsl-next"
            onClick={() => setIndex(isLast ? 0 : index + 1)}
          >
            <span key={index} className="vsl-next-pulse" />
            {isLast ? (
              <>
                <RotateCcw size={16} /> Replay
              </>
            ) : (
              <>
                Next <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
