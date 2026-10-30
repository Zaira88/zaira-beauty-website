import { Metadata } from 'next'
import { ogBase } from '@/lib/metadata'
import AkneContent from './content'

export const metadata: Metadata = {
  // 58 Zeichen, bleibt in der Google-Ergebnisliste ungekürzt: wichtigster
  // Suchbegriff zuerst, dann der Ort, dann die Formulierung, die Leute
  // selbst eintippen ("Kosmetikerin Akne").
  title: 'Aknebehandlung in Geretsried | Kosmetikerin | Zaira Beauty',
  // Der Suchbegriff rund ums Ausreinigen des Gesichts ist gestrichen, in
  // description und keywords: In data/problems.ts steht im Block dieser Seite
  // keine solche Behandlung, sondern FruchtsäurePeel, Microneedling,
  // Aquafacial und Clear Skin Treatment. Nur die werden beworben.
  // Der Nachbarort steht genau einmal in der Datei, nämlich hier, und eigen
  // formuliert: Der Halbsatz "auch für ... und Umgebung" stand wortgleich in
  // zehn Beschreibungen, das schreibt Google selbst um. Ohne Angabe von
  // Kilometern oder Minuten, die war vorher falsch. Preisanker statt
  // Bewertungszahl, denn eine hart kodierte Sternezahl veraltet im
  // Suchergebnis sicher. Preis geprüft gegen priceFrom in data/problems.ts.
  // 151 Zeichen.
  description: 'Unreine Haut, Akne oder Narben? Fruchtsäurepeeling, Microneedling und Aquafacial bei mir in Geretsried, auch wenn du aus Wolfratshausen kommst. Ab 79€.',
  keywords: ['Aknebehandlung', 'Akne Behandlung Kosmetikerin', 'Kosmetikerin Akne', 'Aknenarben', 'unreine Haut', 'Fruchtsäurepeeling', 'Microneedling', 'Clear Skin Treatment', 'Hautbild verbessern', 'Zaira Beauty', 'Geretsried'],
  // ogBase() statt eines eigenen openGraph-Objekts: Next.js führt metadata
  // nur flach zusammen, ein Objekt hier hätte images, siteName, locale und
  // type aus app/layout.tsx ersatzlos gelöscht. Der geteilte Link wäre in
  // WhatsApp als nackter Text erschienen, und genau dort kommen die
  // Terminanfragen rein.
  openGraph: ogBase(
    'akne-behandlung',
    'Aknebehandlung und Aknenarben in Geretsried | Zaira Beauty',
    'Akne, unreine Haut oder Narben? Fruchtsäurepeeling, Microneedling und Clear Skin Treatment bei mir in Geretsried. Ab 79€, schreib mir per WhatsApp.'
  ),
};

const AknePage = () => {
    return <AkneContent />
}

export default AknePage
