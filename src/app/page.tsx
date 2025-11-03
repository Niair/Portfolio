import Chatbot from '@/components/chatbot';
import Header from '@/components/header';
import { About } from '@/components/sections/about';
import { Contact } from '@/components/sections/contact';
import { Experience } from '@/components/sections/experience';
import { Hero } from '@/components/sections/hero';
import { Projects } from '@/components/sections/projects';
import { Skills } from '@/components/sections/skills';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 pb-24 md:pb-0">
        <Hero />
        <About />
        <Separator className="my-12 md:my-24" />
        <Experience />
        <Separator className="my-12 md:my-24" />
        <Skills />
        <Separator className="my-12 md:my-24" />
        <Projects />
        <Separator className="my-12 md:my-24" />
        <Contact />
      </main>
      <Chatbot />
    </div>
  );
}
