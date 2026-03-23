"use client";

import { Award, Zap } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import SectionHeading from "../ui/SectionHeading";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function FloatingNode({ position, color, speed, scale }: { position: [number, number, number], color: string, speed: number, scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * speed;
      meshRef.current.rotation.y += delta * speed * 1.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={3} position={position}>
      <mesh ref={meshRef} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial 
          color={color} 
          wireframe
          emissive={color}
          emissiveIntensity={2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

function Certificates3DBackground() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden opacity-60">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <FloatingNode position={[-4, 3, -2]} color="#7a00ff" speed={0.2} scale={1.5} />
        <FloatingNode position={[4, -2, -1]} color="#00f0ff" speed={0.3} scale={1.8} />
        <FloatingNode position={[-3, -3, -3]} color="#ffffff" speed={0.15} scale={1.2} />
        <FloatingNode position={[5, 3, -4]} color="#7a00ff" speed={0.4} scale={1} />
        <FloatingNode position={[0, 0, -6]} color="#00f0ff" speed={0.1} scale={2.5} />
      </Canvas>
    </div>
  );
}

export default function CertificatesExtension() {
  const certificates = [
    { title: "Oracle Database Platform", issuer: "Oracle", link: "https://drive.google.com/file/d/1Fsl-HZXks-OIJ2A00jzI5t7UU-PbKeGC/view?usp=sharing" },
    { title: "Web Development Bootcamp", issuer: "Udemy", link: "#" },
    { title: "Privacy and Security in Online Social Media", issuer: "NPTEL - IIT Hyderabad", link: "#" },
    { title: "ChatGPT Prompt Engineering", issuer: "OpenAI / Multiple", link: "#" },
    { title: "Computational Theory", issuer: "Infosys Springboard", link: "#" }
  ];

  return (
    <SectionWrapper id="certificates" className="py-20 relative perspective-1000">
      
      {/* 3D Background */}
      <Certificates3DBackground />

      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[150px] -z-10 mix-blend-screen pointer-events-none"></div>

      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-16">
            <SectionHeading title="CERTIFICATE" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full relative z-10">
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.5, delay: idx * 0.1, type: "spring", stiffness: 300, damping: 20 }}
              className="relative group rounded-2xl w-full p-[2px] overflow-hidden"
            >
              {/* Dynamic Glow Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-purple via-transparent to-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
              
              {/* Card Main Body */}
              <div className="relative h-full min-h-[350px] w-full rounded-2xl bg-[#0F0F1A]/80 backdrop-blur-2xl border border-white/10 group-hover:border-transparent p-8 md:p-10 flex flex-col items-center text-center shadow-[0_4px_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_40px_rgba(122,0,255,0.4)] transition-all duration-500 overflow-hidden z-10">
                
                {/* Floating Ambient Glow */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-neon-purple/20 blur-[60px] rounded-full pointer-events-none group-hover:bg-neon-blue/30 group-hover:scale-150 transition-all duration-700"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-cinematic-orange/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-neon-purple/20 transition-all duration-700"></div>

                {/* Certificate Icon Logo */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tl from-[#1A1A2E] to-black border border-white/5 flex items-center justify-center text-neon-purple shadow-inner mb-8 group-hover:text-neon-blue group-hover:-translate-y-2 transition-all duration-500 z-10 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                  <Award size={40} strokeWidth={1.5} className="drop-shadow-[0_0_8px_rgba(122,0,255,0.6)] group-hover:drop-shadow-[0_0_15px_rgba(0,240,255,0.8)] transition-all duration-500" />
                </div>
                
                {/* Bold Typography */}
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-wide mb-3 z-10 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-300">
                  {cert.title}
                </h3>
                
                <p className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-neon z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  {cert.issuer}
                </p>
                
                <div className="flex-grow"></div>
                
                {/* View Certificate Button */}
                <a 
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center gap-3 px-8 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-sm md:text-base font-black uppercase tracking-widest transition-all duration-300 z-10 group/btn shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] interactive"
                >
                  View Certificate <Zap size={18} className="text-cinematic-orange group-hover/btn:scale-125 group-hover/btn:rotate-12 transition-transform duration-300" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
