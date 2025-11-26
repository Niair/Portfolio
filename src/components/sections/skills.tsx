'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { bio } from '@/lib/data';

export function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">
            Technical Skills
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A breakdown of my technical abilities and areas of expertise.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <Accordion
            type="multiple"
            className="w-full space-y-4"
            defaultValue={bio.skills.map((s,i) => `item-${i}`)}
          >
            {bio.skills.map((skillCategory, index) => (
              <motion.div
                key={skillCategory.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border rounded-2xl bg-card shadow-sm transition-shadow hover:shadow-lg"
                >
                <AccordionTrigger className="w-full flex justify-between items-center p-6 hover:no-underline">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary">
                      <skillCategory.icon className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold font-headline">
                        {skillCategory.category}
                      </h3>
                      <p className="text-sm text-muted-foreground">{skillCategory.experience}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0">
                  <div className="space-y-6">
                    {skillCategory.skills.map(skill => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="font-medium">{skill.name}</p>
                          <p className="text-sm text-foreground/80 font-mono">
                            {skill.level}%
                          </p>
                        </div>
                        <Progress value={skill.level} className="h-2"/>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
