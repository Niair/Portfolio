'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { bio } from '@/lib/data';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';

function AnimatedCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 100, damping: 15, mass: 0.5 });
  const rounded = useTransform(spring, latest => Math.floor(latest));

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  return (
    <motion.span ref={ref}>{rounded}</motion.span>
  );
}

export function About() {
  const aboutImage = getPlaceholderImage('about');

  return (
    <section id="about" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4"
          >
            About Me
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "60px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="h-1 bg-primary mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-2 flex justify-center">
            {aboutImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative w-80 h-96 rounded-2xl overflow-hidden shadow-xl card-hover"
              >
                <Image
                  src={aboutImage.imageUrl}
                  alt="A professional portrait of Nihal"
                  fill
                  sizes="(max-width: 1024px) 80vw, 320px"
                  data-ai-hint={aboutImage.imageHint}
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </motion.div>
            )}
          </div>
          
          <div className="lg:col-span-3">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-lg text-foreground/80 leading-relaxed mb-8"
            >
              {bio.summary}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {['Machine Learning', 'Data Visualization', 'Statistical Analysis', 'Deep Learning'].map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * index }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="inline-flex items-center rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-foreground border border-border"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-3 gap-6 mb-10"
            >
              {[
                { value: 4, label: 'Years Experience' },
                { value: 23, label: 'Projects Completed' },
                { value: 3, label: 'Companies Worked' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="text-center p-5 rounded-xl bg-secondary/50 border border-border"
                >
                  <p className="text-4xl font-bold text-primary">
                    <AnimatedCounter value={stat.value} />+
                  </p>
                  <p className="text-muted-foreground mt-2 text-xs uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Button 
                asChild 
                className="interactive-ripple btn-enhanced bg-primary hover:bg-primary/90 text-primary-foreground shadow-md" 
                size="lg"
              >
                <Link href="#contact">Get In Touch</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}