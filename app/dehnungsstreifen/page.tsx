import { Metadata } from 'next'
import { ogBase } from '@/lib/metadata'
import DehnungsstreifenContent from './content'

export const metadata: Metadata = {
  title: 'Dehnungsstreifen entfernen in Geretsried | Zaira Beauty',
  description: 'Dehnungsstreifen und Schwangerschaftsstreifen mit RF Microneedling, ab 199€. Bei mir in Geretsried, nah an Wolfratshausen. Schreib mir auf WhatsApp.',
  keywords: ['Dehnungsstreifen entfernen', 'Schwangerschaftsstreifen', 'RF Microneedling', 'RF Microneedling Geretsried', 'Hautstraffung', 'Kollagenproduktion', 'Kosmetikstudio Geretsried', 'Zaira Beauty', 'Geretsried'],
  openGraph: ogBase(
    'dehnungsstreifen',
    'Behandlung von Dehnungsstreifen in Geretsried | Zaira Beauty',
    'RF Microneedling bei Dehnungsstreifen und zur Hautstraffung. Mein Studio in Geretsried, Termin per WhatsApp.'
  ),
};

const DehnungsstreifenPage = () => {
    return <DehnungsstreifenContent />
}

export default DehnungsstreifenPage 