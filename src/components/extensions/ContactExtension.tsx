"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, Send } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import SectionHeading from "../ui/SectionHeading";

export default function ContactExtension() {
  const contactInfo = [
    { icon: <Mail size={22} />, label: "Email", value: "rishikarthik68@gmail.com", link: "mailto:rishikarthik68@gmail.com", color: "hover:text-cinematic-orange hover:shadow-[0_0_15px_rgba(255,123,0,0.5)]" },
    { icon: <Phone size={22} />, label: "Phone", value: "+91 62357 15540", link: "tel:+916235715540", color: "hover:text-cinematic-teal hover:shadow-[0_0_15px_rgba(0,180,216,0.5)]" },
    { icon: <Linkedin size={22} />, label: "LinkedIn", value: "in/rishi-karthik-s", link: "https://www.linkedin.com/in/rishi-karthik-s/", target: "_blank", rel: "noopener noreferrer", color: "hover:text-cinematic-orange hover:shadow-[0_0_15px_rgba(255,123,0,0.5)]" },
    { icon: <Github size={22} />, label: "GitHub", value: "github.com/Rishi200527", link: "https://github.com/Rishi200527", target: "_blank", rel: "noopener noreferrer", color: "hover:text-cinematic-teal hover:shadow-[0_0_15px_rgba(0,180,216,0.5)]" }
  ];

  return (
    <SectionWrapper id="contact" className="py-32 relative">
      {/* Background Cinematic Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[800px] h-[400px] bg-cinematic-orange/5 blur-[120px] -z-10 pointer-events-none mix-blend-screen rounded-full"></div>

      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 xl:gap-24 relative z-10">
        
        {/* Contact Info (Left) */}
        <motion.div 
          className="lg:w-5/12 flex flex-col gap-8"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="w-full">
            <SectionHeading title="Get In Touch" />
          </div>
          
          <p className="text-white/70 leading-relaxed text-lg font-light">
            I&apos;m currently looking for new opportunities. Whether you have a question, a project idea, or just want to say hi, I&apos;ll try my best to get back to you!
          </p>
          
          <div className="flex flex-col gap-6 mt-8">
            {contactInfo.map((info, idx) => (
              <motion.a 
                key={info.label} 
                href={info.link}
                target={info.target}
                rel={info.rel}
                className="flex items-center gap-6 group interactive w-full p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1, ease: "easeOut" }}
              >
                <div className={`w-14 h-14 rounded-full bg-black/60 border border-white/5 flex items-center justify-center text-white/50 transition-all duration-300 shadow-inner group-hover:scale-110 ${info.color}`}>
                  {info.icon}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/40 group-hover:cinematic-text transition-colors duration-300 mb-1">{info.label}</p>
                  <p className="font-semibold text-white/90 text-lg group-hover:text-white transition-colors">{info.value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
        
        {/* Contact Form (Right) */}
        <motion.div 
          className="lg:w-7/12 w-full"
          initial={{ opacity: 0, x: 50, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <form className="p-8 md:p-12 rounded-[2rem] glass-card flex flex-col gap-8 w-full shadow-[0_20px_40px_rgba(0,0,0,0.5)] relative overflow-hidden bg-cinematic-dark/60 border border-white/5">
            {/* Inner top glow line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-cinematic opacity-50"></div>

            <h3 className="text-2xl font-bold text-white mb-2 tracking-wide flex items-center gap-3">
              <span>Send a Message</span>
              <span className="w-12 h-px bg-cinematic-teal/50 block"></span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              <div className="flex flex-col gap-3 group">
                <label htmlFor="name" className="text-sm font-bold text-white/50 uppercase tracking-wider group-focus-within:text-cinematic-orange transition-colors ml-1">Name</label>
                <input 
                  type="text" 
                  id="name"
                  className="w-full bg-black/50 border-b-2 border-white/5 px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cinematic-orange focus:bg-white/5 transition-all outline-none rounded-t-xl"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="flex flex-col gap-3 group">
                <label htmlFor="email" className="text-sm font-bold text-white/50 uppercase tracking-wider group-focus-within:text-cinematic-teal transition-colors ml-1">Email</label>
                <input 
                  type="email" 
                  id="email"
                  className="w-full bg-black/50 border-b-2 border-white/5 px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cinematic-teal focus:bg-white/5 transition-all outline-none rounded-t-xl"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-3 group">
              <label htmlFor="message" className="text-sm font-bold text-white/50 uppercase tracking-wider group-focus-within:text-cinematic-orange transition-colors ml-1">Message</label>
              <textarea 
                id="message"
                rows={5}
                className="w-full bg-black/50 border-b-2 border-white/5 px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cinematic-orange focus:bg-white/5 transition-all outline-none resize-none rounded-t-xl"
                placeholder="How can I help you?"
                required
              />
            </div>
            
            <button 
              type="submit"
              className="mt-6 w-full flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-gradient-cinematic text-white/90 font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(255,123,0,0.4)] transition-all duration-300 interactive group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10">Send Message</span>
              <Send size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}
