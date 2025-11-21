'use client';

import { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
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
  // Smooth scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Enable smooth scrolling
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="flex min-h-screen w-full">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      <DesktopSidebar />
      
      <div className="flex-1 flex flex-col md:pl-16">
        <Header />
        
        <main className="flex-1 pb-24 md:pb-0">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Hero />
          </motion.div>

          {/* About Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <About />
          </motion.div>

          <Separator className="my-12 md:my-24" />

          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <Experience />
          </motion.div>

          <Separator className="my-12 md:my-24" />

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <Skills />
          </motion.div>

          <Separator className="my-12 md:my-24" />

          {/* Projects Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <Projects />
          </motion.div>

          <Separator className="my-12 md:my-24" />

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <Contact />
          </motion.div>
        </main>
        
        <div className="md:hidden">
          <CubeNav />
        </div>
      </div>
    </div>
  );
}