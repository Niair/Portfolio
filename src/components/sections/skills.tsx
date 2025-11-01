"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { bio } from "@/lib/data";

export function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            My Skills
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            A breakdown of my technical abilities and expertise.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-4"
            defaultValue="item-0"
          >
            {bio.skills.map((skillCategory, index) => (
              <AccordionItem
                key={skillCategory.category}
                value={`item-${index}`}
                className="border-b-0"
              >
                <AccordionTrigger className="w-full flex justify-between items-center p-6 rounded-lg bg-secondary/50 hover:no-underline hover:bg-secondary/70 transition-colors data-[state=open]:bg-secondary/70">
                  <div className="flex items-center gap-4">
                    <skillCategory.icon className="h-8 w-8 text-primary" />
                    <div className="text-left">
                      <h3 className="text-lg font-semibold">
                        {skillCategory.category}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {skillCategory.experience}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-4 bg-secondary/20 rounded-b-lg">
                  <div className="space-y-6">
                    {skillCategory.skills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="font-medium">{skill.name}</p>
                          <p className="text-sm text-foreground/80">
                            {skill.level}%
                          </p>
                        </div>
                        <Progress value={skill.level} />
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
