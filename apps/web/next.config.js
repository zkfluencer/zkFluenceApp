const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
  // Disable Turbopack for now - use Webpack instead
  // The experimental.turbo config is removed to allow Webpack to work
};

module.exports = nextConfig;
