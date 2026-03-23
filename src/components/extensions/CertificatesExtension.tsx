"use client";

import { motion } from "framer-motion";
import { Award, Zap } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import SectionHeading from "../ui/SectionHeading";

export default function CertificatesExtension() {
  const certificates = [
    { title: "Web Development Bootcamp", issuer: "Udemy" },
    { title: "Privacy and Security in Online Social Media", issuer: "NPTEL - IIT Hyderabad" },
    { title: "ChatGPT Prompt Engineering", issuer: "OpenAI / Multiple" },
    { title: "Computational Theory", issuer: "Infosys Springboard" }
  ];

  return (
    <SectionWrapper id="certificates" className="py-20 relative perspective-1000">
      
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[150px] -z-10 mix-blend-screen"></div>

      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-16">
            <SectionHeading title="Certifications" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 w-full relative z-10">
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, rotateX: 90, y: 50 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, type: "spring" }}
              className="group h-[300px] w-full"
              style={{ perspective: "1000px" }}
            >
              <div 
                className="relative w-full h-full transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]" 
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front of card */}
                <div 
                  className="absolute inset-0 glass-card neon-border rounded-3xl p-8 flex flex-col items-center justify-center text-center group-hover:[transform:rotateY(180deg)] backface-hidden z-20 bg-[#0a0a0a]/90 cursor-none"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="mb-8 w-16 h-16 rounded-full bg-black border border-white/10 flex items-center justify-center text-white/50 group-hover:border-neon-purple/50 group-hover:text-neon-purple group-hover:shadow-[0_0_20px_rgba(122,0,255,0.4)] transition-all duration-500">
                    <Award size={32} strokeWidth={1.5} className="group-hover:drop-shadow-[0_0_8px_rgba(122,0,255,1)]" />
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug tracking-wide">{cert.title}</h3>
                </div>
                
                {/* Back of card */}
                <div 
                  className="absolute inset-0 glass-card rounded-3xl p-8 flex flex-col items-center justify-center text-center [transform:rotateY(180deg)] backface-hidden z-10 bg-gradient-to-b from-[#0a0a0a] to-[#121212] border-2 border-neon-purple shadow-[0_0_30px_rgba(122,0,255,0.3)] cursor-none"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-neon opacity-10 rounded-3xl pointer-events-none"></div>
                  
                  <Zap size={24} className="text-neon-blue mb-4 drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
                  <p className="text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-3">Issued By</p>
                  <p className="text-xl font-black text-transparent bg-clip-text bg-gradient-neon filter drop-shadow-[0_0_5px_rgba(0,240,255,0.5)] leading-tight">{cert.issuer}</p>
                  
                  <div className="mt-8 px-6 py-2 rounded-full border border-neon-blue text-neon-blue text-xs font-bold uppercase tracking-widest hover:bg-neon-blue hover:text-black transition-colors shadow-[0_0_10px_rgba(0,240,255,0.3)] interactive">
                      Verify
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
