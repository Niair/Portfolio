import type { LucideIcon } from "lucide-react";

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageId: string;
  liveDemoUrl: string;
  sourceCodeUrl: string;
  metrics: { name: string; value: number; fill: string }[];
};

export type Skill = {
  name: string;
  icon: LucideIcon;
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
  skills: Skill[];
  experience: Experience[];
};
