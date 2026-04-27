import { MetadataRoute } from 'next'
import { works } from '@/data/works'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rooviz.com'
const locales = ['ko', 'en', 'ja']

const staticRoutes = [
  { path: '', priority: 1.0, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/price', priority: 0.8, changeFrequency: 'monthly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = locales.flatMap((locale) =>
    staticRoutes.map(({ path, priority, changeFrequency }) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    }))
  )

  const workEntries = locales.flatMap((locale) =>
    works.map((w) => ({
      url: `${siteUrl}/${locale}/works/${w.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  return [...staticEntries, ...workEntries]
}
