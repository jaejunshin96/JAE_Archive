export type WorkCategory = 'Web Design' | 'UI/UX' | 'Development' | 'Branding'

export interface Work {
  slug: string
  title: string
  titleEn?: string
  year: number
  category: WorkCategory
  coverImage: string
  images: string[]
  description: { ko: string; en: string }
  sample?: boolean
  aspectRatio: 'square' | 'portrait' | 'landscape'
  gridSize: 'narrow' | 'wide' | 'full'
  coverPosition?: string
  url?: string
  keywords?: string[]
}
