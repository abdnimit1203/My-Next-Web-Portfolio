"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AuthGuard } from "@/components/admin/AuthGuard";
import { clearToken } from "@/lib/authClient";
import {
  FiHome,
  FiShare2,
  FiCode,
  FiFolder,
  FiMessageSquare,
  FiExternalLink,
  FiLogOut,
  FiShield,
  FiChevronRight,
  FiMenu,
  FiX,
} from "react-icons/fi";
import Image from "next/image";

const NAV = [
  { href: "/admin/dashboard/hero", label: "Hero Content", icon: FiHome },
  { href: "/admin/dashboard/socials", label: "Social Links", icon: FiShare2 },
  { href: "/admin/dashboard/skills", label: "Skills & Tech", icon: FiCode },
  { href: "/admin/dashboard/projects", label: "Projects", icon: FiFolder },
  { href: "/admin/dashboard/testimonials", label: "Testimonials", icon: FiMessageSquare },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeNavItem = NAV.find((item) => item.href === pathname) || NAV[0];

  const handleLogout = () => {
    clearToken();
    router.push("/admin/login");
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col md:flex-row">
        {/* Mobile Sticky Header Bar with Breadcrumbs */}
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-slate-950/90 px-4 py-3 backdrop-blur-xl md:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Link href="/" className="flex items-center gap-1.5 text-white">
              {/* eslint-disable-next-html-element-suppress */}
              <img src="/logoABD.png" alt="ABD Logo" className="h-5 w-5 object-contain" />
              <span>Admin</span>
            </Link>
            <FiChevronRight className="text-slate-500 text-xs" />
            <span className="flex items-center gap-1.5 text-purple-400 font-bold">
              <activeNavItem.icon className="text-sm" />
              {activeNavItem.label}
            </span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-slate-900 text-slate-200 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX className="text-lg" /> : <FiMenu className="text-lg" />}
          </button>
        </header>

        {/* Sidebar Container (Static/Sticky on Desktop) */}
        <aside
          className={`${
            mobileMenuOpen ? "flex" : "hidden"
          } md:flex flex-col justify-between w-full md:w-64 md:h-screen md:sticky md:top-0 bg-slate-950/95 border-b md:border-b-0 md:border-r border-white/10 p-6 shrink-0 backdrop-blur-xl z-30 transition-all`}
        >
          <div className="space-y-6">
            {/* Header / Brand & Profile info */}
            <div className="space-y-4 border-b border-white/10 pb-5">
              <Link
                href="/"
                className="flex items-center gap-2.5 font-display text-base font-bold tracking-wide text-white group hover:text-cyan-400 transition"
                title="Go to Public Homepage"
              >
                {/* eslint-disable-next-html-element-suppress */}
                <img src="/logoABD.png" alt="ABD Logo" className="h-7 w-7 object-contain group-hover:scale-105 transition" />
                <span>
                  Abdullah<span className="text-purple-500">.</span>
                </span>
              </Link>

              <div className="flex items-center gap-3 pt-1">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-purple-500 shadow-md shrink-0">
                  <Image src="/hero-photo.jpg" alt="Admin" fill className="object-cover" />
                </div>
                <div>
                  <h2 className="font-bold text-xs text-white flex items-center gap-1.5">
                    <FiShield className="text-purple-400" /> Admin Workspace
                  </h2>
                  <span className="inline-flex items-center gap-1.5 text-[0.65rem] text-emerald-400 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active Session
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="space-y-1.5">
              <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">Management Modules</p>
              {NAV.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-900/30 border border-purple-400/40"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className={`text-base ${isActive ? "text-white" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Actions (Always pinned at bottom on Web) */}
          <div className="pt-6 border-t border-white/10 space-y-2 mt-6">
            <Link
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold text-cyan-400 hover:bg-cyan-950/30 border border-cyan-500/20 transition"
            >
              <span className="flex items-center gap-2">
                <FiExternalLink /> View Public Site
              </span>
              <span className="text-[0.65rem] bg-cyan-900/50 px-1.5 py-0.5 rounded text-cyan-300">Live</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/30 border border-rose-500/20 transition"
            >
              <FiLogOut /> Log Out
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 md:p-10 max-w-6xl md:h-screen md:overflow-y-auto">
          {/* Desktop Top Breadcrumbs Header */}
          <div className="hidden md:flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <span>Admin</span>
              <FiChevronRight className="text-slate-600" />
              <span>Dashboard</span>
              <FiChevronRight className="text-slate-600" />
              <span className="text-purple-400 font-bold flex items-center gap-1.5">
                <activeNavItem.icon />
                {activeNavItem.label}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 font-semibold"
              >
                <FiExternalLink /> Live Site
              </Link>
            </div>
          </div>

          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
