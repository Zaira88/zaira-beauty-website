'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const servicesData = [
  {
    category: 'Grundlagen der Schönheit',
    items: [
      { name: 'Gesichtsbehandlungen (Luxury Aquafacial)', href: '/gesichtsbehandlung' },
      { name: 'Lashlifting & Browlifting', href: '/lashlifting-browlifting' },
      { name: 'Zahnbleaching', href: '/zahnbleaching' },
    ],
  },
  {
    category: 'Professionelle Lösungen',
    items: [
      { name: 'Anti-Aging-Behandlungen', href: '/anti-aging' },
      { name: 'Akne- & Aknenarben-Therapie', href: '/akne-behandlung' },
      { name: 'Behandlung von Pigmentflecken', href: '/pigmentflecken' },
      { name: 'Dauerhafte Haarentfernung (Diodenlaser)', href: '/dauerhafte-haarentfernung' },
      { name: 'Gegen Haarausfall Hair Growth Treatment', href: '/haarausfall-behandlung' },
      { name: 'Schröpftherapie', href: '/schroepftherapie' },
    ],
  },
  {
    category: 'Ganzheitliche Pflege',
    items: [
      { name: 'Clear IntimPeel (Aufhellung)', href: '/clear-intimpeel' },
      { name: 'Behandlung von Dehnungsstreifen & Cellulite', href: '/dehnungsstreifen' },
      { name: 'Rückenreinigung & Körperpeelings', href: '/rueckenreinigung' },
    ],
  },
]

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-32 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Deine Beauty-Transformation
          </h2>
          <p className="mt-4 text-lg text-neutral-300 max-w-3xl mx-auto">
            Von klassischen Gesichtsbehandlungen bis hin zu medizinischen Kosmetik-Lösungen - hier findest du alles, was deine natürliche Schönheit zum Strahlen bringt.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              className="card bg-neutral-900/50 p-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-pink-400 mb-6">{service.category}</h3>
              <ul className="space-y-4">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-pink-500 mt-1 mr-3 flex-shrink-0" />
                    {item.href ? (
                      <Link href={item.href} className="text-neutral-300 hover:text-pink-400 transition-colors duration-300 group flex items-center">
                        {item.name}
                        <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ) : (
                      <span className="text-neutral-300">{item.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  )
}

export default Services 