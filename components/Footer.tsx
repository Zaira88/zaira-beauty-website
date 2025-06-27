'use client'

import React from 'react'
import { Instagram, Phone, Mail, MapPin } from 'lucide-react'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'

const Footer = () => {
  const navLinks = [
    { name: 'Über Zaira', href: '#about' },
    { name: 'Meine Behandlungen', href: '#services' },
    { name: 'Ergebnisse', href: '#gallery' },
    { name: 'Kontakt', href: '#contact' }
  ]

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/zaira.beautyface/' },
  ]

  return (
    <footer className="bg-black text-neutral-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top section with contact and opening hours */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
            {/* Contact Info */}
            <div>
                <h3 className="text-xl font-bold text-white mb-4">Kontakt</h3>
                <ul className="space-y-3">
                    <li className="flex items-center">
                        <MapPin className="w-5 h-5 mr-3 text-yellow-400" />
                        <span>Johannispl. 10, 82538 Geretsried</span>
                    </li>
                    <li className="flex items-center">
                        <Mail className="w-5 h-5 mr-3 text-yellow-400" />
                        <span>zaira.beauty.face@gmail.com</span>
                    </li>
                    <li className="flex items-center">
                        <Phone className="w-5 h-5 mr-3 text-yellow-400" />
                        <span>+49 1515 9414259</span>
                    </li>
                </ul>
            </div>

            {/* Opening Hours */}
            <div>
                <h3 className="text-xl font-bold text-white mb-4">Öffnungszeiten</h3>
                <ul className="space-y-2">
                    <li className="flex justify-between">
                        <span>Montag - Freitag</span>
                        <span>09:00 - 15:00 Uhr</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Samstag</span>
                        <span>09:00 - 18:00 Uhr</span>
                    </li>
                    <li className="flex justify-between text-neutral-500">
                        <span>Sonntag</span>
                        <span>Geschlossen</span>
                    </li>
                </ul>
            </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-neutral-400">&copy; {new Date().getFullYear()} Zaira Beauty. Deine Beauty-Expertin in Geretsried.</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <Link href="/impressum" className="text-sm hover:text-white transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="text-sm hover:text-white transition-colors">
              Datenschutz
            </Link>
            <a href="https://www.instagram.com/zairabeautyface/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Instagram size={24} />
            </a>
            <a href="https://wa.me/4915159414259" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Phone size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 