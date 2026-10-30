import { Metadata } from 'next'
import { ogBase } from '@/lib/metadata'
import HairGrowthContent from './content';

export const metadata: Metadata = {
  // Titel: Hauptsuchbegriff "Haarausfall" + Ort vorne, 50 Zeichen (Google
  // schneidet ab ca. 60). Beschreibung 151 Zeichen, du-Ansprache,
  // Ich-Form wie auf der ganzen Website.
  //
  // Der Nachbarort steht genau einmal, nur in der description: 2.000
  // Impressionen in 16 Monaten von dort, das Wort kam auf der Seite bisher
  // nicht vor. Eigen formuliert statt der Floskel, die auf zehn
  // Schwesterseiten wortgleich stand, und ohne Entfernungsangabe: die alte
  // Zahl war falsch.
  title: 'Haarausfall behandeln in Geretsried | Zaira Beauty',
  description: 'Dein Haar wird dünner? Hair Growth Treatment bei Haarausfall mit Microneedling und Laser ab 169€ in meinem Studio in Geretsried, nah an Wolfratshausen.',
  keywords: ['Haarausfall', 'Haarausfall Geretsried', 'Mesotherapie Haare', 'Haarwachstum anregen', 'Geheimratsecken', 'dünnes Haar', 'Kopfhaut', 'Microneedling Kopfhaut', 'Lasertherapie Haare', 'Zaira Beauty', 'Geretsried'],
  // ogBase() statt eigenem openGraph-Objekt: Next.js merged Metadata nur flach,
  // ein lokales openGraph hätte images, siteName, locale und type aus
  // app/layout.tsx gelöscht und der geteilte WhatsApp-Link wäre nackter Text.
  openGraph: ogBase(
    'haarausfall-behandlung',
    'Hair Growth Treatment in Geretsried | Zaira Beauty',
    'Microneedling mit Stammzellen und Hair Growth Laser für Kopfhaut und Haarwurzeln. Schreib mir per WhatsApp, wenn du einen Termin möchtest.'
  ),
};

export default function HairGrowthPage() {
    return <HairGrowthContent />;
}
