import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'www.jangahntower.com' },
      { hostname: 'www.worholpass.com' },
    ],
  },
}

export default nextConfig
