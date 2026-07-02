'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { waHref } from '@/data/problems'

const navLinks = [
  { name: 'Anliegen', href: '/#finder' },
  { name: 'Preise', href: '/#pricing' },
  { name: 'Über mich', href: '/#about' },
  { name: 'Bewertungen', href: '/#testimonials' },
]

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)

    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          isScrolled || isOpen
            ? 'border-b border-ivory/5 bg-ink/85 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="relative h-14 w-40 shrink-0 md:h-16 md:w-48"
            onClick={() => setIsOpen(false)}
            aria-label="Zaira Beauty — Startseite"
          >
            <Image
              src="/images/logo.webp"
              alt="Zaira Beauty Logo"
              fill
              className="object-contain object-left"
              sizes="192px"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wide text-ivory-dim transition-colors hover:text-ivory"
              >
                {link.name}
              </Link>
            ))}
            <a
              href={waHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-small"
            >
              <FaWhatsapp className="h-4 w-4" />
              Termin anfragen
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 text-ivory md:hidden"
            aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-ink/97 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-9">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-display text-4xl text-ivory-dim transition-colors hover:text-ivory"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                href={waHref()}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + navLinks.length * 0.07 }}
                className="btn-primary mt-6"
                onClick={() => setIsOpen(false)}
              >
                <FaWhatsapp className="h-5 w-5" />
                Termin anfragen
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
