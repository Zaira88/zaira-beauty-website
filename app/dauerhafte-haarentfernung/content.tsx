'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const priceData = {
  Gesicht: [
    { name: "Oberlippe", price: "39€" },
    { name: "Kinn", price: "39€" },
    { name: "Wangen / Koteletten", price: "49€" },
    { name: "Gesicht komplett", price: "99€" },
  ],
  Oberkörper: [
    { name: "Nacken", price: "49€" },
    { name: "Hals", price: "49€" },
    { name: "beide Achseln", price: "49€" },
    { name: "Schultern", price: "49€" },
    { name: "Brust", price: "79€" },
    { name: "Bauchlinie", price: "59€" },
    { name: "Bauch", price: "79€" },
    { name: "Rücken", price: "109€" },
  ],
  Arme: [
    { name: "beide Oberarme", price: "89€" },
    { name: "beide Unterarme", price: "79€" },
    { name: "Arme komplett", price: "139€" },
    { name: "Hände inkl. Finger", price: "39€" },
  ],
  Intim_Beine: [
      { name: "Bikinizone", price: "69€" },
      { name: "Intimzone", price: "79€" },
      { name: "beide Oberschenkel", price: "99€" },
      { name: "beide Unterschenkel", price: "99€" },
      { name: "Beine komplett", price: "179€" },
      { name: "Füße", price: "39€" },
  ]
};

const HairRemovalContent = () => {
  return (
    <main className="bg-black text-white">
      <div className="container mx-auto px-4 py-20">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
            Dauerhafte <span className="text-pink-400">Haarentfernung</span>
          </h1>
          <p className="text-center text-gray-300 text-lg max-w-3xl mx-auto mb-16">
            Genießen Sie die Freiheit dauerhaft glatter Haut mit modernster Diodenlaser-Technologie.
          </p>
        </motion.div>

        {/* Intro Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="border border-gray-800 p-8 md:p-12 mb-16"
        >
          <p className="text-lg text-gray-200 leading-relaxed">
            Ich biete Ihnen die Freiheit glatter Haut durch meine Dienstleistungen in der dauerhaften Haarentfernung. Mit modernster Diodenlaser-Technologie entferne ich unerwünschte Haare effektiv und sicher. Schon nach der ersten Sitzung werden Sie sichtbare Ergebnisse bemerken. Meine Methoden sind sanft zur Haut und bieten eine langanhaltende Lösung für alle Körperbereiche. Verabschieden Sie sich von der täglichen Rasur und dem schmerzhaften Waxing!
          </p>
        </motion.div>

        {/* Price List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-16">
          {Object.entries(priceData).map(([category, items], index) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <h2 className="text-2xl font-bold text-pink-400 mb-6">{category.replace('_', ' & ')}</h2>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item.name} className="flex justify-between items-baseline border-b border-gray-800 pb-2">
                    <span className="text-gray-300">{item.name}</span>
                    <span className="font-semibold text-white">{item.price}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Full Body Package */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="border border-pink-500 bg-pink-500/10 p-8 md:p-12 mb-16 text-center"
        >
            <h2 className="text-3xl font-bold text-white mb-2">Ganzkörper-Paket</h2>
            <p className="text-5xl font-bold text-pink-400">279€</p>
        </motion.div>


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

export default HairRemovalContent 