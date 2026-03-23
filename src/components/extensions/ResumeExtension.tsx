"use client";

import React from "react";
import { Download, FileText } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import SectionHeading from "../ui/SectionHeading";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export default function ResumeExtension() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Spotlight radial gradient follow (Warm orange cinematic)
  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseX}px ${mouseY}px,
      rgba(255, 123, 0, 0.08),
      transparent 80%
    )
  `;

  return (
    <SectionWrapper id="resume" className="py-20">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        <div className="w-full text-center md:text-left">
            <SectionHeading title="Resume" />
        </div>
        
        <motion.div 
          className="group relative w-full mt-10 rounded-[2rem] glass-card overflow-hidden interactive"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }} // Snappy animation
          onMouseMove={handleMouseMove}
        >
          {/* Spotlight overlay */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
            style={{ background: spotlightBackground }}
          />
          
          <div className="relative p-8 md:p-14 flex flex-col md:flex-row items-center gap-10 md:gap-16 z-10 w-full bg-cinematic-dark/40">
              {/* 3D Icon - simplified rotation for snappier feel */}
              <motion.div 
                className="w-32 h-32 md:w-36 md:h-36 rounded-2xl bg-black/60 border border-cinematic-orange/20 flex items-center justify-center text-cinematic-orange shadow-[0_8px_32px_rgba(255,123,0,0.1)] flex-shrink-0 group-hover:border-cinematic-orange/50 transition-colors duration-300"
                whileHover={{ scale: 1.05, rotateZ: 5 }}
                transition={{ duration: 0.3 }}
              >
                  <FileText size={48} className="drop-shadow-[0_0_12px_rgba(255,123,0,0.6)]" />
              </motion.div>
              
              <div className="flex-1 text-center md:text-left flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-white mb-2 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Rishi Karthik S</h3>
                <p className="text-cinematic-teal text-xl mb-6 font-medium tracking-wide drop-shadow-[0_0_5px_rgba(0,180,216,0.5)]">Full-Stack Engineer</p>
                <p className="text-white/60 leading-relaxed mb-8 max-w-xl mx-auto md:mx-0 text-lg font-light">
                  Dive into my technical journey. Discover a comprehensive overview of my experience, advanced coursework, and the architectures I&apos;ve built.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
                  <a 
                    href="/resume.pdf" 
                    download
                    className="relative px-8 py-4 rounded-xl bg-gradient-cinematic font-bold text-white/90 overflow-hidden group/btn hover:shadow-[0_0_20px_rgba(255,123,0,0.4)] transition-all duration-300 flex items-center justify-center gap-3 border border-transparent"
                  >
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                    <Download size={20} className="relative z-10" />
                    <span className="relative z-10">Download PDF</span>
                  </a>
                </div>
              </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
