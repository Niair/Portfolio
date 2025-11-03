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
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            My journey in the academic & professional front
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-3xl mx-auto"
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-card p-1 rounded-lg">
            <TabsTrigger
              value="academic"
              className="flex items-center gap-2 text-md rounded-md"
            >
              <GraduationCap className="h-5 w-5" /> Academic
            </TabsTrigger>
            <TabsTrigger
              value="professional"
              className="flex items-center gap-2 text-md rounded-md"
            >
              <Briefcase className="h-5 w-5" /> Professional
            </TabsTrigger>
          </TabsList>

          <TabsContent value="academic" className="mt-12">
            <ExperienceList items={experienceData.academic} />
          </TabsContent>
          <TabsContent value="professional" className="mt-12">
            <ExperienceList items={experienceData.professional} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function ExperienceList({ items }: { items: ExperienceType[] }) {
  return (
    <div className="space-y-8">
      {items.map((item, index) => (
        <div key={index} className="flex gap-x-4">
          <div>
            <h3 className="text-lg font-bold">{item.role}</h3>
            <p className="text-md text-primary font-medium mt-1">{item.company}</p>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{item.period}</span>
            </div>
            {item.description && (
              <p className="mt-2 text-md text-foreground/80">
                {item.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
