'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check } from 'lucide-react'

const HairGrowthContent = () => {
  return (
    <main className="bg-black text-white">
      <div className="container mx-auto px-4 py-20 flex flex-col items-center">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Gegen Haar<span className="text-pink-400">ausfall</span>
          </h1>
          <p className="text-center text-gray-300 text-lg max-w-3xl mx-auto mb-16">
            Deine effektive Lösung für kräftiges und volles Haar.
          </p>
        </motion.div>

        {/* Treatment Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="border border-gray-800 p-8 md:p-12 flex flex-col max-w-2xl w-full mb-16"
        >
          <h2 className="text-4xl font-bold mb-2 text-pink-400">Hair Growth Treatment</h2>
          
          <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-pink-400 mt-1 mr-4 flex-shrink-0" />
                <div>
                    <h3 className="font-semibold text-white">Microneedling mit Stammzellen</h3>
                    <p className="text-gray-400">Aktiviert die Haarfollikel und regt das Haarwachstum an.</p>
                </div>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-pink-400 mt-1 mr-4 flex-shrink-0" />
                 <div>
                    <h3 className="font-semibold text-white">Hair Growth Laser</h3>
                    <p className="text-gray-400">Fördert die Durchblutung und stärkt die Follikel.</p>
                </div>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-pink-400 mt-1 mr-4 flex-shrink-0" />
                <span className="text-gray-300">Sichtbare Ergebnisse ab der 5. Sitzung – auch bei Geheimratsecken und dünnem Haar.</span>
              </li>
          </ul>

          <div className="mt-auto text-center">
            <p className="text-5xl font-bold mb-4">169,00€</p>
          </div>
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

export default HairGrowthContent 