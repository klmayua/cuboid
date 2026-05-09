/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@cuboid/design-system', '@cuboid/tokens'],
  experimental: {
    // Server Actions are enabled by default in Next.js 14
  },
  images: {
    domains: [],
  },
};

module.exports = nextConfig;