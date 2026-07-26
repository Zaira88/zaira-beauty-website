import Hero from '@/components/Hero'
import ProblemFinder from '@/components/ProblemFinder'
import SignatureTreatments from '@/components/SignatureTreatments'
import About from '@/components/About'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import Booking from '@/components/Booking'
import { getGoogleReviews } from '@/lib/googleReviews'

export default async function Home() {
  // Live von Google (24h-Cache), fällt ohne Key auf kuratierte Werte zurück
  const google = await getGoogleReviews()

  return (
    <>
      <Hero rating={google.rating} count={google.count} />
      <ProblemFinder />
      <SignatureTreatments />
      <About reviewCount={google.count} />
      {/* Beweis vor Preis: die Bewertungen standen vorher erst nach der
          Preisliste — jetzt liest man sie, bevor es ums Geld geht. */}
      <Testimonials data={google} />
      <Pricing />
      <Booking />
    </>
  )
}
