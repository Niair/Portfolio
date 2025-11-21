'use client';

import { useState } from 'react';
import { bio } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, GraduationCap } from 'lucide-react';
import type { Experience as ExperienceType } from '@/lib/types';
import { motion } from 'framer-motion';

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
    <section id="experience" className="py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">
            My Journey
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A timeline of my academic and professional milestones.
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-3xl mx-auto"
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-card p-1.5 rounded-lg">
            <TabsTrigger
              value="academic"
              className="flex items-center gap-2 text-md rounded-md py-2.5 px-4"
            >
              <GraduationCap className="h-5 w-5" /> Academic
            </TabsTrigger>
            <TabsTrigger
              value="professional"
              className="flex items-center gap-2 text-md rounded-md py-2.5 px-4"
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

const formatDescription = (description: string) => {
  const parts = description.split(/(\d+%?|3x)/g);
  return parts.map((part, index) =>
    part.match(/(\d+%?|3x)/g) ? (
      <strong key={index} className="font-bold text-primary">
        {part}
      </strong>
    ) : (
      part
    )
  );
};


function ExperienceList({ items }: { items: ExperienceType[] }) {
  return (
    <div className="relative border-l-2 border-primary/20 pl-10">
      {items.map((item, index) => (
        <motion.div 
          key={index} 
          className="relative mb-12"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="absolute -left-[45.5px] top-1 flex items-center justify-center w-7 h-7 bg-primary rounded-full ring-8 ring-background">
            <Briefcase className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-muted-foreground mb-1">{item.period}</p>
            <h3 className="text-2xl font-bold text-foreground font-headline">{item.role}</h3>
            <p className="text-md font-medium text-primary mt-1">{item.company}</p>
            {item.description && (
              <p className="mt-4 text-md text-foreground/80 leading-relaxed">
                {formatDescription(item.description)}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
