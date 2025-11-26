'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  User,
  Briefcase,
  Star,
  BarChart3,
  Mail,
  X,
  Menu,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Magnetic } from '@/components/magnetic';

const navItems = [
  { name: 'Home', href: '#hero', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Skills', href: '#skills', icon: Star },
  { name: 'Projects', href: '#projects', icon: BarChart3 },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export function CubeNav() {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 10 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="mb-4 w-56 origin-bottom-right rounded-2xl border border-border/40 bg-background/80 p-4 shadow-lg backdrop-blur-lg"
          >
            <nav>
              <ul className="grid grid-cols-3 gap-2">
                {navItems.map(item => (
                  <motion.li
                    key={item.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Magnetic>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex flex-col items-center gap-1 rounded-lg border border-transparent p-2 text-center text-xs font-medium text-foreground/80 transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary hover:shadow-md"
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    </Magnetic>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="interactive-ripple h-14 w-14 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
        size="icon"
        aria-label="Toggle navigation menu"
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={isOpen ? 'x' : 'menu'}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </motion.div>
        </AnimatePresence>
      </Button>
    </div>
  );
}
