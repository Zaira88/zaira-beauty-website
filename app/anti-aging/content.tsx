'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check } from 'lucide-react'

const treatments = [
  {
    title: "Luxury Anti Aging",
    price: "119,00€",
    addOn: "Aufpreis 10,00€ Jelly Mask",
    description: "(inkl. Aquafacial, Glow Peel, Ultraschall, Lifting & Tuchmaske).",
    benefits: [
      "Tiefenreinigung und Peeling",
      "Reduziert Hyperpigmentierung",
      "Strafft die Haut & fördert Wirkstoffaufnahme"
    ]
  },
  {
    title: "Microneedling & Spezial-Peel",
    price: "129,00€",
    addOn: "Aufpreis 10,00€ Jelly Mask",
    description: "(inkl. Microneedling, BioRePeel/PRX/MediCare Peel, Glow Peel & Jellymaske).",
    benefits: [
        "Effektive Hauterneuerung & Verjüngung",
        "Reduziert Falten und Pigmentflecken",
        "Revitalisiert die Haut nachhaltig"
    ]
  },
  {
    title: "RF Microneedling Königsklasse",
    price: "199,00€",
    addOn: "Aufpreis 79,00€ Anti Aging Peeling",
    description: "(inkl. RF Microneedling für Gesicht & Hals, Glow Peel & Jellymaske).",
    benefits: [
        "Behandelt gezielt Gesicht und Hals",
        "Reduziert Falten durch fraktionierte Radiofrequenz",
        "Strafft und regeneriert die Haut intensiv"
    ]
  },
  {
    title: "Lasertherapie Hautverjüngung",
    price: "109,00€",
    description: "Gezielte Laserbehandlung zur Stimulation der Kollagenproduktion.",
    benefits: [
        "Reduziert feine Linien und Falten",
        "Verbessert die Hautstruktur & glättet den Teint",
        "Keine Ausfallzeit nach der Behandlung"
    ]
  },
  {
    title: "Mesotherapie",
    price: "169,00€",
    description: "(inkl. Ausreinigung, Glow Peel, RF-Lifting, Ultraschall & MesoBooster Vitamine).",
    benefits: [
        "Tiefenwirksame Regeneration",
        "Versorgt die Haut mit hochkonzentrierten Vitaminen",
        "Sorgt für einen frischen, strahlenden Teint"
    ]
  }
]

const AntiAgingContent = () => {
  return (
    <main className="bg-black text-white">
      <div className="container mx-auto px-4 py-20">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-16">
            Anti-<span className="text-pink-400">Aging</span>
          </h1>
        </motion.div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {treatments.map((treatment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-gray-800 p-8 flex flex-col"
            >
              <h2 className="text-2xl font-bold mb-3 text-pink-400">{treatment.title}</h2>
              <p className="text-gray-400 text-sm mb-4">{treatment.description}</p>
              
              <ul className="space-y-2 mb-6 flex-grow">
                {treatment.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-4 h-4 text-pink-400 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <p className="text-4xl font-bold mb-2">{treatment.price}</p>
                {treatment.addOn && <p className="text-sm text-gray-400">{treatment.addOn}</p>}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back to Home Link */}
        <div className="text-center">
            <Link href="/#services" className="text-pink-400 hover:text-pink-500 transition-colors duration-300 text-lg">
              &larr; Zurück zu allen Services
            </Link>
        </div>

      </div>
    </main>
  )
}

export default AntiAgingContent 