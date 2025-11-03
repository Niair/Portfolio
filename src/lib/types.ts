import type { LucideIcon } from "lucide-react";

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageId: string;
  liveDemoUrl?: string;
  sourceCodeUrl?: string;
  youtubeUrl?: string;
  metrics: { name: string; value: number; fill: string }[];
};

export type Skill = {
  name: string;
  level: number;
};

export type SkillCategory = {
  category: string;
  icon: LucideIcon;
  experience: string;
  skills: Skill[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  description: string;
};

export type BioData = {
  name: string;
  headline: string;
  summary: string;
  avatarImageId: string;
  skills: SkillCategory[];
  experience: Experience[];
};

export type NavItem = {
    name: string;
    href: string;
    icon: LucideIcon;
}
