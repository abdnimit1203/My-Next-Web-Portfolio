"use client";

import { useEffect, useState } from "react";
import { adminApi } from "@/lib/adminApi";
import { uploadImage } from "@/lib/uploadImage";
import { FiPlus, FiEdit2, FiTrash2, FiUpload, FiCheck, FiX, FiLayers } from "react-icons/fi";
import Image from "next/image";

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "image" | "boolean" | "list" | "tech-select";
}

export const COMMON_TECH_ICONS = [
  { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "TailwindCSS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "HTML5", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Redux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
  { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Firebase", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
];

type Item = Record<string, unknown> & { _id?: string };

export function ResourceEditor({ resource, fields, title }: { resource: string; fields: FieldConfig[]; title: string }) {
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState<Item>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [customTechInput, setCustomTechInput] = useState("");

  const load = async () => {
    setLoading(true);
    const data = await adminApi.list<Item>(resource);
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource]);

  const resetForm = () => {
    setForm({});
    setEditingId(null);
    setCustomTechInput("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        featured: form.featured === undefined ? false : Boolean(form.featured),
        active: form.active === undefined ? true : Boolean(form.active),
      };

      if (editingId) {
        await adminApi.update(resource, editingId, payload);
      } else {
        await adminApi.create(resource, payload);
      }
      resetForm();
      await load();
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item: Item) => {
    setForm({
      ...item,
      featured: Boolean(item.featured),
      active: item.active === undefined ? true : Boolean(item.active),
    });
    setEditingId(item._id ?? null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    await adminApi.remove(resource, id);
    await load();
  };

  const handleFileChange = async (fieldName: string, file: File | undefined) => {
    if (!file) return;
    setUploadingField(fieldName);
    try {
      const url = await uploadImage(file);
      setForm((f) => ({ ...f, [fieldName]: url }));
    } finally {
      setUploadingField(null);
    }
  };

  const toggleTechIcon = (fieldName: string, iconUrl: string) => {
    const currentList = Array.isArray(form[fieldName]) ? (form[fieldName] as string[]) : [];
    if (currentList.includes(iconUrl)) {
      setForm((f) => ({ ...f, [fieldName]: currentList.filter((u) => u !== iconUrl) }));
    } else {
      setForm((f) => ({ ...f, [fieldName]: [...currentList, iconUrl] }));
    }
  };

  const addCustomTech = (fieldName: string) => {
    if (!customTechInput.trim()) return;
    const currentList = Array.isArray(form[fieldName]) ? (form[fieldName] as string[]) : [];
    if (!currentList.includes(customTechInput.trim())) {
      setForm((f) => ({ ...f, [fieldName]: [...currentList, customTechInput.trim()] }));
    }
    setCustomTechInput("");
  };

  return (
    <div className="space-y-8">
      {/* Overview Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <FiLayers className="text-purple-400" /> {title}
          </h1>
          <p className="text-xs text-slate-400 mt-1">Manage and edit your portfolio data in real-time.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2 text-xs font-semibold text-slate-300">
            Total Items: <span className="text-purple-400 font-bold">{items.length}</span>
          </div>
        </div>
      </div>

      {/* Editor Form Card */}
      <form onSubmit={handleSubmit} className="glass-card grid gap-5 rounded-3xl border border-white/15 p-6 sm:p-8 bg-slate-950/70 shadow-2xl">
        <div className="md:col-span-2 flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2">
            {editingId ? <FiEdit2 /> : <FiPlus />} {editingId ? "Edit Resource Item" : "Create New Item"}
          </h2>
          {editingId && (
            <span className="text-[0.65rem] bg-purple-950/80 border border-purple-500/40 text-purple-300 px-2 py-0.5 rounded-full font-mono">
              ID: {editingId}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:col-span-2">
          {fields.map((field) => (
            <label key={field.name} className={`flex flex-col gap-1.5 text-xs font-medium text-slate-300 ${field.type === "textarea" || field.type === "tech-select" ? "md:col-span-2" : ""}`}>
              <span className="text-slate-400 font-semibold">{field.label}</span>

              {field.type === "textarea" ? (
                <textarea
                  className="rounded-xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition"
                  rows={4}
                  value={(form[field.name] as string) ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, [field.name]: e.target.value }))}
                  placeholder={`Enter ${field.label.toLowerCase()}...`}
                />
              ) : field.type === "boolean" ? (
                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id={field.name}
                    className="h-5 w-5 rounded border-white/20 bg-slate-900 text-purple-600 focus:ring-purple-500 cursor-pointer"
                    checked={Boolean(form[field.name])}
                    onChange={(e) => setForm((f) => ({ ...f, [field.name]: e.target.checked }))}
                  />
                  <label htmlFor={field.name} className="text-xs text-slate-300 cursor-pointer font-semibold">
                    {field.label}
                  </label>
                </div>
              ) : field.type === "tech-select" ? (
                <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                  {/* Selected Tech Badges Chips */}
                  <div className="flex flex-wrap gap-2 min-h-[36px] items-center p-2 rounded-xl bg-slate-950/80 border border-white/10">
                    {Array.isArray(form[field.name]) && (form[field.name] as string[]).length > 0 ? (
                      (form[field.name] as string[]).map((iconUrl, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 rounded-lg bg-purple-950/80 border border-purple-500/40 px-2.5 py-1 text-xs font-semibold text-purple-200"
                        >
                          {/* eslint-disable-next-html-element-suppress */}
                          <img src={iconUrl} alt="" className="h-4 w-4 object-contain" />
                          <span className="truncate max-w-[120px]">
                            {COMMON_TECH_ICONS.find((t) => t.url === iconUrl)?.name || "Custom"}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleTechIcon(field.name, iconUrl)}
                            className="text-purple-400 hover:text-rose-400 transition ml-0.5"
                          >
                            <FiX className="text-xs" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500 italic">No technologies selected yet. Click badges below to add.</span>
                    )}
                  </div>

                  {/* Preset Tech Icons Grid */}
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400 mb-2">Select Tech Stack</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
                      {COMMON_TECH_ICONS.map((tech) => {
                        const isSelected = Array.isArray(form[field.name]) && (form[field.name] as string[]).includes(tech.url);
                        return (
                          <button
                            type="button"
                            key={tech.name}
                            onClick={() => toggleTechIcon(field.name, tech.url)}
                            className={`flex flex-col items-center justify-center gap-1 rounded-xl p-2.5 border transition text-xs font-medium ${
                              isSelected
                                ? "bg-purple-900/60 border-purple-400 text-white shadow-md shadow-purple-950/50"
                                : "bg-slate-900/90 border-white/10 text-slate-400 hover:text-white hover:border-white/25"
                            }`}
                          >
                            {/* eslint-disable-next-html-element-suppress */}
                            <img src={tech.url} alt={tech.name} className="h-5 w-5 object-contain" />
                            <span className="text-[0.65rem] truncate max-w-full">{tech.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Add Custom Tech Icon URL */}
                  <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                    <input
                      type="text"
                      className="flex-1 rounded-xl border border-white/10 bg-slate-950/80 px-3 py-1.5 text-xs text-white placeholder-slate-500"
                      placeholder="Or paste custom icon URL (e.g. https://...)"
                      value={customTechInput}
                      onChange={(e) => setCustomTechInput(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => addCustomTech(field.name)}
                      className="rounded-xl bg-purple-600 hover:bg-purple-500 px-3 py-1.5 text-xs font-bold text-white transition"
                    >
                      Add URL
                    </button>
                  </div>
                </div>
              ) : field.type === "image" ? (
                <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-slate-900/60 p-3">
                  {typeof form[field.name] === "string" && form[field.name] ? (
                    <div className="relative h-14 w-14 overflow-hidden rounded-lg border border-white/20">
                      <Image src={form[field.name] as string} alt="" fill className="object-cover" />
                    </div>
                  ) : null}
                  <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
                    <input
                      type="file"
                      accept="image/*"
                      className="text-xs text-slate-400 file:mr-3 file:rounded-lg file:border-0 file:bg-purple-600 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-purple-500 cursor-pointer"
                      onChange={(e) => handleFileChange(field.name, e.target.files?.[0])}
                    />
                    <input
                      type="text"
                      className="rounded-lg border border-white/10 bg-slate-900/90 p-1.5 text-xs text-slate-300"
                      placeholder="Or paste image URL"
                      value={(form[field.name] as string) ?? ""}
                      onChange={(e) => setForm((f) => ({ ...f, [field.name]: e.target.value }))}
                    />
                  </div>
                  {uploadingField === field.name && (
                    <span className="text-xs text-purple-400 font-semibold animate-pulse flex items-center gap-1">
                      <FiUpload /> Compressing & Uploading...
                    </span>
                  )}
                </div>
              ) : field.type === "list" ? (
                <input
                  className="rounded-xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition"
                  placeholder="Comma-separated items (e.g. React, Next.js, Node.js)"
                  value={Array.isArray(form[field.name]) ? (form[field.name] as string[]).join(", ") : ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, [field.name]: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }))
                  }
                />
              ) : (
                <input
                  type={field.type === "number" ? "number" : "text"}
                  className="rounded-xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition"
                  value={(form[field.name] as string | number) ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      [field.name]: field.type === "number" ? Number(e.target.value) : e.target.value,
                    }))
                  }
                  placeholder={`Enter ${field.label.toLowerCase()}...`}
                />
              )}
            </label>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/10 md:col-span-2">
          <button
            type="submit"
            disabled={submitting}
            className="glass-button-primary flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-bold text-white shadow-lg disabled:opacity-50"
          >
            {submitting ? (
              <span>Saving...</span>
            ) : editingId ? (
              <>
                <FiCheck /> Save Changes
              </>
            ) : (
              <>
                <FiPlus /> Add Item
              </>
            )}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="flex items-center gap-1 rounded-xl border border-white/15 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition"
            >
              <FiX /> Cancel
            </button>
          )}
        </div>
      </form>

      {/* Items Grid Listing */}
      {loading ? (
        <div className="flex items-center justify-center p-12 text-sm text-slate-400">Loading resources...</div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Existing Items</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {items.map((item) => (
              <div
                key={item._id}
                className="glass-card flex items-center justify-between gap-4 rounded-2xl border border-white/10 p-4 hover:border-purple-500/30 transition duration-200"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  {typeof item.images === "object" && Array.isArray(item.images) && item.images[0] ? (
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-white/10">
                      <Image src={item.images[0] as string} alt="" fill className="object-cover" />
                    </div>
                  ) : typeof item.icon === "string" && item.icon ? (
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-white/10">
                      <Image src={item.icon as string} alt="" fill className="object-cover" />
                    </div>
                  ) : null}

                  <div className="overflow-hidden">
                    <p className="truncate text-sm font-bold text-white">
                      {String(item[fields[0].name] ?? item._id)}
                    </p>
                    {fields[1] && (
                      <p className="truncate text-xs text-slate-400">
                        {String(item[fields[1].name] ?? "")}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300 hover:bg-purple-900 hover:text-white transition"
                    title="Edit item"
                  >
                    <FiEdit2 className="text-sm" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id!)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-300 hover:bg-rose-900 hover:text-white transition"
                    title="Delete item"
                  >
                    <FiTrash2 className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {items.length === 0 && (
            <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-xs text-slate-400">
              No items created yet. Use the form above to add your first resource item!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
