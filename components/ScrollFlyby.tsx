'use client'

import React, { useEffect, useState } from 'react'

/**
 * Einmaliger Überflug beim Verlassen des Heros.
 *
 * Sobald der Anliegen-Finder ins Bild kommt — also genau dann, wenn der
 * Hero oben herausscrollt — löst sich ein Falter, zieht schräg durchs
 * Bild und verschwindet unten. Danach wird er aus dem DOM entfernt und
 * kommt nicht wieder.
 *
 * Bewusst NICHT an die Scroll-Position gekoppelt: ein
 * IntersectionObserver löst einmal aus, danach laufen nur CSS-Keyframes
 * auf `transform` und `opacity` — Compositor, nicht Haupt-Thread. Ein
 * scroll-gekoppelter Falter müsste bei jedem Bild neu positioniert
 * werden, und genau diese Kostenklasse hat auf dieser Seite schon
 * zweimal das Flackern verursacht.
 *
 * Der Falter ist `fixed`, bleibt also während des Flugs im Bild und
 * fliegt beim Weiterscrollen mit nach unten. Das Element darf deshalb
 * keinen transformierten Vorfahren haben (sonst bezieht sich `fixed`
 * darauf) — es hängt direkt in page.tsx.
 */

/** Muss zur Summe der Keyframe-Dauern passen (siehe globals.css). */
const FLUG_MS = 7600

/** Der Abschnitt direkt unter dem Hero. Kommt er ins Bild, ist der Hero durch. */
const AUSLOESER = '#finder'

type Zustand = 'wartet' | 'fliegt' | 'vorbei'

const ScrollFlyby = () => {
  const [zustand, setZustand] = useState<Zustand>('wartet')

  useEffect(() => {
    // Kein Bewegungswunsch: der Überflug ist reine Zierde, er entfällt
    // ersatzlos. (Anders als beim Falter auf dem CTA gibt es hier
    // nichts, was stehen bleiben müsste.)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setZustand('vorbei')
      return
    }

    const ziel = document.querySelector(AUSLOESER)
    if (!ziel) return

    let endeTimer = 0
    const io = new IntersectionObserver(
      ([eintrag]) => {
        if (!eintrag.isIntersecting) return
        io.disconnect() // genau einmal, danach horcht nichts mehr mit
        setZustand('fliegt')
        // Aufräumen statt endlos mitlaufen lassen: ein unsichtbarer
        // Falter mit will-change würde sonst dauerhaft eine eigene
        // Compositor-Ebene belegen.
        endeTimer = window.setTimeout(() => setZustand('vorbei'), FLUG_MS + 200)
      },
      { threshold: 0.15 }
    )
    io.observe(ziel)

    return () => {
      io.disconnect()
      clearTimeout(endeTimer)
    }
  }, [])

  if (zustand !== 'fliegt') return null

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-[58vw] top-0 z-[6]"
      style={{
        animation: `bf-flyby-fade ${FLUG_MS}ms ease-in-out forwards`,
      }}
    >
      {/* X-Ebene: läuft gleichmäßig aus */}
      <div
        style={{
          animation: `bf-flyby-x ${FLUG_MS}ms cubic-bezier(0.35, 0.05, 0.5, 1) forwards`,
        }}
      >
        {/* Y-Ebene: beschleunigt nach unten — daher die Kurve */}
        <div
          style={{
            animation: `bf-flyby-y ${FLUG_MS}ms cubic-bezier(0.4, 0.08, 0.6, 0.94) forwards`,
          }}
        >
          {/* Leichte Neigung: er sinkt, also hängt er nach links */}
          <div style={{ transform: 'rotate(-13deg)' }}>
            <span
              className="bf h-[30px] w-[36px] sm:h-[36px] sm:w-[44px]"
              style={
                {
                  '--hop': '7px',
                  '--flap': '2.4s',
                  '--wob': '4.1s',
                  // Rosa: er kommt sichtbar aus dem Hero, und der größte
                  // Falter dort ist ebenfalls rosa.
                  '--bf-img': "url('/images/butterfly-pink-sm.webp')",
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScrollFlyby
