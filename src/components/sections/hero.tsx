"use client";

import { bio, socialLinks } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Play, Send, Brain, Coffee, GitCommit, Heart, Laptop, Code } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { getPlaceholderImage } from "@/lib/placeholder-images";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function Hero() {
  const avatarImage = getPlaceholderImage(bio.avatarImageId);

  return (
    <section id="hero" className="relative min-h-[calc(100vh-4rem)] w-full flex items-center overflow-x-hidden">
      <div className="container mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 text-center md:grid-cols-5 md:text-left lg:px-8">
        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="hidden flex-col items-center justify-center gap-6 md:flex"
        >
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 transition-colors hover:text-primary"
            >
              <social.icon className="h-6 w-6" />
              <span className="sr-only">{social.name}</span>
            </a>
          ))}
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative col-span-1 mx-auto w-48 h-48 md:col-span-2 md:w-80 md:h-80"
        >
          <svg
            className="absolute -top-4 -left-4 w-[125%] h-auto text-primary md:-top-8 md:-left-8"
            viewBox="0 0 578 544"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M578 272C578 422.203 448.598 544 289 544C129.402 544 0 422.203 0 272C0 121.797 129.402 0 289 0C448.598 0 578 121.797 578 272Z"
              fill="currentColor"
            />
          </svg>

          {avatarImage && (
            <div className="relative mx-auto w-48 h-48 md:w-80 md:h-80">
              <Image
                src={avatarImage.imageUrl}
                alt={bio.name}
                width={320}
                height={320}
                data-ai-hint={avatarImage.imageHint}
                className="relative rounded-full object-cover shadow-lg"
                priority
              />
            </div>
          )}
          
          <Dialog>
            <DialogTrigger asChild>
                <motion.button
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="absolute bottom-0 right-0 md:bottom-2 md:right-4 flex h-14 w-14 items-center justify-center rounded-full bg-background text-primary shadow-lg ring-4 ring-background transition-transform hover:scale-110"
                  aria-label="Play video"
                >
                  <Play className="h-7 w-7" />
                </motion.button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Intro Video</DialogTitle>
                <DialogDescription>A short video introduction.</DialogDescription>
              </DialogHeader>
              <div className="aspect-video">
                <iframe
                  className="h-full w-full rounded-lg"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </DialogContent>
          </Dialog>

        </motion.div>

        {/* Info */}
        <div className="col-span-1 flex flex-col items-center md:col-span-2 md:items-start">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m {bio.name.split(" ")[0]}
            <span className="inline-block animate-wave">👋</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-2 flex items-center gap-2">
                <Laptop size={24} />
                <GitCommit size={24} />
                <Coffee size={24} />
                <Brain size={24} />
                <Heart size={24} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-4 max-w-xl text-lg text-foreground/80"
          >
            {bio.headline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Button asChild size="lg">
              <a href="/resume.pdf" download>
                <Download className="mr-2 h-5 w-5" />
                Resume
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#contact">
                Contact <Send className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

       <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <Link href="#about" aria-label="Scroll to about section">
            <ArrowDown className="h-6 w-6 text-foreground/50" />
        </Link>
      </motion.div>
    </section>
  );
}
