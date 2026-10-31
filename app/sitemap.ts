import { MetadataRoute } from 'next'
import { problems } from '@/data/problems'

/**
 * Sitemap wird aus data/problems.ts erzeugt.
 *
 * Vorher lag eine handgepflegte public/sitemap.xml im Repo. Die war vom
 * Juli, listete eine Seite /bb-glow, die es nicht mehr gibt (404 bei
 * jedem Google-Crawl), und musste bei jedem neuen Anliegen von Hand
 * nachgezogen werden. Jetzt kann sie nicht mehr auseinanderlaufen.
 */
const BASE = 'https://zairabeauty.de'

export default function sitemap(): MetadataRoute.Sitemap {
  // Bewusst OHNE lastModified. Vorher stand dort new Date(), also der
  // Zeitpunkt des Builds. Jeder Deploy behauptete damit, alle 13 Seiten
  // hätten sich geändert, auch wenn nur eine Zeile Code anders war.
  // Google entwertet lastmod-Angaben, die sich so verhalten, und dann
  // nützt die Angabe auch dort nichts mehr, wo sie stimmen würde.
  // Lieber keine Angabe als eine unglaubwürdige.
  return [
    {
      url: `${BASE}/`,
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Die 12 Anliegen-Seiten, das inhaltliche Herz und die Landeseiten
    // aus der Google-Suche
    ...problems.map((p) => ({
      url: `${BASE}/${p.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    // Ortsseite Wolfratshausen. Steht hier von Hand und nicht in einer
    // Liste: es ist vorerst die einzige, und eine Schleife über
    // erfundene Nachbarorte wäre genau die Doorway-Struktur, die diese
    // Seite vermeiden soll. Kommt irgendwann eine zweite, bekommt sie
    // eigenen Inhalt und eine eigene Zeile.
    {
      url: `${BASE}/kosmetik-wolfratshausen`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // Impressum und Datenschutz stehen bewusst NICHT mehr drin.
    // Beide liefern <meta name="robots" content="noindex">. Eine
    // eingereichte Sitemap mit noindex-Seiten quittiert die Search
    // Console mit "Eingereichte URL als noindex gekennzeichnet" —
    // ein Fehler im Bericht, der die Sitemap-Statistik verfälscht,
    // und genau diese Statistik ist die Kennzahl, an der wir die
    // Indexierung messen. Rechtlich sind beide über den Footer
    // verlinkt und damit erreichbar, das genügt.
  ]
}
