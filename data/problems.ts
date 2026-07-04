// ============================================================
// ZAIRA BEAUTY — Single Source of Truth
// Alle Anliegen (Probleme), Behandlungen & Preise leben HIER.
// Homepage-Finder, Preisliste und alle Detailseiten lesen aus
// dieser Datei — Preisänderungen nur noch an einer Stelle.
// ============================================================

export const CONTACT = {
  phone: '+4915159414259',
  phoneDisplay: '+49 1515 9414259',
  email: 'zaira.beauty.face@gmail.com',
  address: 'Johannispl. 10, 82538 Geretsried',
  instagram: 'https://www.instagram.com/zaira.beautyface/',
  googleReviews:
    'https://www.google.com/search?sa=X&sca_esv=70c4004f48b74267&hl=de-DE&tbm=lcl&sxsrf=AE3TifMxk4epomRzKJ5ztwNm5QQQSzeq1Q:1750586131897&q=Zaira+Beauty+Face+Rezensionen&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNLIwNDc3MDewNLI0sjAwMDQ3NNnAyPiKUTYqMbMoUcEpNbG0pFLBLTE5VSEotSo1rzgzPy81bxErfnkAuPoFj1sAAAA&rldimm=12817707092928001714&ved=2ahUKEwj0k6nE4YSOAxWH2gIHHc22CCoQ9fQKegQITBAF&biw=2560&bih=1271&dpr=1.5#lkt=LocalPoiReviews',
}

/** WhatsApp-Deeplink, optional mit vorbefülltem Text. */
export const waHref = (message?: string) =>
  `https://wa.me/4915159414259${
    message ? `?text=${encodeURIComponent(message)}` : ''
  }`

/** Vorbefüllte Termin-Anfrage für eine konkrete Behandlung. */
export const waTreatmentHref = (treatmentName: string) =>
  waHref(
    `Hallo Zaira! 👋 Ich interessiere mich für „${treatmentName}“. Wann hättest du einen Termin frei?`
  )

// ------------------------------------------------------------

export interface Treatment {
  name: string
  price: string
  priceNote?: string
  includes?: string
  benefits: string[]
  badge?: string
  duration?: string
}

export interface Zone {
  name: string
  price: string
}

export interface Problem {
  slug: string
  /** Kurzer Anliegen-Name (Breadcrumb, Chips) */
  problem: string
  /** Finder-Karte: Frage in Kundensprache */
  question: string
  /** Headline zweigeteilt für Akzent-Styling */
  titleA: string
  titleB: string
  subtitle: string
  searchTerms: string[]
  priceFrom: string
  treatments: Treatment[]
  zones?: { group: string; items: Zone[] }[]
  info?: { title?: string; text: string }
}

export const problems: Problem[] = [
  {
    slug: 'akne-behandlung',
    problem: 'Akne & Aknenarben',
    question: 'Unreine Haut, Akne oder Narben?',
    titleA: 'Akne &',
    titleB: 'Aknenarben',
    subtitle:
      'Reine Haut ist kein Zufall. Diese Behandlungen klären dein Hautbild und mildern Narben sichtbar. Sanft, professionell, wirksam.',
    searchTerms: [
      'akne', 'pickel', 'unreine haut', 'narben', 'aknenarben', 'mitesser',
      'entzündungen', 'fruchtsäure', 'peeling', 'microneedling',
    ],
    priceFrom: '79€',
    treatments: [
      {
        name: 'FruchtsäurePeel / Anti Acne Peeling',
        price: '129,00€',
        priceNote: 'Aufpreis Jelly Mask 10,00€',
        includes: 'inkl. Voreinigung + FruchsäurePeel & Microneedling + Tuchmaske',
        benefits: [
          'Hilft bei Pigmentflecken & Akne',
          'Fördert die Hauterneuerung',
          'Für verschiedene Hauttypen geeignet',
        ],
      },
      {
        name: 'Vampirlifting / Microneedling',
        price: '199,00€',
        includes: 'inkl. Voreinigung + Microneedling + Vampirlifting & Jelly Mask',
        benefits: [
          'Glättet und minimiert Fältchen',
          'Verleiht einen strahlenden Glow',
          'Körpereigenes Plasma, 100% natürlich',
        ],
      },
      {
        name: 'Pur Microneedling',
        price: '79,00€',
        priceNote: 'Aufpreis Jelly Mask 10,00€',
        includes: 'inkl. Microneedling + Tuchmaske',
        benefits: [
          'Reduziert Narben und Akne',
          'Glättet Falten & verbessert das Hautbild',
          'Erhöht die Hautelastizität',
        ],
      },
      {
        name: 'Luxury Aquafacial & Carboxytherapie',
        price: '109,00€ + 89,00€',
        priceNote: 'Aufpreis Jelly Mask 10,00€',
        includes: 'inkl. Aquafacial Gesichtsreinigung + Tuchmaske',
        benefits: [
          'Minimiert Falten und feine Linien',
          'Wirkt gegen verstopfte Poren & Akne',
          'Verbessert Rosazea & Hyperpigmentierung',
        ],
      },
      {
        name: 'Das Schälkur 100% natural',
        price: '159,00€',
        priceNote: 'Aufpreis Jelly Mask 10,00€',
        includes: 'Natürliches Glow Peel, inkl. Reinigung + Tuchmaske',
        benefits: [
          '100% natürliche Inhaltsstoffe',
          'Intensive Hauterneuerung (Schälkur)',
          'Sorgt für einen frischen Glow',
        ],
      },
      {
        name: 'Clear Skin Treatment',
        price: '189,00€',
        priceNote: 'Aufpreis Jelly Maske 10,00€',
        includes: 'Vergleichbar mit CO2-Laser, aber viel schonender. Inkl. Glow Peel, Nano- & Microneedling',
        benefits: [
          'Schonende Alternative zum CO2 Laser',
          'Klärt das Hautbild tiefenwirksam',
          'Kombiniert Glow Peel & Microneedling',
        ],
        badge: 'Beliebt',
      },
      {
        name: 'RF Microneedling Königsklasse',
        price: '199,00€',
        priceNote: 'Aufpreis Peeling 89,00€ und Jelly Maske 10,00€',
        includes: 'inkl. Vorreinigung, Glow Peel, RF Microneedling & Maske',
        benefits: [
          'Königsklasse der Hautverjüngung',
          'Wirkt effektiv gegen tiefe Narben',
          'Glättet die Hautstruktur nachhaltig',
        ],
      },
    ],
    info: {
      title: 'Gezielte Aknenarbenbehandlung',
      text: 'Wir verstehen, wie Aknenarben das Selbstbewusstsein beeinflussen können. Unsere gezielte Aknenarbenbehandlung wirkt effektiv gegen Narben und verbessert das Hautbild. Wir verwenden spezielle Techniken und Wirkstoffe, um die Hautstruktur zu glätten und das Erscheinungsbild von Aknenarben zu minimieren.',
    },
  },
  {
    slug: 'pigmentflecken',
    problem: 'Pigmentflecken',
    question: 'Pigmentflecken oder dunkle Stellen?',
    titleA: 'Pigment',
    titleB: 'flecken',
    subtitle:
      'Erlebe, wie deine Haut strahlend schön wird, frei von störenden Flecken und Verfärbungen.',
    searchTerms: [
      'pigmentflecken', 'dunkle flecken', 'hyperpigmentierung', 'melasma',
      'sonnenflecken', 'verfärbung', 'altersflecken', 'hautton',
    ],
    priceFrom: '99€',
    treatments: [
      {
        name: 'Lasertherapie Pigmentflecken',
        price: '99,00€',
        priceNote: 'Aufpreis + 10,00€ Jelly Mask',
        includes: 'inkl. Voreinigung, Glow Peel, IPL Laserbehandlung & Tuchmaske',
        benefits: [
          'Minimiert unerwünschte Hautverfärbungen',
          'Nutzt moderne IPL-Lasertechnologie',
          'Sorgt für einen harmonischen Hautton',
        ],
      },
      {
        name: 'Anti Pigment Peel & Microneedling',
        price: '129,00€',
        priceNote: 'Aufpreis +10,00€ Jelly Mask oder Goldmaske',
        includes: 'inkl. Voreinigung, Microneedling, Glow Peel, Anti Pigment Peel, Tuchmaske & Lifting',
        benefits: [
          'Kombiniert Peeling & Microneedling',
          'Sichtbare Verbesserung der Pigmentierung',
          'Inklusive straffendem Lifting-Effekt',
        ],
      },
    ],
    info: {
      text: 'Mit der Pigmentfleckenbehandlung werden unerwünschte Hautverfärbungen und dunkle Bereiche minimiert, um einen harmonischen Hautton zu schaffen. Ich passe die Behandlung präzise an die individuellen Bedürfnisse Ihrer Haut an und erreichen damit eine sichtbare Verbesserung der Pigmentierung.',
    },
  },
  {
    slug: 'anti-aging',
    problem: 'Anti-Aging',
    question: 'Falten oder erste Zeichen der Zeit?',
    titleA: 'Anti-',
    titleB: 'Aging',
    subtitle:
      'Zeit lässt sich nicht anhalten, aber ihre Spuren lassen sich mildern. Straffere, jüngere Haut ohne Skalpell.',
    searchTerms: [
      'falten', 'anti-aging', 'anti aging', 'straffung', 'lifting',
      'hautverjüngung', 'mesotherapie', 'rf microneedling', 'hals', 'kollagen',
    ],
    priceFrom: '109€',
    treatments: [
      {
        name: 'Luxury Anti Aging',
        price: '129,00€',
        priceNote: 'Aufpreis 10,00€ Jelly Mask',
        includes: 'inkl. Aquafacial, Glow Peel, Ultraschalltherapie, RF Lifting & Tuchmaske',
        benefits: [
          'Tiefenreinigung und Peeling',
          'Reduziert Hyperpigmentierung',
          'Strafft die Haut & fördert Wirkstoffaufnahme',
        ],
      },
      {
        name: 'Microneedling & Spezial-Peel',
        price: '129,00€',
        priceNote: 'Aufpreis 10,00€ Jelly Mask',
        includes: 'inkl. Microneedling, BioRePeel/PRX/MediCare Peel, Glow Peel & Jellymaske',
        benefits: [
          'Effektive Hauterneuerung & Verjüngung',
          'Reduziert Falten und Pigmentflecken',
          'Revitalisiert die Haut nachhaltig',
        ],
      },
      {
        name: 'RF Microneedling Königsklasse',
        price: '199,00€',
        priceNote: 'Aufpreis 79,00€ Anti Aging Peeling. Weitere Areale ab 20,00€ dazubuchbar, je nach Größe des Areals.',
        includes: 'inkl. RF Microneedling für Gesicht & Hals, Glow Peel & Jellymaske',
        benefits: [
          'Behandelt gezielt Gesicht und Hals',
          'Reduziert Falten durch fraktionierte Radiofrequenz',
          'Strafft und regeneriert die Haut intensiv',
        ],
        badge: 'Königsklasse',
      },
      {
        name: 'Lasertherapie Hautverjüngung',
        price: '109,00€',
        includes: 'Gezielte Laserbehandlung zur Stimulation der Kollagenproduktion',
        benefits: [
          'Reduziert feine Linien und Falten',
          'Verbessert die Hautstruktur & glättet den Teint',
          'Keine Ausfallzeit nach der Behandlung',
        ],
      },
      {
        name: 'Mesotherapie',
        price: '169,00€',
        includes: 'inkl. Ausreinigung, Glow Peel, RF-Lifting, Ultraschall & MesoBooster Vitamine',
        benefits: [
          'Tiefenwirksame Regeneration',
          'Versorgt die Haut mit hochkonzentrierten Vitaminen',
          'Sorgt für einen frischen, strahlenden Teint',
        ],
      },
    ],
  },
  {
    slug: 'gesichtsbehandlung',
    problem: 'Gesichtsbehandlungen',
    question: 'Du wünschst dir frischen Glow?',
    titleA: 'Gesichts',
    titleB: 'behandlungen',
    subtitle:
      'Rundum-Pakete für ein strahlendes und jugendliches Hautbild, vom Luxury Aquafacial bis zur Schälkur.',
    searchTerms: [
      'glow', 'gesichtsbehandlung', 'aquafacial', 'hydrafacial', 'tiefenreinigung',
      'fahle haut', 'trockene haut', 'collagen', 'kollagen', 'gesichtsreinigung', 'müde haut',
    ],
    priceFrom: '89€',
    treatments: [
      {
        name: 'Luxury Collagenbehandlung',
        price: '89,00€',
        priceNote: 'Aufpreis 10,00€ Jelly Maske',
        includes: 'inkl. Voreinigung, Hyaluron, Collagenbehandlung, Lifting & Tuchmaske',
        benefits: [
          'Füllt die Kollagenspeicher auf',
          'Sorgt für pralle, jugendliche Haut',
          'Intensive Feuchtigkeitsversorgung',
        ],
      },
      {
        name: 'Luxury Lifting',
        price: '89,00€',
        priceNote: 'Aufpreis 10,00€ Jelly Maske',
        includes: 'inkl. Voreinigung, Hyaluron, RF-Lifting, Ultraschall & Tuchmaske',
        benefits: [
          'Sofortiger Straffungseffekt',
          'Stimuliert die Kollagenproduktion',
          'Verbessert die Hautfestigkeit',
        ],
      },
      {
        name: 'Das Schälkur 100% natural',
        price: '159,00€',
        priceNote: 'Aufpreis 10,00€ Jelly Maske',
        includes: 'inkl. Reinigung, Glow Peel & Tuchmaske',
        benefits: [
          'Intensive Hauterneuerung auf Naturbasis',
          'Reduziert Unreinheiten und Pigmentflecken',
          'Sorgt für einen reinen, frischen Teint',
        ],
      },
      {
        name: 'Luxury Aquafacial',
        price: '119,00€',
        priceNote: '+19€ Ultra Lifting & Jelly Mask / +89€ Glow Ampulle, Carboxy & Jelly Mask',
        includes: 'inkl. Aquafacial Gesichtsreinigung, Hyaluron & Tuchmaske',
        benefits: [
          'Tiefenreinigung und sanftes Peeling',
          'Versorgt die Haut mit wertvollen Wirkstoffen',
          'Für ein klares, strahlendes Hautbild',
        ],
        badge: 'Signature',
      },
      {
        name: 'Yellow Peel',
        price: '189,00€',
        priceNote: 'Neue Haut in 10 Tagen',
        includes: 'inkl. Glow Peel & Jelly Mask',
        benefits: [
          'Starke und effektive Hauterneuerung',
          'Wirkt gegen starke Pigmentierung & Narben',
          'Sichtbar verbessertes Hautbild',
        ],
      },
    ],
    info: {
      text: 'Entspannen und verwöhnen Sie sich mit unseren Luxury Gesichtsbehandlungen. Von der Hydrofacial-Behandlung, die Ihre Haut tiefenreinigt und mit wertvollen Wirkstoffen versorgt, bis hin zur Microneedling-Behandlung, die Kollagen und Elastin stimuliert und das Bindegewebe stärkt – unsere Gesichtsbehandlungen bieten Ihnen ein Rundum-Paket für ein strahlendes und jugendliches Hautbild.',
    },
  },
  {
    slug: 'dauerhafte-haarentfernung',
    problem: 'Dauerhafte Haarentfernung',
    question: 'Genug von Rasieren & Waxing?',
    titleA: 'Dauerhafte',
    titleB: 'Haarentfernung',
    subtitle:
      'Genieße die Freiheit dauerhaft glatter Haut mit modernster Diodenlaser-Technologie, für alle Körperbereiche.',
    searchTerms: [
      'haare', 'haarentfernung', 'laser', 'ipl', 'diodenlaser', 'rasieren',
      'waxing', 'achseln', 'beine', 'intimzone', 'oberlippe', 'glatte haut',
    ],
    priceFrom: '39€',
    treatments: [],
    zones: [
      {
        group: 'Gesicht',
        items: [
          { name: 'Oberlippe', price: '39€' },
          { name: 'Kinn', price: '39€' },
          { name: 'Wangen / Koteletten', price: '49€' },
          { name: 'Gesicht komplett', price: '99€' },
        ],
      },
      {
        group: 'Oberkörper',
        items: [
          { name: 'Nacken', price: '49€' },
          { name: 'Hals', price: '49€' },
          { name: 'beide Achseln', price: '49€' },
          { name: 'Schultern', price: '49€' },
          { name: 'Brust', price: '79€' },
          { name: 'Bauchlinie', price: '59€' },
          { name: 'Bauch', price: '79€' },
          { name: 'Rücken', price: '109€' },
        ],
      },
      {
        group: 'Arme',
        items: [
          { name: 'beide Oberarme', price: '89€' },
          { name: 'beide Unterarme', price: '79€' },
          { name: 'Arme komplett', price: '139€' },
          { name: 'Hände inkl. Finger', price: '39€' },
        ],
      },
      {
        group: 'Intim & Beine',
        items: [
          { name: 'Bikinizone', price: '69€' },
          { name: 'Intimzone', price: '79€' },
          { name: 'beide Oberschenkel', price: '99€' },
          { name: 'beide Unterschenkel', price: '99€' },
          { name: 'Beine komplett', price: '179€' },
          { name: 'Füße', price: '39€' },
        ],
      },
    ],
    info: {
      text: 'Ich biete Ihnen die Freiheit glatter Haut durch meine Dienstleistungen in der dauerhaften Haarentfernung. Mit modernster Diodenlaser-Technologie entferne ich unerwünschte Haare effektiv und sicher. Schon nach der ersten Sitzung werden Sie sichtbare Ergebnisse bemerken. Meine Methoden sind sanft zur Haut und bieten eine langanhaltende Lösung für alle Körperbereiche. Verabschieden Sie sich von der täglichen Rasur und dem schmerzhaften Waxing!',
    },
  },
  {
    slug: 'haarausfall-behandlung',
    problem: 'Haarausfall',
    question: 'Haarausfall oder dünnes Haar?',
    titleA: 'Gegen',
    titleB: 'Haarausfall',
    subtitle: 'Deine effektive Lösung für kräftiges und volles Haar.',
    searchTerms: [
      'haarausfall', 'dünnes haar', 'geheimratsecken', 'haarwachstum',
      'kopfhaut', 'haare stärken', 'hair growth',
    ],
    priceFrom: '169€',
    treatments: [
      {
        name: 'Hair Growth Treatment',
        price: '169,00€',
        includes: 'Microneedling mit Stammzellen + Hair Growth Laser',
        benefits: [
          'Microneedling mit Stammzellen: aktiviert die Haarfollikel und regt das Haarwachstum an',
          'Hair Growth Laser: fördert die Durchblutung und stärkt die Follikel',
          'Sichtbare Ergebnisse ab der 5. Sitzung – auch bei Geheimratsecken und dünnem Haar',
        ],
      },
    ],
  },
  {
    slug: 'dehnungsstreifen',
    problem: 'Dehnungsstreifen',
    question: 'Dehnungsstreifen oder schwaches Bindegewebe?',
    titleA: 'Dehnungs',
    titleB: 'streifen',
    subtitle:
      'Sichtbare Reduzierung von Dehnungsstreifen, für glattere und festere Haut, in der du dich wieder wohlfühlst.',
    searchTerms: [
      'dehnungsstreifen', 'schwangerschaftsstreifen', 'cellulite',
      'bindegewebe', 'bauch', 'streifen', 'hautelastizität',
    ],
    priceFrom: '199€',
    treatments: [
      {
        name: 'Dehnungsstreifenbehandlung',
        price: '199,00€',
        priceNote: 'Bauch. Weitere Areale: Aufpreis 19,00€ · Jelly Maske: Aufpreis 10,00€',
        includes: 'inkl. RF Microneedling + beruhigende Maske',
        benefits: [
          'Sichtbare Reduzierung von Dehnungsstreifen',
          'Verbesserung der Hautelastizität und -festigkeit',
          'Stimulierung der körpereigenen Kollagenproduktion',
        ],
      },
    ],
  },
  {
    slug: 'rueckenreinigung',
    problem: 'Rückenreinigung',
    question: 'Unreine Haut am Rücken?',
    titleA: 'Rücken',
    titleB: 'reinigung',
    subtitle:
      'Tiefenwirksame Behandlungen gegen Unreinheiten, Akne und Narben am Rücken, für ein glattes und reines Hautbild.',
    searchTerms: [
      'rücken', 'rückenakne', 'bacne', 'unreiner rücken', 'pickel am rücken',
      'körperpeeling', 'rückenreinigung',
    ],
    priceFrom: '139€',
    treatments: [
      {
        name: 'Deluxe Rückenreinigung',
        price: '159,00€',
        includes: 'Wahlweise mit Aquafacial & Algenmaske, Microneedling & Peeling oder nur Microneedling',
        benefits: [
          'Tiefenwirksame Reinigung des Rückens',
          'Reduziert Unreinheiten und Akne',
          'Klärt und verbessert das Hautbild',
        ],
        badge: 'Beliebt',
      },
      {
        name: 'Lasertherapie für den Rücken',
        price: '139,00€',
        includes: 'Moderne Laserbehandlung zur gezielten Verbesserung der Haut am Rücken',
        benefits: [
          'Behandelt Aknenarben und Pigmentflecken',
          'Fördert ein ebenmäßiges Hautbild',
          'Sanft und effektiv',
        ],
      },
      {
        name: 'Schälkur für den Rücken',
        price: '169,00€',
        includes: 'Intensive Erneuerung der Haut am Rücken für ein glattes und reines Ergebnis',
        benefits: [
          'Entfernt abgestorbene Hautschüppchen',
          'Regt die Zellerneuerung an',
          'Sorgt für eine weiche, glatte Haut',
        ],
      },
      {
        name: 'RF Microneedling Königsklasse',
        price: '199,00€',
        includes: 'inkl. Vorreinigung, RF Microneedling & Jellymaske',
        benefits: [
          'Intensive Straffung und Regeneration',
          'Behandelt effektiv Narben und Unregelmäßigkeiten',
          'Die Premium-Lösung für den Rücken',
        ],
      },
    ],
  },
  {
    slug: 'clear-intimpeel',
    problem: 'Clear IntimPeel',
    question: 'Dunkle Stellen im Intimbereich?',
    titleA: 'Clear',
    titleB: 'IntimPeel',
    subtitle:
      'Diskrete, sichere Behandlungen für einen gleichmäßigen Hautton, in geschützter, vertrauensvoller Atmosphäre.',
    searchTerms: [
      'intimbereich', 'aufhellung', 'po', 'dunkle stellen', 'intimpeel',
      'po akne', 'hyperpigmentierung intim', 'diskret',
    ],
    priceFrom: '159€',
    treatments: [
      {
        name: 'Po Aknebehandlung',
        price: '159,00€',
        priceNote: 'Aufpreis Jelly Maske 10,00€',
        includes: 'Gezielte Behandlung zur Klärung der Haut und Reduzierung von Unreinheiten und Akne im Po-Bereich für ein glattes und ebenmäßiges Hautbild',
        benefits: [
          'Reduziert Akne und Entzündungen',
          'Klärt und beruhigt die Haut',
          'Verbessert das Hautbild sichtbar',
        ],
      },
      {
        name: 'Aufhellung Intimbereiche',
        price: '159,00€',
        priceNote: 'Aufpreis Jelly Maske 10,00€',
        includes: 'Sanftes und effektives Peeling zur Aufhellung von hyperpigmentierten Stellen im Intimbereich, für einen gleichmäßigen und schönen Hautton',
        benefits: [
          'Hellt Hyperpigmentierung auf',
          'Für einen ebenmäßigen Hautton',
          'Sichere und diskrete Behandlung',
        ],
      },
    ],
  },
  {
    slug: 'lashlifting-browlifting',
    problem: 'Lashes & Brows',
    question: 'Wimpern ohne Schwung, Brauen ohne Form?',
    titleA: 'Lashlifting &',
    titleB: 'Browlifting',
    subtitle:
      'Wache Augen ohne Wimperntusche, volle Brauen ohne Nachziehen. Ergebnisse, die Wochen halten.',
    searchTerms: [
      'wimpern', 'lashlifting', 'lash lifting', 'browlifting', 'augenbrauen',
      'henna brows', 'brauen', 'färben', 'wimpernlifting',
    ],
    priceFrom: '39€',
    treatments: [
      {
        name: 'Hydra Lash Lifting',
        price: '49,00€',
        priceNote: 'Aufpreis Färben 10,00€',
        includes: 'Keine Lust mehr auf Wimpernzange und -tusche? Nach dem Lash Lifting kannst du dir das für 5-8 Wochen sparen',
        benefits: [
          'Verleiht den Wimpern perfekten Schwung',
          'Sorgt für einen natürlichen, wachen Augenaufschlag',
          'Hält 5-8 Wochen',
        ],
        badge: 'Beliebt',
      },
      {
        name: 'Beauty Browlift',
        price: '39,00€',
        priceNote: 'inkl. Färben',
        includes: 'Hast du lückenhafte, dünne oder störrische Augenbrauen? Das Brow Lifting ist DIE Lösung!',
        benefits: [
          'Macht Brauen voller und gleichmäßiger',
          'Gleicht Asymmetrien aus',
          'Hält 4-6 Wochen',
        ],
      },
      {
        name: 'Sweet Henna Brows',
        price: '39,00€',
        includes: 'Eine natürliche Alternative zum klassischen Färben für definierte und langanhaltende Augenbrauen',
        benefits: [
          'Färbt Haut und Härchen',
          'Natürliche Inhaltsstoffe',
          'Sorgt für einen Tattoo-Effekt',
        ],
      },
    ],
  },
  {
    slug: 'zahnbleaching',
    problem: 'Zahnbleaching',
    question: 'Verfärbte Zähne?',
    titleA: 'Zahn',
    titleB: 'bleaching',
    subtitle: 'Entdecke den Weg zu deinem strahlendsten Lächeln.',
    searchTerms: [
      'zähne', 'zahnbleaching', 'bleaching', 'weiße zähne',
      'verfärbte zähne', 'lächeln', 'kaffee', 'zahnaufhellung',
    ],
    priceFrom: '79€',
    treatments: [
      {
        name: 'Zahnbleaching',
        price: '79,00€',
        duration: 'ca. 45-60 min',
        includes: 'Professionelle, schonende Zahnaufhellung im Studio',
        benefits: [
          'Sichtbar hellere Zähne in einer Sitzung',
          'Schonend für Zähne und Zahnfleisch',
          'Sofort strahlendes Lächeln',
        ],
      },
    ],
    info: {
      text: 'Ein blendend weißes Lächeln steht für Jugend, Anziehungskraft und Eleganz. Allerdings können Lebensgewohnheiten wie der Konsum von Kaffee oder Tabak, sowie genetische Faktoren, die Zahnfarbe im Laufe der Zeit beeinflussen. Solche Verfärbungen können das Selbstwertgefühl negativ beeinflussen. Ich nehme Ihre Sorgen ernst und möchte Ihnen das Vergnügen am Lächeln wieder schenken.',
    },
  },
  {
    slug: 'schroepftherapie',
    problem: 'Schröpftherapie',
    question: 'Verspannungen oder Migräne?',
    titleA: 'Schröpf',
    titleB: 'therapie',
    subtitle:
      'Gezielte Behandlungen zur Linderung von Schmerzen und zur Förderung der Durchblutung.',
    searchTerms: [
      'verspannungen', 'migräne', 'kopfschmerzen', 'massage', 'schröpfen',
      'nacken', 'rückenschmerzen', 'entspannung',
    ],
    priceFrom: '29€',
    treatments: [
      {
        name: 'Schröpfmassage Medical',
        price: '49,00€',
        includes: 'Eine intensive Therapie zur Lockerung von Verspannungen und zur Linderung von Schmerzen',
        benefits: [
          'Fördert die Durchblutung des Gewebes',
          'Regt den Lymphfluss an',
          'Effektiv gegen hartnäckige Verspannungen',
        ],
      },
      {
        name: 'Anti-Migräne Massage',
        price: '29,00€',
        includes: 'Eine spezielle Massagetechnik zur Linderung von Kopfschmerzen und Migräne-Symptomen',
        benefits: [
          'Löst Verspannungen im Nacken- & Kopfbereich',
          'Kann die Häufigkeit von Migräneanfällen reduzieren',
          'Fördert tiefe Entspannung',
        ],
      },
    ],
  },
]

export const getProblem = (slug: string): Problem => {
  const p = problems.find((p) => p.slug === slug)
  if (!p) throw new Error(`Unbekanntes Anliegen: ${slug}`)
  return p
}

/** Anzahl Lösungen einer Problem-Seite (Zonen-Seiten zählen Zonen). */
export const solutionCount = (p: Problem): number =>
  p.treatments.length ||
  (p.zones?.reduce((sum, g) => sum + g.items.length, 0) ?? 0)

// ------------------------------------------------------------
// Preisliste (Homepage) — gleiche Preise, katalogisierte Sicht.
// WICHTIG: Preise müssen mit den Behandlungen oben übereinstimmen.
// ------------------------------------------------------------

export interface PriceCategory {
  title: string
  items: { name: string; price: string }[]
}

export const pricingCategories: PriceCategory[] = [
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
    ],
  },
  {
    title: 'Körper- & Spezialbehandlungen',
    items: [
      { name: 'Deluxe Rückenreinigung', price: '159,00€' },
      { name: 'Lasertherapie für den Rücken', price: '139,00€' },
      { name: 'Schälkur für den Rücken', price: '169,00€' },
      { name: 'RF Microneedling (Rücken)', price: '199,00€' },
      { name: 'Dehnungsstreifenbehandlung (Bauch)', price: '199,00€' },
      { name: 'Po Aknebehandlung', price: '159,00€' },
      { name: 'Aufhellung Intimbereiche', price: '159,00€' },
      { name: 'Hair Growth Treatment', price: '169,00€' },
      { name: 'Schröpfmassage Medical', price: '49,00€' },
      { name: 'Anti-Migräne Massage', price: '29,00€' },
      { name: 'Zahnbleaching', price: '79,00€' },
    ],
  },
  {
    title: 'Dauerhafte Haarentfernung (Laser/IPL)',
    items: getProblem('dauerhafte-haarentfernung').zones!.flatMap((g) => g.items),
  },
]
