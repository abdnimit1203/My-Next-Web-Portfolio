"use client";

import { ResourceEditor } from "@/components/admin/ResourceEditor";

export default function SocialsPanel() {
  return (
    <ResourceEditor
      resource="socials"
      title="Social Links"
      fields={[
        { name: "platform", label: "Platform (e.g. LinkedIn)", type: "text" },
        { name: "url", label: "URL", type: "text" },
        { name: "iconKey", label: "Icon key (linkedin, github, facebook, twitter, instagram, email)", type: "text" },
        { name: "order", label: "Order", type: "number" },
      ]}
    />
  );
}
