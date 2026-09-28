interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent?: 'bolt' | 'wave' | 'mint' | 'flare';
}

const accents = {
  bolt: 'bg-bolt/15 text-bolt',
  wave: 'bg-wave/20 text-wave',
  mint: 'bg-mint/15 text-mint',
  flare: 'bg-flare/15 text-flare',
};

export default function FeatureCard({ icon, title, description, accent = 'bolt' }: FeatureCardProps) {
  return (
    <div className="card-surface p-6 transition-colors hover:border-white/25">
      <span
        className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${accents[accent]}`}
      >
        {icon}
      </span>
      <h3 className="display mb-2 text-lg text-white">{title}</h3>
      <p className="text-[15px] leading-relaxed text-white/70">{description}</p>
    </div>
  );
}
