'use client'

/* ============================================================
   Ortsseite Wolfratshausen

   Warum es diese Seite gibt: 2.000 Impressionen in 16 Monaten für
   Wolfratshausen-Begriffe, 1.999 davon auf der Startseite, Ø Position
   16,2. Die Nachfrage ist etwa so groß wie für Geretsried, nur steht
   sie dort auf Platz 16 statt 3,5.

   Warum sie trotzdem fast nicht gebaut worden wäre: Eine Ortsseite, die
   nur die Startseite mit getauschtem Städtenamen wiederholt, ist eine
   Doorway-Page und steht ausdrücklich in Googles Spam-Richtlinien.
   Diese Seite trägt deshalb nur Inhalt, den jemand aus Wolfratshausen
   woanders nicht bekommt: den gemessenen Weg hierher.

   ALLE Ortsangaben hier sind gemessen, nicht geschätzt. Am 31.10.2026:
     - Straße Marienplatz Wolfratshausen -> Johannisplatz 10:  6,6 km
     - Straße Bahnhof Wolfratshausen    -> Johannisplatz 10:  6,9 km
       (OSRM, router.project-osrm.org, Auto)
     - Bushaltestelle "Geretsried, Johannisplatz": 236 m und 262 m
       (zwei Masten) vom Studio, Luftlinie (OpenStreetMap)
     - Bahnhof im Umkreis von 4 km um das Studio: keiner (OpenStreetMap)
     - Wolfratshausen hat einen Bahnhof im MVV (OpenStreetMap)
   Die Studio-Koordinaten aus OpenStreetMap und aus dem Google-Profil
   weichen um 1 m voneinander ab, die Grundlage stimmt also.

   Was hier bewusst NICHT steht: eine Fahrzeit in Minuten (hängt von
   Verkehr und Startpunkt ab) und irgendeine Aussage über Parkplätze.
   OpenStreetMap kennt sieben Flächen im Umkreis von 400 m, aber bei
   fünf davon fehlt die Angabe zu Gebühr und Zugang, und zwei sind
   ausdrücklich privat. "Kostenlos parken" wäre geraten. Sobald Zaira
   die Parksituation bestätigt, gehört ein Satz dazu in die FAQ.
   ============================================================ */

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, MapPin, Star, Bus, Car, Clock, ArrowUpRight } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { CONTACT, openingHoursGrouped, problems, waHref } from '@/data/problems'

const ease = [0.22, 1, 0.36, 1] as const

const STADT = 'Wolfratshausen'

/* Die vier Anliegen mit der größten gemessenen Nachfrage aus
   Wolfratshausen. Zahlen aus der Search Console, 16 Monate:
     dauerhafte-haarentfernung   294 (115 + 101 + 78)
     lashlifting-browlifting     161 (110 Augenbrauen + 51 Wimpern)
   Gesichtsbehandlung und Anti-Aging stehen dabei, weil sie das
   Kerngeschäft sind. Name und Preis kommen aus data/problems.ts,
   damit hier nie ein veralteter Preis steht. */
const SLUGS = [
  'dauerhafte-haarentfernung',
  'lashlifting-browlifting',
  'gesichtsbehandlung',
  'anti-aging',
] as const

const EMPFEHLUNGEN = SLUGS.map((slug) => problems.find((p) => p.slug === slug)!).filter(Boolean)

/* Sichtbarer Text und FAQPage-Markup aus einem Array, wie in
   TreatmentFaq. Abweichende Texte wären ein Richtlinienverstoß. */
const FRAGEN: { frage: string; antwort: string }[] = [
  {
    frage: `Gibt es ein Kosmetikstudio in ${STADT}?`,
    antwort:
      `Mein Studio liegt nicht in ${STADT} selbst, sondern in Geretsried, der Nachbarstadt. ` +
      `Vom Marienplatz in ${STADT} sind es rund 6,6 Kilometer über die Straße, vom Bahnhof rund 6,9 Kilometer. ` +
      `Die Adresse ist ${CONTACT.address}.`,
  },
  {
    frage: `Wie komme ich von ${STADT} ohne Auto zu dir?`,
    antwort:
      `Mit dem Bus bis zur Haltestelle Geretsried, Johannisplatz. Von dort sind es rund 250 Meter zu Fuß bis zum Studio. ` +
      `Einen Bahnhof gibt es in Geretsried nicht, der nächste ist der in ${STADT}.`,
  },
  {
    frage: 'Kann ich nach der Arbeit noch kommen?',
    antwort:
      'Donnerstags habe ich bis 19 Uhr geöffnet, samstags bis 18 Uhr. ' +
      'An den übrigen Werktagen schließe ich um 15 Uhr, montags geht es erst um 10 Uhr los.',
  },
  {
    frage: 'Was kostet eine Behandlung bei dir?',
    antwort:
      'Die günstigste Behandlung ist die Anti-Migräne Massage für 29€, die Laser-Haarentfernung beginnt bei 39€ pro Zone. ' +
      'Alle Preise stehen offen in der Preisliste auf der Startseite, es gibt keine Überraschungen vor Ort.',
  },
  {
    frage: 'Wie bekomme ich einen Termin?',
    antwort:
      'Am schnellsten per WhatsApp. Schreib mir, worum es geht, dann finden wir einen Termin. ' +
      'Vor jeder Behandlung schaue ich mir deine Haut an und sage dir ehrlich, was sinnvoll ist und was nicht.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FRAGEN.map((f) => ({
    '@type': 'Question',
    name: f.frage,
    acceptedAnswer: { '@type': 'Answer', text: f.antwort },
  })),
}

const Content = () => (
  <div className="bg-ink pb-28 lg:pb-0">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />

    {/* ===== Kopfbereich ===== */}
    <section className="relative overflow-hidden pt-32 md:pt-40">
      <div className="pointer-events-none absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full bg-teal/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
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
          <span className="text-ivory-dim">{STADT}</span>
        </motion.nav>

        <div className="max-w-3xl">
          {/* H1 ohne Einblenden: Google-Landeseite, der Titel muss sofort
              stehen. Und ohne Punkt, so wie auf allen anderen Seiten. */}
          <p className="overline-label mb-6">Für Kundinnen aus {STADT}</p>
          <h1
            className="font-display text-4xl leading-[1.05] tracking-[-0.01em] text-ivory [hyphens:auto] sm:text-6xl lg:text-7xl lg:tracking-[-0.02em]"
            lang="de"
          >
            <span className="text-3d">Kosmetikstudio für</span>{' '}
            <span className="text-3d-rose text-rose">{STADT}</span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mt-6 max-w-[62ch] text-lg leading-relaxed text-ivory-dim"
          >
            Ganz ehrlich: Mein Studio liegt nicht in {STADT}, sondern in Geretsried
            nebenan. Rund sieben Kilometer über die Straße, Bushaltestelle vor der
            Haustür, und donnerstags habe ich bis 19 Uhr geöffnet.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease }}
            className="mt-8 flex flex-wrap items-center gap-3 text-sm"
          >
            <span className="rounded-full border border-teal/30 bg-teal/5 px-4 py-1.5 text-teal">
              12 Anliegen, über 30 Behandlungen
            </span>
            <span className="rounded-full border border-ivory/10 px-4 py-1.5 text-ivory-dim">
              ab 29€
            </span>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ===== Anfahrt =====
        Das ist der Teil, den es nur hier gibt. Ohne ihn wäre die Seite
        eine Doorway-Page. */}
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease }}
        className="mb-10 text-center"
      >
        <p className="overline-label mb-4">Der Weg zu mir</p>
        <h2 className="font-display text-3xl text-ivory sm:text-4xl">
          <span className="text-3d">So kommst du von</span>{' '}
          <span className="text-3d-rose text-rose">{STADT}</span>{' '}
          <span className="text-3d">her</span>
        </h2>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            icon: Car,
            titel: 'Mit dem Auto',
            text: `Rund 6,6 Kilometer vom Marienplatz, rund 6,9 Kilometer vom Bahnhof ${STADT}. Beides gemessene Straßenrouten, keine Luftlinie.`,
          },
          {
            icon: Bus,
            titel: 'Mit dem Bus',
            text: 'Haltestelle Geretsried, Johannisplatz. Von dort rund 250 Meter zu Fuß. Einen Bahnhof gibt es in Geretsried nicht.',
          },
          {
            icon: Clock,
            titel: 'Wann es passt',
            text: 'Donnerstags bis 19 Uhr und samstags bis 18 Uhr, falls es tagsüber nicht geht. Sonst Dienstag bis Freitag ab 9 Uhr.',
          },
        ].map((k, i) => (
          <motion.article
            key={k.titel}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease }}
            className="panel p-7"
          >
            <k.icon className="h-5 w-5 text-teal" aria-hidden />
            <h3 className="mt-5 font-display text-xl text-ivory">{k.titel}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ivory-dim">{k.text}</p>
          </motion.article>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
        className="mx-auto mt-8 max-w-[62ch] text-center text-sm leading-relaxed text-ivory-mute"
      >
        Die Adresse lautet {CONTACT.address}. Wenn du unterwegs merkst, dass es
        später wird, schreib mir einfach kurz.
      </motion.p>
    </section>

    {/* ===== Was gesucht wird ===== */}
    <section className="mx-auto max-w-7xl border-t border-ivory/5 px-5 py-16 sm:px-8 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease }}
        className="mb-10 text-center"
      >
        <p className="overline-label mb-4">Häufig gefragt aus {STADT}</p>
        <h2 className="font-display text-3xl text-ivory sm:text-4xl">
          <span className="text-3d">Das bringt</span>{' '}
          <span className="text-3d-rose text-rose">die meisten her</span>
        </h2>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {EMPFEHLUNGEN.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: i * 0.06, ease }}
          >
            <Link
              href={`/${p.slug}`}
              className="tap group flex h-full items-center justify-between gap-4 panel p-6 transition-all duration-500 hover:border-rose/40"
            >
              <div>
                <p className="overline-label text-teal/80">ab {p.priceFrom}</p>
                <p className="mt-1.5 font-display text-lg leading-snug text-ivory">
                  {p.problem}
                </p>
                <p className="mt-2 text-sm text-ivory-mute">{p.question}</p>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ivory/15 text-ivory-dim transition-all duration-500 group-hover:border-rose group-hover:bg-rose group-hover:text-ink">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/#finder"
          className="text-sm text-ivory-mute transition-colors hover:text-ivory"
        >
          Alle Anliegen und die komplette Preisliste ansehen
        </Link>
      </div>
    </section>

    {/* ===== Öffnungszeiten ===== */}
    <section className="mx-auto max-w-4xl px-5 pb-16 sm:px-8 md:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease }}
        className="panel p-7 sm:p-9"
      >
        <h2 className="font-display text-2xl text-ivory">
          <span className="text-3d">Öffnungs</span>
          <span className="text-3d-rose text-rose">zeiten</span>
        </h2>
        <ul className="mt-6 space-y-3 text-sm">
          {openingHoursGrouped.map((d) => (
            <li
              key={d.label}
              className={`flex justify-between gap-6 ${
                d.closed ? 'text-ivory-mute' : 'text-ivory-dim'
              }`}
            >
              <span>{d.label}</span>
              <span className="whitespace-nowrap">{d.time}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>

    {/* ===== Vertrauenssignal ===== */}
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
            <strong className="font-semibold text-ivory">5,0</strong> bei 108
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

    {/* ===== Fragen ===== */}
    <section id="faq" className="mx-auto max-w-4xl px-5 pb-16 sm:px-8 md:pb-20">
      <h2 className="mb-8 text-center font-display text-3xl text-ivory sm:text-4xl">
        <span className="text-3d">Häufige</span>{' '}
        <span className="text-3d-rose text-rose">Fragen</span>
      </h2>
      <div className="hairline divide-y divide-ivory/10">
        {FRAGEN.map((f) => (
          <details key={f.frage} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink [&::-webkit-details-marker]:hidden">
              <span className="font-display text-lg leading-snug text-ivory">
                {f.frage}
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ivory/15 text-ivory-dim transition-transform duration-300 group-open:rotate-90">
                <ChevronRight className="h-4 w-4" />
              </span>
            </summary>
            <p className="px-6 pb-6 text-sm leading-relaxed text-ivory-dim">
              {f.antwort}
            </p>
          </details>
        ))}
      </div>
    </section>

    {/* ===== Sticky Mobile-CTA =====
        Gleiche Bauweise wie auf den Anliegen-Seiten: deckend, ohne
        backdrop-filter. Das Attribut data-sticky-cta schiebt den
        Zurück-nach-oben-Pfeil in globals.css über die Leiste. */}
    <div
      data-sticky-cta
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ivory/10 bg-ink p-4 lg:hidden"
    >
      <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="overline-label truncate text-ivory-mute">Aus {STADT}</p>
          <p className="text-sm font-semibold text-ivory">rund 7 km</p>
        </div>
        <a
          href={waHref(
            `Hallo Zaira! 👋 Ich komme aus ${STADT} und hätte gerne einen Termin. Wann passt es dir?`
          )}
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

export default Content
