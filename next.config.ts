import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  devIndicators: false,
  images: {
    domains: [
      "https://iadzewbkgvosisvpxvtq.storage.supabase.co",
      "https://iadzewbkgvosisvpxvtq.supabase.co",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iadzewbkgvosisvpxvtq.storage.supabase.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "iadzewbkgvosisvpxvtq.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
