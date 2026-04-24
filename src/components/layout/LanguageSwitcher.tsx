'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const others = routing.locales.filter((l) => l !== locale)

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-ink)] hover:text-[var(--color-ink-muted)] transition-colors duration-200"
      >
        {locale}
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-2 flex flex-col items-end gap-2 bg-[var(--color-bg)] border border-[var(--color-ink)]/10 px-3 py-2"
        >
          {others.map((l) => (
            <button
              key={l}
              type="button"
              role="option"
              onClick={() => {
                setOpen(false)
                router.replace(pathname, { locale: l })
              }}
              className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors duration-200"
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
