import Header from '@/components/header';
import { CubeNav } from '@/components/cube-nav';
import { DesktopSidebar } from '@/components/desktop-sidebar';
import { About } from '@/components/sections/about';
import { Contact } from '@/components/sections/contact';
import { Experience } from '@/components/sections/experience';
import { Hero } from '@/components/sections/hero';
import { Projects } from '@/components/sections/projects';
import { Skills } from '@/components/sections/skills';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full">
      <DesktopSidebar />
      <div className="flex-1 flex flex-col md:pl-16">
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
        <div className="md:hidden">
         <CubeNav />
        </div>
      </div>
    </div>
  );
}
