import { Metadata } from 'next'
import { ogBase } from '@/lib/metadata'
import ClearIntimPeelContent from './content';

export const metadata: Metadata = {
  title: 'Intimbleaching in Geretsried | Zaira Beauty',
  description: 'Dunkle Stellen im Intimbereich oder Po-Akne? Clear IntimPeel für dein ebenmäßiges Hautbild, ab 159€. Diskret in Geretsried, gleich bei Wolfratshausen.',
  keywords: ['Intimbleaching', 'Intimpeeling', 'Clear Intimpeel', 'dunkle Stellen aufhellen', 'Intim-Aufhellung', 'Po-Akne', 'Hyperpigmentierung Intimbereich', 'diskrete Kosmetik', 'Zaira Beauty', 'Geretsried'],
  // ogBase() statt eigenem openGraph-Objekt: Next.js ersetzt das Layout-og
  // flach, ein Inline-Objekt hätte og:image, siteName, locale und type
  // verloren. Siehe lib/metadata.ts.
  openGraph: ogBase(
    'clear-intimpeel',
    'Clear IntimPeel & Po-Akne in Geretsried | Zaira Beauty',
    'Diskrete Behandlungen für Intimbereich und Po, für dein gleichmäßiges Hautbild. Po Aknebehandlung und Aufhellung ab 159€.'
  ),
};

export default function ClearIntimPeelPage() {
    return <ClearIntimPeelContent />;
}
