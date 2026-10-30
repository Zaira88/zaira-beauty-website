import { Metadata } from 'next'
import { ogBase } from '@/lib/metadata'
import RueckenreinigungContent from './content';

export const metadata: Metadata = {
  // Titel: wichtigster Suchbegriff zuerst, dann Ort, dann die Formulierung,
  // die Leute selbst eintippen ("Akne am Rücken"). 58 Zeichen, bleibt in der
  // Google-Ergebnisliste ungekürzt.
  title: 'Rückenreinigung Geretsried | Akne am Rücken | Zaira Beauty',
  // Der Nachbarort steht hier genau einmal, im normalen Satzfluss, und
  // bewusst anders formuliert als auf den anderen Seiten: zehn wortgleiche
  // Beschreibungen schreibt Google selbst um. Ohne Entfernungsangabe, die
  // war vorher falsch. Preisanker statt Bewertungszahl, die veraltet im
  // Suchergebnis. 141 Zeichen.
  description: 'Rückenreinigung gegen Pickel und Akne am Rücken bei Zaira Beauty in Geretsried, gleich bei Wolfratshausen. Ab 139€. Schreib mir per WhatsApp.',
  keywords: ['Rückenreinigung', 'Rückenreinigung Kosmetik', 'Pickel am Rücken', 'Akne am Rücken', 'Rückenakne', 'Unreinheiten Rücken', 'Aquafacial Rücken', 'Microneedling Rücken', 'Schälkur', 'Zaira Beauty', 'Geretsried'],
  // ogBase() statt eines eigenen openGraph-Objekts: Next.js führt metadata
  // nur flach zusammen, ein Objekt hier hätte images, siteName, locale und
  // type aus app/layout.tsx ersatzlos gelöscht (geteilter Link ohne Bild).
  openGraph: ogBase(
    'rueckenreinigung',
    'Rückenreinigung gegen Pickel am Rücken | Zaira Beauty',
    'Tiefenreinigung, Peeling und Laser für den Rücken bei Zaira Beauty in Geretsried. Schreib mir per WhatsApp.'
  ),
};

export default function RueckenreinigungPage() {
    return <RueckenreinigungContent />;
} 