import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { formatAddress, machineLocations } from '@/lib/locations';

/** Compact photo + address cards linking to each /locations/<slug> page. */
export default function LocationList({ headingLevel = 'h2' }: { headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel;

  return (
    <div className="mx-auto grid max-w-4xl gap-3 md:grid-cols-2 md:gap-4">
      {machineLocations.map((location) => (
        <Link
          key={location.slug}
          href={`/locations/${location.slug}`}
          className="card-surface group flex items-center gap-4 p-3 transition-colors hover:border-bolt/50"
        >
          <div className="relative aspect-[3/4] w-16 shrink-0 overflow-hidden rounded-lg bg-ink-800 md:w-20">
            <Image
              src={location.photo}
              alt={location.photoAlt}
              placeholder={location.photo.blurDataURL ? 'blur' : 'empty'}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <Heading className="font-bold leading-snug text-white">{location.name}</Heading>
            <p className="mt-1 flex items-start gap-1.5 text-sm leading-snug text-white/65">
              <MapPin size={14} className="mt-0.5 shrink-0 text-bolt" />
              {formatAddress(location)}
            </p>
          </div>
          <ArrowRight
            size={18}
            className="mr-1 shrink-0 text-bolt transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      ))}
    </div>
  );
}
