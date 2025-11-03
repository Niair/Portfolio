
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Home,
  User,
  Briefcase,
  Code,
  Mail,
  BarChart3,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '#hero', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Skills', href: '#skills', icon: Star },
  { name: 'Projects', href: '#projects', icon: BarChart3 },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export function BottomNav() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      const sections = navItems.map(item =>
        document.getElementById(item.href.substring(1))
      );
      let currentSection = 'hero';

      sections.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop;
          if (window.scrollY >= sectionTop - 100) {
            currentSection = section.id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMounted || pathname !== '/') {
    return null;
  }

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 md:hidden">
      <div className="rounded-2xl border border-border/40 bg-background/60 p-2 shadow-lg backdrop-blur-lg">
        <ul className="flex items-center justify-center gap-2">
          {navItems.map(item => (
            <li key={item.name} className="relative">
              <Link
                href={item.href}
                className={cn(
                  'flex h-12 w-12 flex-col items-center justify-center rounded-lg text-foreground/70 transition-colors',
                  activeSection === item.href.substring(1)
                    ? 'text-primary'
                    : 'hover:text-foreground'
                )}
              >
                <item.icon className="h-6 w-6" />
                <span className="sr-only">{item.name}</span>
              </Link>
              {activeSection === item.href.substring(1) && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute inset-0 -z-10 rounded-lg bg-primary/20"
                  initial={false}
                  animate={{ opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
