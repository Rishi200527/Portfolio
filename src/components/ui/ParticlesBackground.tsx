"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ParticlesBackground() {
  const [mounted, setMounted] = useState(false);
  
  const [particles, setParticles] = useState<Array<{id: number, width: number, height: number, left: string, top: string, animationDuration: string, delay: string}>>([]);

  useEffect(() => {
    setMounted(true);
    // Fewer, softer dust motes for cinematic feel
    const generatedParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 15 + 15}s`, // Even slower (15-30s duration)
      delay: `${Math.random() * 10}s`,
    }));
    setParticles(generatedParticles);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-transparent">
      {/* Ambient cinematic gradient blobs for deep shadow and warmth - using max constraints to prevent overflow */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] max-w-none rounded-full bg-cinematic-teal/10 blur-[150px] animate-blob mix-blend-screen opacity-60" />
      <div className="absolute top-[20%] right-[-10%] w-[480px] h-[480px] max-w-none rounded-full bg-cinematic-orange/10 blur-[150px] animate-blob animation-delay-2000 mix-blend-screen opacity-50" />
      <div className="absolute bottom-[-10%] left-[20%] w-[540px] h-[540px] max-w-none rounded-full bg-cinematic-teal/10 blur-[150px] animate-blob animation-delay-4000 mix-blend-screen opacity-40" />
      
      {/* Cinematic ambient dust motes */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-cinematic-orange/20 filter blur-[1px]" // Warm fuzzy motes
          style={{
            width: particle.width,
            height: particle.height,
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: ["0%", "-100%"],
            x: ["0%", "5%", "-5%", "0%"], // Subtler drift
            opacity: [0, 0.4, 0], // Very soft fade
          }}
          transition={{
            duration: parseFloat(particle.animationDuration),
            repeat: Infinity,
            ease: "linear",
            delay: parseFloat(particle.delay)
          }}
        />
      ))}
    </div>
  );
}
