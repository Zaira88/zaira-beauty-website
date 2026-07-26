'use client'

import { MotionConfig } from 'framer-motion'

/**
 * Lässt framer-motion die System-Einstellung „Bewegung reduzieren"
 * respektieren. Ohne das liefen alle Scroll-Einblendungen (~40 Stück)
 * unabhängig davon weiter — reduzierte Bewegung war nur im CSS umgesetzt.
 * reducedMotion="user": Transform- und Layout-Animationen werden
 * eingefroren, Opacity-Übergänge bleiben erlaubt.
 */
const MotionProvider = ({ children }: { children: React.ReactNode }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
)

export default MotionProvider
