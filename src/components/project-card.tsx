"use client";

import Image from "next/image";
import type { Project } from "@/lib/types";
import { getPlaceholderImage } from "@/lib/placeholder-images";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, ExternalLink } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartConfig } from "@/components/ui/chart";
import { motion } from "framer-motion";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const projectImage = getPlaceholderImage(project.imageId);

  const chartConfig = project.metrics.reduce((acc, metric) => {
    acc[metric.name.toLowerCase()] = {
      label: metric.name,
      color: metric.fill,
    };
    return acc;
  }, {} as ChartConfig);

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
      <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-xl">
        {projectImage && (
          <div className="relative h-60 w-full">
            <Image
              src={projectImage.imageUrl}
              alt={project.title}
              fill
              data-ai-hint={projectImage.imageHint}
              className="object-cover"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-6">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <div>
            <h4 className="font-semibold mb-2">Key Metrics</h4>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={project.metrics} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <Tooltip
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    contentStyle={{
                        background: "hsl(var(--background))",
                        borderRadius: 'var(--radius)',
                        border: '1px solid hsl(var(--border))'
                    }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-shrink-0 gap-4">
          <Button asChild className="w-full">
            <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <a href={project.sourceCodeUrl} target="_blank" rel="noopener noreferrer">
              <Code className="mr-2 h-4 w-4" />
              Source Code
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
