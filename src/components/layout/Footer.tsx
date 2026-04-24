import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  return (
    <footer className="px-6 pb-8 max-w-7xl mx-auto">
      <p className="font-mono text-[10px] tracking-widest text-faint text-center">
        © {new Date().getFullYear()} SHIN &amp; CO. {t('rights')}
      </p>
    </footer>
  )
}
