'use client'

import React, { useEffect, useRef, useState } from 'react'

/**
 * Ein einzelner Schmetterling, der auf dem CTA landet.
 *
 * Bewusst NICHT an die Scroll-Position gekoppelt: ein
 * IntersectionObserver löst den Anflug genau einmal aus und trennt sich
 * danach sofort. Danach läuft nur noch der Flügelschlag, und der ist
 * eine reine CSS-Keyframe-Animation auf `transform` — die liegt auf dem
 * Compositor und kostet den Scroll kein einziges Bild. Scroll-gekoppelte
 * Effekte (Parallax, Lenis & Co.) würden dagegen bei jedem Bild im
 * Haupt-Thread rechnen; genau diese Kostenklasse hat auf dieser Seite
 * schon zweimal das Flackern verursacht.
 *
 * Der Bogen entsteht aus zwei getrennten Ebenen: die X-Ebene bremst
 * früh aus, die Y-Ebene fällt spät. Eine einzelne Transition wäre eine
 * gerade Linie — das sähe nach Papierflieger aus, nicht nach Falter.
 *
 * Aufbau: X-Ebene → Y-Ebene → Drehung → .bf (Größe) → .bf-bob (Hüpfer
 * pro Flügelschlag) → .bf-inner (Roll-Wobble) → Flügelhälften + Körper.
 * Die inneren Ebenen sind dieselben wie beim Hero-Schwarm.
 */

const FLIGHT_MS = 2400
/** Kurz warten, damit der CTA erst seine eigene Einblendung zu Ende bringt. */
const FLIGHT_DELAY_MS = 350

type Phase = 'warten' | 'anflug' | 'sitzt'

const LandingButterfly = ({ children }: { children: React.ReactNode }) => {
  const hostRef = useRef<HTMLSpanElement>(null)
  const [phase, setPhase] = useState<Phase>('warten')

  useEffect(() => {
    const el = hostRef.current
    if (!el) return

    // Ohne Bewegungswunsch gar nicht erst anfliegen — der Falter sitzt
    // einfach da. (globals.css stellt zusätzlich alle .bf-Animationen ab.)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('sitzt')
      return
    }

    let sitzTimer = 0
    const io = new IntersectionObserver(
      ([eintrag]) => {
        if (!eintrag.isIntersecting) return
        io.disconnect() // genau einmal, danach horcht nichts mehr mit
        setPhase('anflug')
        sitzTimer = window.setTimeout(
          () => setPhase('sitzt'),
          FLIGHT_DELAY_MS + FLIGHT_MS
        )
      },
      // Der Beobachtete ist der Knopf selbst, nicht der nullgroße
      // Ankerpunkt — auf einem 0x0-Element ist die Schwelle nutzlos.
      { threshold: 0.5 }
    )
    io.observe(el)

    return () => {
      io.disconnect()
      clearTimeout(sitzTimer)
    }
  }, [])

  const unterwegs = phase === 'warten'
  const uebergang = (kurve: string) =>
    `transform ${FLIGHT_MS}ms ${kurve} ${FLIGHT_DELAY_MS}ms`

  return (
    <span ref={hostRef} className="relative inline-flex">
      {children}

      {/* Ankerpunkt an der oberen rechten Ecke des Knopfes. Nullgroß und
          ohne Zeiger-Ereignisse: der Falter darf den Tap auf den CTA
          niemals abfangen (dieser Fehler stand hier schon einmal live,
          damals über den Scroll-nach-oben-Knopf). */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-5 right-6 h-0 w-0"
      >
        {/* X-Ebene: kommt von rechts herein und bremst früh aus */}
        <span
          className="block"
          style={{
            transform: `translate3d(${unterwegs ? 104 : 0}px, 0, 0)`,
            transition: uebergang('cubic-bezier(0.17, 0.78, 0.32, 1)'),
          }}
        >
          {/* Y-Ebene: sinkt spät — dadurch bekommt der Weg seinen Bogen.
              Sie trägt zusätzlich die Sichtbarkeit: eingeblendet wird
              deutlich schneller als geflogen, sonst schwebt eine halb
              durchsichtige Ahnung durchs Bild. Nur Langschreibweise, nicht
              mit der transition-Kurzform mischen. */}
          <span
            className="block"
            style={{
              transform: `translate3d(0, ${unterwegs ? -88 : 0}px, 0)`,
              opacity: unterwegs ? 0 : 1,
              transitionProperty: 'transform, opacity',
              transitionDuration: `${FLIGHT_MS}ms, ${Math.round(FLIGHT_MS * 0.4)}ms`,
              transitionTimingFunction: 'cubic-bezier(0.55, 0.02, 0.3, 1), ease-out',
              transitionDelay: `${FLIGHT_DELAY_MS}ms, ${FLIGHT_DELAY_MS}ms`,
            }}
          >
            {/* Drehung: kippt im Anflug, richtet sich beim Aufsetzen auf */}
            <span
              className="block"
              style={{
                transform: `rotate(${unterwegs ? 26 : 0}deg)`,
                transition: uebergang('cubic-bezier(0.3, 0.6, 0.3, 1)'),
              }}
            >
              <span
                /* right-0 statt der Standard-Ausrichtung: der Falter
                   wächst nach LINKS aus dem Ankerpunkt heraus. Sonst
                   müsste der Anker seine eigene Breite kennen, und die
                   ist mobil und ab sm unterschiedlich. */
                className="bf right-0 h-[25px] w-[30px] sm:h-[30px] sm:w-[36px]"
                style={
                  {
                    // Sitzend hüpft der Körper fast nicht mehr — nur die
                    // Flügel gehen weiter auf und zu.
                    '--hop': phase === 'sitzt' ? '2px' : '6px',
                    '--flap': '2.9s',
                    '--wob': '4.6s',
                    // Kleine Variante genügt: der Falter ist 36px breit,
                    // und auf langsamen Verbindungen liegt genau diese
                    // Datei durch den Hero-Schwarm ohnehin schon im Cache.
                    '--bf-img': "url('/images/butterfly-blue-sm.webp')",
                  } as React.CSSProperties
                }
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
          </span>
        </span>
      </span>
    </span>
  )
}

export default LandingButterfly
