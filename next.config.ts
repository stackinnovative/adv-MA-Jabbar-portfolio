import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Sanity image CDN — used once content moves to Sanity.
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
};

export default nextConfig;
