import { Inter, Playfair_Display } from 'next/font/google'
import { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import MotionProvider from '@/components/MotionProvider'
import { CONTACT, OPENING_HOURS } from '@/data/problems'

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
  // Die Startseite war als einzige Seite zu lang (Titel 76, Beschreibung 181
  // Zeichen, beides von Google gekürzt) und nannte Wolfratshausen nicht,
  // obwohl 1.999 der 2.000 Wolfratshausen-Impressionen genau hier landen.
  title: 'Kosmetikstudio Geretsried & Wolfratshausen | Zaira Beauty',
  description: 'Dein Kosmetikstudio in Geretsried, nah an Wolfratshausen. Aquafacial, Anti-Aging, Microneedling, Lashlifting und dauerhafte Haarentfernung.',
  keywords: 'Kosmetikstudio Geretsried, Zaira Beauty, Aquafacial, Lashlifting, Browlifting, Microneedling, Anti-Aging, dauerhafte Haarentfernung, BB-Glow, Zahnbleaching, Gesichtsbehandlung',
  authors: [{ name: 'Zaira Beauty' }],
  // './' = jede Seite zeigt auf sich selbst. Ohne canonical konnte Google
  // dieselbe Seite mit Instagram-Trackingparametern (?utm_...) als
  // Duplikat werten — bei Traffic aus Story-Links durchaus relevant.
  alternates: {
    canonical: './',
  },
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
        url: '/images/zaira.jpg',
        width: 2200,
        height: 2749,
        alt: 'Zaira Beauty, Kosmetikstudio in Geretsried',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaira Beauty | Kosmetikstudio in Geretsried',
    description: 'Aquafacial, Anti-Aging, Microneedling, Lashlifting und dauerhafte Haarentfernung in Geretsried.',
    images: ['/images/zaira.jpg'],
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
    // Koordinaten aus dem Google-Unternehmensprofil (30.10.2026).
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 47.8778199,
      "longitude": 11.4726694
    },
    // Einzugsgebiet. Wolfratshausen stand nirgends auf der Seite, obwohl
    // die Search Console dort 2.000 Impressionen auf Position 16 zeigt,
    // also etwa so viel Nachfrage wie Geretsried selbst.
    // Hier standen zwischenzeitlich acht Orte. Das war zu viel behauptet:
    // Bad Tölz (14,5 km) und Penzberg (15,8 km) sind keine Nachbargemeinden,
    // und für die übrigen gibt es keine Quelle. Belegt sind genau diese
    // beiden. Weitere Orte erst aufnehmen, wenn Zaira sie bestätigt.
    "areaServed": ["Geretsried", "Wolfratshausen"].map((ort) => ({
      "@type": "City",
      "name": ort,
    })),
    // Verbindet Website, Instagram und Google-Profil zu einer Entität.
    "sameAs": [CONTACT.instagram],
    "priceRange": "€€",
    "currenciesAccepted": "EUR",
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
