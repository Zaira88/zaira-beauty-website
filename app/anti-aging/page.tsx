import { Metadata } from 'next'
import { ogBase } from '@/lib/metadata'
import AntiAgingContent from './content'

export const metadata: Metadata = {
  // Alter Titel war 70 Zeichen lang, Google schnitt ihn ab (alte description: 162).
  // Jetzt 55 Zeichen, mit "Microneedling" vorne: der Suchbegriff, der diese Seite
  // in die Top 10 bringt.
  title: 'Microneedling & Anti-Aging in Geretsried | Zaira Beauty',
  // Die Nachbarstadt steht genau einmal in der Datei, nämlich hier. Bewusst
  // ohne Fahrzeit und ohne Entfernung: Die frühere Angabe war schlicht falsch.
  // Jede Seite formuliert den Ortsbezug eigen, damit nicht zehn Beschreibungen
  // denselben Halbsatz tragen.
  description: 'Falten mildern mit Microneedling, RF Lifting oder Mesotherapie. Ab 109€ in meinem Studio in Geretsried, gleich bei Wolfratshausen.',
  keywords: [
    'Anti-Aging',
    'Anti Aging',
    'Falten',
    'Faltenreduzierung',
    'Hautverjüngung',
    'Microneedling',
    'RF Microneedling',
    'RF-Lifting',
    'Mesotherapie',
    'Kosmetikstudio Geretsried',
    'Zaira Beauty',
  ],
  // images, siteName, locale und type kommen aus ogBase (lib/metadata.ts).
  // Diese Seite hatte sie schon von Hand gesetzt, elf andere nicht. Jetzt
  // teilen alle zwölf Seiten dieselbe Quelle, damit der WhatsApp-Vorschau
  // nirgends das Bild fehlt.
  openGraph: ogBase(
    'anti-aging',
    'Anti-Aging & Microneedling bei Zaira Beauty in Geretsried',
    'Straffere Haut ohne Skalpell: Microneedling, RF Lifting und Mesotherapie. Schreib mir für deinen Termin auf WhatsApp.'
  ),
};

const AntiAgingPage = () => {
    return <AntiAgingContent />
}

export default AntiAgingPage 