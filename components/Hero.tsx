'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, Star } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { waHref, CONTACT } from '@/data/problems'
import { formatRating } from '@/lib/googleReviews'
import Butterflies from '@/components/Butterflies'

/**
 * Überzeile und H1 werden bewusst OHNE Einblend-Animation gerendert:
 * sie kamen vorher mit opacity:0 vom Server und wurden erst nach
 * ~1,2 s sichtbar (ohne JavaScript nie). Text mit opacity:0 zählt
 * für Chrome außerdem nicht als LCP-Kandidat.
 * Nur die nachgeordneten Elemente blenden ein — Kette endet bei
 * ~0,55 s statt 1,65 s.
 */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
}

const Hero = ({ rating = 5, count = 104 }: { rating?: number; count?: number }) => {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-ink lg:flex lg:min-h-[100svh] lg:items-center"
    >
      {/* == Bild-Ebene =================================================
          Mobil: eigener Block oben — das Gesicht bleibt komplett frei
          vom Text (Kundinnen-Wunsch). Desktop: rechte Hälfte hinter
          dem Text wie gehabt. */}
      <div className="relative z-0 h-[37svh] min-h-[235px] w-full sm:h-[55svh] sm:min-h-[340px] lg:absolute lg:inset-0 lg:left-[38%] lg:h-auto lg:min-h-0">
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src="/images/zaira.png"
            alt="Frau im Schmetterlingskleid im nächtlichen Wald — Zaira Beauty"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 62vw"
            className="animate-breathe object-cover object-[center_22%]"
          />
        </div>
        {/* Verläufe: mobil nur sanfter Übergang unten (Bild bleibt
            hell), Desktop seitlich ins Petrol-Schwarz */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent lg:bg-gradient-to-r lg:from-ink lg:via-ink/35 lg:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      {/* Lebendige Schmetterlinge — über dem Bild, hinter dem Text */}
      <Butterflies />

      {/* == Inhalt ===================================================== */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-3 sm:px-8 sm:pb-20 lg:pb-32 lg:pt-36">
        <div className="max-w-2xl">
          {/* Sofort sichtbar, ohne Hydration-Abhängigkeit */}
          <p className="overline-label mb-4 sm:mb-5">Zaira Beauty</p>

          <h1 className="font-display text-[2.6rem] leading-[1.05] tracking-[-0.01em] text-ivory sm:text-6xl lg:text-7xl lg:tracking-[-0.02em] xl:text-[5.2rem]">
            {/* {' '} vor dem Umbruch: ohne das Leerzeichen lasen Google
                und Screenreader "Sichtbar schöne Hautin Geretsried".
                Optisch ändert sich nichts, Leerraum vor <br> wird
                zusammengefasst. */}
            <span className="text-3d">Sichtbar schöne Haut</span>{' '}
            <br />
            <span className="text-3d-rose text-rose">in Geretsried</span>
          </h1>

          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-3 max-w-xl leading-relaxed text-ivory-dim sm:mt-7 sm:text-lg"
          >
            Dein Kosmetikstudio für Aquafacial, Microneedling, Anti-Aging
            und dauerhafte Haarentfernung. Sag mir, was dich stört, und wir
            finden gemeinsam die passende Behandlung.
          </motion.p>

          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            /* Auf 375px stapelten sich die beiden Pills übereinander und
               schoben den CTA unter die Falz — engeres Padding, kleinerer
               Abstand und kein Pfeil-Icon halten sie in einer Zeile. */
            className="mt-6 flex items-center gap-2 sm:mt-10 sm:flex-wrap sm:gap-4"
          >
            <Link href="/#finder" className="btn-primary whitespace-nowrap max-sm:px-4">
              Finde deine Lösung
              <ArrowDown className="hidden h-4 w-4 sm:block" />
            </Link>
            <a
              href={waHref('Hallo Zaira! 👋 Ich hätte gerne eine Beratung.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost whitespace-nowrap max-sm:px-4"
            >
              <FaWhatsapp className="h-4 w-4" />
              WhatsApp
            </a>
          </motion.div>

          {/* Trust-Zeile */}
          <motion.a
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            href={CONTACT.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 text-sm text-ivory-dim transition-colors hover:text-ivory sm:mt-12"
          >
            <span className="flex gap-0.5 text-rose">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </span>
            <span>
              <strong className="font-semibold text-ivory-dim">
                {formatRating(rating)}
              </strong>{' '}
              · {count} Google-Bewertungen
            </span>
          </motion.a>
        </div>
      </div>

      {/* Scroll-Hinweis */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 md:block"
      >
        <div className="flex h-12 w-7 items-start justify-center rounded-full border border-ivory/20 p-1.5">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="h-2 w-2 rounded-full bg-teal"
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
