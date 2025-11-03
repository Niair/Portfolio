'use client';

import { useState } from 'react';
import { bio } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Calendar, GraduationCap } from 'lucide-react';
import type { Experience as ExperienceType } from '@/lib/types';
import { cn } from '@/lib/utils';

const experienceData = {
  professional: bio.experience,
  academic: [
    {
      company: 'University of Technology',
      role: 'Master of Science in Data Science',
      period: '2016 - 2018',
      description:
        'Focused on advanced machine learning algorithms and big data technologies.',
    },
    {
      company: 'State University',
      role: 'Bachelor of Science in Computer Science',
      period: '2012 - 2016',
      description:
        'Graduated with honors, specializing in software development and database management.',
    },
  ],
};

export function Experience() {
  const [activeTab, setActiveTab] = useState('professional');

  return (
    <section id="experience" className="py-16 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Experience
          </h2>
          <p className="mt-2 max-w-2xl mx-auto text-lg text-muted-foreground">
            My journey in the academic & professional front
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-3xl mx-auto"
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-transparent p-0">
            <TabsTrigger
              value="academic"
              className="flex items-center gap-2 text-lg data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=inactive]:text-muted-foreground"
            >
              <GraduationCap className="h-5 w-5" /> Academic
            </TabsTrigger>
            <TabsTrigger
              value="professional"
              className="flex items-center gap-2 text-lg data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=inactive]:text-muted-foreground"
            >
              <Briefcase className="h-5 w-5" /> Professional
            </TabsTrigger>
          </TabsList>
          <div className="relative mt-4">
             <div className="absolute top-0 left-1/2 w-1/2 h-0.5 bg-border -translate-x-full"></div>
             <div className="absolute top-0 right-1/2 w-1/2 h-0.5 bg-border translate-x-full"></div>
             <div
              className={cn(
                'absolute top-0 h-0.5 bg-primary transition-all duration-300',
                activeTab === 'academic' ? 'left-0 w-1/2' : 'left-1/2 w-1/2'
              )}
            />
          </div>
          <TabsContent value="academic" className="mt-12">
            <Timeline items={experienceData.academic} />
          </TabsContent>
          <TabsContent value="professional" className="mt-12">
            <Timeline items={experienceData.professional} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function Timeline({ items }: { items: ExperienceType[] }) {
  return (
    <div className="relative">
      <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border/40"></div>
      {items.map((item, index) => (
        <div key={index} className="relative mb-12 flex justify-center items-center">
          <div
            className={cn(
              'w-[calc(50%-2rem)]',
              index % 2 === 0 ? 'text-right' : 'order-2 text-left'
            )}
          >
            <h3 className="text-lg font-bold">{item.role}</h3>
            <p className="text-sm text-primary">{item.company}</p>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground" style={{justifyContent: index % 2 === 0 ? "flex-end" : "flex-start"}}>
              <Calendar className="h-4 w-4" />
              <span>{item.period}</span>
            </div>
            {item.description && (
              <p className="mt-2 text-sm text-foreground/80">
                {item.description}
              </p>
            )}
          </div>
          <div className="absolute left-1/2 top-1 h-4 w-4 -translate-x-1/2 rounded-full bg-primary ring-4 ring-background"></div>
        </div>
      ))}
    </div>
  );
}
