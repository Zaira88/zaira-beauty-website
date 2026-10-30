import React from 'react'
import { Plus } from 'lucide-react'
import { OPENING_HOURS, Problem, solutionCount } from '@/data/problems'

/* ============================================================
   Häufige Fragen auf den Anliegen-Seiten
   ============================================================
   Warum es das gibt: Die Search Console zeigt 344 Impressionen auf
   reine Informationsfragen (Kosten, Risiken, Dauer) mit null Klicks
   bei Durchschnittsposition 37. Google spielt zu jeder Leistung
   „Weitere Fragen" aus — die Detailseiten beantworteten bisher keine
   einzige davon.

   WICHTIGSTE REGEL DIESER DATEI: Jede Antwort entsteht aus Daten, die
   in data/problems.ts stehen (priceFrom, treatments[].name, zones,
   OPENING_HOURS) plus den Studio-Fakten unten. Hier wird NICHTS
   erfunden — keine Behandlungsdauern (das Feld `duration` ist bei 30
   von 31 Behandlungen leer), keine Risiken, keine Wirkversprechen,
   keine Haltbarkeitsangaben. Genau deshalb sind es nur vier Fragen:
   die vier, die sich vollständig aus dem Datenstand belegen lassen.
   Dauer, Risiken und Haltbarkeit kommen später von der Inhaberin und
   bekommen dann eigene Felder in data/problems.ts.

   Technik mit Absicht karg:
   - Reines <details>/<summary>. Kein useState, kein framer-motion.
     Auf diesen Seiten haben laufende Effekte schon zweimal Flackern
     verursacht (siehe die Notizen am Sticky-CTA in ProblemPage.tsx und
     an .panel in globals.css). Ein Akkordeon braucht dafür keine
     Begründung — der Browser kann das selbst, inklusive Tastatur und
     Screenreader.
   - Kein backdrop-blur. Dokumentierte Fehlerquelle dieser Seite.
   - Sichtbarer Text und FAQPage-Markup werden aus EINEM Array
     gerendert. Google verlangt identische Texte; sie können hier nicht
     auseinanderlaufen, weil es nur eine Quelle gibt.
   ============================================================ */

export interface FaqEintrag {
  frage: string
  antwort: string
}

/* ── Studio-Fakten ──────────────────────────────────────────────
   Dieselbe Adresse wie CONTACT.address in data/problems.ts, nur
   ausgeschrieben: „Johannispl. 10" ist als Abkürzung für die
   Dot-Leader-Zeilen gedacht und liest sich im Fließtext schlecht.
   Das Einzugsgebiet ist dasselbe wie areaServed im JSON-LD des
   Layouts — ändert sich eines, muss das andere mit. */
const STUDIO_ADRESSE = 'Johannisplatz 10 in Geretsried'
/* Belegt ist ausschließlich Wolfratshausen: 2.000 Impressionen in
   16 Monaten laut Search Console. Hier stand zwischenzeitlich eine
   Liste mit sechs Orten als „Einzugsgebiet" — das war eine
   Tatsachenbehauptung ohne Quelle, und für Bad Tölz (14,5 km) und
   Penzberg (15,8 km) nachweislich falsch. Wer weitere Orte nennen
   will, lässt sie sich vorher von Zaira bestätigen. */
const NACHBARSTADT = 'Wolfratshausen'

/* ── Kleine Sprachhelfer ─────────────────────────────────────────
   Zahlen als Wort bis zwölf, darüber als Ziffer: „sieben
   Behandlungen" liest sich wie gesprochen, „zweiundzwanzig Zonen"
   nicht mehr. */
const ZAHLWORT = [
  'null', 'eine', 'zwei', 'drei', 'vier', 'fünf', 'sechs',
  'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf',
]

const zahlwort = (n: number): string =>
  n >= 0 && n < ZAHLWORT.length ? ZAHLWORT[n] : String(n)

const grossAnfang = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1)

/** „A, B und C". `letztes` wird zu „sowie", wenn ein Glied selbst ein „und" enthält. */
const aufzaehlung = (teile: string[], letztes: string = 'und'): string => {
  if (teile.length === 0) return ''
  if (teile.length === 1) return teile[0]
  return `${teile.slice(0, -1).join(', ')} ${letztes} ${teile[teile.length - 1]}`
}

/* ── Öffnungszeiten als Satz ─────────────────────────────────────
   Aus OPENING_HOURS gebaut statt abgeschrieben, damit die FAQ nicht
   die dritte Stelle mit eigenen Zeiten wird (vor Juli standen im
   Footer und im Markup zwei verschiedene).
   Bewusst „von 9 bis 15 Uhr" statt „09:00 – 15:00": gesprochene Form,
   und ohne Halbgeviertstrich — die Kundin will keine Striche im Text. */
const uhrzeit = (t: string): string => {
  const teile = t.split(':')
  const stunde = String(Number(teile[0]))
  return teile[1] === '00' ? stunde : `${stunde}.${teile[1]}`
}

interface Zeitblock {
  von: string
  bis: string
  opens: string
  closes: string
}

/** Gleiche Zeiten an aufeinanderfolgenden Tagen werden gebündelt. */
const zeitbloecke = (): Zeitblock[] => {
  const bloecke: Zeitblock[] = []
  // Nur echte Nachbartage bündeln: wäre der Mittwoch geschlossen,
  // dürfte aus Di + Do nicht „Dienstag bis Donnerstag" werden.
  let letzterIndex = -2

  for (let i = 0; i < OPENING_HOURS.length; i++) {
    const tag = OPENING_HOURS[i]
    const opens = tag.opens
    const closes = tag.closes
    if (!opens || !closes) continue

    const offen = bloecke[bloecke.length - 1]
    if (
      offen &&
      letzterIndex === i - 1 &&
      offen.opens === opens &&
      offen.closes === closes
    ) {
      offen.bis = tag.label
    } else {
      bloecke.push({ von: tag.label, bis: tag.label, opens, closes })
    }
    letzterIndex = i
  }

  return bloecke
}

const OEFFNUNGSZEITEN_SATZ = aufzaehlung(
  zeitbloecke().map((b) => {
    const tage = b.von === b.bis ? b.von : `${b.von} bis ${b.bis}`
    return `${tage} von ${uhrzeit(b.opens)} bis ${uhrzeit(b.closes)} Uhr`
  })
)

const GESCHLOSSEN_SATZ = ((): string => {
  const zu = OPENING_HOURS.filter((t) => !t.opens).map((t) => t.label)
  if (zu.length === 0) return ''
  return zu.length === 1
    ? ` ${zu[0]} ist geschlossen.`
    : ` ${aufzaehlung(zu)} sind geschlossen.`
})()

/* ── Sprachform pro Seite ────────────────────────────────────────
   Die Fragen werden aus Vorlagen gebaut, aber ein Anliegen-Name
   passt nicht in jede Vorlage: „Was kostet eine Behandlung gegen
   Zahnbleaching" ist falsches Deutsch, und „bei Dauerhafte
   Haarentfernung" auch. Deshalb liegt pro Seite eine kurze Wendung
   hier — reine Grammatik, keine neuen Fakten. Jede Wendung steckt
   wörtlich in `problem`, `question` oder den Behandlungsnamen.
   Neue Anliegen-Seite: Eintrag ergänzen, sonst greift der Notfall-
   Rückfall unten. */
interface Sprachform {
  /** Mittelteil der Kostenfrage: „Was kostet {kosten} in Geretsried?" */
  kosten: string
  /** Wendung für Frage und Antwort 2: „Welche Behandlungen gibt es {thema}?" */
  thema: string
}

const SPRACHFORM: Record<string, Sprachform | undefined> = {
  'akne-behandlung': {
    kosten: 'eine Behandlung gegen Akne und Aknenarben',
    thema: 'bei Akne und Aknenarben',
  },
  pigmentflecken: {
    kosten: 'eine Behandlung gegen Pigmentflecken',
    thema: 'bei Pigmentflecken',
  },
  'anti-aging': {
    kosten: 'eine Anti-Aging-Behandlung',
    thema: 'gegen Falten',
  },
  gesichtsbehandlung: {
    kosten: 'eine Gesichtsbehandlung',
    thema: 'für dein Gesicht',
  },
  'dauerhafte-haarentfernung': {
    kosten: 'die dauerhafte Haarentfernung',
    thema: 'bei der dauerhaften Haarentfernung',
  },
  'haarausfall-behandlung': {
    kosten: 'eine Behandlung gegen Haarausfall',
    thema: 'bei Haarausfall',
  },
  dehnungsstreifen: {
    kosten: 'eine Behandlung gegen Dehnungsstreifen',
    thema: 'bei Dehnungsstreifen',
  },
  rueckenreinigung: {
    kosten: 'eine Rückenreinigung',
    thema: 'für den Rücken',
  },
  'clear-intimpeel': {
    kosten: 'das Clear IntimPeel',
    thema: 'für den Intimbereich',
  },
  'lashlifting-browlifting': {
    kosten: 'ein Lashlifting oder Browlifting',
    thema: 'für Wimpern und Brauen',
  },
  zahnbleaching: {
    kosten: 'ein Zahnbleaching',
    thema: 'für hellere Zähne',
  },
  schroepftherapie: {
    kosten: 'eine Schröpftherapie',
    thema: 'bei Verspannungen und Migräne',
  },
}

const sprachform = (p: Problem): Sprachform =>
  SPRACHFORM[p.slug] ?? {
    kosten: `eine Behandlung bei ${p.problem}`,
    thema: `bei ${p.problem}`,
  }

/* ── Die vier Fragen ───────────────────────────────────────────── */
const faqEintraege = (problem: Problem): FaqEintrag[] => {
  const form = sprachform(problem)
  const anzahl = solutionCount(problem)
  const eintraege: FaqEintrag[] = []

  // 1. Kosten. Immer priceFrom als Quelle, nie der Einzelpreis einer
  //    Behandlung — priceFrom ist die Zahl, die auch im Kopfbereich und
  //    in der Sticky-Leiste steht.
  const hatAufpreise = problem.treatments.some((t) => !!t.priceNote)
  let kostenAntwort: string

  if (problem.treatments.length === 0 && problem.zones) {
    kostenAntwort =
      `Jede Zone hat ihren eigenen Preis, los geht es bei ${problem.priceFrom}. ` +
      `Die Liste mit allen ${anzahl} Zonen steht oben auf dieser Seite.`
  } else if (anzahl === 0) {
    // Kommt im aktuellen Datenstand nicht vor (jede Seite hat
    // Behandlungen oder Zonen). Ohne diesen Zweig stünde dort
    // „Null Behandlungen stehen zur Auswahl".
    kostenAntwort =
      `Die Preise starten bei ${problem.priceFrom}. ` +
      'Alle Preise stehen oben auf dieser Seite.'
  } else if (anzahl === 1) {
    kostenAntwort =
      `Die Behandlung kostet ${problem.priceFrom}. ` +
      (hatAufpreise
        ? 'Mögliche Aufpreise stehen oben direkt an der Behandlung.'
        : 'Den Preis siehst du oben auch direkt an der Behandlung.')
  } else {
    kostenAntwort =
      `Die Preise starten bei ${problem.priceFrom}. ` +
      `${grossAnfang(zahlwort(anzahl))} Behandlungen stehen zur Auswahl, ` +
      'den genauen Preis siehst du oben an jeder Behandlung.' +
      (hatAufpreise ? ' Dort stehen auch mögliche Aufpreise.' : '')
  }

  eintraege.push({
    frage: `Was kostet ${form.kosten} in Geretsried?`,
    antwort: kostenAntwort,
  })

  // 2. Auswahl. Nur die Namen aus den Daten, im Fließtext aufgezählt.
  if (problem.treatments.length > 0) {
    const namen = problem.treatments.map((t) => t.name)
    eintraege.push({
      frage:
        anzahl === 1
          ? `Welche Behandlung gibt es ${form.thema}?`
          : `Welche Behandlungen gibt es ${form.thema}?`,
      antwort:
        anzahl === 1
          ? `${grossAnfang(form.thema)} gibt es eine Behandlung: ${namen[0]}. ` +
            'Was dabei ist, steht oben bei der Behandlung.'
          : `${grossAnfang(form.thema)} kannst du zwischen ${zahlwort(anzahl)} ` +
            `Behandlungen wählen: ${aufzaehlung(namen)}. ` +
            'Was jeweils dabei ist, steht oben bei jeder Behandlung.',
    })
  } else if (problem.zones) {
    // Zonen-Seite (dauerhafte Haarentfernung): Dort gibt es keine
    // Behandlungen, sondern Körperzonen mit eigenen Preisen.
    // „&" wird zu „und": Gruppennamen sind Beschreibungen, keine
    // Produktnamen — Behandlungsnamen bleiben dagegen unangetastet.
    const bereiche = problem.zones.map((g) => g.group.replace(/\s*&\s*/g, ' und '))
    eintraege.push({
      frage: `Welche Zonen gibt es ${form.thema}?`,
      antwort:
        `${grossAnfang(form.thema)} sind es ${anzahl} Zonen in ` +
        `${zahlwort(bereiche.length)} Bereichen: ${aufzaehlung(bereiche, 'sowie')}. ` +
        'Jede Zone hat oben ihren eigenen Preis.',
    })
  }

  // 3. Ort. Wolfratshausen liegt in der Search Console auf Position 16
  //    mit rund 2.000 Impressionen, der Ort muss im Text vorkommen.
  //    Frage UND Antwort nennen das jeweilige Anliegen. Vorher stand
  //    hier auf allen zwölf Seiten derselbe Satz, einmal sichtbar und
  //    einmal im JSON-LD, also vierundzwanzig Mal wortgleich. So
  //    unterscheidet er sich von selbst, ohne dass jemand künstlich
  //    umformulieren muss.
  eintraege.push({
    frage: `Wo kann ich ${problem.problem} behandeln lassen?`,
    antwort:
      `${problem.problem} behandle ich in meinem Studio am ${STUDIO_ADRESSE}. ` +
      `Von ${NACHBARSTADT} aus bist du schnell da.`,
  })

  // 4. Termin. Keine Zusage zu Antwortzeiten, nur der Weg und die Zeiten.
  eintraege.push({
    frage: 'Wie bekomme ich einen Termin?',
    antwort:
      'Schreib mir einfach über WhatsApp, der Chat ist von dieser Seite aus ' +
      `direkt erreichbar. Geöffnet ist ${OEFFNUNGSZEITEN_SATZ}.${GESCHLOSSEN_SATZ}`,
  })

  return eintraege
}

/** Häufige Fragen einer Anliegen-Seite, sichtbar und als FAQPage-Markup. */
const TreatmentFaq = ({ problem }: { problem: Problem }) => {
  const eintraege = faqEintraege(problem)

  // Dieselben Strings wie im Akkordeon. Abweichende Texte in Markup und
  // Seite wären ein Richtlinienverstoß, deshalb eine gemeinsame Quelle.
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: eintraege.map((e) => ({
      '@type': 'Question',
      name: e.frage,
      acceptedAnswer: {
        '@type': 'Answer',
        text: e.antwort,
      },
    })),
  }

  return (
    <section id="faq" className="mx-auto max-w-4xl px-5 pb-16 sm:px-8 md:pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mb-10 text-center">
        <p className="overline-label mb-4">Häufige Fragen</p>
        <h2 className="font-display text-3xl text-ivory sm:text-4xl">
          <span className="text-3d">Gut zu</span>{' '}
          <span className="text-3d-rose text-rose">wissen</span>
        </h2>
      </div>

      <div className="space-y-3">
        {eintraege.map((e) => (
          <details
            key={e.frage}
            className="group panel transition-colors duration-500 hover:border-rose/40"
          >
            {/* list-none + webkit-Pseudoelement: beide braucht es, damit
                das Dreieck in Chrome/Firefox UND in älteren Safaris weg
                ist. Das Plus übernimmt den Zustand per group-open. */}
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink [&::-webkit-details-marker]:hidden">
              <h3 className="font-display text-lg leading-snug text-ivory sm:text-xl">
                {e.frage}
              </h3>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ivory/15 text-ivory-dim transition-all duration-300 group-hover:border-rose/40 group-open:border-rose group-open:bg-rose group-open:text-ink">
                <Plus className="h-4 w-4 transition-transform duration-300 group-open:rotate-45" />
              </span>
            </summary>
            {/* max-w-[62ch]: gleiche Lesebreite wie das Info-Panel */}
            <p className="max-w-[62ch] px-6 pb-6 leading-relaxed text-ivory-dim">
              {e.antwort}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}

export default TreatmentFaq
