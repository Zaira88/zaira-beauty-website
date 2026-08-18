'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronRight,
  Clock,
  MapPin,
  Star,
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import {
  CONTACT,
  Problem,
  needsTitleSpace,
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
    /* div statt main: das Layout liefert bereits ein <main> — vorher
       hatten alle 12 Detailseiten zwei Landmarks */
    <div className="bg-ink pb-28 lg:pb-0">
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
            {/* Überzeile und H1 ohne Einblenden: Detailseiten sind
                Google-Landeseiten, der Titel muss sofort stehen (und
                zählt mit opacity:0 nicht als LCP-Kandidat). */}
            <p className="overline-label mb-6">Dein Anliegen</p>
            <h1
              className="font-display text-4xl leading-[1.05] tracking-[-0.01em] text-ivory [hyphens:auto] sm:text-6xl lg:text-7xl lg:tracking-[-0.02em]"
              lang="de"
            >
              <span className="text-3d">{problem.titleA}</span>
              {needsTitleSpace(problem) ? ' ' : ''}
              <span className="text-3d-rose text-rose">{problem.titleB}</span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="mt-6 max-w-[62ch] text-lg leading-relaxed text-ivory-dim"
            >
              {problem.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease }}
              className="mt-8 flex flex-wrap items-center gap-3 text-sm"
            >
              <span className="rounded-full border border-teal/30 bg-teal/5 px-4 py-1.5 text-teal">
                {count} {count === 1 ? 'Lösung' : 'Lösungen'} zur Auswahl
              </span>
              <span className="rounded-full border border-ivory/10 px-4 py-1.5 text-ivory-dim">
                ab {problem.priceFrom}
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Lösungen ===== */}
      {problem.treatments.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20">
          {/* Zwischenüberschrift: schließt die Hierarchielücke zwischen
              dem 83px-Titel und den 24px-Behandlungsnamen und benennt
              den Strategie-Schritt (Anliegen -> Lösungen) ausdrücklich. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease }}
            className="mb-10 text-center"
          >
            <p className="overline-label mb-4">
              {count === 1 ? 'Meine Empfehlung' : 'Deine Auswahl'}
            </p>
            <h2 className="font-display text-3xl text-ivory sm:text-4xl">
              <span className="text-3d">
                {count === 1 ? 'Die passende ' : 'Diese '}
              </span>
              <span className="text-3d-rose text-rose">
                {count === 1 ? 'Behandlung' : 'Behandlungen helfen'}
              </span>
            </h2>
          </motion.div>

          {/* Flex statt Grid: bei 4, 5 oder 7 Behandlungen blieb im
              Raster eine einzelne Karte links hängen. Angebrochene
              Reihen stehen jetzt zentriert. */}
          <div className="flex flex-wrap justify-center gap-4">
            {problem.treatments.map((t, i) => (
              <motion.article
                key={t.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: Math.min(i * 0.08, 0.4), ease }}
                className={`group relative flex flex-col panel p-7 transition-all duration-500 hover:border-rose/40 ${
                  count === 1
                    ? 'w-full max-w-xl'
                    : count === 2
                      ? 'w-full max-w-md sm:w-[calc(50%-0.5rem)]'
                      : 'w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]'
                }`}
              >
                {t.badge && (
                  <span className="absolute -top-3 left-7 rounded-full bg-rose px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink">
                    {t.badge}
                  </span>
                )}

                <h3 className="font-display text-2xl leading-snug text-ivory">
                  {t.name}
                </h3>

                {t.includes && (
                  <p className="mt-3 text-sm leading-relaxed text-ivory-mute">
                    {t.includes}
                  </p>
                )}

                <ul className="mt-6 flex-1 space-y-2.5">
                  {t.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-teal" />
                      <span className="text-base leading-relaxed text-ivory-dim sm:text-sm">
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
                <h3 className="mb-6 font-display text-2xl text-rose">
                  {group.group}
                </h3>
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
            {/* max-w-[62ch]: vorher liefen bis zu 95 Zeichen pro Zeile,
                angenehm lesbar sind 60–75 */}
            <p className="max-w-[62ch] leading-relaxed text-ivory-dim">
              {problem.info.text}
            </p>
          </motion.div>
        </section>
      )}

      {/* ===== Vertrauenssignal =====
          Die Detailseiten nennen Preise, zeigten aber keinen einzigen
          Beweis. Bewertung + Studio-Ort direkt vor der Terminanfrage. */}
      <section className="mx-auto max-w-4xl px-5 pb-16 sm:px-8 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col items-center gap-5 border-y border-ivory/[0.07] py-8 text-center sm:flex-row sm:justify-center sm:gap-10 sm:text-left"
        >
          <a
            href={CONTACT.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-sm text-ivory-dim transition-colors hover:text-ivory"
          >
            <span className="flex gap-0.5 text-rose">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </span>
            <span>
              <strong className="font-semibold text-ivory">5,0</strong> bei 104
              Google-Bewertungen
            </span>
          </a>
          <span className="hidden h-8 w-px bg-ivory/10 sm:block" />
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-sm text-ivory-dim transition-colors hover:text-ivory"
          >
            <MapPin className="h-4 w-4 shrink-0 text-teal" />
            {CONTACT.address}
          </a>
        </motion.div>
      </section>

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
        {/* Bei 640px waren 3 Spalten zu eng — erst ab lg */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              className="tap group flex items-center justify-between gap-4 panel p-6 transition-all duration-500 hover:border-rose/40"
            >
              <div>
                <p className="overline-label text-teal/80">
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
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
          {/* min-w-0 + truncate: lange Anliegen-Namen brachen vorher
              zweizeilig um und machten die Leiste unnötig hoch */}
          <div className="min-w-0">
            <p className="overline-label truncate text-ivory-mute">
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
            className="btn-primary-small shrink-0 whitespace-nowrap"
          >
            <FaWhatsapp className="h-4 w-4" />
            Termin anfragen
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProblemPage
