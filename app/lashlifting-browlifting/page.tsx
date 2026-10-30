import { Metadata } from 'next'
import { ogBase } from '@/lib/metadata'
import LashBrowContent from './content';

export const metadata: Metadata = {
  title: 'Wimpernlifting & Browlifting in Geretsried | Zaira Beauty',
  description: 'Lashlifting, Browlifting und Henna Brows in Geretsried, nah an Wolfratshausen. Beauty Browlift ab 39€, schreib mir einfach per WhatsApp.',
  keywords: ['Lashlifting', 'Wimpernlifting', 'Browlifting', 'Augenbrauenlifting', 'Wimpern färben', 'Henna Brows', 'wache Augen', 'Zaira Beauty', 'Geretsried'],
  openGraph: ogBase(
    'lashlifting-browlifting',
    'Lashlifting & Browlifting in Geretsried | Zaira Beauty',
    'Wimpern mit Schwung, Brauen mit Form. Lashlifting, Browlifting und Henna Brows bei Zaira Beauty in Geretsried, ab 39€.'
  ),
};

export default function LashBrowPage() {
    return <LashBrowContent />;
} 