import { Metadata } from 'next'
import { ogBase } from '@/lib/metadata'
import GesichtsbehandlungContent from './content';

export const metadata: Metadata = {
  title: 'Aquafacial & Gesichtsbehandlung Geretsried | Zaira Beauty',
  // Der Nachbarort steht genau einmal auf der Seite, hier, und bewusst
  // ortsbezogen statt als Einzugsgebiets-Floskel: derselbe Halbsatz lag
  // wortgleich in zehn Beschreibungen, was Google dazu einlädt, sie
  // selbst umzuschreiben. Keine Entfernung, die alte war falsch.
  description: 'Luxury Aquafacial, Collagenbehandlung, Lifting oder Yellow Peel in Geretsried, gleich bei Wolfratshausen. Ab 89€. Schreib mir auf WhatsApp.',
  keywords: ['Gesichtsbehandlung', 'Aquafacial', 'Hydrafacial', 'Gesichtsreinigung', 'Kollagen', 'Lifting', 'Yellow Peel', 'Hautreinigung', 'Kosmetikstudio Geretsried', 'Zaira Beauty'],
  // ogBase() statt eines eigenen openGraph-Objekts: Next.js führt metadata
  // flach zusammen, ein Objekt hier ersetzt das aus app/layout.tsx komplett.
  // Vorher fehlten dadurch og:image, og:site_name, og:locale und og:type,
  // und ein geteilter Link war in WhatsApp nur nackter Text.
  openGraph: ogBase(
    'gesichtsbehandlung',
    'Aquafacial & Gesichtsbehandlung in Geretsried | Zaira Beauty',
    'Luxury Aquafacial, Lifting, Kollagenbehandlung oder Yellow Peel bei Zaira Beauty in Geretsried. Ab 89€. Schreib mir auf WhatsApp.'
  ),
};

export default function GesichtsbehandlungPage() {
    return <GesichtsbehandlungContent />;
} 