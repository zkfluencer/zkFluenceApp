const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
  // Point to monorepo root where pnpm-workspace.yaml is located
  experimental: {
    turbo: {
      root: path.resolve(__dirname, '../../'),
    },
  },
};

module.exports = nextConfig;
