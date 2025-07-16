import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
      {
        hostname: "ik.imagekit.io",
      },
    ],
  },
};

export default nextConfig;
