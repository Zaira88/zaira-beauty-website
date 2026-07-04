'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { pricingCategories, waHref } from '@/data/problems'

const Pricing = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="pricing" className="bg-ink-900 py-24 md:py-36">
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
                  className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-ivory/[0.03] md:p-7"
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

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-4 px-6 pb-8 md:px-7">
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
                    </motion.div>
                  )}
                </AnimatePresence>
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
