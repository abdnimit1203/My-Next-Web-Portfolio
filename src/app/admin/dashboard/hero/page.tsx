"use client";

import { useEffect, useState } from "react";
import { adminApi } from "@/lib/adminApi";
import type { HeroContent } from "@/lib/types";

export default function HeroPanel() {
  const [form, setForm] = useState<Partial<HeroContent>>({});
  const [rolesText, setRolesText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminApi.getHero().then((hero) => {
      if (hero) {
        setForm(hero);
        setRolesText(hero.typewriterRoles?.join(", ") ?? "");
      }
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      typewriterRoles: rolesText.split(",").map((s) => s.trim()).filter(Boolean),
    };
    const updated = await adminApi.updateHero(payload);
    setForm(updated);
    setSaving(false);
  };

  if (loading) return <p className="text-sm text-muted">Loading…</p>;

  return (
    <form onSubmit={handleSubmit} className="glass-card space-y-4 rounded-2xl p-6">
      <h1 className="font-display text-2xl font-bold">Hero</h1>

      <label className="flex flex-col gap-1 text-sm">
        Headline
        <input
          className="rounded-lg border border-border bg-transparent p-2"
          value={form.headline ?? ""}
          onChange={(e) => setForm((f) => ({ ...f, headline: e.target.value }))}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Subheadline
        <textarea
          className="rounded-lg border border-border bg-transparent p-2"
          rows={3}
          value={form.subheadline ?? ""}
          onChange={(e) => setForm((f) => ({ ...f, subheadline: e.target.value }))}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Typewriter Roles (comma-separated)
        <input
          className="rounded-lg border border-border bg-transparent p-2"
          value={rolesText}
          onChange={(e) => setRolesText(e.target.value)}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        CV / Resume URL
        <input
          className="rounded-lg border border-border bg-transparent p-2"
          placeholder="https://... (upload your PDF to Google Drive/Dropbox and paste the link — ImgBB only hosts images)"
          value={form.cvUrl ?? ""}
          onChange={(e) => setForm((f) => ({ ...f, cvUrl: e.target.value }))}
        />
        {form.cvUrl && (
          <a href={form.cvUrl} target="_blank" rel="noreferrer" className="text-xs text-primary">
            Current file ↗
          </a>
        )}
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Hire Me Button Text
        <input
          className="rounded-lg border border-border bg-transparent p-2"
          value={form.hireMeText ?? ""}
          onChange={(e) => setForm((f) => ({ ...f, hireMeText: e.target.value }))}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Hire Me Link
        <input
          className="rounded-lg border border-border bg-transparent p-2"
          value={form.hireMeUrl ?? ""}
          onChange={(e) => setForm((f) => ({ ...f, hireMeUrl: e.target.value }))}
        />
      </label>

      <button type="submit" disabled={saving} className="glass-button rounded-lg px-5 py-2 text-sm font-medium disabled:opacity-60">
        {saving ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
