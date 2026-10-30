/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },

  // Weiterleitungen aus dem alten WordPress-Blog. Diese URLs wurden beim
  // Relaunch gelöscht und liefern seitdem 404, die Google Search Console
  // meldet sie weiterhin. Statt das verbliebene Ranking-Signal zu verlieren,
  // zeigt jede alte Adresse dauerhaft (308) auf die passende neue Seite oder,
  // wenn es keine gibt, auf die Startseite. Pfade bewusst OHNE abschließenden
  // Schrägstrich: trailingSlash ist nicht gesetzt, Next.js normalisiert selbst.
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      {
        source: '/behandlungen/rueckenreinigung',
        destination: '/rueckenreinigung',
        permanent: true,
      },
      {
        source: '/welcher-lippenstift-haelt-am-laengsten',
        destination: '/',
        permanent: true,
      },
      {
        source: '/bewertung-loreal-paris-hyaluron-serum',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wie-bekomme-ich-vollere-lippen-ohne-operation',
        destination: '/anti-aging',
        permanent: true,
      },
      {
        source: '/soena-naturals-organisches-hyaluronsaeure-serum-review',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wie-behandelt-man-sproede-lippen',
        destination: '/',
        permanent: true,
      },
      // Alte Blog-Schlagwort-Archive, beliebig viele Segmente
      { source: '/tag/:slug*', destination: '/', permanent: true },
    ]
  },

  // Sicherheits-Header. Für eine Info-Seite ohne Login kein akutes
  // Risiko, aber Standard und kostenlos. Bewusst OHNE Content-Security-
  // Policy: die müsste next/font, next/image und die Google-Profilbilder
  // in den Rezensionen kennen und wäre eine stille Fehlerquelle.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Verhindert, dass der Browser Dateitypen errät
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Verhindert Einbetten in fremde Seiten (Clickjacking)
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Gibt beim Verlassen der Seite keine vollständige URL preis
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Die Seite braucht weder Kamera, Mikrofon noch Standort
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
