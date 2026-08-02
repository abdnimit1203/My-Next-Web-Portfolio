"use client";

import { ResourceEditor } from "@/components/admin/ResourceEditor";

export default function TestimonialsPanel() {
  return (
    <ResourceEditor
      resource="testimonials"
      title="Testimonials"
      fields={[
        { name: "name", label: "Name", type: "text" },
        { name: "role", label: "Role", type: "text" },
        { name: "company", label: "Company", type: "text" },
        { name: "quote", label: "Quote", type: "textarea" },
        { name: "avatarUrl", label: "Avatar", type: "image" },
        { name: "order", label: "Order", type: "number" },
      ]}
    />
  );
}
