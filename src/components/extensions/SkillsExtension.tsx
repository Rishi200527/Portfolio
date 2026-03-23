"use client";

import SectionWrapper from "./SectionWrapper";
import SectionHeading from "../ui/SectionHeading";
import { motion } from "framer-motion";
import { Code, Layers, Database, Target } from "lucide-react";

export default function SkillsExtension() {
  const skillCategories = [
    { 
      title: "Languages", 
      icon: <Code size={28} className="text-neon-blue" />, 
      skills: ["C++", "JavaScript", "C", "PHP"],
      delay: 0.1
    },
    { 
      title: "Frameworks & Libraries", 
      icon: <Layers size={28} className="text-neon-purple" />, 
      skills: ["HTML", "CSS", "Bootstrap", "Node.js", "React"],
      delay: 0.2
    },
    { 
      title: "Databases", 
      icon: <Database size={28} className="text-neon-blue" />, 
      skills: ["MySQL", "MongoDB"],
      delay: 0.3
    },
    { 
      title: "Soft Skills", 
      icon: <Target size={28} className="text-neon-purple" />, 
      skills: ["Problem Solving", "Leadership", "Project Management", "Adaptability"],
      delay: 0.4
    }
  ];

  return (
    <SectionWrapper id="skills" className="py-20 relative">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-neon-blue/5 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

      <div className="w-full max-w-5xl mx-auto flex flex-col items-center relative z-10">
        <div className="w-full mb-12">
            <SectionHeading title="Abilities & Skills" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: category.delay }}
              className="glass-card neon-border p-8 rounded-3xl relative overflow-hidden group"
            >
              {/* Animated background gradient hover pulse */}
              <div className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-10 transition-opacity duration-700 ease-in-out"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center shadow-inner group-hover:border-white/30 transition-colors">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight group-hover:neon-text transition-all duration-300">{category.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-auto">
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white/80 text-sm font-semibold tracking-wide hover:border-cinematic-orange hover:text-white hover:shadow-[0_0_15px_rgba(255,123,0,0.4)] transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
