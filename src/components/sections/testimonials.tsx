'use client';

import { motion } from 'framer-motion';
import { testimonials } from '@/lib/data';
import { Quote } from 'lucide-react';

export function Testimonials() {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80 mb-2">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            What others say
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.article
              key={t.name + index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
              className="relative rounded-2xl border bg-card/80 backdrop-blur-md p-6 shadow-sm hover:shadow-lg transition-shadow flex flex-col gap-3"
            >
              <Quote className="absolute -top-4 -left-2 h-8 w-8 text-primary/20" />
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {t.text}
              </p>
              <div className="mt-4">
                <p className="font-semibold text-sm md:text-base">{t.name}</p>
                <p className="text-xs md:text-sm text-muted-foreground">{t.role}</p>
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex text-xs text-primary/90 hover:text-primary underline underline-offset-4"
                >
                  View on {t.source}
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
