// Update your existing types.ts file - ADD these interfaces

import type { LucideIcon } from "lucide-react";

export interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  category: string;
  icon: LucideIcon; // lucide-react icon
  experience: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageId: string;
  liveDemoUrl?: string;
  sourceCodeUrl?: string;
  youtubeUrl?: string;
  metrics?: {
    name: string;
    value: number;
    fill: string;
  }[];
  techStack?: {
    name: string;
    level: number;
  }[];
}

export interface BioData {
  name: string;
  headline: string;
  summary: string;
  avatarImageId: string;
  skills: SkillCategory[];
  experience: Experience[];
  education?: Education[];
}

export interface Achievement {
  title: string;
  description: string;
  icon: string;
}
