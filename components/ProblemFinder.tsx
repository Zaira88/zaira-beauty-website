'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Search } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { problems, solutionCount, waHref } from '@/data/problems'

/** Schnellfilter-Chips über dem Grid */
const quickFilters = ['Akne', 'Falten', 'Pigmentflecken', 'Haare', 'Wimpern', 'Glow']

const ProblemFinder = () => {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return problems
    return problems.filter(
      (p) =>
        p.problem.toLowerCase().includes(q) ||
        p.question.toLowerCase().includes(q) ||
        p.searchTerms.some((t) => t.includes(q))
    )
  }, [query])

  return (
    <section id="finder" className="relative bg-ink py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Kopf */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <p className="overline-label mb-5">Womit dürfen wir starten?</p>
          <h2 className="font-display text-4xl text-ivory sm:text-5xl lg:text-6xl">
            Was möchtest du <em className="text-rose">verbessern</em>?
          </h2>
          <p className="mt-5 text-lg text-ivory-mute">
            Wähle dein Anliegen — auf der Detailseite findest du alle passenden
            Behandlungen mit Preisen.
          </p>
        </motion.div>

        {/* Suche */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-6 max-w-xl"
        >
          <div className="relative">
            <Search className="pointer-events-none absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-ivory-mute" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Suche: z. B. Akne, Falten, Haare …"
              className="w-full rounded-full border border-ivory/15 bg-ink-800/70 py-4 pl-14 pr-6 text-ivory placeholder:text-ivory-mute/70 backdrop-blur-sm transition-colors focus:border-teal/50"
              aria-label="Anliegen suchen"
            />
          </div>
        </motion.div>

        {/* Schnellfilter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-14 flex flex-wrap justify-center gap-2.5"
        >
          {quickFilters.map((f) => (
            <button
              key={f}
              onClick={() => setQuery(query === f ? '' : f)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-all duration-300 ${
                query === f
                  ? 'border-teal/60 bg-teal/10 text-teal'
                  : 'border-ivory/12 text-ivory-mute hover:border-ivory/30 hover:text-ivory-dim'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Karten-Grid */}
        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: query ? 0 : Math.min(i * 0.05, 0.4) }}
              >
                <Link
                  href={`/${p.slug}`}
                  className="group relative flex h-full flex-col justify-between overflow-hidden panel p-7 transition-all duration-500 hover:border-rose/40 hover:bg-ink-700/80"
                >
                  {/* Nummer */}
                  <span className="font-display text-sm italic text-ivory-mute/60">
                    {String(problems.indexOf(p) + 1).padStart(2, '0')}
                  </span>

                  <div className="mt-6">
                    <p className="mb-2 text-[11px] font-medium uppercase tracking-widestplus text-teal/80">
                      {p.problem}
                    </p>
                    <h3 className="font-display text-2xl leading-snug text-ivory transition-colors group-hover:text-rose-soft">
                      {p.question}
                    </h3>
                  </div>

                  <div className="mt-8 flex items-end justify-between">
                    <p className="text-sm text-ivory-mute">
                      {solutionCount(p)}{' '}
                      {solutionCount(p) === 1 ? 'Lösung' : 'Lösungen'}
                      <span className="mx-2 text-ivory/20">·</span>
                      ab{' '}
                      <span className="font-semibold text-ivory-dim">
                        {p.priceFrom}
                      </span>
                    </p>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory-dim transition-all duration-500 group-hover:border-rose group-hover:bg-rose group-hover:text-ink">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>

                  {/* Hover-Glow */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-rose/0 blur-3xl transition-all duration-700 group-hover:bg-rose/10" />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Leer-Zustand */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto max-w-md py-16 text-center"
          >
            <p className="font-display text-2xl text-ivory">
              Dafür habe ich bestimmt auch eine Lösung.
            </p>
            <p className="mt-3 text-ivory-mute">
              Schreib mir einfach direkt — ich berate dich persönlich.
            </p>
            <a
              href={waHref(`Hallo Zaira! Ich suche eine Behandlung für: ${query}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-7"
            >
              <FaWhatsapp className="h-4 w-4" />
              Kurz nachfragen
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default ProblemFinder
