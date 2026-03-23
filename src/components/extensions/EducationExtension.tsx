"use client";

import SectionWrapper from "./SectionWrapper";
import SectionHeading from "../ui/SectionHeading";
import { motion } from "framer-motion";

export default function EducationExtension() {
  const educationData = [
    {
      institution: "Lovely Professional University",
      degree: "B.Tech Computer Science and Engineering",
      period: "2023 – Present",
      align: "left"
    },
    {
      institution: "GHSS Model Boys Thrissur",
      degree: "Intermediate",
      period: "2020 – 2022",
      align: "right"
    },
    {
      institution: "Kendriya Vidyalaya Keltron Nagar Kannur",
      degree: "Matriculation",
      period: "2019 – 2020",
      align: "left"
    }
  ];

  return (
    <SectionWrapper id="education" className="py-20 relative">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        
        <div className="w-full mb-12 text-center md:text-left">
            <SectionHeading title="Education Timeline" />
        </div>
        
        <div className="relative w-full py-10 mt-8">
          {/* Animated Central Timeline Glow Line (Hidden on small mobile) */}
          <motion.div 
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cinematic-teal via-cinematic-orange to-cinematic-teal rounded-full shadow-[0_0_15px_rgba(255,123,0,0.5)] -translate-x-1/2"
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: "100%", opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Simple Left Line for Mobile */}
          <motion.div 
            className="md:hidden absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-cinematic-teal to-cinematic-orange rounded-full shadow-[0_0_10px_rgba(255,123,0,0.5)]"
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: "100%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          <div className="flex flex-col gap-16 md:gap-24 w-full">
            {educationData.map((edu, idx) => {
              const isLeft = edu.align === "left";
              
              return (
                <motion.div 
                  key={idx} 
                  className={`relative flex items-center md:justify-between w-full md:odd:flex-row-reverse`}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: idx * 0.1 }}
                >
                  
                  {/* Glowing Node Point (Desktop Center / Mobile Left) */}
                  <div className="absolute md:left-1/2 left-6 w-5 h-5 md:-translate-x-1/2 -translate-x-[9px] rounded-full bg-cinematic-dark border-[3px] border-cinematic-orange shadow-[0_0_15px_rgba(255,123,0,0.8)] z-10 flex items-center justify-center">
                    <motion.div 
                      className="w-full h-full rounded-full bg-cinematic-orange"
                      animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
                    />
                  </div>

                  {/* Horizontal joining line (Desktop only) */}
                  <div className={`hidden md:block absolute top-1/2 w-[calc(50%-10px)] h-px bg-gradient-to-r ${isLeft ? 'from-transparent to-cinematic-orange/40 left-0' : 'from-cinematic-orange/40 to-transparent right-0'} -translate-y-1/2`}></div>

                  {/* Content Card */}
                  <div className={`w-full pl-16 md:pl-0 md:w-[calc(50%-40px)] flex ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                    <div className="glass-card p-6 md:p-8 rounded-2xl w-full hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(255,123,0,0.15)] transition-all duration-300 relative group overflow-hidden border border-white/5 hover:border-cinematic-orange/30">
                      
                      <div className="relative z-10">
                        <span className="inline-block px-3 py-1 mb-4 text-xs font-bold uppercase tracking-widest text-black bg-cinematic-orange rounded-full shadow-[0_0_10px_rgba(255,123,0,0.6)]">
                          {edu.period}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2 group-hover:cinematic-text transition-colors">{edu.institution}</h3>
                        <p className="text-white/70 font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{edu.degree}</p>
                      </div>
                    </div>
                  </div>
                  
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
