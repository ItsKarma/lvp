import Link from 'next/link';
import Logo from '@/components/Logo';
import { siteConfig } from '@/lib/site';

const columns = [
  {
    heading: 'For Businesses',
    links: [
      { label: 'How It Works', href: '/host-a-machine' },
      { label: 'Replace Skill Games', href: '/skill-games' },
      { label: 'Our Machines', href: '/machines' },
      { label: 'Service Area', href: '/service-area' },
    ],
  },
  {
    heading: 'For Collectors',
    links: [
      { label: 'Find a Machine', href: '/find-a-machine' },
      { label: 'Our Pack Policy', href: '/authenticity' },
      { label: 'Support', href: '/support' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Brand Disclaimer', href: '/brand-disclaimer' },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink-800 px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {siteConfig.tagline} Locally owned, locally serviced, and operated by{' '}
              {siteConfig.parentCompany}.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.heading}>
              <p className="display mb-4 text-xs uppercase tracking-[0.18em] text-bolt">
                {column.heading}
              </p>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/45">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}, a {siteConfig.parentCompany} brand. All
            rights reserved.
          </p>
          <p className="mt-2">
            Not affiliated with, sponsored by, or endorsed by Nintendo, Creatures Inc., GAME FREAK
            inc., or The Pokémon Company.{' '}
            <Link href="/brand-disclaimer" className="underline underline-offset-4 hover:text-white">
              Read the full disclaimer
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
