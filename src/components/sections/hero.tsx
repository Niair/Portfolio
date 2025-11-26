'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown, Download, Play } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { bio } from '@/lib/data';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import Link from 'next/link';
import { TextReveal } from '@/components/text-reveal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';

export function Hero() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadResume = () => {
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // Make sure you put Resume.pdf in public folder
    link.download = 'Nihal_Kumar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const avatarImage = getPlaceholderImage(bio.avatarImageId);

  const prefersReducedMotion = useReducedMotion();

  // Typewriter effect for roles
  const roles = useMemo(() => bio.headline.split(' | '), []);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex] ?? '';

    if (prefersReducedMotion) {
      // Just show static role if user prefers reduced motion
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

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });
 
  const translateX = useTransform(smoothX, [0, 1], [-30, 30]);
  const translateY = useTransform(smoothY, [0, 1], [-20, 20]);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    mouseX.set(Math.min(Math.max(x, 0), 1));
    mouseY.set(Math.min(Math.max(y, 0), 1));
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 md:px-8 overflow-hidden"
      onMouseMove={prefersReducedMotion ? undefined : handleMouseMove}
    >
      {/* Enhanced animated background with morphing blobs */}
      <motion.div
        className="absolute inset-0 -z-20"
        animate={prefersReducedMotion ? undefined : {
          background: [
            "radial-gradient(circle at 20% 30%, hsla(258, 94%, 63%, 0.3), transparent 60%), " +
            "radial-gradient(circle at 80% 70%, hsla(199, 89%, 48%, 0.25), transparent 55%), " +
            "radial-gradient(circle at 40% 80%, hsla(335, 88%, 62%, 0.2), transparent 50%)",
            
            "radial-gradient(circle at 70% 20%, hsla(258, 94%, 63%, 0.25), transparent 55%), " +
            "radial-gradient(circle at 30% 60%, hsla(199, 89%, 48%, 0.3), transparent 60%), " +
            "radial-gradient(circle at 90% 90%, hsla(335, 88%, 62%, 0.22), transparent 52%)",
            
            "radial-gradient(circle at 10% 70%, hsla(258, 94%, 63%, 0.28), transparent 58%), " +
            "radial-gradient(circle at 60% 10%, hsla(199, 89%, 48%, 0.27), transparent 53%), " +
            "radial-gradient(circle at 85% 40%, hsla(335, 88%, 62%, 0.24), transparent 48%)",
            
            "radial-gradient(circle at 20% 30%, hsla(258, 94%, 63%, 0.3), transparent 60%), " +
            "radial-gradient(circle at 80% 70%, hsla(199, 89%, 48%, 0.25), transparent 55%), " +
            "radial-gradient(circle at 40% 80%, hsla(335, 88%, 62%, 0.2), transparent 50%)",
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          x: prefersReducedMotion ? 0 : translateX,
          y: prefersReducedMotion ? 0 : translateY,
        }}
      />
      
      {/* Secondary gradient layer for depth */}
      <motion.div 
        className="absolute inset-0 -z-19"
        animate={prefersReducedMotion ? undefined : {
          opacity: [0.3, 0.6, 0.4, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: "radial-gradient(circle at 50% 50%, hsla(var(--primary) / 0.15), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-secondary/20 -z-10" />
 
      {/* Interactive particle system with antigravity effects */}
      {!prefersReducedMotion && (
        <ParticleSystem />
      )}
 
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 md:space-y-6 order-2 md:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight flex flex-wrap items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Hi, I&apos;m <span className="text-primary">{bio.name}</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs md:text-sm font-medium text-emerald-400 border border-emerald-500/40">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Open to opportunities
                </span>
                <motion.span
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  className="inline-block origin-bottom-right ml-2"
                >
                  👋
                </motion.span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-base md:text-lg text-muted-foreground font-mono"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-primary/70">Roles</span>
                <div className="mt-1 text-sm md:text-base">
                  <span className="opacity-60">I specialize in </span>
                  <span className="text-primary">{typedText}</span>
                  {!prefersReducedMotion && <span className="inline-block w-2 h-5 -mb-1 bg-primary/80 ml-1 animate-pulse" />}
                </div>
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed"
            >
              <TextReveal text={bio.summary} />
            </motion.p>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-4 text-xs md:text-sm text-muted-foreground/90"
            >
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary/60 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                150+ LeetCode problems solved
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary/60 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Active on GitHub @Niair
              </span>
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="interactive-ripple btn-enhanced group w-full sm:w-auto"
                  onClick={downloadResume}
                >
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center"
                  >
                    <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                    Download Resume
                  </motion.div>
                </Button>
              </motion.div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="interactive-ripple btn-enhanced group w-full sm:w-auto"
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="flex items-center"
                      >
                        <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                        Intro Video
                      </motion.div>
                    </Button>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Intro to my work</DialogTitle>
                    <DialogDescription>
                      Short overview of my background, projects, and how I approach building ML systems.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 aspect-video w-full overflow-hidden rounded-xl border bg-black/80">
                    <iframe
                      className="h-full w-full"
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                      title="Intro video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>

          </motion.div>

          {/* Right side - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative order-1 md:order-2 group"
          >
            <motion.div
              animate={prefersReducedMotion ? undefined : { y: [0, -20, 0] }}
              transition={prefersReducedMotion ? undefined : {
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="relative"
            >
              {/* Enhanced glowing background effect with hover animation */}
              <motion.div 
                className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"
                animate={prefersReducedMotion ? undefined : {
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Secondary glow layer */}
              <motion.div 
                className="absolute inset-0 rounded-full blur-2xl"
                animate={prefersReducedMotion ? undefined : {
                  scale: [1.1, 1.3, 1.1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                style={{
                  background: "radial-gradient(circle, hsla(var(--primary) / 0.3), transparent 70%)",
                }}
              />
              
              <div className="relative w-full aspect-square max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                {/* Gradient background with hover effect */}
                <motion.div 
                  className="absolute inset-0 rounded-full"
                  animate={prefersReducedMotion ? undefined : {
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    background: "conic-gradient(from 0deg, hsla(var(--primary) / 0.4), hsla(var(--primary) / 0.1), hsla(var(--primary) / 0.4))",
                  }}
                />
                
                {/* Image container with enhanced hover effects */}
                <motion.div 
                  className="relative w-full h-full rounded-full overflow-hidden"
                  whileHover={prefersReducedMotion ? undefined : {
                    scale: 1.05,
                    rotateY: 5,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  {avatarImage && (
                    <>
                      <Image
                        src={avatarImage.imageUrl}
                        alt={bio.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="rounded-full object-cover border-4 border-background shadow-2xl"
                        priority
                        data-ai-hint={avatarImage.imageHint}
                      />
                      {/* Overlay with subtle gradient */}
                      <motion.div 
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: "linear-gradient(135deg, transparent 60%, hsla(var(--primary) / 0.1) 100%)",
                        }}
                      />
                    </>
                  )}
                </motion.div>
              </div>
            </motion.div>

            {/* Enhanced floating tech badges - hidden on mobile */}
            <div className="hidden md:block">
              {[
                { name: 'Python', icon: '🐍', color: 'hsl(217, 89%, 61%)' },
                { name: 'ML', icon: '🧠', color: 'hsl(142, 71%, 45%)' },
                { name: 'AI', icon: '🤖', color: 'hsl(262, 83%, 64%)' },
                { name: 'LLM', icon: '💬', color: 'hsl(39, 94%, 55%)' },
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    delay: 1.5 + index * 0.15,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: {
                      rotate: { duration: 0.5, ease: "easeInOut" },
                      scale: { duration: 0.2 }
                    }
                  }}
                  className="absolute bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-primary/20 cursor-pointer"
                  style={{
                    top: `${20 + index * 20}%`,
                    right: `${index % 2 === 0 ? -20 : 'auto'}`,
                    left: `${index % 2 === 1 ? -20 : 'auto'}`,
                    background: `linear-gradient(135deg, hsla(var(--background) / 0.8), ${tech.color}20)`,
                    boxShadow: `0 4px 20px ${tech.color}30`,
                  }}
                >
                  <span className="mr-2 text-xs">{tech.icon}</span>
                  <span style={{ color: tech.color }}>{tech.name}</span>
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.5, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: `radial-gradient(circle, ${tech.color}40, transparent 70%)`,
                      pointerEvents: 'none',
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: [0, 10, 0] }}
        transition={prefersReducedMotion ? { delay: 2 } : {
          opacity: { delay: 2 },
          y: { duration: 1.5, repeat: Infinity },
        }}
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors hidden md:flex"
      >
        <span className="text-sm">Scroll down</span>
        <ArrowDown className="h-5 w-5" />
      </motion.button>
    </section>
  );
}

// Interactive Particle System with Antigravity Effects
function ParticleSystem() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
    originalX: number;
    originalY: number;
  }>>([]);

  useEffect(() => {
    // Initialize particles
    const initialParticles = Array.from({ length: 25 }, (_, i) => {
      const isForeground = i < 12;
      const x = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200);
      const y = Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800);
      
      return {
        id: i,
        x,
        y,
        originalX: x,
        originalY: y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: isForeground ? Math.random() * 4 + 2 : Math.random() * 2 + 1,
        opacity: isForeground ? Math.random() * 0.4 + 0.3 : Math.random() * 0.2 + 0.1,
        color: isForeground ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.6)',
      };
    });
    
    setParticles(initialParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const animationFrame = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let { x, y, vx, vy, originalX, originalY } = particle;
          
          // Calculate distance from mouse
          const dx = mousePosition.x - x;
          const dy = mousePosition.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 200;
          
          // Antigravity effect: particles repel from mouse
          if (distance < maxDistance && distance > 0) {
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            const repelForce = force * 0.02;
            
            vx -= Math.cos(angle) * repelForce;
            vy -= Math.sin(angle) * repelForce;
          }
          
          // Gentle drift towards original position when mouse is far
          if (distance > maxDistance) {
            const returnForce = 0.005;
            vx += (originalX - x) * returnForce;
            vy += (originalY - y) * returnForce;
          }
          
          // Apply velocity damping
          vx *= 0.98;
          vy *= 0.98;
          
          // Update position
          x += vx;
          y += vy;
          
          // Boundary wrapping
          const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
          const height = typeof window !== 'undefined' ? window.innerHeight : 800;
          
          if (x < -50) {
            x = width + 50;
            originalX = x;
          } else if (x > width + 50) {
            x = -50;
            originalX = x;
          }
          
          if (y < -50) {
            y = height + 50;
            originalY = y;
          } else if (y > height + 50) {
            y = -50;
            originalY = y;
          }
          
          return {
            ...particle,
            x,
            y,
            vx,
            vy,
            originalX,
            originalY,
          };
        })
      );
    };

    const interval = setInterval(animationFrame, 16); // ~60fps
    return () => clearInterval(interval);
  }, [mousePosition]);

  return (
    <div className="absolute inset-0 overflow-hidden -z-10 hidden md:block pointer-events-none">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}40`,
          }}
          whileHover={{
            scale: 1.5,
            opacity: particle.opacity * 1.5,
            boxShadow: `0 0 ${particle.size * 4}px ${particle.color}60`,
          }}
          transition={{
            scale: { duration: 0.3, ease: "easeOut" },
            opacity: { duration: 0.3 },
          }}
        />
      ))}
    </div>
  );
}
