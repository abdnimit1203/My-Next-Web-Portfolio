"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function DevCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth spring physics for developer cursor
  const mouseX = useSpring(0, { stiffness: 450, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 450, damping: 28 });

  const ringX = useSpring(0, { stiffness: 200, damping: 22 });
  const ringY = useSpring(0, { stiffness: 200, damping: 22 });

  useEffect(() => {
    // Only enable on desktop mouse devices (not touch screens)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      // Check if mouse is hovering over an interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest("a, button, input, textarea, [role='button'], .glass-card, .glass-button")
        );
        setIsHovered(isInteractive);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, ringX, ringY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Minimal Cursor Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.35 : 1,
          borderColor: isHovered ? "rgba(6, 182, 212, 0.8)" : "rgba(255, 255, 255, 0.25)",
          backgroundColor: isHovered ? "rgba(6, 182, 212, 0.08)" : "transparent",
        }}
        transition={{ duration: 0.15 }}
        className="h-6 w-6 rounded-full border border-white/25 shadow-sm"
      />

      {/* Inner Precision Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0.75 : 1,
        }}
        className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.9)]"
      />
    </div>
  );
}
