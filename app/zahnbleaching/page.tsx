import { Metadata } from 'next'
import { ogBase } from '@/lib/metadata'
import ZahnbleachingContent from './content'

export const metadata: Metadata = {
  // 56 Zeichen. "Bleaching" bleibt allein stehen, dafür gibt es belegte
  // Nachfrage (27 Impressionen auf "bleaching geretsried").
  title: 'Bleaching in Geretsried | Zähne aufhellen | Zaira Beauty',
  // Die Sterne- und Bewertungszahl ist ersatzlos raus: Sie widersprach der
  // Zahl, die sichtbar auf derselben Seite stand, sie veraltet im
  // Suchergebnis sicher, und sie ist eine Werbeaussage im Namen einer
  // echten Unternehmerin. Der Platz geht an den Preisanker.
  // Die Nachbarstadt steht genau einmal in der Datei, nämlich hier, und
  // bewusst ohne Entfernung: Die frühere Angabe war falsch. Der Ortsbezug
  // ist für diese Seite eigen formuliert, damit nicht zehn Beschreibungen
  // denselben Halbsatz tragen.
  description: 'Verfärbte Zähne? Bleaching ab 79€ für dein helleres Lächeln, bei mir in Geretsried, direkt neben Wolfratshausen. Schreib mir einfach per WhatsApp.',
  keywords: ['Bleaching', 'Bleaching Geretsried', 'Zahnbleaching', 'Zahnbleaching Geretsried', 'Zähne aufhellen', 'weißes Lächeln', 'kosmetisches Zahnbleaching', 'Zahnaufhellung', 'Zaira Beauty', 'Geretsried'],
  // ogBase() statt eigenem openGraph-Objekt: Next.js ersetzt das Layout-og
  // flach, ein Inline-Objekt hätte og:image, siteName, locale und type
  // verloren. Siehe lib/metadata.ts.
  openGraph: ogBase(
    'zahnbleaching',
    'Bleaching und Zahnbleaching in Geretsried | Zaira Beauty',
    'Hellere Zähne mit Bleaching bei mir in Geretsried, Zahnbleaching ab 79€. Schreib mir per WhatsApp, wenn du einen Termin möchtest.'
  ),
};

const ZahnbleachingPage = () => {
    return <ZahnbleachingContent />
}

export default ZahnbleachingPage 