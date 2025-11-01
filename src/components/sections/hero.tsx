"use client";

import { bio, socialLinks } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section id="hero" className="relative h-[calc(100vh-4rem)] w-full">
      <div className="container mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          {bio.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 max-w-2xl text-lg text-foreground/80 sm:text-xl"
        >
          {bio.headline}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 max-w-3xl text-base text-foreground/70"
        >
          {bio.summary}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="#contact">Contact Me</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#projects">View My Work</Link>
          </Button>
        </motion.div>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 flex gap-4"
        >
            {socialLinks.map((social) => (
                <Button key={social.name} asChild variant="ghost" size="icon">
                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                        <social.icon className="h-5 w-5" />
                        <span className="sr-only">{social.name}</span>
                    </a>
                </Button>
            ))}
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="h-6 w-6 text-foreground/50" />
      </motion.div>
    </section>
  );
}
