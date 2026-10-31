import React from 'react'

/**
 * Ein Schmetterling, der durch den Anliegen-Abschnitt wandert, während
 * man ihn herunterscrollt — und dabei HINTER den Kärtchen durchzieht.
 *
 * Am 31.10.2026 von Grund auf neu gebaut. Davor lief hier ein
 * JavaScript-Zeitgeber, der alle 16 bis 34 Sekunden einen Falter quer
 * durchs Bild schickte, unabhängig davon, was der Besucher tat. Genau
 * dieser Fehler steht seit jeher im Kopf von `ScrollCompanion.tsx`
 * beschrieben: „Die Bewegung hatte nichts mit dem Scrollen zu tun und
 * wirkte dadurch aufgesetzt." Ich hatte ihn trotzdem wieder gebaut.
 * Zaurs Urteil: „total falsch, denke es neu."
 *
 * Jetzt treibt das Scrollen die Bewegung, genau wie beim Begleiter —
 * nur mit `view()` statt `scroll(root)`: Die Zeitachse hängt an der
 * eigenen Durchfahrt dieses Abschnitts durchs Fenster, nicht an der
 * Gesamthöhe der Seite. Dadurch bleibt sie richtig, auch wenn oberhalb
 * oder unterhalb Inhalt dazukommt.
 *
 * Kein Zustand, kein Timer, kein IntersectionObserver. Die
 * Flügelschlag-Ebenen (.bf-bob, .bf-inner, .bf-wing) laufen weiter
 * über die ZEIT — im Stillstand flattert er also auf der Stelle,
 * statt einzufrieren.
 *
 * ER MUSS DAS ERSTE KIND SEINES ABSCHNITTS BLEIBEN. Geschwister malen
 * in DOM-Reihenfolge; nur so liegt er unter den Kärtchen, und nur
 * deshalb nehmen die als mattes Glas (`backdrop-filter` in `.panel`)
 * seine Farbe an, während er dahinter vorbeizieht. Das ist der
 * eigentliche Zweck dieser Komponente — der Begleiter kann es nicht,
 * weil er `fixed` ist und über allem liegt.
 *
 * Darstellung bewusst dieselbe Draufsicht wie Hero-Schwarm und
 * Begleiter. Ein Zwischenstand hatte hier eine eigene Seitenansicht;
 * zwei verschiedene Darstellungen desselben Tiers im selben Abschnitt
 * sahen schlicht falsch aus.
 *
 * Rosa, nicht blau: Der Glas-Schimmer in den Kärtchen ist der Zweck,
 * und Rosa setzt sich gegen das Petrol-Schwarz der Kärtchen sichtbar
 * ab, Blau geht darin unter. Größer als der Begleiter (46 statt 32 px),
 * damit die beiden als zwei verschiedene Tiere lesbar bleiben.
 */
const CrossingButterfly = () => (
  <div aria-hidden className="bf-quer">
    {/* Reihenfolge ist wichtig: Die beiden Bahn-Ebenen sind
        ABSCHNITTSGROSS (ihre Prozent-Verschiebungen beziehen sich damit
        auf den Abschnitt, nicht auf die Faltergröße). Die Neigung sitzt
        dagegen INNERHALB des kleinen Tier-Elements — läge sie außen,
        drehte sie um die Abschnittsmitte und würde den Falter bei 20°
        um hunderte Pixel schleudern. */}
    <div className="bf-quer-x">
      <div className="bf-quer-y">
        <span
          className="bf-quer-tier h-[38px] w-[46px] sm:h-[46px] sm:w-[56px]"
          style={
            {
              '--hop': '7px',
              '--flap': '2.7s',
              '--wob': '4.6s',
              '--bf-img': "url('/images/butterfly-pink-sm.webp')",
            } as React.CSSProperties
          }
        >
          <span className="bf-quer-neig block h-full w-full">
            <span className="bf-bob block h-full w-full">
              <span className="bf-inner block">
                <span className="bf-wing bf-wing-l" />
                <span className="bf-wing bf-wing-r" />
                <span className="bf-body" />
              </span>
            </span>
          </span>
        </span>
      </div>
    </div>
  </div>
)

export default CrossingButterfly
