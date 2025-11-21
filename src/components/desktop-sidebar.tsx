'use client';

import Link from 'next/link';
import {
  Home,
  User,
  Briefcase,
  Star,
  BarChart3,
  Mail,
} from 'lucide-react';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '#hero', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Skills', href: '#skills', icon: Star },
  { name: 'Projects', href: '#projects', icon: BarChart3 },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export function DesktopSidebar() {
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
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-16 flex-col items-center justify-center md:flex">
      <nav className="flex flex-col items-center gap-4 px-2">
        <TooltipProvider>
          {navItems.map(item => (
            <Tooltip key={item.name} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
                    activeSection === item.href.substring(1)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.name}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.name}</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
    </aside>
  );
}
