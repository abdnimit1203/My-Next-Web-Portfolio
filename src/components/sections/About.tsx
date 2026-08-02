"use client";

import { motion } from "framer-motion";
import { FiBriefcase, FiCalendar, FiMapPin, FiAward } from "react-icons/fi";

const EXPERIENCES = [
  {
    company: "Classytic",
    role: "Product Development Specialist",
    period: "June 2026 — Present",
    type: "Full-Time",
    location: "Dhaka, Bangladesh",
    highlight: true,
  },
  {
    company: "Freelance / Self-Employed",
    role: "Full-Stack Web Developer",
    period: "July 2024 — Present",
    type: "Remote & Client Projects",
    location: "Worldwide",
    highlight: false,
  },
  {
    company: "Solutya Pvt. Ltd.",
    role: "Software Engineer",
    period: "Feb 2024 — June 2024",
    type: "Internship",
    location: "Uttara, Dhaka, Bangladesh",
    url: "https://solutya.com/",
    highlight: false,
  },
];

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-20">
      <SectionHeading eyebrow="Get to know" title="About Me & Experience" />

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-start">
        {/* About Bio Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 glass-card space-y-4 rounded-3xl p-8 text-slate-300 border border-white/10 shadow-xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-3.5 py-1 text-xs font-semibold text-purple-300 mb-2">
            <FiAward className="text-purple-400" />
            <span>Computer Science & Engineering</span>
          </div>

          <motion.p whileHover={{ x: 4 }} className="cursor-default rounded-xl p-3 transition hover:bg-white/5 leading-relaxed text-sm">
            My name is <span className="font-bold text-white">Abdullah Ibne Ali</span>. I hold a{" "}
            <span className="font-bold text-white">BSc in Computer Science & Engineering (CSE)</span> from North South University (ECE Department). I was born and raised in Gazipur, Dhaka, <span className="font-bold text-white">Bangladesh</span>.
          </motion.p>
          <motion.p whileHover={{ x: 4 }} className="cursor-default rounded-xl p-3 transition hover:bg-white/5 leading-relaxed text-sm">
            As a <span className="font-bold text-purple-400">Full-Stack Web Developer</span>, I specialize in building responsive web applications with <span className="font-bold text-cyan-400">React.js</span>, <span className="font-bold text-cyan-400">Next.js 16</span>, <span className="font-bold text-purple-300">Node.js</span>, and <span className="font-bold text-purple-300">MongoDB</span>.
          </motion.p>
          <motion.p whileHover={{ x: 4 }} className="cursor-default rounded-xl p-3 transition hover:bg-white/5 leading-relaxed text-sm">
            Traveling and exploring new technologies give me a fresh outlook on problem-solving — bringing creativity, detail, and dedication to every project I build.
          </motion.p>
        </motion.div>

        {/* Work Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 glass-card rounded-3xl border border-white/10 p-8 shadow-xl relative"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/80 text-white font-bold shadow-md">
                <FiBriefcase className="text-xl" />
              </div>
              <h3 className="font-display text-xl font-bold text-white">Work Experience</h3>
            </div>
            <span className="text-[0.65rem] bg-purple-950/80 border border-purple-500/30 px-2.5 py-1 rounded-full text-purple-300 font-mono">
              3 Roles
            </span>
          </div>

          {/* Timeline Container with Centered Vertical Line */}
          <div className="space-y-6 relative before:absolute before:left-[18px] before:top-3 before:bottom-3 before:w-0.5 before:-translate-x-1/2 before:bg-gradient-to-b before:from-purple-500 before:via-blue-500 before:to-slate-700">
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="relative pl-10 group">
                {/* Timeline Bullet Dot - Centered on 18px vertical axis */}
                <div
                  className={`absolute left-[18px] top-6 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 transition-all duration-300 ${
                    exp.highlight
                      ? "border-purple-400 bg-purple-500 ring-4 ring-purple-500/30"
                      : "border-white/40 bg-slate-900 group-hover:border-purple-400"
                  }`}
                />

                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 transition-all duration-200 group-hover:border-purple-500/40 group-hover:bg-slate-900/80">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                      {exp.role}
                      <span className="text-purple-400">@</span>
                      {exp.url ? (
                        <a href={exp.url} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                          {exp.company}
                        </a>
                      ) : (
                        <span className="text-cyan-300 font-semibold">{exp.company}</span>
                      )}
                    </h4>
                    <span className="text-[0.65rem] font-semibold text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded-md border border-purple-500/30">
                      {exp.type}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-4 text-[0.72rem] text-slate-400">
                    <span className="flex items-center gap-1">
                      <FiCalendar className="text-purple-400" /> {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiMapPin className="text-slate-500" /> {exp.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-purple-400">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl font-bold text-white tracking-tight">{title}</h2>
    </motion.div>
  );
}
