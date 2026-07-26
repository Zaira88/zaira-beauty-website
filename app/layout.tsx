import { Inter, Playfair_Display } from 'next/font/google'
import { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import MotionProvider from '@/components/MotionProvider'
import { OPENING_HOURS } from '@/data/problems'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const siteUrl = "https://zairabeauty.de";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Zaira Beauty | Kosmetikstudio in Geretsried | Aquafacial, Lashlifting & Mehr',
  description: 'Dein Kosmetikstudio in Geretsried: Aquafacial, Anti-Aging, Microneedling, Lashlifting und dauerhafte Haarentfernung. Sag mir, was dich stört, und wir finden die passende Behandlung.',
  keywords: 'Kosmetikstudio Geretsried, Zaira Beauty, Aquafacial, Lashlifting, Browlifting, Microneedling, Anti-Aging, dauerhafte Haarentfernung, BB-Glow, Zahnbleaching, Gesichtsbehandlung',
  authors: [{ name: 'Zaira Beauty' }],
  openGraph: {
    title: 'Zaira Beauty | Kosmetikstudio in Geretsried',
    description: 'Aquafacial, Anti-Aging, Microneedling, Lashlifting und dauerhafte Haarentfernung. Finde die Behandlung, die zu deiner Haut passt.',
    url: siteUrl,
    siteName: 'Zaira Beauty',
    locale: 'de_DE',
    type: 'website',
    // Ohne Bild zeigte ein geteilter Link in WhatsApp/Instagram nur Text
    images: [
      {
        url: '/images/zaira.png',
        width: 1122,
        height: 1402,
        alt: 'Zaira Beauty, Kosmetikstudio in Geretsried',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaira Beauty | Kosmetikstudio in Geretsried',
    description: 'Aquafacial, Anti-Aging, Microneedling, Lashlifting und dauerhafte Haarentfernung in Geretsried.',
    images: ['/images/zaira.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Zaira Beauty",
    "image": "https://zairabeauty.de/images/logo.webp",
    "@id": "https://zairabeauty.de",
    "url": "https://zairabeauty.de",
    "telephone": "+4915159414259",
    "email": "zaira.beauty.face@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Johannispl. 10",
      "addressLocality": "Geretsried",
      "postalCode": "82538",
      "addressCountry": "DE"
    },
    // Aus OPENING_HOURS erzeugt (data/problems.ts) — vorher standen hier
    // andere Zeiten als im Footer. Geschlossene Tage lässt schema.org weg.
    "openingHoursSpecification": OPENING_HOURS.filter((d) => d.opens).map((d) => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": d.schemaDay,
      "opens": d.opens,
      "closes": d.closes,
    }))
  };

  return (
    <html lang="de" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <MotionProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <ScrollToTopButton />
        </MotionProvider>
      </body>
    </html>
  );
}
