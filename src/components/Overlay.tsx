"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { RefObject } from "react";

interface OverlayProps {
  containerRef: RefObject<HTMLElement | null>;
}

export default function Overlay({ containerRef }: OverlayProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef as React.RefObject<HTMLElement>,
    offset: ["start start", "end end"],
  });


  // Section 1: 0% to 20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  // Section 2: 30% to 50%
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.4], [50, -50]);

  // Section 3: 60% to 80%
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.7], [50, -50]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section 1 */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col items-end text-right"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
          Rishi Karthik S
        </h1>
        <p className="mt-2 text-xl md:text-2xl text-white/90 font-medium mb-8 drop-shadow-[0_0_5px_rgba(0,0,0,0.8)]">
          FullStack Developer.
        </p>
      </motion.div>


      {/* Section 2 */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute left-4 md:left-24 top-1/2 -translate-y-1/2"
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-xl drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
          I build digital experiences.
        </h2>
        <p className="mt-4 text-lg md:text-xl text-white/90 max-w-lg drop-shadow-[0_0_5px_rgba(0,0,0,0.8)]">
          Transforming complex problems into elegant, high-performance web applications using modern web technologies.
        </p>
      </motion.div>

      {/* Section 3 */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute right-4 md:right-24 top-1/2 -translate-y-1/2 text-right"
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-xl ml-auto drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
          Bridging design and engineering.
        </h2>
        <p className="mt-4 text-lg md:text-xl text-white/90 max-w-lg ml-auto drop-shadow-[0_0_5px_rgba(0,0,0,0.8)]">
          Obsessed with pixel-perfect details, smooth animations, and creating intuitive user interfaces.
        </p>
      </motion.div>
    </div>
  );
}
