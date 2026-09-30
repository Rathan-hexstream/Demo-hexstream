/*@type {import('next').NextConfig} */
console.log("Next config loaded");

const nextConfig = {
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ["us-east-1-shared-usea1-02.graphassets.com"],
  },
};

module.exports = nextConfig;
