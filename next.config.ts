import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "t8popolmlgpbxk1r.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
