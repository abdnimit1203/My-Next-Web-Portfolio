"use client";

import { useRef } from "react";
import type { SocialLink } from "@/lib/types";
import { SocialIcon } from "./SocialIcon";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function Footer({ socials }: { socials: SocialLink[] }) {
  const year = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  // Track scroll position relative to the footer container
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  // Parallax translation depth for the dim synthwave surface background
  const bgY = useTransform(scrollYProgress, [0, 1], [-30, 20]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-purple-900/40 bg-[#020617] pt-20 pb-36 sm:pb-44 px-4 sm:px-8 backdrop-blur-xl"
    >
      {/* GENERATED DIM SYNTHWAVE SURFACE BACKDROP */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#020617]">
        <motion.div style={{ y: bgY, scale: bgScale }} className="relative h-full w-full opacity-85">
          <Image
            src="/synthwave-footer-bg.png"
            alt="Dim Synthwave Surface"
            fill
            priority
            className="object-cover object-bottom mix-blend-screen"
          />
        </motion.div>

        {/* GRADUAL DARK FADE AT TOP & BOTTOM */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] pointer-events-none z-10" />
      </div>

      {/* Top Glowing Gradient Line Accent */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-fuchsia-500/60 to-purple-500/60 z-20" />

      {/* FOOTER CONTENT CONTAINER (Restored Original Clean Layout) */}
      <div className="relative z-20 mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-display text-lg font-semibold text-white drop-shadow-md">Abdullah Ibne Ali</p>
          <p className="text-sm text-slate-300 drop-shadow">Copyright &copy; {year} — All rights reserved</p>
        </div>

        <div className="flex items-center gap-6 text-2xl text-white">
          {socials.map((social) => (
            <a
              key={social._id}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              aria-label={social.platform}
              className="transition duration-200 hover:scale-125 hover:text-fuchsia-400 drop-shadow-lg"
            >
              <SocialIcon iconKey={social.iconKey} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
