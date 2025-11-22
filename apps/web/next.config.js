const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
  experimental: {
    turbo: {
      root: path.resolve(__dirname, '../../'),
    },
  },
};

module.exports = nextConfig;
