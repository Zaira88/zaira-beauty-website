import { Metadata } from 'next'
import { ogBase } from '@/lib/metadata'
import HairRemovalContent from './content'

export const metadata: Metadata = {
  title: 'Dauerhafte Laser-Haarentfernung Geretsried | Zaira Beauty',
  description: 'Du hast genug von Rasieren und Waxing? Dauerhafte Haarentfernung mit Diodenlaser in Geretsried, gleich bei Wolfratshausen. Zonen ab 39€.',
  keywords: ['Laser Haarentfernung', 'Dauerhafte Haarentfernung', 'Diodenlaser', 'Laserhaarentfernung', 'Laser-Haarentfernung', 'Haarentfernung Geretsried', 'IPL', 'glatte Haut', 'Haare entfernen', 'Kosmetikstudio Geretsried', 'Zaira Beauty'],
  openGraph: ogBase(
    'dauerhafte-haarentfernung',
    'Dauerhafte Laser-Haarentfernung in Geretsried | Zaira Beauty',
    'Dauerhafte Haarentfernung mit Diodenlaser in Geretsried, Zonen ab 39€. Termin einfach per WhatsApp.'
  ),
};

const HairRemovalPage = () => {
    return <HairRemovalContent />
}

export default HairRemovalPage 