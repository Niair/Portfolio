import { bio } from "@/lib/data";
import { getPlaceholderImage } from "@/lib/placeholder-images";
import Image from "next/image";

export function About() {
  const avatarImage = getPlaceholderImage(bio.avatarImageId);
  return (
    <section id="about" className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12 sm:text-4xl">
          About Me
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-1 flex flex-col items-center text-center">
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

          <div className="md:col-span-2">
            <p className="text-lg text-foreground/80 text-center md:text-left">
              {bio.summary}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
