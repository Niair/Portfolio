import { bio } from '@/lib/data';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';

export function About() {
  const aboutImage = getPlaceholderImage('about');

  return (
    <section id="about" className="py-16 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-5xl">
            About Me
          </h2>
          <p className="text-lg text-center text-muted-foreground mt-2">
            My Introduction
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2 flex justify-center">
            {aboutImage && (
              <div className="relative w-80 h-96 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={aboutImage.imageUrl}
                  alt="About me"
                  fill
                  data-ai-hint={aboutImage.imageHint}
                  className="object-cover"
                />
              </div>
            )}
          </div>
          <div className="lg:col-span-3">
            <p className="text-lg text-foreground/80 leading-relaxed">
              {bio.summary}
            </p>
            <div className="mt-8 flex gap-8">
              <div>
                <p className="text-4xl font-bold text-primary">04+</p>
                <p className="text-muted-foreground">Years XP</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary">23+</p>
                <p className="text-muted-foreground">Projects</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary">03+</p>
                <p className="text-muted-foreground">Companies</p>
              </div>
            </div>
            <Button asChild className="mt-8" size="lg">
              <Link href="#contact">Leave a message</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
