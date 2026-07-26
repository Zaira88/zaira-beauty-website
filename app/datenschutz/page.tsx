import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  robots: {
    index: false,
  },
}

const DatenschutzPage = () => {
  return (
    <div className="bg-ink text-ivory-dim min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <h1 className="font-display text-4xl text-ivory sm:text-5xl mb-12">Datenschutzerklärung</h1>
        <div className="prose prose-invert prose-lg max-w-none text-ivory-dim prose-a:text-yellow-400 hover:prose-a:text-yellow-500">
            <h2 className="text-ivory">Einleitung und Überblick</h2>
            <p>
                Wir haben diese Datenschutzerklärung (Fassung 06.09.2023-322574896) verfasst, um Ihnen gemäß der Vorgaben der Datenschutz-Grundverordnung (EU) 2016/679 und anwendbaren nationalen Gesetzen zu erklären, welche personenbezogenen Daten (kurz Daten) wir als Verantwortliche – und die von uns beauftragten Auftragsverarbeiter (z. B. Provider) – verarbeiten, zukünftig verarbeiten werden und welche rechtmäßigen Möglichkeiten Sie haben. Die verwendeten Begriffe sind geschlechtsneutral zu verstehen.
            </p>
            <p>
                <strong>Kurz gesagt:</strong> Wir informieren Sie umfassend über Daten, die wir über Sie verarbeiten.
            </p>
            <p>
                Datenschutzerklärungen klingen für gewöhnlich sehr technisch und verwenden juristische Fachbegriffe. Diese Datenschutzerklärung soll Ihnen hingegen die wichtigsten Dinge so einfach und transparent wie möglich beschreiben. Soweit es der Transparenz förderlich ist, werden technische Begriffe leserfreundlich erklärt, Links zu weiterführenden Informationen geboten und Grafiken zum Einsatz gebracht. Wir informieren damit in klarer und einfacher Sprache, dass wir im Rahmen unserer Geschäftstätigkeiten nur dann personenbezogene Daten verarbeiten, wenn eine entsprechende gesetzliche Grundlage gegeben ist. Das ist sicher nicht möglich, wenn man möglichst knappe, unklare und juristisch-technische Erklärungen abgibt, so wie sie im Internet oft Standard sind, wenn es um Datenschutz geht. Ich hoffe, Sie finden die folgenden Erläuterungen interessant und informativ und vielleicht ist die eine oder andere Information dabei, die Sie noch nicht kannten.
            </p>
            <p>
                Wenn trotzdem Fragen bleiben, möchten wir Sie bitten, sich an die unten bzw. im Impressum genannte verantwortliche Stelle zu wenden, den vorhandenen Links zu folgen und sich weitere Informationen auf Drittseiten anzusehen. Unsere Kontaktdaten finden Sie selbstverständlich auch im Impressum.
            </p>

            <h2 className="text-ivory">Anwendungsbereich</h2>
            <p>
                Diese Datenschutzerklärung gilt für alle von uns im Unternehmen verarbeiteten personenbezogenen Daten und für alle personenbezogenen Daten, die von uns beauftragte Firmen (Auftragsverarbeiter) verarbeiten. Mit personenbezogenen Daten meinen wir Informationen im Sinne des Art. 4 Nr. 1 DSGVO wie zum Beispiel Name, E-Mail-Adresse und postalische Anschrift einer Person. Die Verarbeitung personenbezogener Daten sorgt dafür, dass wir unsere Dienstleistungen und Produkte anbieten und abrechnen können, sei es online oder offline. Der Anwendungsbereich dieser Datenschutzerklärung umfasst:
            </p>
            <ul>
                <li>alle Onlineauftritte (Websites, Onlineshops), die wir betreiben</li>
                <li>Social Media Auftritte und E-Mail-Kommunikation</li>
                <li>mobile Apps für Smartphones und andere Geräte</li>
            </ul>
            <p>
                Kurz gesagt: Die Datenschutzerklärung gilt für alle Bereiche, in denen personenbezogene Daten im Unternehmen über die genannten Kanäle strukturiert verarbeitet werden. Sollten wir außerhalb dieser Kanäle mit Ihnen in Rechtsbeziehungen eintreten, werden wir Sie gegebenenfalls gesondert informieren.
            </p>

            <h2 className="text-ivory">Rechtsgrundlagen</h2>
            <p>In der folgenden Datenschutzerklärung geben wir Ihnen transparente Informationen zu den rechtlichen Grundsätzen und Vorschriften, also den Rechtsgrundlagen der Datenschutz-Grundverordnung, die uns ermöglichen, personenbezogene Daten zu verarbeiten.</p>
            <p>Was das EU-Recht betrifft, beziehen wir uns auf die VERORDNUNG (EU) 2016/679 DES EUROPÄISCHEN PARLAMENTS UND DES RATES vom 27. April 2016. Diese Datenschutz-Grundverordnung der EU können Sie selbstverständlich online auf EUR-Lex, dem Zugang zum EU-Recht, unter <a href="https://eur-lex.europa.eu/legal-content/DE/ALL/?uri=celex%3A32016R0679" target="_blank" rel="noopener noreferrer">https://eur-lex.europa.eu/legal-content/DE/ALL/?uri=celex%3A32016R0679</a> nachlesen.</p>
            <p>Wir verarbeiten Ihre Daten nur, wenn mindestens eine der folgenden Bedingungen zutrifft:</p>
            <ol>
                <li><strong>Einwilligung (Artikel 6 Absatz 1 lit. a DSGVO):</strong> Sie haben uns Ihre Einwilligung gegeben, Daten zu einem bestimmten Zweck zu verarbeiten. Ein Beispiel wäre die Speicherung Ihrer eingegebenen Daten eines Kontaktformulars.</li>
                <li><strong>Vertrag (Artikel 6 Absatz 1 lit. b DSGVO):</strong> Um einen Vertrag oder vorvertragliche Verpflichtungen mit Ihnen zu erfüllen, verarbeiten wir Ihre Daten. Wenn wir zum Beispiel einen Kaufvertrag mit Ihnen abschließen, benötigen wir vorab personenbezogene Informationen.</li>
                <li><strong>Rechtliche Verpflichtung (Artikel 6 Absatz 1 lit. c DSGVO):</strong> Wenn wir einer rechtlichen Verpflichtung unterliegen, verarbeiten wir Ihre Daten. Zum Beispiel sind wir gesetzlich verpflichtet Rechnungen für die Buchhaltung aufzuheben. Diese enthalten in der Regel personenbezogene Daten.</li>
                <li><strong>Berechtigte Interessen (Artikel 6 Absatz 1 lit. f DSGVO):</strong> Im Falle berechtigter Interessen, die Ihre Grundrechte nicht einschränken, behalten wir uns die Verarbeitung personenbezogener Daten vor. Wir müssen zum Beispiel gewisse Daten verarbeiten, um unsere Website sicher und wirtschaftlich effizient betreiben zu können. Diese Verarbeitung ist somit ein berechtigtes Interesse.</li>
            </ol>
            <p>Weitere Bedingungen wie die Wahrnehmung von Aufnahmen im öffentlichen Interesse und Ausübung öffentlicher Gewalt sowie dem Schutz lebenswichtiger Interessen treten bei uns in der Regel nicht auf. Soweit eine solche Rechtsgrundlage doch einschlägig sein sollte, wird diese an der entsprechenden Stelle ausgewiesen.</p>
            <p>Zusätzlich zu der EU-Verordnung gelten auch noch nationale Gesetze:</p>
            <ul>
                <li>In Österreich ist dies das Bundesgesetz zum Schutz natürlicher Personen bei der Verarbeitung personenbezogener Daten (Datenschutzgesetz), kurz <strong>DSG</strong>.</li>
                <li>In Deutschland gilt das <strong>Bundesdatenschutzgesetz</strong>, kurz <strong>BDSG</strong>.</li>
            </ul>
            <p>Sofern weitere regionale oder nationale Gesetze zur Anwendung kommen, informieren wir Sie in den folgenden Abschnitten darüber.</p>

            <h2 className="text-ivory">Kontaktdaten des Verantwortlichen</h2>
            <p>Sollten Sie Fragen zum Datenschutz oder zur Verarbeitung personenbezogener Daten haben, finden Sie nachfolgend die Kontaktdaten der verantwortlichen Person bzw. Stelle:</p>
            <p>
                Zaira Khadzhimuradova<br/>
                E-Mail: zaira.beauty.face@gmail.com<br/>
                Telefon: 01515 9414259
            </p>

            <h2 className="text-ivory">Speicherdauer</h2>
            <p>Dass wir personenbezogene Daten nur so lange speichern, wie es für die Bereitstellung unserer Dienstleistungen und Produkte unbedingt notwendig ist, gilt als generelles Kriterium bei uns. Das bedeutet, dass wir personenbezogene Daten löschen, sobald der Grund für die Datenverarbeitung nicht mehr vorhanden ist. In einigen Fällen sind wir gesetzlich dazu verpflichtet, bestimmte Daten auch nach Wegfall des ursprüngliches Zwecks zu speichern, zum Beispiel zu Zwecken der Buchführung.</p>
            <p>Sollten Sie die Löschung Ihrer Daten wünschen oder die Einwilligung zur Datenverarbeitung widerrufen, werden die Daten so rasch wie möglich und soweit keine Pflicht zur Speicherung besteht, gelöscht.</p>
            <p>Über die konkrete Dauer der jeweiligen Datenverarbeitung informieren wir Sie weiter unten, sofern wir weitere Informationen dazu haben.</p>

            <h2 className="text-ivory">Rechte laut Datenschutz-Grundverordnung</h2>
            <p>Gemäß Artikel 13, 14 DSGVO informieren wir Sie über die folgenden Rechte, die Ihnen zustehen, damit es zu einer fairen und transparenten Verarbeitung von Daten kommt:</p>
            <ul>
                <li>Sie haben laut Artikel 15 DSGVO ein Auskunftsrecht darüber, ob wir Daten von Ihnen verarbeiten. Sollte das zutreffen, haben Sie Recht darauf eine Kopie der Daten zu erhalten und die folgenden Informationen zu erfahren:
                    <ul>
                        <li>zu welchem Zweck wir die Verarbeitung durchführen;</li>
                        <li>die Kategorien, also die Arten von Daten, die verarbeitet werden;</li>
                        <li>wer diese Daten erhält und wenn die Daten an Drittländer übermittelt werden, wie die Sicherheit garantiert werden kann;</li>
                        <li>wie lange die Daten gespeichert werden;</li>
                        <li>das Bestehen des Rechts auf Berichtigung, Löschung oder Einschränkung der Verarbeitung und dem Widerspruchsrecht gegen die Verarbeitung;</li>
                        <li>dass Sie sich bei einer Aufsichtsbehörde beschweren können (Links zu diesen Behörden finden Sie weiter unten);</li>
                        <li>die Herkunft der Daten, wenn wir sie nicht bei Ihnen erhoben haben;</li>
                        <li>ob Profiling durchgeführt wird, ob also Daten automatisch ausgewertet werden, um zu einem persönlichen Profil von Ihnen zu gelangen.</li>
                    </ul>
                </li>
                <li>Sie haben laut Artikel 16 DSGVO ein Recht auf Berichtigung der Daten, was bedeutet, dass wir Daten richtig stellen müssen, falls Sie Fehler finden.</li>
                <li>Sie haben laut Artikel 17 DSGVO das Recht auf Löschung („Recht auf Vergessenwerden“), was konkret bedeutet, dass Sie die Löschung Ihrer Daten verlangen dürfen.</li>
                <li>Sie haben laut Artikel 18 DSGVO das Recht auf Einschränkung der Verarbeitung, was bedeutet, dass wir die Daten nur mehr speichern dürfen aber nicht weiter verwenden.</li>
                <li>Sie haben laut Artikel 20 DSGVO das Recht auf Datenübertragbarkeit, was bedeutet, dass wir Ihnen auf Anfrage Ihre Daten in einem gängigen Format zur Verfügung stellen.</li>
                <li>Sie haben laut Artikel 21 DSGVO ein Widerspruchsrecht, welches nach Durchsetzung eine Änderung der Verarbeitung mit sich bringt.</li>
                <li>Sie haben laut Artikel 22 DSGVO unter Umständen das Recht, nicht einer ausschließlich auf einer automatisierten Verarbeitung (zum Beispiel Profiling) beruhenden Entscheidung unterworfen zu werden.</li>
                <li>Sie haben laut Artikel 77 DSGVO das Recht auf Beschwerde.</li>
            </ul>
             <p>Kurz gesagt: Sie haben Rechte – zögern Sie nicht, die oben gelistete verantwortliche Stelle bei uns zu kontaktieren!</p>
            <p>Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt oder Ihre datenschutzrechtlichen Ansprüche in sonst einer Weise verletzt worden sind, können Sie sich bei der Aufsichtsbehörde beschweren. Für unser Unternehmen ist die folgende lokale Datenschutzbehörde zuständig:</p>
            <h3>Bayern Datenschutzbehörde</h3>
            <p>
                Landesbeauftragter für Datenschutz: Prof. Dr. Thomas Petri<br/>
                Adresse: Wagmüllerstr. 18, 80538 München<br/>
                Telefonnr.: 089/21 26 72-0<br/>
                E-Mail-Adresse: poststelle@datenschutz-bayern.de<br/>
                Website: <a href="https://www.datenschutz-bayern.de/" target="_blank" rel="noopener noreferrer">https://www.datenschutz-bayern.de/</a>
            </p>

            <h2 className="text-ivory">Sicherheit der Datenverarbeitung</h2>
            <p>Um personenbezogene Daten zu schützen, haben wir sowohl technische als auch organisatorische Maßnahmen umgesetzt. Wo es uns möglich ist, verschlüsseln oder pseudonymisieren wir personenbezogene Daten. Dadurch machen wir es im Rahmen unserer Möglichkeiten so schwer wie möglich, dass Dritte aus unseren Daten auf persönliche Informationen schließen können.</p>

            <h2 className="text-ivory">TLS-Verschlüsselung mit https</h2>
            <p>Wir verwenden HTTPS (das Hypertext Transfer Protocol Secure steht für „sicheres Hypertext-Übertragungsprotokoll“), um Daten abhörsicher im Internet zu übertragen.</p>
            <p>Durch den Einsatz von TLS (Transport Layer Security), einem Verschlüsselungsprotokoll zur sicheren Datenübertragung im Internet, können wir den Schutz vertraulicher Daten sicherstellen. Sie erkennen die Benutzung dieser Absicherung der Datenübertragung am kleinen Schlosssymbol links oben im Browser und der Verwendung des Schemas https.</p>
            
            <h2 className="text-ivory">Kommunikation</h2>
            <p>Wenn Sie mit uns Kontakt aufnehmen und per Telefon, E-Mail oder Online-Formular kommunizieren, kann es zur Verarbeitung personenbezogener Daten kommen. Die Daten werden für die Abwicklung und Bearbeitung Ihrer Frage und des damit zusammenhängenden Geschäftsvorgangs verarbeitet. Die Daten während eben solange gespeichert bzw. solange es das Gesetz vorschreibt.</p>
            <h3>Rechtsgrundlagen</h3>
            <p>Die Verarbeitung der Daten basiert auf den folgenden Rechtsgrundlagen:</p>
            <ul>
                <li>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung): Sie geben uns die Einwilligung Ihre Daten zu speichern und weiter für den Geschäftsfall betreffende Zwecke zu verwenden;</li>
                <li>Art. 6 Abs. 1 lit. b DSGVO (Vertrag): Es besteht die Notwendigkeit für die Erfüllung eines Vertrags mit Ihnen oder einem Auftragsverarbeiter oder wir müssen die Daten für vorvertragliche Tätigkeiten verarbeiten;</li>
                <li>Art. 6 Abs. 1 lit. f DSGVO (Berechtigte Interessen): Wir wollen Kundenanfragen und geschäftliche Kommunikation in einem professionellen Rahmen betreiben. Dazu sind gewisse technische Einrichtungen notwendig, um die Kommunikation effizient betreiben zu können.</li>
            </ul>

            <h2 className="text-ivory">Cookies</h2>
            <h3>Was sind Cookies?</h3>
            <p>Unsere Website verwendet HTTP-Cookies, um nutzerspezifische Daten zu speichern. Ein Cookie ist eine kleine Text-Datei, die in Ihrem Browser gespeichert wird. Cookies speichern gewisse Nutzerdaten von Ihnen, wie beispielsweise Sprache oder persönliche Seiteneinstellungen. Wenn Sie unsere Seite wieder aufrufen, übermittelt Ihr Browser die „userbezogenen“ Informationen an unsere Seite zurück. Dank der Cookies weiß unsere Website, wer Sie sind und bietet Ihnen die Einstellung, die Sie gewohnt sind.</p>
            <h3>Wie kann ich Cookies löschen?</h3>
            <p>Wie und ob Sie Cookies verwenden wollen, entscheiden Sie selbst. Unabhängig von welchem Service oder welcher Website die Cookies stammen, haben Sie immer die Möglichkeit Cookies zu löschen, zu deaktivieren oder nur teilweise zuzulassen. Anleitungen dazu finden Sie in den Einstellungen Ihres Browsers.</p>
            <h3>Rechtsgrundlage</h3>
            <p>Für unbedingt notwendige Cookies bestehen berechtigte Interessen (Artikel 6 Abs. 1 lit. f DSGVO), die in den meisten Fällen wirtschaftlicher Natur sind. Soweit nicht unbedingt erforderliche Cookies zum Einsatz kommen, geschieht dies nur im Falle Ihrer Einwilligung. Rechtsgrundlage ist insoweit Art. 6 Abs. 1 lit. a DSGVO.</p>

            <h2 className="text-ivory">Webhosting</h2>
            <h3>Was ist Webhosting?</h3>
            <p>Wenn Sie heutzutage Websites besuchen, werden gewisse Informationen – auch personenbezogene Daten – automatisch erstellt und gespeichert, so auch auf dieser Website. Wenn Sie eine Website auf einem Computer, Tablet oder Smartphone ansehen möchten, verwenden Sie dafür ein Programm, das sich Webbrowser nennt. Um die Website anzuzeigen, muss sich der Browser zu einem anderen Computer verbinden, wo der Code der Website gespeichert ist: dem Webserver. Der Betrieb eines Webservers ist eine komplizierte und aufwendige Aufgabe, weswegen dies in der Regel von professionellen Anbietern, den Providern, übernommen wird. Diese bieten Webhosting an und sorgen damit für eine verlässliche und fehlerfreie Speicherung der Daten von Websites.</p>
            <h3>1&1 IONOS Webhosting</h3>
            <p>Wir haben im Sinne des Artikels 28 der Datenschutz-Grundverordnung (DSGVO) mit IONOS (1&1 IONOS SE, Elgendorfer Str. 57, 56410 Montabaur, Deutschland) einen Auftragsverarbeitungsvertrag (AVV) abgeschlossen. Dieser Vertrag ist gesetzlich vorgeschrieben, weil IONOS in unserem Auftrag personenbezogene Daten verarbeitet. Darin wird geklärt, dass IONOS Daten, die sie von uns erhalten, nur nach unserer Weisung verarbeiten darf und die DSGVO einhalten muss.</p>
            <p>Die Rechtmäßigkeit der Verarbeitung personenbezogener Daten im Rahmen des Webhosting ergibt sich aus Art. 6 Abs. 1 lit. f DSGVO (Wahrung der berechtigten Interessen), denn die Nutzung von professionellem Hosting bei einem Provider ist notwendig, um das Unternehmen im Internet sicher und nutzerfreundlich präsentieren und Angriffe und Forderungen hieraus gegebenenfalls verfolgen zu können.</p>

            <h2 className="text-ivory">WhatsApp</h2>
            <p>Wir verwenden auf unserer Website den Instant-Messaging-Dienst WhatsApp. Dienstanbieter ist das amerikanische Unternehmen WhatsApp Inc., ein Tochterunternehmen von Meta Platforms Inc. Für den europäischen Raum ist das Unternehmen WhatsApp Ireland Limited, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland verantwortlich.</p>
            <p>Als Grundlage der Datenverarbeitung bei Empfängern mit Sitz in Drittstaaten (außerhalb der Europäischen Union) oder einer Datenweitergabe dorthin verwendet WhatsApp sogenannte Standardvertragsklauseln (= Art. 46. Abs. 2 und 3 DSGVO). Durch diese Klauseln verpflichtet sich WhatsApp, bei der Verarbeitung Ihrer relevanten Daten, das europäische Datenschutzniveau einzuhalten, selbst wenn die Daten in den USA gespeichert, verarbeitet und verwaltet werden.</p>
            <p>Mehr über die Daten, die durch die Verwendung von WhatsApp verarbeitet werden, erfahren Sie in der Privacy Policy auf <a href="https://www.whatsapp.com/privacy" target="_blank" rel="noopener noreferrer">https://www.whatsapp.com/privacy</a>.</p>

            <h2 className="text-ivory">Schlusswort</h2>
            <p>Uns ist es wichtig, Sie nach bestem Wissen und Gewissen über die Verarbeitung personenbezogener Daten zu informieren. Dabei wollen wir Ihnen aber nicht nur mitteilen, welche Daten verarbeitet werden, sondern auch die Beweggründe für die Verwendung diverser Softwareprogramme näherbringen.</p>
            <p>Bei Fragen zum Thema Datenschutz auf unserer Website zögern Sie bitte nicht, uns oder die verantwortliche Stelle zu kontaktieren.</p>
            
            <p className="text-sm mt-12">Quelle: Erstellt mit dem Datenschutz Generator von AdSimple</p>
        </div>
      </div>
    </div>
  )
}

export default DatenschutzPage 