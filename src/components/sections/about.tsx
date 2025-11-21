import { bio } from '@/lib/data';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';

export function About() {
  const aboutImage = getPlaceholderImage('about');

  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            A brief introduction to my background and passion for data.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-24 items-center">
          <div className="lg:col-span-2 flex justify-center">
            {aboutImage && (
              <div className="relative w-80 h-96 rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-105 hover:shadow-primary/20">
                <Image
                  src={aboutImage.imageUrl}
                  alt="A professional portrait of Akshay"
                  fill
                  sizes="(max-width: 1024px) 80vw, 320px"
                  data-ai-hint={aboutImage.imageHint}
                  className="object-cover"
                  loading="lazy"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            )}
          </div>
          <div className="lg:col-span-3">
            <p className="text-xl text-foreground/80 leading-relaxed">
              I'm a passionate data scientist turning complex datasets into actionable insights through machine learning and data visualization. I am always excited to tackle new challenges and build innovative data-driven solutions.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-lg bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground">Machine Learning</span>
              <span className="inline-flex items-center rounded-lg bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground">Data Visualization</span>
              <span className="inline-flex items-center rounded-lg bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground">Statistical Analysis</span>
            </div>
            <div className="mt-10 flex gap-12">
              <div>
                <p className="text-5xl font-bold text-primary" aria-label="Over 4 years of experience">4+</p>
                <p className="text-muted-foreground mt-2 text-sm uppercase tracking-wider">Years experience</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-primary" aria-label="Over 23 projects completed">23+</p>
                <p className="text-muted-foreground mt-2 text-sm uppercase tracking-wider">Projects completed</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-primary" aria-label="Worked at over 3 companies">3+</p>
                <p className="text-muted-foreground mt-2 text-sm uppercase tracking-wider">Companies worked</p>
              </div>
            </div>
            <Button asChild className="mt-12" size="lg">
              <Link href="#contact">Leave a message</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
