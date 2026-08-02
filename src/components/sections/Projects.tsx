"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiMaximize2, FiKey, FiStar } from "react-icons/fi";
import type { Project } from "@/lib/types";
import { SectionHeading } from "./About";
import { ProjectModal } from "../ProjectModal";

export function Projects({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<"all" | "featured">("all");

  const visibleProjects = filter === "featured" ? projects.filter((p) => Boolean(p.featured)) : projects;

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-20">
      <SectionHeading eyebrow="My Recent Work" title="Portfolio & Case Studies" />

      {/* Filter Tabs */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-full px-5 py-2 text-xs font-bold transition ${
            filter === "all"
              ? "bg-purple-600 text-white shadow-lg shadow-purple-900/50"
              : "bg-slate-900/80 text-slate-400 border border-white/10 hover:text-white"
          }`}
        >
          All Work ({projects.length})
        </button>
        <button
          onClick={() => setFilter("featured")}
          className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-bold transition ${
            filter === "featured"
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-900/50"
              : "bg-slate-900/80 text-slate-400 border border-white/10 hover:text-white"
          }`}
        >
          <FiStar className="text-amber-400 fill-amber-400" /> Featured Only ({projects.filter((p) => Boolean(p.featured)).length})
        </button>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project, i) => {
          const mainImage = project.images && project.images[0] ? project.images[0] : "";

          return (
            <motion.article
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-card group flex flex-col overflow-hidden rounded-3xl border border-white/10 hover:border-purple-500/40 transition-all duration-300 shadow-xl relative"
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-wider text-white shadow-lg backdrop-blur-md border border-white/20">
                  <FiStar className="text-amber-300 fill-amber-300" /> Featured
                </div>
              )}
              {/* Project Card Image Container with Hover Scroll */}
              <div
                onClick={() => setSelectedProject(project)}
                className="screen-scroll-container relative aspect-video w-full cursor-pointer bg-slate-950 overflow-hidden"
              >
                {mainImage ? (
                  /* eslint-disable-next-html-element-suppress */
                  <img
                    src={mainImage}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-slate-500 text-xs">
                    No Preview
                  </div>
                )}

                {/* Overlay hover badge */}
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="flex items-center gap-2 rounded-full bg-purple-600/90 px-4 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md">
                    <FiMaximize2 /> View Project
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex items-start justify-between gap-2">
                  <h3
                    onClick={() => setSelectedProject(project)}
                    className="font-display text-lg font-bold text-white hover:text-purple-400 cursor-pointer transition"
                  >
                    {project.title}
                  </h3>
                </div>

                <p className="line-clamp-3 text-sm text-slate-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack Icons */}
                {project.techIcons && project.techIcons.length > 0 && (
                  <div className="flex items-center gap-2 pt-1">
                    {project.techIcons.map((icon, idx) => (
                      <div key={idx} className="h-6 w-6 rounded-md bg-slate-950/60 p-1 border border-white/10 flex items-center justify-center">
                        {/* eslint-disable-next-html-element-suppress */}
                        <img
                          src={icon}
                          alt="tech icon"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Demo email chip */}
                {project.demoEmail && (
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                    <FiKey className="text-cyan-400" />
                    <span>Demo: <span className="font-mono text-cyan-300">{project.demoEmail}</span></span>
                  </div>
                )}

                {/* Card Action Buttons */}
                <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4 text-xs font-semibold">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-purple-400 hover:text-purple-300 flex items-center gap-1 transition"
                  >
                    Details & Gallery &rarr;
                  </button>

                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-300 hover:text-white flex items-center gap-1 transition"
                        title="GitHub Code"
                      >
                        <FiGithub className="text-sm" /> Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition font-bold"
                        title="Live Demo"
                      >
                        <FiExternalLink className="text-sm" /> Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Interactive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
