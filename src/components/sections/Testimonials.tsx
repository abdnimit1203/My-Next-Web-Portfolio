"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Testimonial } from "@/lib/types";
import { SectionHeading } from "./About";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading eyebrow="What people say" title="Testimonials" />

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.blockquote
            key={t._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            whileHover={{ y: -6 }}
            className="glass-card rounded-3xl p-6"
          >
            <p className="text-sm text-muted">&ldquo;{t.quote}&rdquo;</p>
            <footer className="mt-4 flex items-center gap-3">
              {t.avatarUrl && (
                <Image src={t.avatarUrl} alt={t.name} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
              )}
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted">
                  {t.role}
                  {t.company ? ` · ${t.company}` : ""}
                </p>
              </div>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
