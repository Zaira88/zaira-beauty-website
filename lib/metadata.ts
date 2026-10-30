import type { Metadata } from 'next'

/**
 * openGraph-Grundgerüst für die Behandlungsseiten.
 *
 * Next.js führt `metadata` nur FLACH zusammen: Sobald eine Seite ein
 * eigenes `openGraph`-Objekt exportiert, ersetzt es das aus
 * app/layout.tsx vollständig. Setzt die Seite dort nur title,
 * description und url, verliert sie images, siteName, locale und type.
 *
 * Genau das war der Fall: Im Produktions-Build lieferten elf von zwölf
 * Detailseiten kein einziges og:image. Jeder dieser Links wurde in
 * WhatsApp als nackter Text geteilt, und die Terminanfragen laufen
 * ausgerechnet über WhatsApp.
 *
 * Deshalb hier zentral statt elfmal kopiert. Wer eine neue
 * Behandlungsseite anlegt, nimmt `ogBase()` und kann den Fehler nicht
 * wiederholen.
 */
export function ogBase(
  pfad: string,
  title: string,
  description: string
): Metadata['openGraph'] {
  return {
    title,
    description,
    url: `https://zairabeauty.de/${pfad.replace(/^\//, '')}`,
    siteName: 'Zaira Beauty',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/images/zaira.jpg',
        width: 2200,
        height: 2749,
        alt: 'Zaira Beauty, Kosmetikstudio in Geretsried',
      },
    ],
  }
}
