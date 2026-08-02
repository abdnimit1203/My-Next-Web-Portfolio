"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiGithub, FiExternalLink, FiKey, FiMail, FiLayers } from "react-icons/fi";
import type { Project } from "@/lib/types";
import { setModalOpen } from "@/lib/modalBus";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Lock body scroll when open, and tell the nav to drop its sticky/fixed
  // positioning for the duration — toggling `overflow: hidden` on body
  // removes the scrollbar and can leave `position: sticky` elements stuck
  // in a broken state in Chromium; explicitly re-mounting the nav's sticky
  // class after close sidesteps that instead of fighting the browser bug.
  useEffect(() => {
    if (!project) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    setModalOpen(true);

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      setModalOpen(false);
    };
  }, [project]);

  if (!project) return null;

  const images = project.images && project.images.length > 0 ? project.images : [];
  const currentImage = images[selectedImageIndex] || "";

  return (
    <AnimatePresence>
      {/* Fixed Outer Container with Single Clean Scroll Container for Mobile & Desktop */}
      <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md">
        {/* Backdrop overlay listener */}
        <div
          onClick={onClose}
          className="fixed inset-0 z-0 bg-transparent"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="glass-card relative z-10 w-full max-w-4xl rounded-2xl sm:rounded-3xl border border-white/20 bg-slate-950 p-4 sm:p-8 shadow-2xl shadow-purple-950/60 my-auto"
        >
          {/* Top Close Bar for Mobile & Desktop */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 sm:border-0 sm:pb-0 sm:mb-0">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 px-2.5 py-0.5 text-[0.7rem] font-semibold text-purple-300 sm:hidden">
              <FiLayers className="text-purple-400" />
              <span>Project Details</span>
            </div>

            <button
              onClick={onClose}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white transition duration-200 ml-auto"
              aria-label="Close modal"
            >
              <FiX className="text-lg sm:text-xl" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            {/* Left side: Main Image Preview with Hover Scroll + Gallery Thumbnails */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              {/* Screen Preview Container */}
              <div className="screen-scroll-container aspect-video w-full rounded-xl sm:rounded-2xl border border-white/15 bg-slate-900 shadow-inner overflow-hidden cursor-pointer group relative">
                {currentImage ? (
                  /* eslint-disable-next-html-element-suppress */
                  <img
                    src={currentImage}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-all duration-75"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-500 text-xs sm:text-sm">
                    No preview image available
                  </div>
                )}
                <div className="absolute bottom-2 left-2 rounded-md bg-slate-950/85 px-2 py-0.5 text-[0.6rem] sm:text-[0.65rem] font-medium text-cyan-400 backdrop-blur-md">
                  Hover / Tap image to view full page
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-none">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative aspect-video w-16 sm:w-20 shrink-0 overflow-hidden rounded-lg sm:rounded-xl border-2 transition duration-200 ${
                        selectedImageIndex === idx
                          ? "border-purple-500 ring-2 ring-purple-500/50 scale-105"
                          : "border-white/10 opacity-60 hover:opacity-100"
                      }`}
                    >
                      {/* eslint-disable-next-html-element-suppress */}
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right side: Details, Tech Stack, Demo Credentials, Links */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 px-2.5 py-0.5 text-[0.7rem] font-semibold text-purple-300 mb-2">
                  <FiLayers className="text-purple-400" />
                  <span>Featured Project</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{project.title}</h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>

              {/* Tech Icons */}
              {project.techIcons && project.techIcons.length > 0 && (
                <div>
                  <h4 className="text-[0.65rem] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Technologies Used</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.techIcons.map((icon, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-lg border border-white/10 bg-slate-900/80 p-1"
                      >
                        {/* eslint-disable-next-html-element-suppress */}
                        <img
                          src={icon}
                          alt="tech"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Demo Credentials Notice */}
              {(project.demoEmail || project.demoPassword) && (
                <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-2.5 sm:p-3 text-[0.7rem] sm:text-xs text-slate-300 backdrop-blur-md">
                  <p className="font-bold text-cyan-400 flex items-center gap-1 mb-0.5">
                    <FiKey /> Demo Account Credentials:
                  </p>
                  {project.demoEmail && (
                    <p className="flex items-center gap-1 mt-0.5">
                      <FiMail className="text-slate-400" /> Email: <span className="font-mono text-cyan-300">{project.demoEmail}</span>
                    </p>
                  )}
                  {project.demoPassword && (
                    <p className="flex items-center gap-1 mt-0.5">
                      <FiKey className="text-slate-400" /> Password: <span className="font-mono text-cyan-300">{project.demoPassword}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-button-primary flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold text-white shadow-lg"
                  >
                    <span>Live Demo</span>
                    <FiExternalLink />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-button flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold text-slate-200 hover:text-white"
                  >
                    <FiGithub className="text-base" />
                    <span>Code</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
