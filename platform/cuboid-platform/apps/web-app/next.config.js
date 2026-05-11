/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@cuboid/design-system', '@cuboid/tokens', '@cuboid/domain-core', '@cuboid/api-sdk', '@cuboid/database'],
  experimental: {
    // Server Actions are enabled by default in Next.js 14
  },
  images: {
    domains: [],
  },
};

module.exports = nextConfig;