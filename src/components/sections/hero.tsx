'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown, Download, Play, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { bio } from '@/lib/data';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';

// Subtle Google Antigravity-style Particle System
function SubtleAntigravityParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    mass: number;
    baseX: number;
    baseY: number;
  }>>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const spacing = 80;
      const cols = Math.ceil(canvas.width / spacing);
      const rows = Math.ceil(canvas.height / spacing);
      
      particlesRef.current = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing + Math.random() * 20 - 10;
          const y = j * spacing + Math.random() * 20 - 10;
          particlesRef.current.push({
            x,
            y,
            vx: 0,
            vy: 0,
            radius: 1.5,
            mass: 1,
            baseX: x,
            baseY: y,
          });
        }
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Antigravity from cursor
        if (mouseRef.current.active) {
          const dx = particle.x - mouseRef.current.x;
          const dy = particle.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 200;

          if (distance < maxDistance) {
            const force = ((maxDistance - distance) / maxDistance) * 0.5;
            const angle = Math.atan2(dy, dx);
            particle.vx += Math.cos(angle) * force;
            particle.vy += Math.sin(angle) * force;
          }
        }

        // Spring back to original position
        const springX = (particle.baseX - particle.x) * 0.02;
        const springY = (particle.baseY - particle.y) * 0.02;
        particle.vx += springX;
        particle.vy += springY;

        // Apply damping
        particle.vx *= 0.92;
        particle.vy *= 0.92;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Draw particle - subtle blue/gray
        ctx.save();
        ctx.fillStyle = 'rgba(59, 130, 246, 0.15)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw subtle connections
        particlesRef.current.forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120 && distance > 0) {
            ctx.save();
            const alpha = (1 - distance / 120) * 0.08;
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10"
      style={{ opacity: 0.4 }}
    />
  );
}

export function Hero() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Nihal_Kumar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const avatarImage = getPlaceholderImage(bio.avatarImageId);
  const prefersReducedMotion = useReducedMotion();

  // Typewriter effect
  const roles = useMemo(() => bio.headline.split(' | '), []);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex] ?? '';

    if (prefersReducedMotion) {
      setTypedText(currentRole);
      return;
    }

    const typingSpeed = isDeleting ? 40 : 120;
    const pauseAtEnd = 1400;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const next = currentRole.slice(0, typedText.length + 1);
        setTypedText(next);
        if (next === currentRole) {
          setIsDeleting(true);
        }
      } else {
        const next = currentRole.slice(0, typedText.length - 1);
        setTypedText(next);
        if (next.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typedText === currentRole && !isDeleting ? pauseAtEnd : typingSpeed);

    return () => clearTimeout(timeout);
  }, [roles, currentRoleIndex, typedText, isDeleting, prefersReducedMotion]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 md:px-8 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white"
    >
      {/* Subtle Particle System */}
      {!prefersReducedMotion && <SubtleAntigravityParticles />}

      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 order-2 md:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-6"
            >
              <motion.h1 
                className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="block text-foreground/80 text-2xl sm:text-3xl md:text-4xl font-normal mb-2">
                  Hi, I'm
                </span>
                <span className="block gradient-text">
                  {bio.name}
                </span>
              </motion.h1>

              <div className="flex flex-wrap gap-3 items-center">
                <motion.span
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-600 border border-emerald-200"
                  animate={prefersReducedMotion ? undefined : { scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  Open to opportunities
                </motion.span>
                
                <motion.span
                  className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200"
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="w-4 h-4" />
                  4+ Years Experience
                </motion.span>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-3"
              >
                <div className="text-xl md:text-2xl text-foreground/70 font-light">
                  <span>I excel in </span>
                  <span className="font-semibold text-primary">{typedText}</span>
                  {!prefersReducedMotion && <span className="inline-block w-0.5 h-6 -mb-1 bg-primary ml-1 animate-pulse" />}
                </div>
              </motion.div>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-3 text-sm text-muted-foreground"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                158+ LeetCode solved
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                GitHub @Niair
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="interactive-ripple btn-enhanced w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
                  onClick={downloadResume}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </motion.div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="interactive-ripple btn-enhanced w-full sm:w-auto border-2"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Intro Video
                    </Button>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Introduction to My Work</DialogTitle>
                    <DialogDescription>
                      Overview of my projects and approach to ML systems
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 aspect-video w-full overflow-hidden rounded-xl border bg-black">
                    <iframe
                      className="h-full w-full"
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                      title="Intro video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative order-1 md:order-2"
          >
            <motion.div
              animate={prefersReducedMotion ? undefined : { y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-blue-200/20 rounded-full blur-3xl" />
                
                {/* Image Container */}
                <motion.div 
                  className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  {avatarImage && (
                    <Image
                      src={avatarImage.imageUrl}
                      alt={bio.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="rounded-full object-cover"
                      priority
                      data-ai-hint={avatarImage.imageHint}
                    />
                  )}
                </motion.div>
              </div>
            </motion.div>

            {/* Floating Tech Badges */}
            <div className="hidden lg:block">
              {[
                { name: 'Python', delay: 0, top: '15%', right: '-10px' },
                { name: 'ML', delay: 0.15, top: '35%', left: '-10px' },
                { name: 'AI', delay: 0.3, top: '55%', right: '-10px' },
                { name: 'LLM', delay: 0.45, top: '75%', left: '-10px' },
              ].map((tech) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 1.5 + tech.delay,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="absolute px-5 py-2.5 rounded-full text-sm font-semibold bg-white border-2 border-blue-200 text-primary shadow-lg cursor-pointer"
                  style={{
                    top: tech.top,
                    right: tech.right,
                    left: tech.left,
                  }}
                >
                  {tech.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: [0, 8, 0] }}
        transition={prefersReducedMotion ? { delay: 2 } : {
          opacity: { delay: 2 },
          y: { duration: 2, repeat: Infinity },
        }}
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors hidden md:flex"
      >
        <span className="text-sm font-medium">Scroll down</span>
        <ArrowDown className="h-5 w-5" />
      </motion.button>
    </section>
  );
}