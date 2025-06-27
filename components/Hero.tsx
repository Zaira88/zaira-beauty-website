'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const Butterfly = () => {
  return (
    <motion.div
      className="absolute top-[-3.4rem] right-[-3.15rem] w-36 h-36 pointer-events-none
                 md:top-[-5.8rem] md:right-[-4.65rem] md:w-48 md:h-48
                 lg:top-[-6.8rem] lg:right-[-7.5rem] lg:w-60 lg:h-60"
      style={{ perspective: '1000px' } as React.CSSProperties}
    >
      {/* Linker Flügel */}
      <motion.div
        className="absolute top-0 right-[23.5%] w-[52%] h-full"
        style={{ transformOrigin: 'right center' } as React.CSSProperties}
        animate={{ rotateY: 25 }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      >
        <Image
          src="/images/2schmetterling.webp"
          alt="Linker Schmetterlingsflügel"
          fill
          style={{ objectFit: 'contain' }}
          className="drop-shadow-lg"
        />
      </motion.div>

      {/* Rechter Flügel */}
      <motion.div
        className="absolute top-0 left-[23.5%] w-[52%] h-full"
        style={{ transformOrigin: 'left center' } as React.CSSProperties}
        animate={{ rotateY: -25 }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
          delay: 0.1,
        }}
      >
        <Image
          src="/images/3schmetterling.webp"
          alt="Rechter Schmetterlingsflügel"
          fill
          style={{ objectFit: 'contain' }}
          className="drop-shadow-lg"
        />
      </motion.div>
      
      {/* Körper */}
      <div className="absolute z-10 top-1/2 left-1/2 w-1/4 h-3/4 -translate-x-1/2 -translate-y-1/2 scale-[2.25]">
        <Image
          src="/images/1schmetterling.webp"
          alt="Schmetterlingskörper"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
    </motion.div>
  )
}

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-end justify-center text-center overflow-hidden bg-[#050e11]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/zaira.png"
          alt="Portrait von Zaira"
          fill
          style={{
            objectFit: 'contain',
            opacity: 1,
            transform: 'scale(1.2)',
          }}
          className="object-top [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 pb-8 md:p-12 lg:pb-32">
        <motion.div
          // Relativer Container für H1 und Schmetterling
          className="relative inline-block"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 
            className="text-4xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight"
            style={{ textShadow: '0px 2px 15px rgba(0,0,0,0.5)' }}
          >
            ZAIRA <span className="text-primary-500">BEAUTY</span>
          </h1>
          <Butterfly />
        </motion.div>
        
        <motion.p 
          className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-neutral-200"
          style={{ textShadow: '0px 2px 10px rgba(0,0,0,0.7)' } as React.CSSProperties}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Für dein strahlendes Ich. Entdecke Behandlungen, die deine natürliche Schönheit unterstreichen und dein Selbstbewusstsein stärken.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10"
        >
          <a
            href="#contact"
            className="btn-primary inline-block text-lg font-semibold"
          >
            Termin anfragen
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero 