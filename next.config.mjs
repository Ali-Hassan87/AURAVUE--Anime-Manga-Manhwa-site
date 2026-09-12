/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploads.mangadex.org",
        pathname: "/**",
      },
    ],
  },

  experimental: {
    optimizePackageImports: ["motion"],
  },
};

export default nextConfig;