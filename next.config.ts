import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  logging: {
    incomingRequests: {
      ignore: [/\/hybridaction/],
    },
  },

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
  async redirects() {
    return [
      {
        source: "/pricing",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
