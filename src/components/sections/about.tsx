import { bio } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12 sm:text-4xl">
          About Me
        </h2>
        <div className="max-w-3xl mx-auto">
            <p className="text-lg text-center text-foreground/80">
              {bio.summary}
            </p>
        </div>
      </div>
    </section>
  );
}
