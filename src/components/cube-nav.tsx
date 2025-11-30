'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, User, Briefcase, Star, BarChart3, Mail, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';

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
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
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
            className="mb-4 w-64 origin-bottom-right rounded-2xl glass border border-primary/20 p-4 shadow-2xl"
          >
            <nav>
              <ul className="grid grid-cols-3 gap-3">
                {navItems.map(item => (
                  <motion.li
                    key={item.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.08, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex flex-col items-center gap-2 rounded-xl glass border border-primary/20 p-3 text-center text-xs font-medium transition-all hover:border-primary/50 hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/20"
                    >
                      <item.icon className="h-5 w-5 text-primary" />
                      <span className="text-foreground">{item.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-16 w-16 rounded-full shadow-2xl shadow-primary/30 bg-primary hover:bg-primary/90 relative overflow-hidden"
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
          
          {/* Pulse Effect */}
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-primary/30 rounded-full"
          />
        </Button>
      </motion.div>
    </div>
  );
}