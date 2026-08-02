"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiMessageCircle, FiLinkedin, FiSend, FiCheck, FiCopy, FiMapPin, FiNavigation, FiAlertCircle } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import { SectionHeading } from "./About";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const emailAddress = "abdullah.ibneali152pro@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_nsuko84";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_3a8r92i";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "aHuzn2Ukm2q2xilou";

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          username: formData.name,
          user_email: formData.email,
          message: formData.message,
        },
        { publicKey }
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-20">
      <SectionHeading eyebrow="GET IN TOUCH" title="Let's Get Connected" />

      {/* Main Reference-Style Card Container */}
      <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl backdrop-blur-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* Left Block: Reference Design Gradient Box (lg:col-span-3) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 flex flex-col justify-between p-6 sm:p-8 text-white relative overflow-hidden bg-gradient-to-br from-[#d946ef] via-[#8b5cf6] to-[#3b82f6]"
          >
            <div className="space-y-5 relative z-10">
              {/* Circular Badge Icon from Reference */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-2xl text-white shadow-lg border border-white/30">
                <FiNavigation className="transform -rotate-12" />
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                  Let&apos;s Work<br />Together!
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/90">
                  Have a project in mind?<br />
                  Let&apos;s create something great.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/20 relative z-10">
              <span className="text-[0.65rem] font-bold uppercase tracking-wider text-white/80">Available for Hire</span>
            </div>
          </motion.div>

          {/* Middle & Right Block: Form + Direct Contact Details (lg:col-span-9) */}
          <div className="lg:col-span-9 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Form Column */}
            <div className="md:col-span-7 space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-slate-900/90 p-3.5 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-slate-900/90 p-3.5 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition"
                  />
                </div>

                <div>
                  <textarea
                    required
                    rows={4}
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-slate-900/90 p-3.5 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition"
                  />
                </div>

                {status === "success" && (
                  <div className="flex items-center gap-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 p-3 text-xs text-emerald-300">
                    <FiCheck className="text-base" /> Your message was sent successfully via EmailJS!
                  </div>
                )}

                {status === "error" && (
                  <div className="flex items-center gap-2 rounded-xl bg-rose-950/60 border border-rose-500/40 p-3 text-xs text-rose-300">
                    <FiAlertCircle className="text-base" /> Failed to send message. Please copy & email directly.
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="glass-button-primary flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold text-white shadow-xl shadow-purple-900/40 disabled:opacity-60 transition"
                  >
                    <span>{status === "loading" ? "Sending..." : "Send Message"}</span>
                    <FiSend className="text-sm" />
                  </button>
                </div>
              </form>
            </div>

            {/* Direct Contact Stack Column */}
            <div className="md:col-span-5 space-y-4 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-6 overflow-hidden">
              
              {/* One-Click Copy Email */}
              <div
                onClick={handleCopyEmail}
                className="group flex items-center gap-3 cursor-pointer rounded-xl p-2.5 hover:bg-white/5 transition border border-transparent hover:border-white/10"
                title="Click to copy email"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 border border-white/10 text-purple-400 group-hover:border-purple-500 group-hover:text-white transition">
                  <FiMail className="text-lg" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">Email (Click to Copy)</p>
                  <p className="text-xs font-semibold text-white group-hover:text-purple-300 transition flex items-center gap-1.5 truncate">
                    <span className="truncate">{emailAddress}</span>
                    {copiedEmail ? <FiCheck className="text-emerald-400 shrink-0" /> : <FiCopy className="text-slate-500 text-xs shrink-0" />}
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/8801761609974"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-xl p-2.5 hover:bg-white/5 transition border border-transparent hover:border-white/10"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 border border-white/10 text-emerald-400 group-hover:border-emerald-500 group-hover:text-white transition">
                  <FiMessageCircle className="text-lg" />
                </div>
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">WhatsApp</p>
                  <p className="text-xs font-semibold text-white group-hover:text-emerald-300 transition">
                    Send Message
                  </p>
                </div>
              </a>

              {/* LinkedIn Direct Message */}
              <a
                href="https://www.linkedin.com/in/abdullah-ibne-ali"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-xl p-2.5 hover:bg-white/5 transition border border-transparent hover:border-white/10"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 border border-white/10 text-blue-400 group-hover:border-blue-500 group-hover:text-white transition">
                  <FiLinkedin className="text-lg" />
                </div>
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">LinkedIn</p>
                  <p className="text-xs font-semibold text-white group-hover:text-blue-300 transition">
                    Direct Message
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3 p-2.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 border border-white/10 text-rose-400">
                  <FiMapPin className="text-lg" />
                </div>
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">Location</p>
                  <p className="text-xs font-semibold text-white">Dhaka, Bangladesh</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
