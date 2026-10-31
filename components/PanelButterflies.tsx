import React from 'react'

/**
 * Zwei Schmetterlinge, die im Anliegen-Abschnitt HINTER den Kärtchen
 * fliegen — einer oben, einer unten.
 *
 * Zweck ist das Glas: Die Kärtchen tragen `backdrop-filter` (siehe
 * `.panel` in globals.css) und nehmen deshalb die Farbe dessen an, was
 * hinter ihnen vorbeizieht. Ohne etwas dahinter ist der Filter
 * wirkungslos, weil der Abschnittsgrund gleichmäßig dunkel ist.
 *
 * SIE MÜSSEN DAS ERSTE KIND IHRES ABSCHNITTS BLEIBEN. Geschwister
 * malen in DOM-Reihenfolge; nur so liegen sie unter den Kärtchen.
 *
 * Unabhängig vom Scrollen (Zaurs Wunsch): Die Bahn läuft über die
 * Zeit, nicht über `animation-timeline`. Eine Zwischenfassung hing am
 * Scroll-Fortschritt — das passte zum Rest der Seite, ist aber nicht,
 * was hier gewollt ist: Die beiden sollen leben, auch wenn man
 * stillsteht und liest.
 *
 * Trotzdem OHNE JavaScript. Kein Zustand, kein Timer, kein
 * Beobachter — zwei Elemente mit den Flugpfaden des Hero-Schwarms
 * (`bf-path-a` / `bf-path-c`), unterschiedlich lang und verschoben,
 * sodass sie nie im Gleichtakt laufen. Dieselbe Draufsicht wie Hero
 * und Begleiter.
 *
 * Rosa für den unteren: Er zieht durch das dichteste Kärtchen-Feld,
 * und Rosa setzt sich gegen das Petrol-Schwarz sichtbar ab. Der obere
 * ist blau wie die Falter im Heldenbild, damit die beiden nicht wie
 * Zwillinge wirken.
 *
 * Deutlich verschieden groß (Zaurs Wunsch), und zwar als TIEFE, nicht
 * als Zufall: Der obere ist klein, leicht unscharf und blasser, der
 * untere gut doppelt so groß und scharf. Dazu schlägt der kleine
 * schneller — so wie ein kleiner Falter es tut. Dasselbe Prinzip wie
 * im Hero-Schwarm, wo `far = size < 56` über Unschärfe und Deckkraft
 * entscheidet. Nur Größe allein läse sich als Unstimmigkeit.
 *
 * WICHTIG für die Größen: Die Glas-Tönung fällt QUADRATISCH mit der
 * Faltergröße. Das Kärtchen streut seinen Hintergrund um 26 px; ein
 * 35-px-Falter verteilt sich dadurch auf rund 90 px und verliert etwa
 * 85 % seiner Spitzenfarbe — am Bild geprüft war von ihm hinter dem
 * Kärtchen schlicht nichts mehr zu sehen. Unter etwa 50 px trägt ein
 * Falter zum Glas also nichts mehr bei.
 *
 * Deshalb liegt der Größenunterschied bei 56 zu 92 px und nicht bei
 * 35 zu 76: derselbe Eindruck von Nähe und Ferne, aber beide tönen.
 *
 * Die Höhen sind GEMESSEN, nicht geschätzt: Das Kärtchen-Raster läuft
 * von 34 % bis 94 % der Abschnittshöhe. Ein erster Entwurf setzte den
 * oberen auf 17 % — der schwebte über dem Raster und kam nie hinter
 * ein Kärtchen, der Glas-Effekt wäre nie aufgetreten. 44 % und 76 %
 * liegen im Raster und sind rund 620 px auseinander, also etwas enger
 * als ein Fenster hoch ist: Beim Durchscrollen ist fast immer einer
 * von beiden zu sehen.
 */

interface Falter {
  links: string
  oben: string
  masse: string
  pfad: 'a' | 'c'
  dauer: string
  /** negativ: startet mitten im Pfad, sonst beginnen beide am selben Punkt */
  phase: string
  zickzack: 'a' | 'b'
  zickzackDauer: string
  zickzackPhase: string
  flap: string
  wob: string
  hop: string
  jig: string
  art: 'pink' | 'blue'
  /** Tiefe: der ferne Falter ist leicht unscharf und blasser */
  unschaerfe?: string
  deckkraft?: number
}

const FALTER: Falter[] = [
  {
    // Der ferne: klein, leicht unscharf, blasser — und er schlaegt
    // schneller, so wie ein kleiner Falter es tut.
    links: '31%',
    oben: '44%',
    masse: 'h-[38px] w-[46px] sm:h-[46px] sm:w-[56px]',
    pfad: 'a',
    dauer: '52s',
    phase: '-13s',
    zickzack: 'a',
    zickzackDauer: '11.5s',
    zickzackPhase: '-4s',
    flap: '2.2s',
    wob: '4.4s',
    hop: '5px',
    jig: '6px',
    art: 'blue',
    unschaerfe: '0.6px',
    deckkraft: 0.88,
  },
  {
    // Der nahe: gut doppelt so gross, scharf, langsamerer Schlag.
    links: '62%',
    oben: '76%',
    masse: 'h-[62px] w-[75px] sm:h-[76px] sm:w-[92px]',
    pfad: 'c',
    dauer: '67s',
    phase: '-38s',
    zickzack: 'b',
    zickzackDauer: '13.5s',
    zickzackPhase: '-9s',
    flap: '3.2s',
    wob: '5.2s',
    hop: '9px',
    jig: '11px',
    art: 'pink',
  },
]

const PanelButterflies = () => (
  <div aria-hidden className="bf-glas">
    {FALTER.map((f) => (
      <span
        key={f.links + f.oben}
        className={`bf ${f.masse}`}
        style={
          {
            left: f.links,
            top: f.oben,
            opacity: f.deckkraft,
            filter: f.unschaerfe ? `blur(${f.unschaerfe})` : undefined,
            animationName: `bf-path-${f.pfad}`,
            animationDuration: f.dauer,
            animationDelay: f.phase,
            '--flap': f.flap,
            '--wob': f.wob,
            '--hop': f.hop,
            '--jig': f.jig,
            '--bf-img': `url('/images/butterfly-${f.art}-sm.webp')`,
          } as React.CSSProperties
        }
      >
        <span
          className="bf-jig block h-full w-full"
          style={{
            animationName: `bf-jig-${f.zickzack}`,
            animationDuration: f.zickzackDauer,
            animationDelay: f.zickzackPhase,
          }}
        >
          <span className="bf-bob block h-full w-full">
            <span className="bf-inner block">
              <span className="bf-wing bf-wing-l" />
              <span className="bf-wing bf-wing-r" />
              <span className="bf-body" />
            </span>
          </span>
        </span>
      </span>
    ))}
  </div>
)

export default PanelButterflies
