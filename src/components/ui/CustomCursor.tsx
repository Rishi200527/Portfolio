"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveElements = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'];
      if (
        interactiveElements.includes(target.tagName) || 
        target.classList.contains('interactive') ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const variants: Variants = {
    default: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      height: 24,
      width: 24,
      backgroundColor: "rgba(255, 123, 0, 0)",
      border: "2px solid rgba(255, 123, 0, 0.4)",
      boxShadow: "0 0 10px rgba(255, 123, 0, 0.4)",
      transition: { type: "spring", stiffness: 700, damping: 30, mass: 0.5 }
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(255, 123, 0, 0.1)",
      border: "1px solid rgba(255, 123, 0, 0.8)",
      boxShadow: "0 0 20px rgba(255, 123, 0, 0.8), inset 0 0 10px rgba(255, 123, 0, 0.5)",
      transition: { type: "spring", stiffness: 500, damping: 25, mass: 0.5 }
    }
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] mix-blend-screen"
        variants={variants}
        animate={isHovering ? "hover" : "default"}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          transition: { type: "spring", stiffness: 1000, damping: 40, mass: 0.2 }
        }}
      />
    </>
  );
}
