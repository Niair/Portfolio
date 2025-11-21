// Update your existing types.ts file - ADD these interfaces

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
  icon: any; // lucide-react icon
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
}

export interface BioData {
  name: string;
  headline: string;
  summary: string;
  avatarImageId: string;
  skills: SkillCategory[];
  experience: Experience[];
  education?: Education[]; // ADD THIS LINE
}

export interface Achievement {
  title: string;
  description: string;
  icon: string;
}