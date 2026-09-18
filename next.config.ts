import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "newsmediakiran.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "newsmediakiran.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  serverExternalPackages: ["better-sqlite3", "mysql2"],
};

export default nextConfig;
