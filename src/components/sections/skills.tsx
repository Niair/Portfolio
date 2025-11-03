'use client';

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
    <section id="skills" className="py-16 sm:py-32 bg-muted/20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            My Skills
          </h2>
          <p className="mt-2 max-w-2xl mx-auto text-lg text-muted-foreground">
            A breakdown of my technical abilities and expertise.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <Accordion
            type="multiple"
            className="w-full space-y-4"
            defaultValue={bio.skills.map((s,i) => `item-${i}`)}
          >
            {bio.skills.map((skillCategory, index) => (
              <AccordionItem
                key={skillCategory.category}
                value={`item-${index}`}
                className="border rounded-lg bg-card"
              >
                <AccordionTrigger className="w-full flex justify-between items-center p-6 hover:no-underline">
                  <div className="flex items-center gap-4">
                    <skillCategory.icon className="h-8 w-8 text-primary" />
                    <div className="text-left">
                      <h3 className="text-lg font-semibold">
                        {skillCategory.category}
                      </h3>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0">
                  <div className="space-y-6">
                    {skillCategory.skills.map(skill => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="font-medium">{skill.name}</p>
                          <p className="text-sm text-foreground/80">
                            {skill.level}%
                          </p>
                        </div>
                        <Progress value={skill.level} className="h-2"/>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
