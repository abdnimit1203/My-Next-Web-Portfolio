"use client";

import { motion } from "framer-motion";
import { FiCode, FiLayers, FiShoppingCart, FiLayout, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { SectionHeading } from "./About";

const SERVICES = [
  {
    icon: FiCode,
    title: "Full-Stack Web Development",
    description:
      "Building fast, responsive, and scalable web applications with modern architecture using Next.js 16, React, Node.js, Express, and MongoDB.",
    skills: ["React", "Next.js 16", "Node.js", "Express", "MongoDB Atlas"],
  },
  {
    icon: FiLayers,
    title: "Custom Web Apps & SaaS",
    description:
      "Crafting scalable SaaS platforms, multi-role user dashboards, real-time features, secure JWT authentication, and REST API architecture.",
    skills: ["Dashboard UIs", "JWT Auth", "REST APIs", "MERN Stack"],
  },
  {
    icon: FiShoppingCart,
    title: "E-Commerce Solutions",
    description:
      "Creating seamless online storefronts with item catalogues, cart systems, Stripe checkout integrations, and role-based admin controls.",
    skills: ["Stripe Payments", "Cart Systems", "Inventory Workflows"],
  },
  {
    icon: FiLayout,
    title: "API Integration & Performance",
    description:
      "Designing robust RESTful API architecture, third-party service integrations, database query optimization, and Core Web Vitals performance.",
    skills: ["REST APIs", "Node.js", "MongoDB Atlas", "Next.js 16"],
  },
];

export function Services() {
  const linkedinUrl = "https://www.linkedin.com/in/abdullah-ibne-ali";

  return (
    <section id="services" className="relative mx-auto max-w-6xl px-6 py-20">
      {/* Ambient Glow background */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-purple-600/10 blur-[160px]" />

      <SectionHeading eyebrow="WHAT I DO" title="Services I Offer" />

      {/* Classytic Partnership Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-6 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-950/60 via-slate-950/80 to-blue-950/60 p-5 shadow-xl backdrop-blur-xl"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white font-bold shadow-md">
            C
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Working with Classytic</span>
              <FiCheckCircle className="text-emerald-400" />
            </h4>
            <p className="text-xs text-slate-300">
              Delivering full-stack web solutions, performance tech, e-commerce, and creative digital services through <strong>Classytic</strong>.
            </p>
          </div>
        </div>

        <a
          href={linkedinUrl}
          target="_blank"
          rel="noreferrer"
          className="glass-button flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-purple-300 hover:text-white shrink-0"
        >
          <span>Get Service via LinkedIn</span>
          <FiArrowRight />
        </a>
      </motion.div>

      {/* Services 4-Card Grid (Matching Reference Design) */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service, i) => {
          const Icon = service.icon;

          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-card group flex flex-col justify-between rounded-3xl border border-white/10 p-6 hover:border-purple-500/40 transition duration-300 shadow-xl"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600/80 to-blue-600/80 text-xl text-white shadow-lg shadow-purple-950/50 group-hover:scale-110 transition duration-300">
                  <Icon />
                </div>

                <h3 className="mt-5 font-display text-lg font-bold text-white group-hover:text-purple-400 transition">
                  {service.title}
                </h3>

                <p className="mt-3 text-xs leading-relaxed text-slate-300">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {service.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-slate-950/70 border border-white/10 px-2 py-0.5 text-[0.65rem] font-medium text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
