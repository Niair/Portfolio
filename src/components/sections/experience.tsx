'use client';

import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { bio } from '@/lib/data';
import { Button } from '@/components/ui/button';

type TabType = 'professional' | 'academic';

export function Experience() {
  const [activeTab, setActiveTab] = useState<TabType>('professional');

  return (
    <section id="experience" className="py-16 md:py-24 px-4 md:px-8">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">My Journey</h2>
          <p className="text-muted-foreground text-lg">
            A timeline of my academic and professional milestones.
          </p>
        </motion.div>

        {/* Tab Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-4 mb-12"
        >
          <Button
            variant={activeTab === 'academic' ? 'default' : 'outline'}
            size="lg"
            onClick={() => setActiveTab('academic')}
            className="gap-2"
          >
            <GraduationCap className="h-5 w-5" />
            Academic
          </Button>
          <Button
            variant={activeTab === 'professional' ? 'default' : 'outline'}
            size="lg"
            onClick={() => setActiveTab('professional')}
            className="gap-2"
          >
            <Briefcase className="h-5 w-5" />
            Professional
          </Button>
        </motion.div>

        {/* Content */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-border" />

          {/* Academic Tab */}
          {activeTab === 'academic' && bio.education && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-12"
            >
              {bio.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8 md:pl-20"
                >
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="absolute left-0 md:left-[26px] top-2 w-4 h-4 rounded-full bg-primary border-4 border-background"
                  />

                  <div className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold">
                          {edu.degree}
                        </h3>
                        <p className="text-lg text-muted-foreground">
                          {edu.institution}
                        </p>
                      </div>
                      <span className="text-sm bg-secondary px-3 py-1 rounded-full whitespace-nowrap">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{edu.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Professional Tab */}
          {activeTab === 'professional' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-12"
            >
              {bio.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8 md:pl-20"
                >
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="absolute left-0 md:left-[26px] top-2 w-4 h-4 rounded-full bg-primary border-4 border-background"
                  />

                  <div className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold">
                          {exp.role}
                        </h3>
                        <p className="text-lg text-muted-foreground">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-sm bg-secondary px-3 py-1 rounded-full whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}