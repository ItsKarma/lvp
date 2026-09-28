import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'ghost';

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold uppercase tracking-[0.06em] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bolt';

const variants: Record<Variant, string> = {
  primary:
    'bg-bolt text-ink shadow-[0_10px_30px_-8px_rgba(255,200,0,0.7)] hover:bg-bolt-600 hover:-translate-y-0.5',
  secondary: 'bg-wave text-white hover:bg-wave-600 hover:-translate-y-0.5',
  ghost: 'border border-white/20 text-white hover:border-bolt/60 hover:text-bolt',
};

interface CTAProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

export default function CTA({ href, children, variant = 'primary', className = '' }: CTAProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
