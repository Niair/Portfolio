'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, Youtube } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative"
    >
      <motion.div
        className="relative bg-card rounded-xl overflow-hidden border shadow-lg hover:shadow-2xl transition-shadow"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Image container with overlay */}
        <div className="relative h-64 overflow-hidden">
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full"
          >
            <Image
              src={`https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop`}
              alt={project.title}
              fill
              className="object-cover"
            />
          </motion.div>
          
          {/* Gradient overlay */}
          <motion.div
            initial={{ opacity: 0 }}
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
                onClick={() => window.open(project.liveDemoUrl, '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
            {project.sourceCodeUrl && (
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full backdrop-blur-sm"
                onClick={() => window.open(project.sourceCodeUrl, '_blank')}
              >
                <Github className="h-4 w-4" />
              </Button>
            )}
            {project.youtubeUrl && (
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full backdrop-blur-sm"
                onClick={() => window.open(project.youtubeUrl, '_blank')}
              >
                <Youtube className="h-4 w-4" />
              </Button>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <motion.h3
              className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors"
              layoutId={`title-${project.id}`}
            >
              {project.title}
            </motion.h3>
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
                onClick={() => window.open(project.liveDemoUrl, '_blank')}
              >
                <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                Live Demo
              </Button>
            )}
            {project.sourceCodeUrl && (
              <Button
                variant="outline"
                className="flex-1 group/btn"
                onClick={() => window.open(project.sourceCodeUrl, '_blank')}
              >
                <Github className="mr-2 h-4 w-4 group-hover/btn:rotate-12 transition-transform" />
                Source Code
              </Button>
            )}
          </div>
        </div>

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: isHovered ? ["-100%", "100%"] : "-100%",
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
        </motion.div>
      </motion.div>

      {/* 3D shadow effect */}
      <motion.div
        className="absolute inset-0 bg-primary/20 rounded-xl blur-xl -z-10"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
      />
    </motion.div>
  );
}