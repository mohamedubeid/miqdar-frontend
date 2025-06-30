import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'olivedrab-hyena-876790.hostingersite.com',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: 'https://olivedrab-hyena-876790.hostingersite.com/admin/',
        permanent: false,
      }
    ];
  }
};

export default nextConfig;
