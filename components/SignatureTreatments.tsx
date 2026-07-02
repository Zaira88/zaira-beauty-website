'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const signatures = [
  {
    name: 'Luxury Aquafacial',
    tagline: 'Tiefenreinigung & Glow',
    price: 'ab 119€',
    image: '/images/Aquafacial.webp',
    href: '/gesichtsbehandlung',
  },
  {
    name: 'Anti-Aging',
    tagline: 'Straffung ohne Skalpell',
    price: 'ab 109€',
    image: '/images/antiaging.webp',
    href: '/anti-aging',
  },
  {
    name: 'Clear Skin',
    tagline: 'Reine Haut, neues Selbstbewusstsein',
    price: 'ab 79€',
    image: '/images/clearskin.webp',
    href: '/akne-behandlung',
  },
  {
    name: 'Lash & Brow Lifting',
    tagline: 'Wache Augen, volle Brauen',
    price: 'ab 39€',
    image: '/images/lashlifting.webp',
    href: '/lashlifting-browlifting',
  },
]

const SignatureTreatments = () => {
  return (
    <section id="signature" className="bg-ink-900 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <p className="overline-label mb-5">Meine Empfehlungen</p>
            <h2 className="font-display text-4xl text-ivory sm:text-5xl">
              Signature <em className="text-rose">Treatments</em>
            </h2>
          </div>
          <Link
            href="/#pricing"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ivory-mute transition-colors hover:text-ivory"
          >
            Alle Preise ansehen
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {signatures.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={s.href} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={`${s.name} — Zaira Beauty Geretsried`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-xs uppercase tracking-widestplus text-teal-soft/90">
                      {s.tagline}
                    </p>
                    <div className="mt-2 flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-2xl text-ivory">
                        {s.name}
                      </h3>
                      <span className="whitespace-nowrap text-sm font-semibold text-rose">
                        {s.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SignatureTreatments
