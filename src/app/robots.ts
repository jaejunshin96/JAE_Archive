import { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rooviz.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/*/price/success', '/*/price/canceled'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
