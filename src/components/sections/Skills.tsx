"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/lib/types";
import { SectionHeading } from "./About";

const DEFAULT_SKILLS = [
  { name: "HTML5", iconUrl: "/icons/html5.png" },
  { name: "CSS3", iconUrl: "/icons/css.png" },
  { name: "JavaScript", iconUrl: "/icons/js.png" },
  { name: "React", iconUrl: "/icons/react.png" },
  { name: "Tailwind CSS", iconUrl: "/icons/tailwind.png" },
  { name: "Next.js", iconUrl: "/icons/nextjs.png" },
  { name: "Node.js", iconUrl: "/icons/node.png" },
  { name: "Express", iconUrl: "/icons/express.png" },
  { name: "MongoDB", iconUrl: "/icons/mongo.png" },
  { name: "Git & GitHub", iconUrl: "/icons/github.png" },
  { name: "Bootstrap", iconUrl: "/icons/bootstrap.png" },
  { name: "Firebase", iconUrl: "/icons/fire.png" },
  { name: "Python", iconUrl: "/icons/python.png" },
];

export function Skills({ skills }: { skills: Skill[] }) {
  const displaySkills = skills.length > 0 ? skills : DEFAULT_SKILLS.map((s, idx) => ({ ...s, _id: String(idx), percentage: 85, order: idx }));

  // Duplicate list for infinite marquee scrolling effect
  const marqueeItems = [...displaySkills, ...displaySkills, ...displaySkills];

  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-20 overflow-hidden">
      <SectionHeading eyebrow="Learn about my" title="Skills & Tech Stack" />

      {/* Restored Infinite Scrolling Marquee Banner from Old Portfolio (Clean, Box-Free, Edge Fade) */}
      <div className="mt-12 overflow-hidden py-8 relative">
        {/* Soft edge gradient fades on both sides */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="flex w-max items-center animate-marquee hover:[animation-play-state:paused] cursor-pointer">
          {marqueeItems.map((skill, idx) => (
            <div
              key={`${skill.name}-${idx}`}
              className="mx-6 sm:mx-10 flex flex-col items-center justify-center shrink-0 transition-transform duration-300 hover:scale-110"
              title={skill.name}
            >
              {/* eslint-disable-next-html-element-suppress */}
              <img
                src={skill.iconUrl}
                alt={skill.name}
                referrerPolicy="no-referrer"
                className="h-10 sm:h-16 md:h-20 w-auto object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* MERN Stack Spotlight Grid from Old Site */}
      <div className="mt-16 rounded-3xl border border-purple-500/30 bg-gradient-to-br from-slate-950/90 via-purple-950/30 to-slate-950/90 p-8 shadow-2xl backdrop-blur-xl">
        <h3 className="text-center font-display text-lg font-bold text-white mb-8">
          MERN Stack Specialization
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { letter: "M", title: "MongoDB", icon: "/icons/mongo.png", desc: "NoSQL Database & Atlas Cloud" },
            { letter: "E", title: "Express.js", icon: "/icons/express.png", desc: "Backend REST APIs" },
            { letter: "R", title: "React & Next", icon: "/icons/react.png", desc: "Interactive Frontend UIs" },
            { letter: "N", title: "Node.js", icon: "/icons/node.png", desc: "Server-side Runtime" },
          ].map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -6, scale: 1.03 }}
              className="glass-card flex flex-col items-center rounded-2xl border border-white/10 p-6 shadow-xl"
            >
              <span className="font-display text-3xl font-extrabold text-purple-400 mb-2">{item.letter}</span>
              <div className="relative h-12 w-12 mb-3">
                {/* eslint-disable-next-html-element-suppress */}
                <img
                  src={item.icon}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <h4 className="font-bold text-white text-sm">{item.title}</h4>
              <p className="text-[0.7rem] text-slate-400 mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detailed Skill Cards Grid */}
      <div className="mt-12 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {displaySkills.map((skill) => (
          <motion.div
            key={skill.name}
            whileHover={{ y: -5, scale: 1.03 }}
            className="glass-card flex flex-col items-center justify-center rounded-2xl border border-white/10 p-4 text-center shadow-lg"
          >
            <div className="relative h-10 w-10 mb-2">
              {/* eslint-disable-next-html-element-suppress */}
              <img
                src={skill.iconUrl}
                alt={skill.name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <p className="text-xs font-semibold text-white truncate w-full">{skill.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
