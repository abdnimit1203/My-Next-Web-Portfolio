"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiHome, FiGrid, FiUser, FiCode, FiFolder, FiMail, FiSend } from "react-icons/fi";
import { onModalOpenChange } from "@/lib/modalBus";

const NAV_ITEMS = [
  { href: "#hero", id: "hero", label: "Home", icon: FiHome },
  { href: "#services", id: "services", label: "Services", icon: FiGrid },
  { href: "#about", id: "about", label: "About", icon: FiUser },
  { href: "#skills", id: "skills", label: "Skills", icon: FiCode },
  { href: "#projects", id: "projects", label: "Projects", icon: FiFolder },
  { href: "#contact", id: "contact", label: "Contact", icon: FiMail },
];

export function Nav({ hireMeText, hireMeUrl }: { hireMeText: string; hireMeUrl: string }) {
  const [activeSection, setActiveSection] = useState("hero");
  const [modalOpen, setModalOpenState] = useState(false);

  const linkedinUrl = hireMeUrl && hireMeUrl !== "#contact" ? hireMeUrl : "https://www.linkedin.com/in/abdullah-ibne-ali";

  // Drop sticky/fixed positioning entirely while a modal is open, then
  // remount fresh on close (key change) — Chromium can leave `position:
  // sticky` permanently stuck after body's overflow is toggled for a
  // scroll lock; a clean unmount/remount sidesteps that instead of
  // fighting the browser bug.
  useEffect(() => onModalOpenChange(setModalOpenState), []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Header Bar for Brand Logo & LinkedIn CTA */}
      <header
        key={modalOpen ? "modal-open" : "modal-closed"}
        className={`${modalOpen ? "relative" : "sticky top-0"} z-40 w-full backdrop-blur-md bg-slate-950/70 border-b border-white/5`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "hero")}
            className="flex items-center gap-2.5 font-display text-base sm:text-lg font-bold tracking-wide text-white group"
          >
            {/* Solid ABD Logo Image */}
            {/* eslint-disable-next-html-element-suppress */}
            <img
              src="/logoABD.png"
              alt="ABD Logo"
              className="h-8 w-8 sm:h-9 sm:w-9 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span>
              Abdullah<span className="text-primary">.</span>
            </span>
          </a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="glass-button-primary flex items-center gap-1.5 sm:gap-2 rounded-full px-4 sm:px-5 py-2 text-[0.7rem] sm:text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-purple-900/40"
          >
            <span>{hireMeText || "Let's Talk"}</span>
            <FiSend className="text-xs sm:text-sm" />
          </motion.a>
        </div>
      </header>

      {/* Bottom Fixed Floating Navigation Bar (bounded by inset-x, never viewport-width units) */}
      <div
        className={`pointer-events-none fixed bottom-4 inset-x-4 z-50 flex justify-center transition-opacity duration-150 ${modalOpen ? "invisible opacity-0" : "visible opacity-100"
          }`}
      >
        <nav className="glass-nav pointer-events-auto flex max-w-full items-center justify-center gap-1 overflow-x-auto mb-4 px-2 py-2.5 sm:gap-2 sm:px-3.5 rounded-full border border-white/25 shadow-2xl shadow-purple-950/80 backdrop-blur-lg  bg-slate-950/50">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "hero")}
            className="hidden md:flex items-center justify-center p-1 rounded-full hover:bg-white/10 transition"
            title="ABD Portfolio"
          >
            {/* eslint-disable-next-html-element-suppress */}
            <img
              src="/logoABD.png"
              alt="ABD Logo"
              className="h-6 w-6 object-contain"
            />
          </a>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-2.5 rounded-full text-xs font-medium transition-all duration-200 touch-manipulation select-none ${isActive ? "text-white font-semibold" : "text-slate-400 hover:text-slate-200 hover:bg-white/10"
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/90 to-blue-600/90 shadow-lg shadow-purple-500/40"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 text-lg sm:text-base">
                  <Icon />
                </span>
                <span className="relative z-10 hidden md:inline-block text-xs">{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
}
