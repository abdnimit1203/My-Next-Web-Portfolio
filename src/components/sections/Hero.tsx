"use client";

import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { FiArrowRight, FiFileText, FiBriefcase } from "react-icons/fi";
import type { HeroContent, SocialLink } from "@/lib/types";
import { SocialIcon } from "../SocialIcon";
import { HeroCanvas, HAS_HERO_FRAMES } from "./HeroCanvas";
import { HeroPhoto } from "./HeroPhoto";

export function Hero({ hero, socials }: { hero: HeroContent | null; socials: SocialLink[] }) {
  const headline = hero?.headline ?? "Abdullah Ibne Ali";
  const subheadline =
    hero?.subheadline ??
    "I'm a Full Stack Web Developer crafting high-performance digital web applications, interactive UIs, and robust backend systems.";
  const roles = hero?.typewriterRoles?.length
    ? hero.typewriterRoles
    : ["Full Stack Developer @ Classytic", "MERN Stack Specialist", "Next.js & React Engineer"];

  const linkedinUrl = "https://www.linkedin.com/in/abdullah-ibne-ali";

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="hero" className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 md:py-24 md:grid-cols-2 overflow-hidden">
      {/* Background Subtle Ambient Glow Orbs */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 right-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

      <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-xl">
        {/* Classytic Work Badge */}
        <motion.div variants={fadeUp} className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-300 backdrop-blur-md">
          <FiBriefcase className="text-purple-400" />
          <span>Full-Stack Dev @ <strong className="text-white font-bold underline decoration-purple-400">Classytic</strong></span>
        </motion.div>

        {/* Reference Headline styling */}
        <motion.h1 variants={fadeUp} className="text-4xl font-extrabold tracking-tight md:text-6xl text-white">
          Abdullah <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Ibne Ali</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.h2 variants={fadeUp} className="mt-3 min-h-8 text-lg font-semibold text-cyan-400 md:text-xl flex items-center gap-2">
          <span>Role:</span>
          <span className="text-purple-300">
            <Typewriter words={roles} loop={0} cursor cursorStyle="|" typeSpeed={70} deleteSpeed={40} delaySpeed={1500} />
          </span>
        </motion.h2>

        {/* Slogan & Subheadline */}
        <motion.p variants={fadeUp} className="mt-5 text-base leading-relaxed text-slate-300 md:text-lg">
          I Design & Build Experiences That Make an <span className="font-semibold text-purple-400 underline decoration-purple-500/50 underline-offset-4">Impact.</span>
          <br />
          <span className="mt-2 block text-sm text-slate-400">{subheadline}</span>
        </motion.p>

        {/* Action Buttons */}
        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="glass-button-primary flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-purple-900/30"
          >
            <span>Hire Me on LinkedIn</span>
            <FiArrowRight className="text-lg" />
          </motion.a>

          {hero?.cvUrl && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={hero.cvUrl}
              target="_blank"
              rel="noreferrer"
              className="glass-button flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white"
            >
              <FiFileText className="text-lg text-purple-400" />
              <span>View Resume</span>
            </motion.a>
          )}
        </motion.div>

        {/* Social Icons Strip */}
        <motion.div variants={fadeUp} className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Follow Me:</span>
          <div className="flex gap-4 text-xl text-purple-400">
            {socials.map((social, i) => (
              <motion.a
                key={social._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                whileHover={{ scale: 1.25, color: "#38bdf8" }}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.platform}
                className="transition-colors duration-200"
              >
                <SocialIcon iconKey={social.iconKey} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Hero Photo / Avatar Side */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 30 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative"
      >
        {HAS_HERO_FRAMES ? <HeroCanvas /> : <HeroPhoto />}
      </motion.div>
    </section>
  );
}
