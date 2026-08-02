"use client";

import { ResourceEditor } from "@/components/admin/ResourceEditor";

export default function SkillsPanel() {
  return (
    <ResourceEditor
      resource="skills"
      title="Skills"
      fields={[
        { name: "name", label: "Name", type: "text" },
        { name: "iconUrl", label: "Icon", type: "image" },
        { name: "percentage", label: "Percentage", type: "number" },
        { name: "order", label: "Order", type: "number" },
      ]}
    />
  );
}
