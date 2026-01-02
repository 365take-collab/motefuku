import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 画像最適化のドメイン設定
  images: {
    domains: ['motefuku.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'motefuku.com',
      },
    ],
  },
};

export default nextConfig;
