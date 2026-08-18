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
