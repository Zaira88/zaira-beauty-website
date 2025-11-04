'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, User } from 'lucide-react'
import Link from 'next/link'
import { FaStar, FaGoogle } from 'react-icons/fa'

const testimonials = [
  {
    name: "Celine H.",
    rating: 5,
    text: "Zaira ist eine sehr professionelle und freundliche Kosmetikerin. Ich habe mich während der AquaFacial Behandlung sehr wohl gefühlt. Meine Haut hat sich danach super weich angefühlt und hatte einen tollen Glow. Ich komme definitiv wieder! 😊",
  },
  {
    name: "Laura B.",
    rating: 5,
    text: "Ich war zum ersten Mal bei Zaira und habe mich super wohl gefühlt. Sie ist total lieb und macht ihre Arbeit großartig. Das Studio ist super schön eingerichtet. Ich komme auf jeden Fall wieder. Kann ich nur weiterempfehlen!",
  },
  {
    name: "Anna K.",
    rating: 5,
    text: "War zur Wimpernlifting Behandlung bei Zaira und bin mehr als zufrieden. Sie arbeitet sehr professionell und sauber. Man fühlt sich bei ihr sehr gut aufgehoben. Das Ergebnis ist einfach nur top! Kann ich jedem nur empfehlen.",
  },
]

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white">Echte <span className="text-pink-400">Erfahrungen</span></h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mt-4">
            Höre von Frauen, die ihre Beauty-Reise bereits mit mir begonnen haben.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="border border-gray-800 p-8">
              <div className="text-pink-500 mb-4">
                {'★★★★★'.slice(0, testimonial.rating)}
              </div>
              <p className="text-gray-300 mb-4">{`"${testimonial.text}"`}</p>
              <p className="font-semibold">{testimonial.name}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="https://www.google.com/search?sa=X&sca_esv=70c4004f48b74267&hl=de-DE&tbm=lcl&sxsrf=AE3TifMxk4epomRzKJ5ztwNm5QQQSzeq1Q:1750586131897&q=Zaira+Beauty+Face+Rezensionen&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNLIwNDc3MDewNLI0sjAwMDQ3NNnAyPiKUTYqMbMoUcEpNbG0pFLBLTE5VSEotSo1rzgzPy81bxErfnkAuPoFj1sAAAA&rldimm=12817707092928001714&ved=2ahUKEwj0k6nE4YSOAxWH2gIHHc22CCoQ9fQKegQITBAF&biw=2560&bih=1271&dpr=1.5#lkt=LocalPoiReviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white text-black font-bold py-3 px-6 hover:bg-gray-200 transition-colors"
          >
            <FaGoogle className="mr-3" />
            <span>Alle 91 Bewertungen lesen</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Testimonials 