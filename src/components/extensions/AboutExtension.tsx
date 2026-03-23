"use client";

import { motion, Variants } from "framer-motion";
import { User, Code2, Database, Rocket } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import SectionHeading from "../ui/SectionHeading";

export default function AboutExtension() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15 // Faster stagger
      }
    }
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const floatingIcons = [
    { icon: <Code2 size={24} />, color: "text-cinematic-orange", x: -40, y: -40, delay: 0 },
    { icon: <Database size={24} />, color: "text-cinematic-teal", x: 40, y: -20, delay: 1 },
    { icon: <Rocket size={24} />, color: "text-cinematic-orange/80", x: -20, y: 40, delay: 2 },
    { icon: <User size={24} />, color: "text-cinematic-teal/80", x: 30, y: 30, delay: 0.5 },
  ];

  return (
    <SectionWrapper id="about" className="pt-32 pb-20 overflow-hidden z-10">
      {/* Subtle cinematic background glow */}
      <motion.div 
        className="absolute inset-0 bg-cinematic-teal/10 blur-[150px] rounded-full pointer-events-none -z-10 mix-blend-screen opacity-50"
      />
      
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
        
        {/* Animated Profile Image Area (Halo Lighting) */}
        <motion.div 
          className="relative flex-shrink-0"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full relative p-[2px] overflow-hidden interactive group shadow-[0_0_40px_rgba(255,123,0,0.15)] hover:shadow-[0_0_60px_rgba(0,180,216,0.2)] transition-shadow duration-500 flex items-center justify-center">
            {/* Soft Halo Gradient Border */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cinematic-orange via-transparent to-cinematic-teal opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Inner background holding the avatar */}
            <div className="absolute inset-1 rounded-full bg-cinematic-dark z-10 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
                {/* Soft inner glow on hover */}
                <div className="absolute inset-0 bg-cinematic-orange/0 group-hover:bg-cinematic-orange/10 transition-colors duration-500"></div>
                
                <User size={100} strokeWidth={1} className="text-white/20 z-20 group-hover:text-cinematic-orange transition-colors duration-300" />
            </div>
            
            {/* Cinematic Floating Tech Icons */}
            {floatingIcons.map((item, idx) => (
              <motion.div
                key={idx}
                className={`absolute z-30 bg-[#0a0c10] p-3 rounded-full border border-white/5 shadow-[0_4px_12px_rgba(0,0,0,0.6)] ${item.color}`}
                style={{ left: `calc(50% + ${item.x}px)`, top: `calc(50% + ${item.y}px)` }}
                animate={{
                  y: ["-5px", "5px", "-5px"],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.delay
                }}
              >
                {item.icon}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Text Content Area */}
        <motion.div 
          className="flex-1 space-y-6 text-center md:text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeading title="About Me" />
          
          <motion.p variants={textVariants} className="text-lg md:text-xl text-white/70 leading-relaxed font-light mt-8">
            I&apos;m <span className="text-white font-medium cinematic-text tracking-wide drop-shadow-[0_0_8px_rgba(255,123,0,0.4)]">Rishi Karthik S</span>, a Computer Science Engineering student passionately bridging the gap between design and robust backend architecture.
          </motion.p>
          
          <motion.p variants={textVariants} className="text-lg text-white/60 leading-relaxed font-light">
            I specialize in crafting immersive, scalable web applications using <span className="text-white/90 font-medium drop-shadow-[0_0_5px_rgba(0,180,216,0.3)]">JavaScript, React, Node.js, and MongoDB</span>. My approach combines clean, maintainable code with moody, deeply cinematic UI/UX principles to deliver digital experiences with profound depth.
          </motion.p>
          
          <motion.p variants={textVariants} className="text-lg text-white/60 leading-relaxed font-light">
            Whether it&apos;s optimizing complex database queries or animating beautiful frontend interfaces, my focus is on <span className="text-white/80 border-b border-cinematic-orange/30 pb-0.5">solving real-world problems</span> through continuous innovation and learning.
          </motion.p>
        </motion.div>
        
      </div>
    </SectionWrapper>
  );
}
