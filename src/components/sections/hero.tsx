'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Download, Play } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { bio, socialLinks } from '@/lib/data';

export function Hero() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 md:px-8 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20 -z-10" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Hi, I'm <span className="text-primary">{bio.name}</span>
                <motion.span
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  className="inline-block origin-bottom-right ml-2"
                >
                  👋
                </motion.span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-2 text-lg md:text-xl text-muted-foreground"
              >
                {bio.headline.split(' | ').map((item, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="px-3 py-1 bg-secondary rounded-full text-sm"
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed"
            >
              {bio.summary}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="group"
                onClick={() => window.open('/resume.pdf', '_blank')}
              >
                <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                Download Resume
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="group"
                onClick={() => {/* Add intro video link */}}
              >
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Intro Video
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex gap-4"
            >
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 + index * 0.1 }}
                    className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right side - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="relative"
            >
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
              
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-primary/10 rounded-full" />
                <Image
                  src={`https://images.unsplash.com/photo-1580893472468-01373fe4c97e?w=600&h=600&fit=crop`}
                  alt={bio.name}
                  fill
                  className="rounded-full object-cover border-4 border-background shadow-2xl"
                  priority
                />
              </div>
            </motion.div>

            {/* Floating tech badges */}
            {['Python', 'ML', 'AI', 'LLM'].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 1.5 + index * 0.1,
                  type: "spring",
                }}
                className="absolute bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium shadow-lg border"
                style={{
                  top: `${20 + index * 20}%`,
                  right: `${index % 2 === 0 ? -20 : 'auto'}`,
                  left: `${index % 2 === 1 ? -20 : 'auto'}`,
                }}
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 2 },
          y: { duration: 1.5, repeat: Infinity },
        }}
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <span className="text-sm">Scroll down</span>
        <ArrowDown className="h-5 w-5" />
      </motion.button>
    </section>
  );
}