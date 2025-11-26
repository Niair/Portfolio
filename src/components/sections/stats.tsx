'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { achievements, stats } from '@/lib/data';

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 120, damping: 18, mass: 0.5 });
  const rounded = useTransform(spring, latest => Math.floor(latest));

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function StatsSection() {
  if (!stats?.length && !achievements?.length) return null;

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80 mb-2">
            By the numbers
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            Impact & achievements
          </h2>
        </motion.div>

        {/* Stats row */}
        {stats?.length > 0 && (
          <div className="grid gap-6 md:grid-cols-3 mb-10 md:mb-14">
            {stats.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
                className="rounded-2xl border bg-card/80 backdrop-blur-sm px-6 py-5 shadow-sm hover:shadow-lg transition-shadow"
              >
                <p className="text-3xl md:text-4xl font-extrabold text-primary">
                  <AnimatedNumber value={item.value} />
                  {item.suffix && <span className="ml-1 align-top text-xl md:text-2xl">{item.suffix}</span>}
                </p>
                <p className="mt-2 text-sm font-medium uppercase tracking-wide text-muted-foreground/90">
                  {item.label}
                </p>
                {item.hint && (
                  <p className="mt-1 text-xs text-muted-foreground">{item.hint}</p>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Achievements cards */}
        {achievements?.length > 0 && (
          <div className="grid gap-4 md:grid-cols-3 mb-10 md:mb-14">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 0.45, delay: 0.2 + index * 0.08, ease: 'easeOut' }}
                className="rounded-2xl border bg-card/70 backdrop-blur-md p-5 shadow-sm hover:shadow-lg transition-shadow flex flex-col gap-2"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-lg">
                    {achievement.icon}
                  </span>
                  <h3 className="text-base md:text-lg font-semibold">{achievement.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* GitHub activity widget */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mt-4 rounded-2xl border bg-card/80 backdrop-blur-md p-4 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              GitHub activity
            </p>
            <a
              href="https://github.com/Niair"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline underline-offset-4"
            >
              View profile
            </a>
          </div>
          <div className="relative w-full overflow-hidden rounded-xl border bg-background/80">
            <Image
              src="https://github-readme-stats.vercel.app/api?username=Niair&show_icons=true&theme=transparent&hide_border=true&custom_title=GitHub%20Stats"
              alt="GitHub stats for @Niair"
              width={800}
              height={360}
              className="w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
