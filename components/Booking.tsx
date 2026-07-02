'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { FaWhatsapp, FaInstagram } from 'react-icons/fa'
import { CONTACT, waHref } from '@/data/problems'

const contactItems = [
  {
    icon: Phone,
    label: 'Telefon',
    value: CONTACT.phoneDisplay,
    href: `tel:${CONTACT.phone}`,
  },
  {
    icon: Mail,
    label: 'E-Mail',
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: MapPin,
    label: 'Studio',
    value: CONTACT.address,
  },
  {
    icon: Clock,
    label: 'Öffnungszeiten',
    value: 'Mo–Fr 09–15 Uhr · Sa 09–18 Uhr',
  },
]

const Booking = () => {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink-900 py-24 md:py-36">
      {/* Dezente Glow-Akzente */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-teal/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-rose/5 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="overline-label mb-5">Nur eine Nachricht entfernt</p>
          <h2 className="font-display text-4xl text-ivory sm:text-5xl lg:text-6xl">
            <span className="text-3d">Bereit?</span>{' '}
            <em className="text-3d-rose text-rose">Schreib mir.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ivory-mute">
            Erzähl mir kurz von deinem Anliegen — ich antworte meist innerhalb
            weniger Minuten und wir finden gemeinsam deinen Termin.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={waHref('Hallo Zaira! 👋 Ich würde gerne einen Termin vereinbaren.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base"
          >
            <FaWhatsapp className="h-5 w-5" />
            WhatsApp Chat starten
          </a>
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-base"
          >
            <FaInstagram className="h-5 w-5" />
            Instagram
          </a>
        </motion.div>

        {/* Kontakt-Fakten */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 grid grid-cols-1 gap-px overflow-hidden hairline bg-ivory/10 text-left sm:grid-cols-2 lg:grid-cols-4"
        >
          {contactItems.map((item) => {
            const Icon = item.icon
            const inner = (
              <div className="flex h-full flex-col gap-3 bg-ink-900 p-6 transition-colors hover:bg-ink-800">
                <Icon className="h-5 w-5 text-teal" />
                <div>
                  <p className="text-xs uppercase tracking-widestplus text-ivory-mute">
                    {item.label}
                  </p>
                  <p className="mt-1.5 text-sm font-medium leading-snug text-ivory-dim">
                    {item.value}
                  </p>
                </div>
              </div>
            )
            return item.href ? (
              <a key={item.label} href={item.href}>
                {inner}
              </a>
            ) : (
              <div key={item.label}>{inner}</div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Booking
