'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
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
    <section id="projects" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold tracking-tight sm:text-5xl font-headline bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            Featured Projects
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "4rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground"
          >
            A showcase of my passion for data science, AI, and building innovative solutions
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12"
        >
          <div className="w-full md:max-w-sm">
            <div className="relative">
              <Input
                placeholder="Search projects..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-11 glass border-primary/20 focus:border-primary/50 h-12"
              />
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {techFilters.map((tag, index) => (
              <motion.button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * index }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'interactive-ripple rounded-xl px-5 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  activeFilter === tag
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'glass border border-primary/20 text-foreground hover:border-primary/40 hover:bg-primary/10'
                )}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <p className="text-2xl text-muted-foreground">No projects found matching your criteria</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search query</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}