'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';

const navItems = [
  { label: 'Pack Policy', href: '/authenticity' },
  { label: 'Support', href: '/support' },
  { label: 'About', href: '/about' },
  { label: 'Host a Machine', href: '/host-a-machine' },
];

/** The yellow button. Collectors are the main audience, so it points them at a machine. */
const primaryItem = { label: 'Find a Machine', href: '/locations' };

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" onClick={() => setIsMenuOpen(false)} aria-label={'Lehigh Valley Pokémon home'}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(pathname, item.href) ? 'page' : undefined}
              className={`text-sm font-semibold transition-colors ${
                isCurrent(pathname, item.href) ? 'text-bolt' : 'text-white/80 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={primaryItem.href}
            aria-current={isCurrent(pathname, primaryItem.href) ? 'page' : undefined}
            className="rounded-xl bg-bolt px-5 py-2.5 text-sm font-bold uppercase tracking-[0.06em] text-ink transition-colors hover:bg-bolt-600"
          >
            {primaryItem.label}
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white lg:hidden"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isMenuOpen && (
        <nav id="mobile-navigation" className="border-t border-white/10 bg-ink px-4 py-4 lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                aria-current={isCurrent(pathname, item.href) ? 'page' : undefined}
                className={`rounded-lg px-4 py-3 font-semibold ${
                  isCurrent(pathname, item.href) ? 'text-bolt' : 'text-white/85'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={primaryItem.href}
              aria-current={isCurrent(pathname, primaryItem.href) ? 'page' : undefined}
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 rounded-xl bg-bolt px-4 py-3 text-center font-bold uppercase tracking-[0.06em] text-ink"
            >
              {primaryItem.label}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
