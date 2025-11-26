'use client';

import { useMemo, useState } from 'react';
import { projects } from '@/lib/data';
import { ProjectCard } from '@/components/project-card';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [query, setQuery] = useState('');

  const techFilters = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return ['All', ...Array.from(tags).sort()];
  }, []);

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();

    return projects.filter((p) => {
      const matchesFilter =
        activeFilter === 'All' ||
        p.tags.some((tag) => tag.toLowerCase() === activeFilter.toLowerCase());

      if (!q) return matchesFilter;

      const inTitleDesc =
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      const inTags = p.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesFilter && (inTitleDesc || inTags);
    });
  }, [activeFilter, query]);

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">
            My Projects
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A selection of projects that showcase my passion for data science and AI.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="w-full md:max-w-sm">
            <div className="relative">
              <Input
                placeholder="Search projects by name, tech, or keywords..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {techFilters.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={cn(
                  'interactive-ripple rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  activeFilter === tag
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                )}
              >
                {tag}
              </button>
            ))}
          </div>
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
