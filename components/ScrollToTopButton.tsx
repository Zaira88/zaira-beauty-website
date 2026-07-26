'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Zurück-nach-oben.
 *
 * Bewusst nur ab lg sichtbar: auf Mobil liegt am unteren Rand der
 * Detailseiten der Sticky-WhatsApp-CTA (ProblemPage). Der Button lag
 * vorher darüber und fing den Tap ab — er kostete also Terminanfragen.
 * Auf Mobil scrollt man ohnehin per Wischen; der CTA hat Vorrang.
 */
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-8 right-8 z-40 hidden h-12 w-12 items-center
            justify-center rounded-full border border-ivory/15 bg-ink-800/80
            text-ivory-dim backdrop-blur-md transition-colors duration-300
            hover:border-rose/50 hover:bg-ink-700 hover:text-rose
            active:scale-95 lg:flex"
          aria-label="Nach oben scrollen"
        >
          <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTopButton
