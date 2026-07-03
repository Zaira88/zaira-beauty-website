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

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.15 + i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
}

const Hero = ({ rating = 5, count = 91 }: { rating?: number; count?: number }) => {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-ink lg:flex lg:min-h-[100svh] lg:items-center"
    >
      {/* == Bild-Ebene =================================================
          Mobil: eigener Block oben — das Gesicht bleibt komplett frei
          vom Text (Kundinnen-Wunsch). Desktop: rechte Hälfte hinter
          dem Text wie gehabt. */}
      <div className="relative z-0 h-[55svh] min-h-[340px] w-full lg:absolute lg:inset-0 lg:left-[38%] lg:h-auto lg:min-h-0">
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
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-2 sm:px-8 lg:pb-32 lg:pt-36">
        <div className="max-w-2xl">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="overline-label mb-6"
          >
            Zaira Beauty
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-display text-5xl leading-[1.05] text-ivory sm:text-6xl lg:text-7xl xl:text-[5.2rem]"
          >
            <span className="text-3d">Sichtbar schöne Haut</span>
            <br />
            <span className="text-3d-rose text-rose">in Geretsried</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-7 max-w-xl text-lg leading-relaxed text-ivory-dim"
          >
            Dein Kosmetikstudio für Aquafacial, Microneedling, Anti-Aging
            und dauerhafte Haarentfernung. Sag mir, was dich stört, und wir
            finden gemeinsam die passende Behandlung.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link href="/#finder" className="btn-primary">
              Finde deine Lösung
              <ArrowDown className="h-4 w-4" />
            </Link>
            <a
              href={waHref('Hallo Zaira! 👋 Ich hätte gerne eine Beratung.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <FaWhatsapp className="h-4 w-4" />
              WhatsApp
            </a>
          </motion.div>

          {/* Trust-Zeile */}
          <motion.a
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            href={CONTACT.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex items-center gap-3 text-sm text-ivory-mute transition-colors hover:text-ivory-dim"
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
        transition={{ delay: 1.6, duration: 1 }}
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
