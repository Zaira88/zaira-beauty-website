'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { FaGoogle } from 'react-icons/fa'
import { CONTACT } from '@/data/problems'
import { FALLBACK_RATING, GoogleRatingData } from '@/lib/googleReviews'

const Testimonials = ({ data = FALLBACK_RATING }: { data?: GoogleRatingData }) => {
  return (
    <section id="testimonials" className="bg-ink py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <p className="overline-label mb-5">Das sagen Kundinnen</p>
          <h2 className="font-display text-4xl text-ivory sm:text-5xl">
            <span className="text-3d">Echte</span>{' '}
            <span className="text-3d-rose text-rose">Erfahrungen</span>
          </h2>
          {data.live && (
            <p className="mt-4 text-sm text-ivory-mute">
              Direkt von Google, aktualisiert sich automatisch.
            </p>
          )}
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {data.reviews.map((t, i) => (
            <motion.figure
              key={`${t.author}-${i}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col panel p-8"
            >
              <span
                aria-hidden
                className="font-display text-6xl leading-none text-rose/40"
              >
                “
              </span>
              <blockquote className="mt-2 flex-1 leading-relaxed text-ivory-dim [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:8] overflow-hidden">
                {t.text}
              </blockquote>
              <figcaption className="mt-7 flex items-center justify-between border-t border-ivory/10 pt-5">
                <div className="flex items-center gap-3">
                  {t.photo && (
                    // Google-Avatar (extern) — bewusst <img>, kein next/image
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.photo}
                      alt=""
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium text-ivory">{t.author}</p>
                    <p className="mt-0.5 text-xs text-ivory-mute">{t.when}</p>
                  </div>
                </div>
                <span className="flex gap-0.5 text-rose">
                  {[...Array(5)].map((_, s) => (
                    <Star
                      key={s}
                      className={`h-3.5 w-3.5 ${s < Math.round(t.rating) ? 'fill-current' : 'opacity-25'}`}
                    />
                  ))}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <a
            href={CONTACT.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <FaGoogle className="h-4 w-4" />
            Alle {data.count} Bewertungen auf Google lesen
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
