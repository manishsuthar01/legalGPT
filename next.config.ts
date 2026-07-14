import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows all HTTPS domains
      },
      {
        protocol: 'http',
        hostname: '**', // Allows all HTTP domains
      },
    ],
  },
  serverExternalPackages: ["pdf-parse", "pdfjs-dist", "@langchain/community"],
};

export default nextConfig;
