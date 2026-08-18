'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Zurück-nach-oben.
 *
 * War lange `hidden lg:flex`, also auf Mobil gar nicht vorhanden. Grund
 * war ein echter Fehler: auf den Detailseiten liegt unten der Sticky-
 * WhatsApp-CTA, der Knopf lag darauf und fing dessen Tap ab. Abschalten
 * war aber die falsche Antwort — die Startseite ist 16.600px lang, und
 * genau dort braucht man ihn am dringendsten.
 *
 * Jetzt ist er auch mobil da und weicht der Leiste aus: `.scroll-top-btn`
 * bekommt in globals.css über `body:has([data-sticky-cta])` einen
 * höheren Abstand nach unten. Rein per CSS, damit es auch bei einem
 * Seitenwechsel ohne Neuladen stimmt.
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
          /* Deckend statt bg-ink-800/80 + backdrop-blur-md: der Knopf ist
             jetzt auch mobil da, also genau während des Scrollens sichtbar.
             Ein Weichzeichner dort ist die Kostenklasse, die auf dieser
             Seite schon zweimal geflackert hat — und bei 80% Deckung war
             er ohnehin praktisch unsichtbar. */
          className="scroll-top-btn group fixed bottom-8 right-5 z-40 flex h-12 w-12
            items-center justify-center rounded-full border border-ivory/15
            bg-ink-800 text-ivory-dim transition-colors duration-300
            hover:border-rose/50 hover:bg-ink-700 hover:text-rose
            active:scale-95 sm:right-8"
          aria-label="Nach oben scrollen"
        >
          <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTopButton
