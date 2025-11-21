'use client';

import { bio } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Download, Play, Mouse } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/placeholder-images';

export function Hero() {
  const avatarImage = getPlaceholderImage(bio.avatarImageId);

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-5rem)] w-full items-center justify-center overflow-hidden pt-16 pb-24 sm:pt-0 sm:pb-0"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative col-span-1 mx-auto flex justify-center lg:order-last lg:col-span-5"
          >
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-transparent rounded-full -z-10 blur-3xl"></div>
              {avatarImage && (
                <div className="relative mx-auto w-72 h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-background">
                  <Image
                    src={avatarImage.imageUrl}
                    alt={`${bio.name} - ${bio.headline}`}
                    fill
                    sizes="(max-width: 768px) 70vw, 320px"
                    data-ai-hint={avatarImage.imageHint}
                    className="relative object-cover"
                    priority
                  />
                </div>
              )}
            </div>
          </motion.div>

          <div className="col-span-1 flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl lg:text-8xl font-headline"
            >
              Hi, I'm {bio.name.split(' ')[0]}{' '}
              <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 text-lg text-foreground/80"
            >
              <h3 className="font-semibold">Data Scientist</h3>
              <span className="text-muted-foreground hidden sm:inline-block">|</span>
              <h3 className="font-semibold">Software Engineer</h3>
               <span className="text-muted-foreground hidden sm:inline-block">|</span>
              <h3 className="font-semibold">AI Specialist</h3>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-4 max-w-xl text-lg text-foreground/80"
            >
               I'm a passionate data scientist with a knack for turning complex datasets into actionable insights.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
            >
              <Button asChild size="lg">
                <a href="/resume.pdf" download="Akshay-Resume.pdf">
                  Download Resume <Download className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
                  Intro Video <Play className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <Link
            href="#about"
            aria-label="Scroll to about section"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <div className="relative w-6 h-10 rounded-full border-2 border-muted-foreground/50">
              <motion.div
                className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-3 rounded-full bg-muted-foreground/50"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
              />
            </div>
            <span className="text-sm">Scroll down</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
