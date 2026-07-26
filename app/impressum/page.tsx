import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum',
  robots: {
    index: false,
  },
}

const ImpressumPage = () => {
  return (
    <div className="bg-ink text-ivory-dim min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <h1 className="font-display text-4xl text-ivory sm:text-5xl mb-12">Impressum</h1>
        <div className="prose-zaira prose-lg">
            <h2 className="text-ivory">Angaben gemäß § 5 TMG</h2>
            <p>
                Zaira Beauty Face<br />
                Johannispl. 10, Stiege 1 Tür 1<br />
                82538 Geretsried<br />
                Deutschland
            </p>

            <h2 className="text-ivory">Kontakt</h2>
            <p>
                Telefon: 01515 9414259<br />
                E-Mail: zaira.beauty.face@gmail.com
            </p>

            <h2 className="text-ivory">Berufshaftpflichtversicherung</h2>
            <p>
                BA die Bayrische Allgemeine Versicherung AG<br />
                Thomas-Dehler-Straße 25<br />
                81737 München<br />
                <a href="https://www.diebayerische.de/" target="_blank" rel="noopener noreferrer">https://www.diebayerische.de/</a>
            </p>
            <p>Räumliche Geltung: Deutschland</p>

            <h2 className="text-ivory">EU-Streitschlichtung</h2>
            <p>
                Gemäß Verordnung über Online-Streitbeilegung in Verbraucherangelegenheiten (ODR-Verordnung) möchten wir Sie über die Online-Streitbeilegungsplattform (OS-Plattform) informieren.
                Verbraucher haben die Möglichkeit, Beschwerden an die Online Streitbeilegungsplattform der Europäischen Kommission unter <a href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=DE" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a> zu richten. Die dafür notwendigen Kontaktdaten finden Sie oben in unserem Impressum.
            </p>
            <p>
                Wir möchten Sie jedoch darauf hinweisen, dass wir nicht bereit oder verpflichtet sind, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>

            <h2 className="text-ivory">Haftung für Inhalte dieser Website</h2>
            <p>
                Wir entwickeln die Inhalte dieser Website ständig weiter und bemühen uns korrekte und aktuelle Informationen bereitzustellen. Leider können wir keine Haftung für die Korrektheit aller Inhalte auf dieser Website übernehmen, speziell für jene, die seitens Dritter bereitgestellt wurden. Als Diensteanbieter sind wir nicht verpflichtet, die von Ihnen übermittelten oder gespeicherten Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p>
                Unsere Verpflichtungen zur Entfernung von Informationen oder zur Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen aufgrund von gerichtlichen oder behördlichen Anordnungen bleiben auch im Falle unserer Nichtverantwortlichkeit davon unberührt.
            </p>
            <p>
                Sollten Ihnen problematische oder rechtswidrige Inhalte auffallen, bitte wir Sie uns umgehend zu kontaktieren, damit wir die rechtswidrigen Inhalte entfernen können. Sie finden die Kontaktdaten im Impressum.
            </p>

            <h2 className="text-ivory">Haftung für Links auf dieser Website</h2>
            <p>
                Unsere Website enthält Links zu anderen Websites für deren Inhalt wir nicht verantwortlich sind. Haftung für verlinkte Websites besteht für uns nicht, da wir keine Kenntnis rechtswidriger Tätigkeiten hatten und haben, uns solche Rechtswidrigkeiten auch bisher nicht aufgefallen sind und wir Links sofort entfernen würden, wenn uns Rechtswidrigkeiten bekannt werden.
            </p>
            <p>
                Wenn Ihnen rechtswidrige Links auf unserer Website auffallen, bitte wir Sie uns zu kontaktieren. Sie finden die Kontaktdaten im Impressum.
            </p>

            <h2 className="text-ivory">Urheberrechtshinweis</h2>
            <p>
                Alle Inhalte dieser Webseite (Bilder, Fotos, Texte, Videos) unterliegen dem Urheberrecht. Bitte fragen Sie uns bevor Sie die Inhalte dieser Website verbreiten, vervielfältigen oder verwerten wie zum Beispiel auf anderen Websites erneut veröffentlichen. Falls notwendig, werden wir die unerlaubte Nutzung von Teilen der Inhalte unserer Seite rechtlich verfolgen.
            </p>
            <p>
                Sollten Sie auf dieser Webseite Inhalte finden, die das Urheberrecht verletzen, bitten wir Sie uns zu kontaktieren.
            </p>

            <h2 className="text-ivory">Bildernachweis</h2>
            <p>
                Die Bilder, Fotos und Grafiken auf dieser Webseite sind urheberrechtlich geschützt. Die Bilderrechte liegen bei Zaira Khadzhimuradova.
            </p>
            <p className="text-sm mt-12">Quelle: Erstellt mit dem Impressum Generator von AdSimple</p>
        </div>
      </div>
    </div>
  )
}

export default ImpressumPage 