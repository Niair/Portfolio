'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Youtube } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/lib/types';
import { getPlaceholderImage } from '@/lib/placeholder-images';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const projectImage = getPlaceholderImage(project.imageId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-full"
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-white border border-border shadow-lg h-full flex flex-col"
        whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-secondary">
          {project.liveDemoUrl && (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white shadow-md">
              ✨ Live Demo
            </span>
          )}
          
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
            {projectImage && (
              <Image
                src={projectImage.imageUrl}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                quality={90}
                data-ai-hint={projectImage.imageHint}
              />
            )}
          </motion.div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            className="absolute top-4 right-4 flex gap-2"
          >
            {project.liveDemoUrl && (
              <Button
                size="icon"
                className="rounded-full bg-white/90 hover:bg-white border shadow-md"
                asChild
              >
                <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
            {project.sourceCodeUrl && (
              <Button
                size="icon"
                className="rounded-full bg-white/90 hover:bg-white border shadow-md"
                asChild
              >
                <a href={project.sourceCodeUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            )}
            {project.youtubeUrl && (
              <Button
                size="icon"
                className="rounded-full bg-white/90 hover:bg-white border shadow-md"
                asChild
              >
                <a href={project.youtubeUrl} target="_blank" rel="noopener noreferrer">
                  <Youtube className="h-4 w-4" />
                </a>
              </Button>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-3 text-foreground">
              {project.title}
            </h3>
            <p className="text-muted-foreground line-clamp-3 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * i }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <Badge 
                  variant="secondary" 
                  className="border border-border hover:border-primary/50 transition-colors"
                >
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>

          {/* Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="pt-4 border-t border-border">
              <p className="text-sm font-semibold mb-3 text-foreground">Tech Stack Proficiency</p>
              <div className="space-y-3">
                {project.techStack.map((stackItem, i) => (
                  <div key={stackItem.name}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-foreground/80">{stackItem.name}</span>
                      <span className="font-semibold text-primary">{stackItem.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stackItem.level}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 + i * 0.08, duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="pt-4 border-t border-border">
              <p className="text-sm font-semibold mb-3 text-foreground">Key Metrics</p>
              <div className="space-y-3">
                {project.metrics.map((metric, i) => (
                  <div key={metric.name}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-foreground/80">{metric.name}</span>
                      <span className="font-semibold text-primary">{metric.value}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${metric.value}%` }}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: metric.fill }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {project.liveDemoUrl && (
              <Button
                className="interactive-ripple btn-enhanced flex-1 bg-primary hover:bg-primary/90 shadow-md"
                asChild
              >
                <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.sourceCodeUrl && (
              <Button
                variant="outline"
                className="interactive-ripple btn-enhanced flex-1 border-2"
                asChild
              >
                <a href={project.sourceCodeUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  Source
                </a>
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}