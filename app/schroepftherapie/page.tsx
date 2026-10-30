import { Metadata } from 'next'
import { ogBase } from '@/lib/metadata'
import SchroepftherapieContent from './content';

export const metadata: Metadata = {
  // 54 Zeichen, bleibt in der Google-Ergebnisliste ungekürzt. "Massage"
  // steht bewusst mit drin: beide Behandlungen dieser Seite sind
  // Massagen (data/problems.ts), der Begriff ist also belegt.
  title: 'Schröpftherapie & Massage in Geretsried | Zaira Beauty',
  // Der Nachbarort steht genau einmal, im Satzfluss und anders formuliert
  // als auf den übrigen Seiten: zehn wortgleiche Beschreibungen schreibt
  // Google selbst um, und "und Umgebung" ist genau die Lokal-SEO-Floskel,
  // die hier keiner will. Ohne Entfernungsangabe, die war vorher falsch.
  // Preisanker statt der Sterne-Zahl, die im Suchergebnis veraltet und
  // auf dieser Seite sichtbar auch noch abwich. 151 Zeichen.
  description: 'Verspannungen oder Migräne? Schröpfmassage und Anti-Migräne Massage in Geretsried, dem Nachbarort von Wolfratshausen. Ab 29€. Schreib mir per WhatsApp.',
  // Der Suchbegriff für eine Massage am Rücken ist raus: so eine
  // Behandlung gibt es hier nicht. Angeboten werden laut data/problems.ts
  // Schröpfmassage Medical und Anti-Migräne Massage, deshalb bleiben
  // "Massage Geretsried" und "Schröpfmassage" drin.
  keywords: ['Schröpftherapie', 'Schröpfen', 'Schröpfmassage', 'Massage Geretsried', 'Anti-Migräne Massage', 'Migräne', 'Kopfschmerzen', 'Verspannungen lösen', 'Nackenverspannungen', 'Durchblutung fördern', 'Zaira Beauty', 'Geretsried'],
  // ogBase() statt eines eigenen openGraph-Objekts: Next.js führt metadata
  // nur flach zusammen, ein Objekt hier hätte images, siteName, locale und
  // type aus app/layout.tsx ersatzlos gelöscht. Geteilte Links wären in
  // WhatsApp als nackter Text gelandet, und dort kommen die Termine rein.
  openGraph: ogBase(
    'schroepftherapie',
    'Schröpftherapie gegen Verspannungen | Zaira Beauty',
    'Schröpfmassage Medical und Anti-Migräne Massage bei Zaira Beauty in Geretsried, ab 29€. Schreib mir per WhatsApp.'
  ),
};

export default function SchroepftherapiePage() {
    return <SchroepftherapieContent />;
}
