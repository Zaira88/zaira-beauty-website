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
 *   – mindestens `budget.min` sind immer sichtbar (sofortiger Nachschub)
 *   – Spawner würfelt alle 6,5 s mit `budget.chance`, ob einer dazukommt
 *   – Obergrenze richtet sich nach Verbindungsqualität (Network
 *     Information API), Save-Data und Gerätetyp
 *   – bei langsamer Verbindung wird die kleine Bildvariante genutzt
 *
 * Die ANZAHL stellt man über `chance` ein, nicht über `max` — siehe
 * den Kommentar an SwarmBudget. Am 31.10.2026 nachgemessen: Der
 * Schwarm füllt sich in den ersten 40 s auf 6 auf, danach sterben die
 * ersten und er pendelt sich bei rund 3 ein. Der Desktop-Deckel von 7
 * wird dabei nie erreicht, die Anzahl ist also direkt proportional zu
 * `chance`. Wer nach zehn Sekunden misst, misst die Auffüllphase und
 * nicht den Dauerzustand.
 *
 * Transform-Ebenen: .bf-spawn (Ein-/Ausflug, CSS-Transition)
 *   → .bf (Flugpfad, sanfte Neigung) → .bf-jig (Zickzack)
 *   → .bf-bob (Schub pro Flügelschlag) → .bf-inner (Wobble/3D)
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
  /** Mittlere Zickzack-Ebene: Variante + eigene Dauer/Phase */
  jig: { variant: 'a' | 'b' | 'c'; dur: number; delay: number }
  /** Roll-Wobble-Dauer in s (desynchronisiert die Falter) */
  wob: number
  enter: { x: number; y: number; rot: number; dur: number } // vw/vh
  exit: { x: number; y: number; rot: number; dur: number }
  lingerMs: number
}

// Kollisionsfrei auch über Hot-Reloads hinweg (Modul-Zähler würde
// bei HMR auf 1 zurückspringen, während der Schwarm-State überlebt)
let nextId = 1
const makeId = () =>
  globalThis.crypto?.randomUUID?.() ?? `bf-${Date.now()}-${nextId++}`

/**
 * Kleiner Versatz (vw/vh) für Ein- und Ausblenden.
 *
 * Bis zum 31.10.2026 flog der Falter hier von weit außerhalb des
 * Bildes herein: 26–42 vw in 9–15 s, also rund 3 vw/s ≈ 45 px/s.
 * Zwei Dinge waren daran falsch. Erstens war das die mit Abstand
 * SCHNELLSTE Bewegung im Bild — fünfmal schneller als der Flatterpfad
 * mit seinen ~0,6 vw/s. Zweitens zeigte der Körper dabei in die
 * Richtung des Flatterpfads, nicht in die Anflugrichtung: zwei
 * unabhängige Bewegungen, aber nur eine Ausrichtung, also flog er
 * seinen ganzen Anflug lang schräg.
 *
 * Jetzt driftet er nur noch 2–5 vw, während er auf- oder abblendet.
 * Damit bleibt der Flatterpfad die bestimmende Bewegung, die
 * Ausrichtung stimmt durchgehend, und er taucht aus dem dunklen Wald
 * auf statt hereingeschossen zu kommen — was der Szene ohnehin
 * besser entspricht.
 */
const edgeOffset = () => {
  const dir = pick(['left', 'right', 'top', 'bottom'] as const)
  const cross = rand(-3, 3)
  switch (dir) {
    case 'left':
      return { x: -rand(2, 5), y: cross, rot: -rand(2, 7) }
    case 'right':
      return { x: rand(2, 5), y: cross, rot: rand(2, 7) }
    case 'top':
      return { x: cross, y: -rand(2, 5), rot: rand(-6, 6) }
    case 'bottom':
      return { x: cross, y: rand(2, 5), rot: rand(-6, 6) }
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

/**
 * Faltergröße an die Bildschirmbreite koppeln.
 *
 * Die Größen 34–88 px waren fest verdrahtet und am Desktop bemessen:
 * dort sind 88 px knapp 6 % der Fensterbreite. Auf einem 390-px-Telefon
 * sind dieselben 88 px über 20 % — ein Falter so breit wie ein Fünftel
 * des Bildschirms, der dem Text im Weg steht. Zaur hat es am Gerät
 * gesehen, am Desktop fällt es nicht auf.
 *
 * Untergrenze 0,36 statt rein proportional: Das Heldenbild ist mobil
 * nur 37 svh hoch, aber die Falter sollen trotzdem als Tiere lesbar
 * bleiben und nicht zu Staubkörnern werden.
 */
const breitenSkala = () => {
  if (typeof window === 'undefined') return 1
  return Math.min(1, Math.max(0.36, window.innerWidth / 1400))
}

const makeButterfly = (): BfInstance => {
  // far/near MUSS am unskalierten Wert entschieden werden — sonst
  // fielen auf dem Telefon alle unter die 56-px-Schwelle und der ganze
  // Schwarm wäre unscharf und blass.
  const roh = rand(34, 88)
  const far = roh < 56
  const skala = breitenSkala()
  const size = roh * skala
  const { left, top } = basePosition()
  return {
    id: makeId(),
    species: Math.random() < 0.5 ? 'pink' : 'blue',
    left,
    top,
    size: Math.round(size),
    // Schwelle am unskalierten Wert, Unschärfe MIT skaliert: 1,9 px auf
    // einem 14-px-Falter wären anteilig fünfmal so viel wie am Desktop.
    blur: (far ? rand(0.8, 1.9) : roh < 72 ? rand(0, 0.5) : 0) * skala,
    opacity: far ? rand(0.6, 0.85) : rand(0.9, 1),
    depth: far ? 'far' : 'near',
    path: pick(['a', 'b', 'c'] as const),
    // Langsamer als vorher (22–46 s): die Schleifen sind rund 20 vw
    // lang, bei 22 s waren das Spitzen deutlich über 1 vw/s.
    pathDur: rand(34, 62),
    pathDelay: -rand(0, 30),
    reverse: Math.random() < 0.5,
    flap: rand(2.1, 3.3),
    jig: {
      variant: pick(['a', 'b', 'c'] as const),
      dur: rand(9, 15),
      delay: -rand(0, 10),
    },
    wob: rand(3.4, 5.6),
    // Die Tempolimits von früher (3,0–3,2 vw/s) sind überflüssig
    // geworden: Bei 2–5 vw Drift über 11–18 s sind es ~0,3 vw/s,
    // also ein Zehntel davon und deutlich unter dem Flatterpfad.
    enter: { ...edgeOffset(), dur: rand(11, 16) },
    exit: { ...edgeOffset(), dur: rand(13, 18) },
    lingerMs: rand(10_000, 25_000),
  }
}

// ---------- Verbindungs- und Geraete-Budget ----------
/**
 * WICHTIG: `max` ist nur ein Deckel, nicht die Anzahl.
 *
 * Wie viele Falter tatsaechlich im Bild sind, ergibt sich aus
 * Nachschubrate mal Lebensdauer: alle 6,5 s mit `chance`
 * Wahrscheinlichkeit einer dazu, jeder lebt 34–59 s (Einflug +
 * Verweilen + Ausflug). Bei chance 0,4 sind das rund 2,8 Falter — der
 * alte Deckel von 7 am Desktop und 5 mobil wurde also nie erreicht.
 *
 * Am 31.10.2026 gemessen: am Desktop UND am emulierten Telefon standen
 * beide konstant bei 3. Wer die Anzahl aendern will, muss deshalb an
 * `chance` drehen; der Deckel allein bewirkt fast nichts und fing nur
 * die seltenen Ausreisser ab.
 */
interface SwarmBudget {
  /** Deckel — begrenzt nur Ausreisser nach oben */
  max: number
  /** Untergrenze: faellt der Schwarm darunter, kommt sofort Nachschub */
  min: number
  /** Wahrscheinlichkeit pro 6,5-s-Runde, dass einer dazukommt */
  chance: number
  smallAsset: boolean
  reduced: boolean
}

const useSwarmBudget = (): SwarmBudget => {
  const [budget, setBudget] = useState<SwarmBudget>({
    max: 4,
    min: MIN_COUNT,
    chance: 0.4,
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

      // Telefon = Tastgerät schmaler als 600px. Tablets zählen nicht
      // dazu, dort ist der Hero so hoch wie am Desktop.
      const telefon = coarse && window.innerWidth < 600

      let max: number
      let chance = 0.4
      if (saveData || type === '2g' || type === 'slow-2g') {
        max = MIN_COUNT
        chance = 0.25
      } else if (type === '3g') {
        max = 3
        chance = 0.3
      } else if (telefon) {
        // Zaurs Bitte: „auf dem iPhone die Anzahl um 30 % reduzieren".
        // Gemessener Ausgangswert waren 3 Falter, Ziel also rund 2.
        // chance 0,27 ergibt rechnerisch 0,27 / 6,5 s × 46 s ≈ 1,9;
        // Deckel 3 und Untergrenze 1 lassen es zwischen 1 und 3
        // schwanken statt es auf einem Wert festzunageln.
        max = 3
        chance = 0.27
      } else {
        max = coarse ? 5 : 7
      }

      setBudget({
        max,
        min: telefon ? 1 : MIN_COUNT,
        chance,
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
            // Fast lineares Easing mit weichem Ende: die alte starke
            // Ease-Out-Kurve las sich als „hereingeweht, dann
            // Fallschirm". Gleichmäßiges Reisetempo + die Flatter-
            // Ebenen darüber = er FLIEGT heran.
            transition: `transform ${b.enter.dur}s cubic-bezier(0.38, 0.15, 0.55, 0.92), opacity 2.8s ease-out`,
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
            // Amplituden skalieren mit der Größe. Beide am 31.10.2026
            // zurückgenommen (vorher 0.16 und 0.2): zusammen mit den
            // schnappenden Keyframes ergab das Geschwindigkeitsspitzen
            // vom Fünffachen des Medians — gemessen, nicht geschätzt.
            '--hop': `${Math.max(4, Math.round(b.size * 0.1))}px`,
            '--jig': `${Math.round(b.size * 0.12)}px`,
            '--wob': `${b.wob.toFixed(2)}s`,
            '--bf-img': img,
          } as React.CSSProperties
        }
      >
        {/* Mittlere Skala: unregelmäßige Haken, pro Falter einzigartig */}
        <div
          className="bf-jig"
          style={{
            animationName: `bf-jig-${b.jig.variant}`,
            animationDuration: `${b.jig.dur.toFixed(2)}s`,
            animationDelay: `${b.jig.delay.toFixed(2)}s`,
          }}
        >
          {/* Keine Rollungs-Ebene hier: Eine gerollte Draufsicht zerfällt
              in zwei Flügelpaare übereinander, und das Foto dahinter
              zeigt Falter in Draufsicht mit senkrechtem Körper. Die
              echte Seitenansicht sitzt dort, wo sie hingehört — beim
              Querflieger (CrossingButterfly.tsx). */}
          <div className="bf-bob">
            <div className="bf-inner">
              <div className="bf-wing bf-wing-l" />
              <div className="bf-wing bf-wing-r" />
              <div className="bf-body" />
            </div>
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
    if (swarm.length < budget.min) {
      const t = window.setTimeout(() => spawn(1), rand(400, 1600))
      return () => clearTimeout(t)
    }
  }, [swarm.length, budget.min, budget.reduced, spawn])

  // Spawner: würfelt regelmäßig, ob ein weiterer dazukommt → „mal 2, mal mehr“
  useEffect(() => {
    if (budget.reduced) return
    const iv = window.setInterval(() => {
      if (Math.random() < budget.chance) spawn(1)
    }, 6500)
    return () => clearInterval(iv)
  }, [budget.chance, budget.reduced, spawn])

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
