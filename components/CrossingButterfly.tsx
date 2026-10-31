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
  /** Rollung um die Längsachse in Grad */
  roll: number
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
    dauer: rand(9, 17),
    nachLinks: Math.random() < 0.5,
    // Steigen/Sinken, nicht mehr Schräglage: Seit der Körper in
    // Flugrichtung zeigt, kippt diese Drehung die Nase hoch oder
    // runter statt den ganzen Falter zu verdrehen.
    neigung: rand(-12, 12),
    roll: rand(28, 46) * (Math.random() < 0.5 ? 1 : -1),
    flap: rand(1.9, 3.1),
    wob: rand(3.4, 5.6),
    jig: { variant: pick(['a', 'b', 'c'] as const), dur: rand(6.5, 11) },
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
        planen(rand(9000, 22000))
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
          height: Math.round(f.groesse * 0.82),
          animationDuration: `${f.dauer}s`,
          animationDirection: f.nachLinks ? 'reverse' : 'normal',
          // Dieselben Stellschrauben wie beim Hero-Schwarm. Ohne sie
          // greifen die Flügel-Keyframes auf ihre Vorgaben zurück und
          // alle Falter flattern im Gleichtakt.
          '--flap': `${f.flap.toFixed(2)}s`,
          '--wob': `${f.wob.toFixed(2)}s`,
          '--hop': `${Math.max(5, Math.round(f.groesse * 0.16))}px`,
          '--jig': `${Math.round(f.groesse * 0.2)}px`,
          '--bf-img': `url('/images/butterfly-${f.species}.webp')`,
        } as React.CSSProperties
      }
    >
      {/* Ausrichtung auf einer eigenen Ebene: Käme sie auf .bf-inner,
          würde sie dessen Wobble-Animation überschreiben.
          ±90° richten den Körper in die Flugrichtung aus — davor zeigte
          er immer nach oben, während er waagerecht zog. Er lief also
          seitwärts wie eine Krabbe, und genau das las sich als
          Aufkleber. Die Bilddatei ist eine Draufsicht, ihr Kopf zeigt
          im Bild nach oben; rotate(90deg) dreht im Uhrzeigersinn,
          schickt den Kopf also nach rechts. */}
      <div
        className="bf-quer-hoehe"
        style={{
          animationDuration: `${(f.dauer / 3).toFixed(1)}s`,
        }}
      >
        <div
          className="bf-quer-neigung"
          style={{ rotate: `${(f.nachLinks ? -90 : 90) + f.neigung}deg` }}
        >
          <div
            className="bf-jig"
            style={{
              animationName: `bf-jig-${f.jig.variant}`,
              animationDuration: `${f.jig.dur.toFixed(2)}s`,
            }}
          >
            <div className="bf-bob">
              <div
                className="bf-roll"
                style={{ '--roll': `${f.roll}deg` } as React.CSSProperties}
              >
                <div className="bf-inner">
                  <div className="bf-wing bf-wing-l" />
                  <div className="bf-wing bf-wing-r" />
                  <div className="bf-body" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CrossingButterfly
