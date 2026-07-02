'use client'

import React from 'react'
import { motion } from 'framer-motion'

const About = ({ reviewCount = 91 }: { reviewCount?: number }) => {
  const stats = [
    { number: `${reviewCount}+`, label: 'Top-Bewertungen' },
    { number: '10+', label: 'Zertifikate' },
    { number: '100%', label: 'Zufriedenheit' },
    { number: '12+', label: 'Behandlungsarten' },
  ]

  return (
    <section id="about" className="bg-ink py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-12">
          {/* Pull-Quote */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <p className="overline-label mb-5">Über mich</p>
            <h2 className="font-display text-4xl leading-snug text-ivory sm:text-5xl">
              Deine Schönheit ist meine{' '}
              <em className="text-rose">Mission</em>.
            </h2>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <p className="text-lg leading-relaxed text-ivory-dim">
              Als ehemalige Bekleidungstechnische Assistentin und
              Modedesignerin bringe ich Präzision und ein Auge für Ästhetik in
              jede Behandlung. Nach meiner eigenen Reise zur Selbstfindung habe
              ich meine wahre Berufung in der Kosmetik entdeckt — und das
              spüren meine Kundinnen jeden Tag.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ivory-mute">
              Meine Leidenschaft ist es, deine natürliche Schönheit zum
              Strahlen zu bringen. Mit meiner Expertise und den besten
              Produkten helfe ich dir dabei, dich in deiner Haut wohlzufühlen —
              mit ehrlicher Beratung, Hautanalyse und einem Behandlungsplan,
              der wirklich zu dir passt.
            </p>
          </motion.div>
        </div>

        {/* Statistiken */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden hairline bg-ivory/10 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 bg-ink px-6 py-10"
            >
              <span className="font-display text-4xl text-rose md:text-5xl">
                {stat.number}
              </span>
              <span className="text-sm text-ivory-mute">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default About
