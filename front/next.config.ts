import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'gym-flow-front.vercel.app', // Dominio de producción
      'localhost', // Dominio para desarrollo local
    ],
  },
};

export default nextConfig;
