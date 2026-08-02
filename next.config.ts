import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/googleb0a76c6221f585d1.html",
        destination: "/api/google-verify",
      },
    ];
  },
};

export default nextConfig;
