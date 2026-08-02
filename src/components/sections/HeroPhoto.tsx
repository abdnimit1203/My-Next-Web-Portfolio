"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function HeroPhoto() {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[480px] items-center justify-center p-2 sm:p-4">
      {/* Background Soft Glow - Cyan & Blue on left, Purple & Magenta on right */}
      <div className="absolute top-[12%] h-[74%] w-[74%] rounded-full bg-gradient-to-r from-cyan-500/40 via-blue-600/35 to-purple-600/30 blur-2xl animate-pulse pointer-events-none" />

      {/* Hero Circle BG Image (Provided PNG Asset) - Flipped horizontally so left side is Cyan/Blue */}
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[13%] h-[74%] w-[74%] rounded-full overflow-hidden pointer-events-none z-0 shadow-[0_0_60px_rgba(6,182,212,0.4)]"
      >
        <Image
          src="/hero-circle-bg.png"
          alt="Glowing Circle Background"
          fill
          priority
          className="object-cover -scale-x-100 scale-105"
        />
      </motion.div>

      {/* Main Avatar / Subject Container (Version 1 using hero-DP.jpg) */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 h-[88%] w-[88%] overflow-hidden rounded-full border-2 border-white/30 shadow-2xl shadow-slate-950/90"
      >
        <Image
          src="/hero-DP.jpg"
          alt="Abdullah Ibne Ali"
          fill
          priority
          className="object-cover scale-105"
          sizes="(max-width: 768px) 90vw, 460px"
        />
      </motion.div>

      {/* Floating Experience Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileHover={{ scale: 1.08 }}
        className="glass-card absolute bottom-2 right-0 sm:right-1 z-20 flex items-center gap-3 rounded-2xl border border-white/15 bg-slate-950/85 px-4 py-3 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-lg font-bold text-white shadow-md">
          3+
        </div>
        <div className="text-left">
          <p className="text-xs font-bold text-white uppercase tracking-wider">Years of</p>
          <p className="text-[0.7rem] text-slate-300">Experience</p>
        </div>
      </motion.div>

      {/* Floating Code Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        whileHover={{ scale: 1.08 }}
        className="glass-card absolute top-6 -left-2 sm:-left-4 z-20 rounded-2xl border border-cyan-500/40 bg-slate-950/85 px-4 py-2.5 font-mono text-xs text-cyan-400 shadow-xl backdrop-blur-xl"
      >
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
          <p className="font-semibold">{"</> Full-Stack Dev"}</p>
        </div>
        <p className="mt-1 text-[0.65rem] text-slate-300">MERN / Next.js Specialist</p>
      </motion.div>
    </div>
  );
}
