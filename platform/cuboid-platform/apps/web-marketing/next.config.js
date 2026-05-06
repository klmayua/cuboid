/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@cuboid/design-system', '@cuboid/tokens'],
  images: {
    domains: [],
  },
};

module.exports = nextConfig;