"use client";

import { motion } from "framer-motion";
import { FiCalendar, FiCode, FiLayers, FiTarget } from "react-icons/fi";

// Edit these numbers directly — intentionally not dashboard-managed (see plan).
const STATS = [
  { icon: FiCalendar, value: "2+", label: "Years Experience" },
  { icon: FiCode, value: "3+", label: "Projects Completed" },
  { icon: FiLayers, value: "13+", label: "Tech Skills" },
  { icon: FiTarget, value: "MERN", label: "Stack Focused" },
];

export function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="glass-card flex items-center gap-4 rounded-2xl p-5"
          >
            <div className="glass-button flex h-12 w-12 items-center justify-center rounded-xl text-xl text-primary">
              <stat.icon />
            </div>
            <div>
              <p className="font-display text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
