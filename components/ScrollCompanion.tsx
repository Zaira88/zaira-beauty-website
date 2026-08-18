import React from 'react'

/**
 * Ein Schmetterling, der beim Scrollen mitfliegt.
 *
 * Ersetzt den zeitgesteuerten Überflug: der lief 7,6 Sekunden lang
 * einmal quer durchs Bild, egal was der Besucher tat. Die Bewegung
 * hatte nichts mit dem Scrollen zu tun und wirkte dadurch aufgesetzt.
 *
 * Jetzt treibt die Scroll-Position die Bewegung (die Keyframes hängen
 * in globals.css an `animation-timeline: scroll(root block)`). Er zieht
 * mit nach unten, während man scrollt, bleibt stehen, wenn man stehen
 * bleibt, und fliegt zurück, wenn man hochscrollt. Der Flügelschlag
 * läuft weiter über die Zeit — im Stillstand flattert er also auf der
 * Stelle, statt einzufrieren.
 *
 * Bewusst OHNE JavaScript: kein Zustand, kein Beobachter, kein Timer.
 * Scroll-getriebene Animationen laufen auf dem Compositor, kosten den
 * Haupt-Thread also nichts. Wo die Technik fehlt (Safari vor 26,
 * Firefox), blendet `@supports` das Element komplett aus — dann ist
 * eben kein Falter da, statt einer, der eingefroren im Bild klebt.
 *
 * position: fixed ist doppelt nötig: er soll im Bild bleiben (sonst
 * scrollt er weg statt mitzufliegen) und die Abschnittsgrenzen
 * überqueren (die Sektionen haben overflow-hidden). Deshalb darf die
 * Komponente keinen transformierten Vorfahren haben — sonst bezieht
 * sich `fixed` auf den statt auf das Fenster. Sie hängt darum direkt
 * in page.tsx und nicht in einer motion-Komponente.
 */
const ScrollCompanion = () => (
  <div
    aria-hidden
    className="bf-companion bf-companion-fade pointer-events-none fixed left-0 top-0 z-[6]"
  >
    <div className="bf-companion-x">
      <div className="bf-companion-y">
        <div className="bf-companion-tilt">
          <span
            className="bf h-[26px] w-[32px] sm:h-[32px] sm:w-[39px]"
            style={
              {
                '--hop': '6px',
                '--flap': '2.5s',
                '--wob': '4.3s',
                // Rosa wie der größte Falter im Hero: er wirkt dadurch
                // wie einer, der sich aus dem Schwarm gelöst hat.
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

export default ScrollCompanion
