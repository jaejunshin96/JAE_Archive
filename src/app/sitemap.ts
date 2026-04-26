import { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rooviz.com'
const locales = ['ko', 'en', 'ja']
const routes = [
  { path: '', priority: 1.0, changeFrequency: 'monthly' as const },
  { path: '/price', priority: 0.8, changeFrequency: 'monthly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    routes.map(({ path, priority, changeFrequency }) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    }))
  )
}
