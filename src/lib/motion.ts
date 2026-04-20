export const EASE_EXPO = [0.22, 1, 0.36, 1] as const

export const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE_EXPO } },
}

export const imageReveal = {
  hidden:  { opacity: 0, scale: 1.04 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: EASE_EXPO } },
}

