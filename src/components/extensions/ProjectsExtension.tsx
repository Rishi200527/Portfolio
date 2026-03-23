"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import SectionHeading from "../ui/SectionHeading";

export default function ProjectsExtension() {
  const projects = [
    {
      title: "Expense Tracker Application",
      description: "A comprehensive expense management tool that helps users track their daily spending, set budgets, and visualize financial habits with detailed analytics and charts.",
      techStack: ["MongoDB", "Express", "React", "Node.js"],
      githubUrl: "https://github.com/Rishi200527/Expense-Tracker",
      demoUrl: "#",
      imageUrl: "/sequence/expense.jpeg",
    },
    {
      title: "Recipe Sharing Platform",
      description: "A community-focused application where users can discover, share, and save their favorite recipes, featuring an integration with external food APIs for nutritional data.",
      techStack: ["MERN Stack", "REST APIs", "Tailwind CSS"],
      githubUrl: "https://github.com/Rishi200527/Recipe-book",
      demoUrl: "#",
      imageUrl: "/sequence/cooking.jpg",
    },
    {
      title: "Online Learning Platform",
      description: "An interactive educational platform designed to deliver course content effectively, allowing students to access materials, take quizzes, and track learning progress.",
      techStack: ["HTML5", "JavaScript", "PHP", "MySQL"],
      githubUrl: "https://github.com/Rishi200527/online-study-platform",
      demoUrl: "#",
      imageUrl: "/sequence/e-learing.jpeg",
    }
  ];

  return (
    <SectionWrapper id="projects" className="py-20 relative z-10">
      
      <div className="w-full max-w-6xl mx-auto">
            <SectionHeading title="PROJECTS" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 w-full relative z-10">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.1, ease: "easeOut" }}
              className="group h-full flex flex-col perspective-1000"
            >
              <div 
                className="glass-card h-full rounded-3xl p-8 flex flex-col relative overflow-hidden transition-all duration-400 ease-in-out group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_rgba(255,123,0,0.15)] shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-10 bg-cinematic-dark/80 border border-white/5 group-hover:border-cinematic-orange/30"
              >
                {/* Background image (subtle zoom on hover) */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={`${project.title} background`}
                    fill
                    className="object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100%, (max-width: 1200px) 50%, 33%"
                  />
                </div>

                {/* Dark overlay to keep text readable */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Cinematic hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cinematic-orange/0 via-cinematic-teal/5 to-cinematic-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out z-20" />
                
                <div className="relative z-30 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-cinematic-orange group-hover:scale-110 transition-transform duration-300 shadow-inner group-hover:shadow-[0_0_15px_rgba(255,123,0,0.4)] cursor-pointer">
                        <ExternalLink size={20} />
                      </div>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-cinematic-teal transition-colors p-2 interactive z-30 relative block">
                        <Github size={24} />
                      </a>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:cinematic-text transition-all duration-300">{project.title}</h3>
                    
                    <p className="text-white/60 mb-8 flex-grow leading-relaxed font-light text-[15px]">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/10">
                      {project.techStack.map(tech => (
                        <span key={tech} className="text-xs font-bold text-transparent bg-clip-text bg-gradient-cinematic mr-2 uppercase tracking-widest drop-shadow-[0_0_8px_rgba(255,123,0,0.4)]">
                          {tech}
                        </span>
                      ))}
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
