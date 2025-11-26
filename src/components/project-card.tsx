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

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 20, mass: 0.4 });

  const rotateX = useTransform(springY, [-40, 40], [8, -8]);
  const rotateY = useTransform(springX, [-40, 40], [-8, 8]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const relX = event.clientX - (bounds.left + bounds.width / 2);
    const relY = event.clientY - (bounds.top + bounds.height / 2);

    x.set(relX);
    y.set(relY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseLeave();
      }}
      className="group relative"
    >
      <motion.div
        className="relative overflow-hidden rounded-xl border bg-card/95 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:bg-card/60 group-hover:shadow-2xl group-hover:border-primary/30"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image container with overlay */}
        <div className="relative h-64 overflow-hidden bg-muted">
          {project.liveDemoUrl && (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold text-emerald-50 shadow-md">
              Live Demo
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

          {/* Tech stack proficiency */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="pt-4 border-t">
              <p className="text-sm font-semibold mb-3">Tech stack proficiency</p>
              <div className="space-y-2">
                {project.techStack.map((stackItem, i) => (
                  <div key={stackItem.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{stackItem.name}</span>
                      <span className="font-semibold">{stackItem.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stackItem.level}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 + i * 0.08, duration: 0.7 }}
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
                className="interactive-ripple flex-1 group/btn"
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
                className="interactive-ripple flex-1 group/btn"
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
