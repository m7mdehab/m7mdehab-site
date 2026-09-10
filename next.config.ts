import type { NextConfig } from "next";

const cloudflareStaticExport = process.env.CLOUDFLARE_STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  ...(cloudflareStaticExport
    ? {
        output: "export" as const,
        images: { unoptimized: true },
      }
    : {}),
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
