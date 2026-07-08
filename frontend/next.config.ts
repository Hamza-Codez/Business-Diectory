import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Hot Pepper Gourmet shop photos
        protocol: "https",
        hostname: "imgfp.hotp.jp",
      },
      {
        // Geoapify Static Maps
        protocol: "https",
        hostname: "maps.geoapify.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
