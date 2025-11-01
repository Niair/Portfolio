import { bio } from "@/lib/data";
import { getPlaceholderImage } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export function About() {
  const avatarImage = getPlaceholderImage(bio.avatarImageId);
  return (
    <section id="about" className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12 sm:text-4xl">
          About Me
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1 flex flex-col items-center text-center">
            {avatarImage && (
              <Image
                src={avatarImage.imageUrl}
                alt={bio.name}
                width={200}
                height={200}
                data-ai-hint={avatarImage.imageHint}
                className="rounded-full mb-6 shadow-lg"
              />
            )}
            <h3 className="text-2xl font-semibold">{bio.name}</h3>
            <p className="text-primary">{bio.headline}</p>
          </div>

          <div className="lg:col-span-2 space-y-10">
            <div>
              <h3 className="text-2xl font-semibold mb-6">My Skills</h3>
              <div className="flex flex-wrap gap-4">
                {bio.skills.map((skill) => (
                  <Badge key={skill.name} variant="outline" className="text-base px-4 py-2 flex items-center gap-2 bg-background">
                    <skill.icon className="h-5 w-5 text-primary" />
                    <span>{skill.name}</span>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6">Experience</h3>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-border before:opacity-50">
                {bio.experience.map((exp, index) => (
                  <div key={index} className="relative flex items-start pl-12">
                     <span className="absolute left-[11px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-8 ring-secondary">
                        <span className="h-2.5 w-2.5 rounded-full bg-primary-foreground"></span>
                    </span>
                    <div className="flex-1">
                      <p className="font-semibold text-lg">{exp.role}</p>
                      <p className="text-sm text-primary">{exp.company} | {exp.period}</p>
                      <p className="mt-2 text-foreground/80">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
