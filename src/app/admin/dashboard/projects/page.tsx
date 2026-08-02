"use client";

import { ResourceEditor } from "@/components/admin/ResourceEditor";

export default function ProjectsPanel() {
  return (
    <ResourceEditor
      resource="projects"
      title="Projects"
      fields={[
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "images", label: "Image URLs (comma-separated)", type: "list" },
        { name: "techIcons", label: "Technologies / Tech Stack Icons", type: "tech-select" },
        { name: "githubUrl", label: "GitHub URL", type: "text" },
        { name: "liveUrl", label: "Live URL", type: "text" },
        { name: "demoEmail", label: "Demo Email (optional)", type: "text" },
        { name: "demoPassword", label: "Demo Password (optional)", type: "text" },
        { name: "featured", label: "Mark as Featured Project", type: "boolean" },
        { name: "order", label: "Display Order Priority", type: "number" },
      ]}
    />
  );
}
