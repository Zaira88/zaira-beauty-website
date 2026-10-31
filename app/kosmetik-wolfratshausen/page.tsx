import { Metadata } from 'next'
import { ogBase } from '@/lib/metadata'
import WolfratshausenContent from './content'

export const metadata: Metadata = {
  // Die gesuchten Begriffe stehen laut Search Console in dieser Form:
  // "kosmetikstudio wolfratshausen" (315), "kosmetik wolfratshausen" (236),
  // "beste kosmetik studio wolfratshausen" (326). Der Stadtname gehört
  // deshalb nach vorn. Geretsried muss trotzdem rein, sonst klickt
  // jemand aus Wolfratshausen und findet erst auf der Seite heraus,
  // dass das Studio nebenan liegt.
  title: 'Kosmetikstudio für Wolfratshausen | Zaira Beauty Geretsried',
  // Entfernung gerundet und ohne Fahrzeit: die genauen Werte (6,6 km
  // vom Marienplatz, 6,9 km vom Bahnhof) stehen auf der Seite, eine
  // Minutenangabe hängt vom Verkehr ab und war hier schon einmal falsch.
  description:
    'Kosmetikstudio für Wolfratshausen, sieben Kilometer entfernt in Geretsried: Laser-Haarentfernung, Lashlifting, Aquafacial. Ab 29€, Do bis 19 Uhr.',
  keywords: [
    'Kosmetikstudio Wolfratshausen',
    'Kosmetik Wolfratshausen',
    'Kosmetikerin Wolfratshausen',
    'Haarentfernung Wolfratshausen',
    'Dauerhafte Haarentfernung Wolfratshausen',
    'Laser Haarentfernung Wolfratshausen',
    'Augenbrauen Wolfratshausen',
    'Wimpern Wolfratshausen',
    'Gesichtsbehandlung Wolfratshausen',
    'Zaira Beauty',
    'Geretsried',
  ],
  // ogBase() statt eines eigenen openGraph-Objekts: Next.js führt
  // metadata nur flach zusammen, ein Objekt hier würde images, siteName,
  // locale und type aus app/layout.tsx ersatzlos löschen.
  openGraph: ogBase(
    'kosmetik-wolfratshausen',
    'Kosmetikstudio für Wolfratshausen | Zaira Beauty',
    'Sieben Kilometer von Wolfratshausen, in Geretsried. Laser-Haarentfernung, Lashlifting und Aquafacial ab 29€. Schreib mir per WhatsApp.'
  ),
}

export default function WolfratshausenPage() {
  return <WolfratshausenContent />
}
