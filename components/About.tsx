'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Award, Heart, Users, Clock } from 'lucide-react'

const About = () => {
  const stats = [
    { number: '91+', label: 'Top Bewertungen', icon: Users },
    { number: '10+', label: 'Zertifikate', icon: Award },
    { number: '100%', label: 'Zufriedenheit', icon: Heart },
    { number: '12+', label: 'Behandlungsarten', icon: Clock }
  ]

  return (
    <motion.section 
      id="about" 
      className="section-padding bg-black"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Deine Schönheit ist meine <span className="text-primary-400">Mission</span>
            </h2>
            <p className="text-lg text-neutral-300 mb-6 leading-relaxed">
              Als ehemalige Bekleidungstechnische Assistentin und Modedesignerin bringe ich Präzision und ein Auge für Ästhetik in jede Behandlung. Nach meiner eigenen Reise zur Selbstfindung habe ich meine wahre Berufung in der Kosmetik entdeckt - und das spüren meine Kundinnen jeden Tag.
            </p>
            <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
              Meine Leidenschaft ist es, deine natürliche Schönheit zum Strahlen zu bringen. Mit meiner Expertise und den besten Produkten helfe ich dir dabei, dich in deiner Haut wohlzufühlen.
            </p>

            {/* Features */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-900/50 flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">100% Qualität</h3>
                  <p className="text-neutral-400">Ich verwende nur die besten Produkte und Geräte.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-900/50 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Deine Zufriedenheit</h3>
                  <p className="text-neutral-400">hat für mich die höchste Priorität.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-900/50 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Individuelle Beratung</h3>
                  <p className="text-neutral-400">Hautanalyse, Behandlungsplanung und Produktempfehlungen.</p>
                </div>
              </div>
            </div>

            <button className="btn-primary">
              Lerne mich kennen
            </button>
          </div>

          {/* Image and Stats */}
          <div className="space-y-8">
            {/* Placeholder for image */}
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-primary-900/20 to-neutral-800 flex items-center justify-center">
                <span className="text-neutral-400 text-lg">Portrait von Zaira</span>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-600 flex items-center justify-center">
                <Award className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <div key={index} className="text-center p-6 card">
                    <div className="w-12 h-12 bg-primary-900/50 flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-primary-400" />
                    </div>
                    <div className="text-2xl font-bold text-primary-400 mb-2">{stat.number}</div>
                    <div className="text-sm text-neutral-400">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default About 