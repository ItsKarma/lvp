interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  /** Lighter panel background to break up long dark pages. */
  panel?: boolean;
  className?: string;
  width?: 'default' | 'wide';
}

export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  panel = false,
  className = '',
  width = 'default',
}: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 px-4 py-16 md:py-24 ${panel ? 'bg-ink-800' : 'bg-ink'} ${className}`}
    >
      <div className={`mx-auto ${width === 'wide' ? 'max-w-6xl' : 'max-w-5xl'}`}>
        {(eyebrow || title || subtitle) && (
          <div className="mb-12 text-center">
            {eyebrow && (
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-bolt">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="display text-3xl leading-tight text-white md:text-5xl">{title}</h2>
            )}
            {subtitle && (
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
