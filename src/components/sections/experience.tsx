"use client";

import { useState } from "react";
import { bio } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Calendar, GraduationCap } from "lucide-react";
import type { Experience as ExperienceType } from "@/lib/types";

const experienceData = {
  professional: bio.experience,
  academic: [
    {
      company: "University of Technology",
      role: "Master of Science in Data Science",
      period: "2016 - 2018",
      description: "Focused on advanced machine learning algorithms and big data technologies.",
    },
    {
      company: "State University",
      role: "Bachelor of Science in Computer Science",
      period: "2012 - 2016",
      description: "Graduated with honors, specializing in software development and database management.",
    },
  ],
};

export function Experience() {
  const [activeTab, setActiveTab] = useState("professional");

  return (
    <section id="experience" className="py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Experience
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            My journey in the academic & professional front
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50">
            <TabsTrigger value="academic" className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" /> Academic
            </TabsTrigger>
            <TabsTrigger value="professional" className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" /> Professional
            </TabsTrigger>
          </TabsList>
          <TabsContent value="academic" className="mt-12">
            <Timeline items={experienceData.academic} />
          </TabsContent>
          <TabsContent value="professional" className="mt-12">
            <Timeline items={experienceData.professional} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function Timeline({ items }: { items: ExperienceType[] }) {
  return (
    <div className="relative">
      <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border"></div>
      {items.map((item, index) => (
        <div key={index} className="relative mb-12">
          <div className="absolute left-1/2 top-1 h-4 w-4 -translate-x-1/2 rounded-full bg-primary ring-4 ring-background"></div>
          <div
            className={`w-1/2 p-4 ${
              index % 2 === 0 ? "pr-8 text-right" : "ml-auto pl-8 text-left"
            }`}
          >
            <h3 className="text-lg font-bold">{item.role}</h3>
            <p className="text-sm text-primary">{item.company}</p>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{item.period}</span>
            </div>
            {item.description && (
                <p className="mt-2 text-sm text-foreground/80">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
