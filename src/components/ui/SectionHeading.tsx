"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
}

export default function SectionHeading({ title }: SectionHeadingProps) {
  return (
    <div className="mb-16 text-center md:text-left relative inline-block">
      {/* Movie-title style overflow-hidden wrapper for snap reveal */}
      <div className="overflow-hidden pb-2">
        <motion.h2 
          className="text-5xl md:text-6xl font-black tracking-tight cinematic-text uppercase"
          initial={{ opacity: 0, y: "100%" }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // Snappy cinematic ease
        >
          {title}
        </motion.h2>
      </div>
      
      {/* Animated cinematic underline glow */}
      <motion.div 
        className="h-1 bg-gradient-cinematic mx-auto md:mx-0 mt-4 rounded-full"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "100%", opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        style={{ maxWidth: "120px" }}
      />
      
      {/* Decorative cinematic dust motes around heading */}
      <motion.div 
        className="absolute -right-8 top-4 w-2 h-2 rounded-full bg-cinematic-orange cinematic-glow"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.8 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.4 }}
      />
      <motion.div 
        className="absolute -right-12 top-8 w-1.5 h-1.5 rounded-full bg-cinematic-teal drop-shadow-[0_0_8px_rgba(0,180,216,0.6)]"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.5 }}
      />
    </div>
  );
}
