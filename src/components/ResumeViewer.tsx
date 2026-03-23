"use client";

import { motion, useMotionValue, useTransform, AnimatePresence, Variants } from "framer-motion";
import { Download, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeViewer({ isOpen, onClose }: ResumeViewerProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [resumeExists, setResumeExists] = useState<boolean | null>(null);
  
  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Map mouse position to rotation (-10deg to 10deg)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Handle mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current || !isOpen) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      
      // Calculate position relative to center of card (-0.5 to 0.5)
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const normalizedX = (e.clientX - centerX) / window.innerWidth;
      const normalizedY = (e.clientY - centerY) / window.innerHeight;
      
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };

    if (isOpen) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isOpen, mouseX, mouseY]);

  // Check whether resume file exists so we can show a helpful message.
  useEffect(() => {
    if (!isOpen) return;

    let canceled = false;

    fetch("/resume.pdf", { method: "HEAD" })
      .then((res) => {
        if (!canceled) setResumeExists(res.ok);
      })
      .catch(() => {
        if (!canceled) setResumeExists(false);
      });

    return () => {
      canceled = true;
    };
  }, [isOpen]);

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Stagger variants for content
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 cursor-crosshair perspective-1000"
        >
          {/* Backdrop Blur */}
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
          />

          {/* 3D Card */}
          <motion.div
            ref={cardRef}
            initial={{ scale: 0.9, opacity: 0, rotateX: 0, rotateY: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.2 } }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-3xl bg-white/5 border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)] backdrop-blur-xl"
          >
            {/* Soft subtle neon glow behind card */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" style={{ transform: "translateZ(-50px)" }} />
            
            <div className="p-8 sm:p-12 relative z-10" style={{ transform: "translateZ(30px)" }}>
              {/* Header */}
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-4xl font-bold text-white tracking-tight mb-2">Rishi Karthik S</h2>
                  <p className="text-xl text-white/70 font-medium">Full-Stack Engineer</p>
                  <div className="mt-4 text-white/60 text-sm space-y-2">
                    <p>LinkedIn: <span className="text-white">Rishi07</span> · GitHub: <span className="text-white">Rishi07</span></p>
                    <p>Email: <span className="text-white">rishikarthik68@gmail.com</span> · Mobile: <span className="text-white">+91 62357 15540</span></p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content Grid */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-12"
              >
                {/* Left Column */}
                <div className="space-y-12">
                  <motion.section variants={itemVariants}>
                    <h3 className="text-sm font-semibold text-white/50 tracking-widest uppercase mb-4">Summary</h3>
                    <p className="text-white/80 leading-relaxed">
                      Full-stack engineer building full-featured web applications with a focus on secure authentication, API integrations, and responsive user experiences. Strong background in MERN-stack development and data-driven UI workflows.
                    </p>
                  </motion.section>

                  <motion.section variants={itemVariants}>
                    <h3 className="text-sm font-semibold text-white/50 tracking-widest uppercase mb-4">Skills</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-white/50 uppercase tracking-widest mb-2">Languages</p>
                        <p className="text-white/80">C++, JavaScript, C, PHP</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/50 uppercase tracking-widest mb-2">Frameworks</p>
                        <p className="text-white/80">HTML & CSS, Bootstrap, Node.js, React</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/50 uppercase tracking-widest mb-2">Tools / Platforms</p>
                        <p className="text-white/80">MySQL, MongoDB</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/50 uppercase tracking-widest mb-2">Soft Skills</p>
                        <p className="text-white/80">Problem-Solving, Project Management, Leadership, Adaptability</p>
                      </div>
                    </div>
                  </motion.section>

                  <motion.section variants={itemVariants}>
                    <h3 className="text-sm font-semibold text-white/50 tracking-widest uppercase mb-4">Training</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-white/80 leading-relaxed">
                          Completed Summer Training at Lovely Professional University (Jun ’25 – Jul ’25) covering PLC fundamentals, ladder logic programming, sensor interfacing, and control workflows. Built a Smart Street Lighting System with energy-efficient automation and validated performance through simulations.
                        </p>
                        <p className="text-xs text-white/50 mt-1">Tech: PLC, Ladder Logic, Sensors (LDR/Timer-based), PLC Simulation</p>
                      </div>
                    </div>
                  </motion.section>
                </div>

                {/* Right Column */}
                <div className="space-y-12">
                  <motion.section variants={itemVariants}>
                    <h3 className="text-sm font-semibold text-white/50 tracking-widest uppercase mb-4">Projects</h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="text-lg font-medium text-white">Expense Tracker Application</h4>
                          <span className="text-sm text-white/40">Jan ’26 – Present</span>
                        </div>
                        <p className="text-white/60 mb-2">Building a full-stack expense tracking app to record, categorize, and analyze daily expenses with authentication and secure data storage.</p>
                        <p className="text-sm text-white/70 leading-relaxed">Tech Stack: React.js, Node.js, Express.js, MongoDB</p>
                      </div>

                      <div>
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="text-lg font-medium text-white">Recipe Sharing Platform</h4>
                          <span className="text-sm text-white/40">Jul ’25 – Aug ’25</span>
                        </div>
                        <p className="text-white/60 mb-2">Built a full-stack recipe sharing platform with user authentication, API integrations, and image uploads. Deployed on Vercel.</p>
                        <p className="text-sm text-white/70 leading-relaxed">Tech Stack: MongoDB, Express.js, React.js, Node.js, Tailwind CSS, JWT, Cloudinary</p>
                      </div>

                      <div>
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="text-lg font-medium text-white">Online Learning Platform</h4>
                          <span className="text-sm text-white/40">Apr ’24 – Mar ’24</span>
                        </div>
                        <p className="text-white/60 mb-2">Developed a centralized educational platform with structured navigation, secure authentication, and backend content management.</p>
                        <p className="text-sm text-white/70 leading-relaxed">Tech Stack: HTML, CSS, JavaScript, PHP, MySQL / MongoDB</p>
                      </div>
                    </div>
                  </motion.section>

                  <motion.section variants={itemVariants}>
                    <h3 className="text-sm font-semibold text-white/50 tracking-widest uppercase mb-4">Education</h3>
                    <div className="space-y-5">
                      <div>
                        <p className="text-lg font-medium text-white mb-1">Bachelor of Technology - Computer Science and Engineering</p>
                        <p className="text-white/60">Lovely Professional University, Phagwara, Punjab • Aug ’23 – Present</p>
                        <p className="text-sm text-white/70">CGPA: 6.48</p>
                      </div>
                      <div>
                        <p className="text-lg font-medium text-white mb-1">Intermediate</p>
                        <p className="text-white/60">GHSS Model Boys, Thrissur, Kerala • Apr ’20 – Mar ’22</p>
                        <p className="text-sm text-white/70">Percentage: 73.8%</p>
                      </div>
                      <div>
                        <p className="text-lg font-medium text-white mb-1">Matriculation</p>
                        <p className="text-white/60">Kendriya Vidyalaya Keltron Nagar, Kannur, Kerala • Apr ’19 – Mar ’20</p>
                        <p className="text-sm text-white/70">Percentage: 71.8%</p>
                      </div>
                    </div>
                  </motion.section>

                  <motion.section variants={itemVariants}>
                    <h3 className="text-sm font-semibold text-white/50 tracking-widest uppercase mb-4">Certificates</h3>
                    <ul className="list-disc list-inside text-white/80 space-y-2">
                      <li>Web Development Bootcamp - Udemy (Feb ’24)</li>
                      <li>Privacy & Security in Online Social Media - NPTEL (IIT Hyderabad, Apr ’25)</li>
                      <li>ChatGPT-4 Prompt Engineering: Generative AI & LLM (Aug ’25)</li>
                      <li>Computational Theory: Language Principles & Finite Automata - Infosys Springboard</li>
                    </ul>
                  </motion.section>
                </div>
              </motion.div>

              {/* PDF Preview */}
              <motion.div variants={itemVariants} className="mt-12">
                <h3 className="text-sm font-semibold text-white/50 tracking-widest uppercase mb-4">PDF Preview</h3>

                {resumeExists === null ? (
                  <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-black/20 flex items-center justify-center text-white/70">
                    <span>Checking for resume…</span>
                  </div>
                ) : resumeExists === false ? (
                  <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-black/20 flex items-center justify-center p-8">
                    <div className="text-center">
                      <p className="text-white/70 mb-3">
                        No resume file found at <code className="text-white/90">/resume.pdf</code>.
                        Drop your CV there and reopen this preview.
                      </p>
                      <a href="/resume.pdf" download className="px-5 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition">
                        Download placeholder
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-black/20">
                    <object data="/resume.pdf" type="application/pdf" className="w-full h-full">
                      <div className="flex flex-col items-center justify-center h-full text-center p-8">
                        <p className="text-white/70 mb-3">Your browser does not support inline PDFs.</p>
                        <a href="/resume.pdf" download className="px-5 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition">
                          Download Resume
                        </a>
                      </div>
                    </object>
                  </div>
                )}
              </motion.div>

              {/* Footer Actions */}
              <motion.div 
                variants={itemVariants}
                className="mt-16 pt-8 border-t border-white/10 flex justify-end gap-4"
              >
                <button onClick={onClose} className="px-6 py-3 rounded-xl text-white/70 hover:text-white font-medium transition-colors">
                  Close
                </button>
                <a 
                  href="/resume.pdf" 
                  download
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                >
                  <Download size={18} />
                  Download Resume
                </a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
