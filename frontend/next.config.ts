import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: { remotePatterns: [{ protocol: "https", hostname: "randomuser.me", pathname: "/api/portraits/**" }] },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    return [
      {
        source: "/api/backend/:path*",
        destination: "http://localhost:8000/api/:path*",
      },
    ];
  },
};


export default nextConfig;
