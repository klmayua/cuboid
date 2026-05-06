/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@cuboid/design-system', '@cuboid/tokens'],
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [],
  },
};

module.exports = nextConfig;