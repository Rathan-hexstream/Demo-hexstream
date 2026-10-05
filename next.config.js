/*@type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "us-east-1-shared-usea1-02.graphassets.com" },
      { protocol: "https", hostname: "media.graphassets.com" },
    ],
  },
};

module.exports = nextConfig;
