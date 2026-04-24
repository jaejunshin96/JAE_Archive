import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'www.jangahntower.com' },
      { hostname: 'www.worholpass.com' },
    ],
  },
}

export default withNextIntl(nextConfig)
