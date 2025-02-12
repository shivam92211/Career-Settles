import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // experimental: {
  //   serverComponentsExternalPackages: ['@prisma/client', 'bcrypt']
  // }
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
