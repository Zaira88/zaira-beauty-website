import { Metadata } from 'next'
import { ogBase } from '@/lib/metadata'
import PigmentfleckenContent from './content';

export const metadata: Metadata = {
  title: 'Pigmentflecken entfernen in Geretsried | Zaira Beauty',
  description: 'Pigmentflecken, Altersflecken und Hyperpigmentierung mildere ich für einen ebenmäßigen Teint. Ab 99€ in Geretsried bei Wolfratshausen.',
  keywords: ['Pigmentflecken entfernen', 'Altersflecken', 'Hyperpigmentierung', 'ebenmäßiger Teint', 'Melasma', 'Sonnenflecken', 'Lasertherapie', 'Anti Pigment Peel', 'Microneedling', 'Zaira Beauty', 'Geretsried'],
  // ogBase statt eines eigenen openGraph-Objekts: Next.js merged Metadata nur
  // flach, ein lokales openGraph hätte images, siteName, locale und type aus
  // app/layout.tsx ersatzlos überschrieben (geteilter Link = nackter Text).
  openGraph: ogBase(
    'pigmentflecken',
    'Pigmentflecken behandeln in Geretsried | Zaira Beauty',
    'Für einen ebenmäßigen Teint ohne störende Pigmentflecken. Lasertherapie oder Anti Pigment Peel mit Microneedling, ab 99€.'
  ),
};

export default function PigmentfleckenPage() {
    return <PigmentfleckenContent />;
}
