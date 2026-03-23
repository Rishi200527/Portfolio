"use client";

import { useRef, useState } from "react";
import { useScroll } from "framer-motion";
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";
import ResumeViewer from "./ResumeViewer";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]">
      <ScrollyCanvas scrollYProgress={scrollYProgress} />
      <Overlay containerRef={containerRef} />
      
      <ResumeViewer isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />
    </div>
  );
}

