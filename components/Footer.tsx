'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { CONTACT, waHref } from '@/data/problems'

const Footer = () => {
  return (
    <footer className="border-t border-ivory/5 bg-ink">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Oberer Bereich */}
        <div className="grid gap-12 py-16 md:grid-cols-3">
          {/* Marke */}
          <div>
            <Link href="/" className="relative block h-16 w-44">
              <Image
                src="/images/logo.webp"
                alt="Zaira Beauty Logo"
                fill
                className="object-contain object-left"
                sizes="176px"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory-mute">
              Dein Kosmetikstudio in Geretsried — spezialisiert auf sichtbare
              Ergebnisse mit Herz und Präzision.
            </p>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="overline-label mb-5">Kontakt</h3>
            <ul className="space-y-3 text-sm text-ivory-dim">
              <li>{CONTACT.address}</li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="transition-colors hover:text-ivory"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="transition-colors hover:text-ivory"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>

          {/* Öffnungszeiten */}
          <div>
            <h3 className="overline-label mb-5">Öffnungszeiten</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between gap-6 text-ivory-dim">
                <span>Montag – Freitag</span>
                <span>09:00 – 15:00 Uhr</span>
              </li>
              <li className="flex justify-between gap-6 text-ivory-dim">
                <span>Samstag</span>
                <span>09:00 – 18:00 Uhr</span>
              </li>
              <li className="flex justify-between gap-6 text-ivory-mute">
                <span>Sonntag</span>
                <span>Geschlossen</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Untere Leiste */}
        <div className="flex flex-col items-center justify-between gap-5 border-t border-ivory/5 py-7 sm:flex-row">
          <p className="text-xs text-ivory-mute">
            &copy; {new Date().getFullYear()} Zaira Beauty. Deine
            Beauty-Expertin in Geretsried.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/impressum"
              className="text-xs text-ivory-mute transition-colors hover:text-ivory"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="text-xs text-ivory-mute transition-colors hover:text-ivory"
            >
              Datenschutz
            </Link>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-ivory-mute transition-colors hover:text-ivory"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href={waHref()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-ivory-mute transition-colors hover:text-ivory"
            >
              <FaWhatsapp size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
