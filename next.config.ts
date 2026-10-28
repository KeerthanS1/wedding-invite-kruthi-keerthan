import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // WebP only: AVIF is slightly smaller but takes many times longer to encode,
    // which made photos slow to appear the first time they were requested.
    formats: ["image/webp"],
    // keep optimised copies cached for 30 days
    minimumCacheTTL: 2592000,
    qualities: [75, 82, 90],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
