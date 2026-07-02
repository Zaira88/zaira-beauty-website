'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Lebendiger Schmetterlings-Schwarm für den Hero.
 *
 * Lebenszyklus pro Schmetterling:
 *   einfliegen (vom zufälligen Bildrand) → verweilen (10–25s auf
 *   Flatterpfad) → wegfliegen (zu zufälligem Rand) → entfernt.
 *
 * Schwarm-Regeln:
 *   – mindestens MIN_COUNT sind immer sichtbar (sofortiger Nachschub)
 *   – Spawner würfelt regelmäßig, ob ein weiterer dazukommt
 *   – Obergrenze richtet sich nach der Verbindungsqualität
 *     (Network Information API) + Save-Data + Gerätetyp
 *   – bei langsamer Verbindung wird die kleine Bildvariante genutzt
 *
 * Transform-Ebenen: .bf-spawn (Ein-/Ausflug, CSS-Transition)
 *   → .bf (Flugpfad) → .bf-bob (Höhe) → .bf-inner (Wobble/3D)
 *   → Flügelhälften (rotateY-Faltung) + stabiler Körper.
 */

const MIN_COUNT = 2

// ---------- Zufalls-Helfer ----------
const rand = (min: number, max: number) => min + Math.random() * (max - min)
const pick = <T,>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)]

interface BfInstance {
  id: string
  species: 'blue' | 'pink'
  left: number // %
  top: number // %
  size: number // px
  blur: number
  opacity: number
  depth: 'near' | 'far'
  path: 'a' | 'b' | 'c'
  pathDur: number
  pathDelay: number
  reverse: boolean
  flap: number
  enter: { x: number; y: number; rot: number; dur: number } // vw/vh
  exit: { x: number; y: number; rot: number; dur: number }
  lingerMs: number
}

// Kollisionsfrei auch über Hot-Reloads hinweg (Modul-Zähler würde
// bei HMR auf 1 zurückspringen, während der Schwarm-State überlebt)
let nextId = 1
const makeId = () =>
  globalThis.crypto?.randomUUID?.() ?? `bf-${Date.now()}-${nextId++}`

/** Zufälliger Rand-Offset (vw/vh) für Ein- oder Ausflug. */
const edgeOffset = () => {
  const edge = pick(['left', 'right', 'top', 'bottom'] as const)
  const cross = rand(-14, 14)
  switch (edge) {
    case 'left':
      return { x: -rand(26, 42), y: cross, rot: -rand(10, 28) }
    case 'right':
      return { x: rand(26, 42), y: cross, rot: rand(10, 28) }
    case 'top':
      return { x: cross, y: -rand(22, 36), rot: rand(-18, 18) }
    case 'bottom':
      return { x: cross, y: rand(22, 36), rot: rand(-18, 18) }
  }
}

/** Basisposition — meidet den Text-Block links und parkt nie auf dem Gesicht. */
const basePosition = () => {
  for (let i = 0; i < 6; i++) {
    const zone = Math.random()
    let left: number, top: number
    if (zone < 0.55) {
      // rechte Bildhälfte (um die Frau herum)
      left = rand(56, 88)
      top = rand(6, 72)
    } else if (zone < 0.8) {
      // Streifen über der Headline
      left = rand(6, 40)
      top = rand(5, 16)
    } else {
      // unten links, hinter dem Inhalt
      left = rand(4, 26)
      top = rand(58, 72)
    }
    // Gesichts-Zone aussparen (dort parkt niemand)
    const onFace = left > 62 && left < 84 && top > 18 && top < 50
    if (!onFace) return { left, top }
  }
  return { left: 30, top: 10 }
}

const makeButterfly = (): BfInstance => {
  const size = rand(34, 88)
  const far = size < 56
  const { left, top } = basePosition()
  return {
    id: makeId(),
    species: Math.random() < 0.5 ? 'pink' : 'blue',
    left,
    top,
    size: Math.round(size),
    blur: far ? rand(0.8, 1.9) : size < 72 ? rand(0, 0.5) : 0,
    opacity: far ? rand(0.6, 0.85) : rand(0.9, 1),
    depth: far ? 'far' : 'near',
    path: pick(['a', 'b', 'c'] as const),
    pathDur: rand(22, 46),
    pathDelay: -rand(0, 30),
    reverse: Math.random() < 0.5,
    flap: rand(1.6, 2.8),
    // Kein Eile-Effekt: Ein-/Ausflug dauert 9–15s — der Flatterpfad
    // läuft währenddessen weiter, der Schmetterling fliegt also
    // in seinem natürlichen Rhythmus heran statt „hereingeweht“.
    // Seiten-Flüge (links/rechts) bekommen zusätzlich ein Tempolimit:
    // die Dauer wächst mit der Strecke, damit weite Horizontal-
    // Anflüge nie schneller als ~3,2 vw/s werden.
    enter: (() => {
      const off = edgeOffset()
      return { ...off, dur: Math.max(rand(9, 14), Math.abs(off.x) / 3.2) }
    })(),
    exit: (() => {
      const off = edgeOffset()
      return { ...off, dur: Math.max(rand(10, 15), Math.abs(off.x) / 3.0) }
    })(),
    lingerMs: rand(10_000, 25_000),
  }
}

// ---------- Verbindungs-Budget ----------
interface SwarmBudget {
  max: number
  smallAsset: boolean
  reduced: boolean
}

const useSwarmBudget = (): SwarmBudget => {
  const [budget, setBudget] = useState<SwarmBudget>({
    max: 4,
    smallAsset: false,
    reduced: false,
  })

  useEffect(() => {
    const conn = (navigator as any).connection
    const compute = () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const coarse = window.matchMedia('(pointer: coarse)').matches
      const type: string = conn?.effectiveType ?? '4g'
      const saveData: boolean = conn?.saveData ?? false

      let max: number
      if (saveData || type === '2g' || type === 'slow-2g') max = MIN_COUNT
      else if (type === '3g') max = 3
      else max = coarse ? 5 : 7 // 4G/unbekannt: Mobile etwas sparsamer

      setBudget({
        max,
        smallAsset: saveData || type !== '4g',
        reduced,
      })
    }
    compute()
    conn?.addEventListener?.('change', compute)
    return () => conn?.removeEventListener?.('change', compute)
  }, [])

  return budget
}

// ---------- Einzelner Schmetterling ----------
const Bf = ({
  b,
  smallAsset,
  reduced,
  onDone,
}: {
  b: BfInstance
  smallAsset: boolean
  reduced: boolean
  onDone: (id: string) => void
}) => {
  const [phase, setPhase] = useState<'enter' | 'live' | 'exit'>(
    reduced ? 'live' : 'enter'
  )

  useEffect(() => {
    if (reduced) return // statisch: kein Lebenszyklus
    const t1 = window.setTimeout(() => setPhase('live'), 80)
    const t2 = window.setTimeout(
      () => setPhase('exit'),
      b.enter.dur * 1000 + b.lingerMs
    )
    const t3 = window.setTimeout(
      () => onDone(b.id),
      b.enter.dur * 1000 + b.lingerMs + b.exit.dur * 1000 + 300
    )
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [b, reduced, onDone])

  const suffix = smallAsset ? '-sm' : ''
  const img = `url('/images/butterfly-${b.species}${suffix}.webp')`

  // Transition pro Phase:
  // – Einflug: Position wandert lange & gleichmäßig, Sichtbarkeit
  //   kommt schnell (2.8s) → kein minutenlanges Geister-Fade
  // – Ausflug: sanft beschleunigend, ausblenden erst auf dem
  //   letzten Streckenstück (delay), als würde er in der Ferne
  //   zwischen den Bäumen verschwinden
  const spawnStyle: React.CSSProperties =
    phase === 'enter'
      ? {
          transform: `translate3d(${b.enter.x}vw, ${b.enter.y}vh, 0) rotate(${b.enter.rot}deg)`,
          opacity: 0,
          transition: 'none',
        }
      : phase === 'exit'
        ? {
            transform: `translate3d(${b.exit.x}vw, ${b.exit.y}vh, 0) rotate(${b.exit.rot}deg)`,
            opacity: 0,
            transition: `transform ${b.exit.dur}s cubic-bezier(0.5, 0.08, 0.65, 0.5), opacity ${(b.exit.dur * 0.45).toFixed(1)}s ease-in ${(b.exit.dur * 0.55).toFixed(1)}s`,
          }
        : {
            transform: 'translate3d(0, 0, 0) rotate(0deg)',
            opacity: 1,
            transition: `transform ${b.enter.dur}s cubic-bezier(0.33, 0.12, 0.33, 1), opacity 2.8s ease-out`,
          }

  return (
    <div className="bf-spawn" style={spawnStyle}>
      <div
        className="bf"
        style={
          {
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: b.size,
            height: Math.round(b.size * 0.82),
            opacity: b.opacity,
            filter: b.blur ? `blur(${b.blur}px)` : undefined,
            animationName: `bf-path-${b.path}`,
            animationDuration: `${b.pathDur}s`,
            animationDelay: `${b.pathDelay}s`,
            animationDirection: b.reverse ? 'reverse' : 'normal',
            '--flap': `${b.flap}s`,
            '--bf-img': img,
          } as React.CSSProperties
        }
      >
        <div className="bf-bob">
          <div className="bf-inner">
            <div className="bf-wing bf-wing-l" />
            <div className="bf-wing bf-wing-r" />
            <div className="bf-body" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------- Schwarm-Manager ----------
const Butterflies = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const budget = useSwarmBudget()
  const budgetRef = useRef(budget)
  budgetRef.current = budget
  const [swarm, setSwarm] = useState<BfInstance[]>([])

  const spawn = useCallback((count = 1) => {
    // Instanzen AUSSERHALB des Updaters erzeugen — der Updater muss
    // pur bleiben (StrictMode ruft ihn doppelt auf; Seiteneffekte
    // darin führten zu doppelten Keys)
    const candidates = Array.from({ length: count }, makeButterfly)
    setSwarm((prev) => {
      const room = budgetRef.current.max - prev.length
      if (room <= 0) return prev
      return [...prev, ...candidates.slice(0, room)]
    })
  }, [])

  const remove = useCallback((id: string) => {
    setSwarm((prev) => prev.filter((b) => b.id !== id))
  }, [])

  // Startbesatzung: gestaffelt einfliegen lassen (nur Client → kein SSR-Mismatch)
  useEffect(() => {
    spawn(1)
    const t = window.setTimeout(() => spawn(1), 2200)
    return () => clearTimeout(t)
  }, [spawn])

  // Minimum-Garantie: fällt der Schwarm unter MIN_COUNT, sofort Nachschub
  useEffect(() => {
    if (budget.reduced) return
    if (swarm.length < MIN_COUNT) {
      const t = window.setTimeout(() => spawn(1), rand(400, 1600))
      return () => clearTimeout(t)
    }
  }, [swarm.length, budget.reduced, spawn])

  // Spawner: würfelt regelmäßig, ob ein weiterer dazukommt → „mal 2, mal mehr“
  useEffect(() => {
    if (budget.reduced) return
    const iv = window.setInterval(() => {
      if (Math.random() < 0.4) spawn(1)
    }, 6500)
    return () => clearInterval(iv)
  }, [budget.reduced, spawn])

  // Maus-Parallax: zwei Tiefenebenen federn per CSS-Variablen nach
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2
        const y = (e.clientY / window.innerHeight - 0.5) * 2
        root.style.setProperty('--mx', x.toFixed(3))
        root.style.setProperty('--my', y.toFixed(3))
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="absolute inset-0 z-[5] overflow-hidden"
      style={{ pointerEvents: 'none' }}
    >
      {(['far', 'near'] as const).map((depth) => (
        <div key={depth} className={`bf-layer bf-layer-${depth}`}>
          {swarm
            .filter((b) => b.depth === depth)
            .map((b) => (
              <Bf
                key={b.id}
                b={b}
                smallAsset={budget.smallAsset}
                reduced={budget.reduced}
                onDone={remove}
              />
            ))}
        </div>
      ))}
    </div>
  )
}

export default Butterflies
