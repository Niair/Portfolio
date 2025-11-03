'use client';

import { useState } from 'react';
import { projects } from '@/lib/data';
import { ProjectCard } from '@/components/project-card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const allTags = [
  'All',
  'ML',
  'NLP',
  'DL',
  'EDA',
  'MLOps',
];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter(p =>
          p.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()))
        );

  return (
    <section id="projects" className="py-16 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            My Projects
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Here are some of the projects I've worked on.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                activeFilter === tag
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
