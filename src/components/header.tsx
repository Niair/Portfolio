'use client';

import { socialLinks } from '@/lib/data';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Header() {
  return (
    <header
      className={cn(
        'fixed top-0 z-30 w-full bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-bold text-2xl font-headline">
          Nihal
        </Link>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-4">
            {socialLinks.map(link => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 transition-colors hover:text-primary"
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          <div className="md:hidden">
            {/* The mobile navigation is now handled by the bottom-nav component */}
          </div>
        </div>
      </div>
    </header>
  );
}
