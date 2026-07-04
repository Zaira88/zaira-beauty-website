'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Check, ChevronRight, Clock } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import {
  Problem,
  problems,
  solutionCount,
  waHref,
  waTreatmentHref,
} from '@/data/problems'

const ease = [0.22, 1, 0.36, 1] as const

/** Detailseiten-Template: Ein Anliegen → alle Lösungen zur Auswahl. */
const ProblemPage = ({ problem }: { problem: Problem }) => {
  const related = problems.filter((p) => p.slug !== problem.slug).slice(0, 3)
  const count = solutionCount(problem)

  return (
    <main className="bg-ink pb-28 lg:pb-0">
      {/* ===== Kopfbereich ===== */}
      <section className="relative overflow-hidden pt-32 md:pt-40">
        <div className="pointer-events-none absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full bg-teal/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            aria-label="Breadcrumb"
            className="mb-10 flex flex-wrap items-center gap-2 text-sm text-ivory-mute"
          >
            <Link href="/" className="transition-colors hover:text-ivory">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/#finder" className="transition-colors hover:text-ivory">
              Anliegen
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-ivory-dim">{problem.problem}</span>
          </motion.nav>

          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="overline-label mb-6"
            >
              Dein Anliegen
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="font-display text-5xl leading-[1.05] text-ivory sm:text-6xl lg:text-7xl"
            >
              <span className="text-3d">{problem.titleA}</span>
              <span className="text-3d-rose text-rose">{problem.titleB}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory-dim"
            >
              {problem.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="mt-8 flex flex-wrap items-center gap-3 text-sm"
            >
              <span className="rounded-full border border-teal/30 bg-teal/5 px-4 py-1.5 text-teal">
                {count} {count === 1 ? 'Lösung' : 'Lösungen'} zur Auswahl
              </span>
              <span className="rounded-full border border-ivory/12 px-4 py-1.5 text-ivory-dim">
                ab {problem.priceFrom}
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Lösungen ===== */}
      {problem.treatments.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20">
          <div
            className={`grid gap-4 ${
              problem.treatments.length === 1
                ? 'mx-auto max-w-xl'
                : problem.treatments.length === 2
                  ? 'mx-auto max-w-4xl md:grid-cols-2'
                  : 'md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {problem.treatments.map((t, i) => (
              <motion.article
                key={t.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: Math.min(i * 0.08, 0.4), ease }}
                className="group relative flex flex-col panel p-8 transition-all duration-500 hover:border-rose/40"
              >
                {t.badge && (
                  <span className="absolute -top-3 left-7 rounded-full bg-rose px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink">
                    {t.badge}
                  </span>
                )}

                <h2 className="font-display text-2xl leading-snug text-ivory">
                  {t.name}
                </h2>

                {t.includes && (
                  <p className="mt-3 text-sm leading-relaxed text-ivory-mute">
                    {t.includes}
                  </p>
                )}

                <ul className="mt-6 flex-1 space-y-2.5">
                  {t.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-teal" />
                      <span className="text-sm leading-relaxed text-ivory-dim">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-ivory/10 pt-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-display text-3xl text-ivory">
                      {t.price}
                    </p>
                    {t.duration && (
                      <p className="flex items-center gap-1.5 text-xs text-ivory-mute">
                        <Clock className="h-3.5 w-3.5" />
                        {t.duration}
                      </p>
                    )}
                  </div>
                  {t.priceNote && (
                    <p className="mt-1.5 text-xs leading-relaxed text-ivory-mute">
                      {t.priceNote}
                    </p>
                  )}

                  <a
                    href={waTreatmentHref(t.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-ivory/15 py-3 text-sm font-medium text-ivory transition-all duration-300 hover:border-rose hover:bg-rose hover:text-ink"
                  >
                    <FaWhatsapp className="h-4 w-4" />
                    Diesen Termin anfragen
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      )}

      {/* ===== Zonen-Preise (Haarentfernung) ===== */}
      {problem.zones && (
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20">
          <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {problem.zones.map((group, gi) => (
              <motion.div
                key={group.group}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: gi * 0.08, ease }}
              >
                <h2 className="mb-6 font-display text-2xl text-rose">
                  {group.group}
                </h2>
                <ul className="space-y-3.5">
                  {group.items.map((zone) => (
                    <li key={zone.name} className="flex items-baseline">
                      <span className="text-sm text-ivory-dim">{zone.name}</span>
                      <span className="dot-leader" />
                      <span className="whitespace-nowrap text-sm font-semibold text-ivory">
                        {zone.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-14 text-center"
          >
            <a
              href={waHref('Hallo Zaira! 👋 Ich interessiere mich für die dauerhafte Haarentfernung. Welche Zonen würdest du mir empfehlen?')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <FaWhatsapp className="h-4 w-4" />
              Wunschzonen anfragen
            </a>
          </motion.div>
        </section>
      )}

      {/* ===== Info-Panel ===== */}
      {problem.info && (
        <section className="mx-auto max-w-4xl px-5 pb-16 sm:px-8 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease }}
            className="border-l-2 border-rose/60 bg-ink-800/50 p-8 md:p-10"
          >
            {problem.info.title && (
              <h2 className="mb-4 font-display text-2xl text-ivory md:text-3xl">
                {problem.info.title}
              </h2>
            )}
            <p className="leading-relaxed text-ivory-dim">
              {problem.info.text}
            </p>
          </motion.div>
        </section>
      )}

      {/* ===== Verwandte Anliegen ===== */}
      <section className="mx-auto max-w-7xl border-t border-ivory/5 px-5 py-16 sm:px-8 md:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl text-ivory">
            <span className="text-3d">Weitere</span>{' '}
            <span className="text-3d-rose text-rose">Anliegen</span>
          </h2>
          <Link
            href="/#finder"
            className="group inline-flex items-center gap-2 text-sm text-ivory-mute transition-colors hover:text-ivory"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Alle Anliegen ansehen
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {related.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              className="group flex items-center justify-between gap-4 panel p-6 transition-all duration-500 hover:border-rose/40"
            >
              <div>
                <p className="text-[11px] font-medium uppercase tracking-widestplus text-teal/80">
                  {p.problem}
                </p>
                <p className="mt-1.5 font-display text-lg leading-snug text-ivory">
                  {p.question}
                </p>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ivory/15 text-ivory-dim transition-all duration-500 group-hover:border-rose group-hover:bg-rose group-hover:text-ink">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== Sticky Mobile-CTA ===== */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ivory/10 bg-ink/90 p-4 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-widestplus text-ivory-mute">
              {problem.problem}
            </p>
            <p className="text-sm font-semibold text-ivory">
              ab {problem.priceFrom}
            </p>
          </div>
          <a
            href={waHref(`Hallo Zaira! 👋 Ich interessiere mich für eine Behandlung gegen ${problem.problem}. Wann hättest du Zeit?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-small"
          >
            <FaWhatsapp className="h-4 w-4" />
            Termin anfragen
          </a>
        </div>
      </div>
    </main>
  )
}

export default ProblemPage
