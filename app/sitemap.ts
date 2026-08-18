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
  const now = new Date()

  return [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Die 12 Anliegen-Seiten — das inhaltliche Herz und die Landeseiten
    // aus der Google-Suche
    ...problems.map((p) => ({
      url: `${BASE}/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...['impressum', 'datenschutz'].map((slug) => ({
      url: `${BASE}/${slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ]
}
