'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Ein Falter, der beim Scrollen gelegentlich quer durchs Bild zieht.
 *
 * Zwei Dinge unterscheiden ihn vom Hero-Schwarm (`Butterflies.tsx`):
 *
 * 1. Er fliegt HINTER den Kärtchen. Dafür muss er der erste Kindknoten
 *    seines Abschnitts sein: Geschwister malen in DOM-Reihenfolge, der
 *    Inhalt danach liegt also darüber. Die Kärtchen sind `bg-ink-800/80`
 *    plus `backdrop-blur`, wirken dort also wie mattes Glas und nehmen
 *    seine Farbe an, während er vorbeizieht.
 *
 * 2. Er fliegt nur, wenn man ihn sehen kann. Ein IntersectionObserver
 *    startet und stoppt ihn — läuft der Abschnitt aus dem Bild, laufen
 *    keine Animationen weiter und es wird nichts nachgelegt.
 *
 * Die Flügel-, Hüpf- und Zickzack-Ebenen kommen unverändert aus
 * `globals.css`, damit er genauso flattert wie der Schwarm oben.
 */

const rand = (min: number, max: number) => min + Math.random() * (max - min)
const pick = <T,>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)]

interface Flug {
  id: string
  species: 'blue' | 'pink'
  groesse: number
  hoehe: number
  dauer: number
  nachLinks: boolean
  neigung: number
  flap: number
  wob: number
  jig: { variant: 'a' | 'b' | 'c'; dur: number }
}

const machFlug = (): Flug => {
  const groesse = rand(48, 92)
  return {
    id: globalThis.crypto?.randomUUID?.() ?? `q-${Date.now()}-${Math.random()}`,
    species: Math.random() < 0.5 ? 'pink' : 'blue',
    groesse: Math.round(groesse),
    // Nicht ganz oben und nicht ganz unten: dort schneidet der
    // Abschnittsrand ihn an und es sieht nach Fehler aus.
    hoehe: rand(12, 78),
    // Langsam. Ein Falter, der in zwei Sekunden durchs Bild schießt,
    // liest sich als Pfeil, nicht als Tier.
    //
    // Am 31.10.2026 von 9–17 s auf 17–28 s gestreckt. Nachgemessen war
    // er mit 126 px/s im Median die mit Abstand schnellste Bewegung der
    // Seite — ACHTMAL so schnell wie der Hero-Schwarm mit 16 px/s. Die
    // Strecke ist mit 132 vw eben fast zwei Bildschirmbreiten, das
    // täuscht beim Festlegen der Dauer. Jetzt rund 70–115 px/s.
    dauer: rand(17, 28),
    nachLinks: Math.random() < 0.5,
    // Steigen und Sinken, nicht Schräglage: Die Seitenansicht liegt
    // waagerecht, diese Drehung kippt nur die Nase hoch oder runter.
    neigung: rand(-11, 11),
    flap: rand(2.2, 3.4),
    wob: rand(3.4, 5.6),
    jig: { variant: pick(['a', 'b', 'c'] as const), dur: rand(9, 15) },
  }
}

const CrossingButterfly = () => {
  const wurzel = useRef<HTMLDivElement>(null)
  const [sichtbar, setSichtbar] = useState(false)
  const [fluege, setFluege] = useState<Flug[]>([])

  const entferne = useCallback((id: string) => {
    setFluege((v) => v.filter((f) => f.id !== id))
  }, [])

  // Nur animieren, wenn der Abschnitt im Bild ist.
  useEffect(() => {
    const el = wurzel.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const beobachter = new IntersectionObserver(
      ([eintrag]) => setSichtbar(eintrag.isIntersecting),
      { rootMargin: '0px' }
    )
    beobachter.observe(el)
    return () => beobachter.disconnect()
  }, [])

  // Zufällige Abstände. Nie zwei gleichzeitig — einer reicht, zwei
  // lesen sich als Effekt statt als Zufall.
  useEffect(() => {
    if (!sichtbar) return
    let timer: number

    const planen = (verzoegerung: number) => {
      timer = window.setTimeout(() => {
        setFluege((v) => (v.length ? v : [machFlug()]))
        // Abstand mitgewachsen, seit ein Flug 17–28 s dauert: Mit den
        // alten 9–22 s wäre beim Nachlegen fast immer noch einer
        // unterwegs, der Versuch liefe ins Leere und es wäre dauernd
        // einer im Bild statt gelegentlich.
        planen(rand(16000, 34000))
      }, verzoegerung)
    }
    planen(rand(1200, 4000))
    return () => clearTimeout(timer)
  }, [sichtbar])

  return (
    <div
      ref={wurzel}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {sichtbar &&
        fluege.map((f) => (
          <Querflug key={f.id} f={f} onDone={entferne} />
        ))}
    </div>
  )
}

const Querflug = ({ f, onDone }: { f: Flug; onDone: (id: string) => void }) => {
  useEffect(() => {
    const t = window.setTimeout(() => onDone(f.id), f.dauer * 1000 + 400)
    return () => clearTimeout(t)
  }, [f, onDone])

  return (
    <div
      className="bf-quer"
      style={
        {
          top: `${f.hoehe}%`,
          width: f.groesse,
          // Quadratisch: Die Seitenansicht ist höher als breit,
        // weil der Flügel aufgestellt steht.
        height: f.groesse,
          animationDuration: `${f.dauer}s`,
          animationDirection: f.nachLinks ? 'reverse' : 'normal',
          // Dieselben Stellschrauben wie beim Hero-Schwarm. Ohne sie
          // greifen die Keyframes auf ihre Vorgaben zurück und alle
          // Falter flattern im Gleichtakt. --flap steuert hier den
          // Flügelschwenk der Seitenansicht (bf-seite-nah/-fern).
          '--flap': `${f.flap.toFixed(2)}s`,
          '--wob': `${f.wob.toFixed(2)}s`,
          '--hop': `${Math.max(4, Math.round(f.groesse * 0.1))}px`,
          '--jig': `${Math.round(f.groesse * 0.12)}px`,
          '--bf-img': `url('/images/butterfly-${f.species}.webp')`,
        } as React.CSSProperties
      }
    >
      {/* Die Seitenansicht steht von sich aus waagerecht, der Kopf zeigt
          nach rechts. Für den Flug nach links wird sie gespiegelt — die
          Neigung (Steigen/Sinken) muss dann mitkippen, sonst zeigt die
          Nase bergab statt bergauf. Spiegelung deshalb AUSSEN um die
          Drehung herum. */}
      <div
        className="bf-quer-hoehe"
        style={{
          animationDuration: `${(f.dauer / 3).toFixed(1)}s`,
        }}
      >
        <div
          className="bf-quer-neigung"
          style={{
            transform: `${f.nachLinks ? 'scaleX(-1) ' : ''}rotate(${f.neigung.toFixed(1)}deg)`,
          }}
        >
          <div
            className="bf-jig"
            style={{
              animationName: `bf-jig-${f.jig.variant}`,
              animationDuration: `${f.jig.dur.toFixed(2)}s`,
            }}
          >
            <div className="bf-bob">
              <div className="bf-seite">
                <div className="bf-seite-fern" />
                <div className="bf-seite-fluegel" />
                <div className="bf-seite-koerper" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CrossingButterfly
