import { projects } from "@/lib/data";
import { ProjectCard } from "@/components/project-card";

export function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            My Projects
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Here are some of the projects I've worked on.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
