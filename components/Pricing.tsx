'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

interface PriceItem {
  name: string
  price: string
  duration?: string
}

interface PriceCategory {
  title: string
  items: PriceItem[]
}

const pricingData: PriceCategory[] = [
  {
    title: 'Gesichtsbehandlungen & Anti-Aging',
    items: [
      { name: 'Luxury Aquafacial', price: '119,00€' },
      { name: 'Luxury Collagenbehandlung', price: '89,00€' },
      { name: 'Luxury Lifting', price: '89,00€' },
      { name: 'Microneedling & Spezial-Peel', price: '129,00€' },
      { name: 'RF Microneedling Königsklasse', price: '199,00€' },
      { name: 'Lasertherapie Hautverjüngung', price: '109,00€' },
      { name: 'Mesotherapie', price: '169,00€' },
      { name: 'Vampirlifting', price: '199,00€' },
      { name: 'Carboxytherapie', price: '89,00€' },
      { name: 'Luxury Aquafacial & Carboxytherapie', price: '109,00€ + 89,00€' },
    ],
  },
  {
    title: 'Problemhaut & Hauterneuerung',
    items: [
      { name: 'FruchtsäurePeel / Anti Acne Peeling', price: '129,00€' },
      { name: 'Vampirlifting / Microneedling (Akne)', price: '199,00€' },
      { name: 'Pur Microneedling (Akne)', price: '79,00€' },
      { name: 'Clear Skin Treatment', price: '189,00€' },
      { name: 'Lasertherapie Pigmentflecken', price: '99,00€' },
      { name: 'Anti Pigment Peel & Microneedling', price: '129,00€' },
      { name: 'Das Schälkur 100% natural', price: '159,00€' },
      { name: 'Yellow Peel (Neue Haut in 10 Tagen)', price: '189,00€' },
    ],
  },
  {
    title: 'Lashes & Brows',
    items: [
      { name: 'Hydra Lash Lifting', price: '49,00€' },
      { name: 'Beauty Browlift (inkl. Färben)', price: '39,00€' },
      { name: 'Sweet Henna Brows', price: '39,00€' },
    ]
  },
  {
    title: 'Körper- & Spezialbehandlungen',
    items: [
      { name: 'Deluxe Rückenreinigung', price: '159,00€'},
      { name: 'Lasertherapie für den Rücken', price: '139,00€'},
      { name: 'Schälkur für den Rücken', price: '169,00€'},
      { name: 'RF Microneedling (Rücken)', price: '199,00€'},
      { name: 'Dehnungsstreifenbehandlung (Bauch)', price: '199,00€' },
      { name: 'Po Aknebehandlung', price: '159,00€'},
      { name: 'Aufhellung Intimbereiche', price: '159,00€'},
      { name: 'Hair Growth Treatment', price: '189,00€' },
      { name: 'Schröpfmassage Medical', price: '49,00€' },
      { name: 'Anti-Migräne Massage', price: '29,00€' },
      { name: 'Zahnbleaching', price: '79,00€' },
    ]
  },
  {
    title: 'Dauerhafte Haarentfernung (Laser/IPL)',
    items: [
        { name: "Nacken", price: "49€" },
        { name: "Hals", price: "49€" },
        { name: "Oberlippe", price: "39€" },
        { name: "Kinn", price: "39€" },
        { name: "Wangen / Koteletten", price: "49€" },
        { name: "Gesicht komplett", price: "99€" },
        { name: "beide Achseln", price: "49€" },
        { name: "beide Oberarme", price: "89€" },
        { name: "beide Unterarme", price: "79€" },
        { name: "Arme komplett", price: "139€" },
        { name: "Hände inkl. Finger", price: "39€" },
        { name: "Schultern", price: "49€" },
        { name: "Brust", price: "79€" },
        { name: "Bauchlinie", price: "59€" },
        { name: "Bauch", price: "79€" },
        { name: "Rücken", price: "109€" },
        { name: "Bikinizone", price: "69€" },
        { name: "Intimzone", price: "79€" },
        { name: "beide Oberschenkel", price: "99€" },
        { name: "beide Unterschenkel", price: "99€" },
        { name: 'Beine komplett', price: '179€' },
        { name: 'Füße', price: '39€' },
        { name: 'Ganzkörper', price: '279€' },
    ]
  },
]

const AccordionItem = ({
  category,
  isOpen,
  toggle,
}: {
  category: PriceCategory
  isOpen: boolean
  toggle: () => void
}) => (
  <div className="border-b border-gray-800">
    <button
      onClick={toggle}
      className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
    >
      <h3 className="text-2xl font-semibold text-white">{category.title}</h3>
      <span>{isOpen ? <FaChevronUp className="text-pink-500" /> : <FaChevronDown className="text-pink-500" />}</span>
    </button>
    {isOpen && (
      <div className="p-6">
        <ul className="space-y-4">
          {category.items.map((item, index) => (
            <li key={index} className="flex items-baseline">
              <span className="text-white w-full flex items-center justify-between gap-2">
                <span>{item.name}</span>
                <span className="flex-1 border-b border-gray-700 mx-2"></span>
                <span className="text-lg text-white whitespace-nowrap">{item.price}</span>
              </span>
              {item.duration && (
                <p className="text-sm text-gray-400 ml-2">{item.duration}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
)

const Pricing = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="pricing" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Preis<span className="text-pink-400">liste</span>
        </h2>
        <div className="max-w-3xl mx-auto border border-gray-800">
          {pricingData.map((category, index) => (
            <AccordionItem
              key={index}
              category={category}
              isOpen={openIndex === index}
              toggle={() => toggleItem(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing 