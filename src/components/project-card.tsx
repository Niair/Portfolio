'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <motion.div
        className="relative bg-card rounded-xl overflow-hidden border shadow-lg hover:shadow-2xl transition-shadow"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Image container with overlay */}
        <div className="relative h-64 overflow-hidden bg-muted">
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
          
          {/* Gradient overlay */}
          <motion.div
            initial={{ opacity: 0.6 }}
            animate={{ opacity: isHovered ? 0.9 : 0.6 }}
            className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
          />

          {/* Floating action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            className="absolute top-4 right-4 flex gap-2"
          >
            {project.liveDemoUrl && (
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full backdrop-blur-sm"
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
                variant="secondary"
                className="rounded-full backdrop-blur-sm"
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
                variant="secondary"
                className="rounded-full backdrop-blur-sm"
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
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-muted-foreground line-clamp-3">
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
                transition={{ delay: 0.1 * i }}
              >
                <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="pt-4 border-t">
              <p className="text-sm font-semibold mb-3">Key Metrics:</p>
              <div className="space-y-2">
                {project.metrics.map((metric, i) => (
                  <motion.div
                    key={metric.name}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-1"
                  >
                    <div className="flex justify-between text-sm">
                      <span>{metric.name}</span>
                      <span className="font-semibold">{metric.value}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${metric.value}%` }}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="h-full bg-primary rounded-full"
                        style={{ backgroundColor: metric.fill }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            {project.liveDemoUrl && (
              <Button
                className="flex-1 group/btn"
                asChild
              >
                <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.sourceCodeUrl && (
              <Button
                variant="outline"
                className="flex-1 group/btn"
                asChild
              >
                <a href={project.sourceCodeUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4 group-hover/btn:rotate-12 transition-transform" />
                  Source Code
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute -top-1/2 -left-1/2 w-[200%] h-[300%] bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              transform: isHovered ? "rotate(20deg) translateX(40%)" : "rotate(20deg) translateX(-150%)",
            }}
            transition={{
              duration: isHovered ? 1 : 1.5,
              ease: 'easeOut',
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
