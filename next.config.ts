import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "i.ytimg.com",
        protocol: "https",
      },
      {
        hostname: "yt3.ggpht.com",
        protocol: "https",
      },
      {
        hostname: "frugal-ibis-710.convex.cloud",
        protocol: "https",
      },
    ],
    // Add unoptimized option to skip optimization for specific domains
    unoptimized: true,
    // Increase the image response timeout
    minimumCacheTTL: 600, // 10 minutes cache
  },
};

export default nextConfig;
