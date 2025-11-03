'use client';

import { bio, socialLinks } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowDown, Download, Play, Send, MoveRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function Hero() {
  const avatarImage = getPlaceholderImage(bio.avatarImageId);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden pt-24"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Info */}
          <div className="col-span-1 flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            >
              Hi, I&apos;m {bio.name.split(' ')[0]}
              <span className="inline-block animate-wave">👋</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-4 max-w-xl text-lg text-foreground/80"
            >
              {bio.headline.split('|').map((part, index) => (
                <span key={index} className='block'>{part.trim()}</span>
              ))}
            </motion.p>
             <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
            >
              <Button asChild size="lg">
                <Link href="#contact">
                  Contact <MoveRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative col-span-1 mx-auto w-80 h-80 lg:col-span-5 lg:w-full lg:h-full"
          >
            <svg
              className="absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 text-primary"
              viewBox="0 0 578 544"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M173.364 6.83079C249.531 -11.0873 332.115 13.332 396.649 61.334C462.11 110.024 513.582 179.914 544.138 259.014C574.694 338.113 581.832 426.96 558.583 505.405C535.334 583.85 480.669 645.724 410.535 677.53C340.401 709.335 258.91 709.422 184.417 680.183C109.924 650.944 47.7999 591.5 13.9166 520.407C-19.9667 449.314 -30.0107 368.832 -13.1979 292.83C3.61492 216.827 47.0168 149.63 103.543 99.245C160.068 48.8601 228.423 20.4355 289 0L289 272L173.364 6.83079Z"
                fill="currentColor"
              />
            </svg>

            {avatarImage && (
              <div className="relative mx-auto w-72 h-72 lg:w-full lg:h-full">
                <Image
                  src={avatarImage.imageUrl}
                  alt={bio.name}
                  fill
                  data-ai-hint={avatarImage.imageHint}
                  className="relative rounded-full object-cover shadow-lg"
                  priority
                />
              </div>
            )}
          </motion.div>
        </div>

        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <Link href="#about" aria-label="Scroll to about section" className='flex items-center gap-2 text-muted-foreground'>
            <div className='relative w-4 h-8 rounded-full border-2 border-muted-foreground'>
                <motion.div 
                    className='absolute top-1 left-1/2 -translate-x-1/2 w-1 h-2 rounded-full bg-muted-foreground'
                    animate={{y: [0, 12, 0]}}
                    transition={{duration: 1.5, repeat: Infinity, repeatType: 'loop'}}
                />
            </div>
            Scroll down
        </Link>
      </motion.div>

      </div>
    </section>
  );
}
