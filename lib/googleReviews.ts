// ============================================================
// Live Google-Bewertungen via Places API (New)
//
// – Server-only: wird ausschließlich aus Server Components
//   aufgerufen, der API-Key erreicht nie den Browser.
// – 24h-Cache über Next fetch-Revalidate → ~30 Calls/Monat,
//   Seite bleibt statisch schnell.
// – Fällt bei fehlendem Key / API-Fehler IMMER auf kuratierte
//   Werte zurück — die Website bricht nie.
//
// Setup (einmalig):
//   1. Google Cloud Console → Projekt → „Places API (New)“ aktivieren
//   2. API-Key erstellen (auf Places API beschränken!)
//   3. Place ID finden:  node scripts/find-place-id.mjs
//   4. .env.local:  GOOGLE_PLACES_API_KEY=...  GOOGLE_PLACE_ID=...
//      (gleiche Variablen beim Hoster/Vercel hinterlegen)
// ============================================================

export interface GoogleReview {
  author: string
  photo?: string
  rating: number
  text: string
  /** Meta-Zeile unter dem Namen: live = „vor 2 Wochen“, Fallback = Behandlung */
  when: string
}

export interface GoogleRatingData {
  rating: number
  count: number
  reviews: GoogleReview[]
  /** true = frisch von Google, false = kuratierter Fallback */
  live: boolean
}

/** Kuratierter Fallback — identisch mit dem bisherigen Stand der Website. */
export const FALLBACK_RATING: GoogleRatingData = {
  rating: 5.0,
  count: 104,
  live: false,
  reviews: [
    {
      author: 'Celine H.',
      rating: 5,
      when: 'Luxury Aquafacial',
      text: 'Zaira ist eine sehr professionelle und freundliche Kosmetikerin. Ich habe mich während der AquaFacial Behandlung sehr wohl gefühlt. Meine Haut hat sich danach super weich angefühlt und hatte einen tollen Glow. Ich komme definitiv wieder! 😊',
    },
    {
      author: 'Laura B.',
      rating: 5,
      when: 'Erste Behandlung',
      text: 'Ich war zum ersten Mal bei Zaira und habe mich super wohl gefühlt. Sie ist total lieb und macht ihre Arbeit großartig. Das Studio ist super schön eingerichtet. Ich komme auf jeden Fall wieder. Kann ich nur weiterempfehlen!',
    },
    {
      author: 'Anna K.',
      rating: 5,
      when: 'Wimpernlifting',
      text: 'War zur Wimpernlifting Behandlung bei Zaira und bin mehr als zufrieden. Sie arbeitet sehr professionell und sauber. Man fühlt sich bei ihr sehr gut aufgehoben. Das Ergebnis ist einfach nur top! Kann ich jedem nur empfehlen.',
    },
  ],
}

export async function getGoogleReviews(): Promise<GoogleRatingData> {
  const key = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID
  if (!key || !placeId) return FALLBACK_RATING

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?languageCode=de`,
      {
        headers: {
          'X-Goog-Api-Key': key,
          'X-Goog-FieldMask': 'rating,userRatingCount,reviews',
        },
        // 24h-Cache: aktualisiert sich täglich von selbst
        next: { revalidate: 86400 },
      }
    )
    if (!res.ok) return FALLBACK_RATING

    const data = await res.json()
    if (typeof data.rating !== 'number' || !data.userRatingCount) {
      return FALLBACK_RATING
    }

    const reviews: GoogleReview[] = (data.reviews ?? [])
      .filter((r: any) => (r.text?.text?.length ?? 0) > 40 && r.rating >= 4)
      .slice(0, 3)
      .map((r: any) => ({
        author: r.authorAttribution?.displayName ?? 'Google-Nutzerin',
        photo: r.authorAttribution?.photoUri,
        rating: r.rating,
        text: r.text.text,
        when: r.relativePublishTimeDescription ?? 'via Google',
      }))

    return {
      rating: data.rating,
      count: data.userRatingCount,
      // Ohne brauchbare Texte: Zahlen live, Texte kuratiert
      reviews: reviews.length > 0 ? reviews : FALLBACK_RATING.reviews,
      live: true,
    }
  } catch {
    return FALLBACK_RATING
  }
}

/** 4.8 → „4,8“ (deutsches Format) */
export const formatRating = (r: number) =>
  (Math.round(r * 10) / 10).toFixed(1).replace('.', ',')
