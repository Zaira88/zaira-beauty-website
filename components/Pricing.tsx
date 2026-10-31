'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { pricingCategories, waHref } from '@/data/problems'

const Pricing = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="pricing" className="section-edge bg-surface-alt py-24 md:py-36">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center"
        >
          <p className="overline-label mb-5">Transparent & fair</p>
          <h2 className="font-display text-4xl text-ivory sm:text-5xl">
            <span className="text-3d">Preis</span>
            <span className="text-3d-rose text-rose">liste</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="hairline divide-y divide-ivory/10"
        >
          {pricingCategories.map((category, index) => {
            const isOpen = openIndex === index
            return (
              <div key={category.title}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex min-h-[68px] w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-ivory/[0.03] active:bg-ivory/[0.06] md:p-7"
                  aria-expanded={isOpen}
                >
                  <h3 className="font-display text-xl text-ivory md:text-2xl">
                    {category.title}
                  </h3>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ivory/15 text-ivory-dim transition-transform duration-300 ${
                      isOpen ? 'rotate-45 border-rose/50 text-rose' : ''
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>

                {/* Die Posten stehen IMMER im Markup, auch zugeklappt. Vorher
                    rendere ein AnimatePresence nur die offene Kategorie, also
                    kamen von 32 Preisen nur die 10 der ersten ins ausgelieferte
                    HTML — „Schröpfmassage Medical 49€" und der ganze Rest waren
                    für einen Crawler nicht vorhanden. Aufgeklappt wird jetzt
                    rein optisch über grid-template-rows 0fr→1fr.
                    Die Werte stehen bewusst als inline style und nicht als
                    Tailwind-Arbitrary-Utility (grid-rows-[0fr]): solche
                    Utilities sind in diesem Setup schon still weggefallen. */}
                <div
                  className="grid"
                  style={{
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition:
                      'grid-template-rows 350ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  <div className="overflow-hidden">
                    <ul
                      className="space-y-4 px-6 pb-8 md:px-7"
                      style={{
                        opacity: isOpen ? 1 : 0,
                        transition: 'opacity 250ms ease',
                      }}
                      aria-hidden={!isOpen}
                    >
                      {category.items.map((item) => (
                        <li key={item.name} className="flex items-baseline">
                          <span className="text-ivory-dim">{item.name}</span>
                          <span className="dot-leader" />
                          <span className="whitespace-nowrap font-medium text-ivory">
                            {item.price}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-ivory-mute">
            Unsicher, was zu dir passt? Ich berate dich kostenlos.
          </p>
          <a
            href={waHref('Hallo Zaira! 👋 Ich hätte gerne eine Beratung, welche Behandlung zu mir passt.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost mt-5"
          >
            <FaWhatsapp className="h-4 w-4" />
            Kostenlose Beratung
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing
