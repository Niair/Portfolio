'use client';

import Image from 'next/image';
import type { Project } from '@/lib/types';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Code, ExternalLink, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const projectImage = getPlaceholderImage(project.imageId);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-xl bg-card border rounded-2xl">
        {projectImage && (
          <div className="relative h-60 w-full">
            <Image
              src={projectImage.imageUrl}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={projectImage.imageHint}
              className="object-cover"
              priority={index < 2}
              loading={index < 2 ? 'eager' : 'lazy'}
            />
          </div>
        )}
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription className="mt-2">{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-6">
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="rounded-lg">
                {tag}
              </Badge>
            ))}
          </div>
           {project.metrics.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2 text-sm">Key Metrics:</h4>
              <div className="flex flex-wrap gap-2">
                {project.metrics.slice(0, 3).map(metric => (
                  <Badge key={metric.name} variant="outline" className="font-mono">
                    {metric.name}: {metric.value}%
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex-shrink-0 gap-2 flex-wrap">
           {project.liveDemoUrl && project.liveDemoUrl !== '#' && (
            <Button asChild size="sm">
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
          {project.sourceCodeUrl && project.sourceCodeUrl !== '#' && (
            <Button asChild variant="outline" size="sm">
              <a
                href={project.sourceCodeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Code className="mr-2 h-4 w-4" />
                Source Code
              </a>
            </Button>
          )}
           {project.youtubeUrl && project.youtubeUrl !== '#' && (
            <Button asChild variant="outline" size="sm">
              <a
                href={project.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="mr-2 h-4 w-4" />
                YouTube
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
