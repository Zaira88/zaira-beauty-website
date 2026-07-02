// Einmal-Helfer: findet die Google Place ID für Zaira Beauty.
// Nutzung:  GOOGLE_PLACES_API_KEY=dein-key node scripts/find-place-id.mjs
const key = process.env.GOOGLE_PLACES_API_KEY
if (!key) {
  console.error('Bitte GOOGLE_PLACES_API_KEY setzen.')
  process.exit(1)
}

const query = process.argv[2] ?? 'Zaira Beauty Face Johannisplatz 10 Geretsried'
const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': key,
    'X-Goog-FieldMask':
      'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount',
  },
  body: JSON.stringify({ textQuery: query, languageCode: 'de' }),
})

const data = await res.json()
if (!data.places?.length) {
  console.error('Nichts gefunden. Antwort:', JSON.stringify(data, null, 2))
  process.exit(1)
}
for (const p of data.places) {
  console.log('────────────────────────────')
  console.log('Name:    ', p.displayName?.text)
  console.log('Adresse: ', p.formattedAddress)
  console.log('Bewertung:', p.rating, '·', p.userRatingCount, 'Rezensionen')
  console.log('PLACE ID:', p.id, '  ← das in .env.local als GOOGLE_PLACE_ID')
}
