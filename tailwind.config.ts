import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:     'var(--color-bg)',
        ink:    'var(--color-ink)',
        muted:  'var(--color-ink-muted)',
        faint:  'var(--color-ink-faint)',
        accent: 'var(--color-accent)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono:  ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
