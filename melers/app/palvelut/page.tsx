import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Palvelut — Melers Pesulapalvelut",
  description: "Pyykinpesu, kemiallinen pesu ja yrityspalvelut Turussa. Nouto ja toimitus kotiovelle. Yli 79 vuoden kokemus.",
};

const steps = [
  {
    num: "1",
    title: "Tilaa nouto tai tuo itse",
    body: "Tilaa nouto ottamalla yhteyttä — sovitaan aika ja kerrot mitä pestään. Tai tuo suoraan myymälään: Kaskenkatu 12, ma–pe 10–17, la 10–14.",
  },
  {
    num: "2",
    title: "Me noudamme",
    body: "Tulemme kotiovellesi sovittuna aikana. Ei tarvitse lajitella — hoidamme sen puolestasi.",
  },
  {
    num: "3",
    title: "Palautamme puhtaana",
    body: "Sovimme toimituspäivän ja -ajan etukäteen. Soitamme noin tunnin ennen saapumista.",
  },
];

export default function Palvelut() {
  return (
    <>
      <Nav />
      <div className="pt-16">

        {/* Hero */}
        <section className="bg-[#14375A] pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-4">
              Palvelumme
            </p>
            <h1 className="font-merriweather font-normal text-white text-4xl md:text-5xl leading-snug mb-4">
              Kaikki tekstiilihuolto<br />samasta paikasta
            </h1>
            <p className="font-inter text-white/65 text-base leading-relaxed max-w-xl mx-auto">
              Pyykinpesusta kemialliseen pesuun — noudamme, pesemme, viikkaamme ja palautamme. Nouto ja toimitus alk. 10,99 € / suunta.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-[#F1F2F4] py-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-3">
                Näin se toimii
              </p>
              <h2 className="font-merriweather font-normal text-[#14375A] text-3xl md:text-4xl">
                Kolme vaihetta riittää
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <div key={step.num} className="bg-white rounded-3xl p-8">
                  <div className="w-10 h-10 rounded-full bg-[#14375A] flex items-center justify-center mb-5">
                    <span className="font-sora font-bold text-sm text-white">{step.num}</span>
                  </div>
                  <h3 className="font-sora font-bold text-[#14375A] text-base mb-2">{step.title}</h3>
                  <p className="font-inter text-[#14375A]/65 text-sm leading-relaxed mb-3">{step.body}</p>
                  {step.num === "1" && (
                    <div className="flex flex-col gap-1.5 mt-1">
                      <a href="tel:+35822331718" className="font-sora font-bold text-xs text-[#FF8F7A] hover:text-[#ff7a63] transition-colors">
                        (02) 233 1718
                      </a>
                      <a href="mailto:myynti@melers.fi" className="font-sora font-bold text-xs text-[#FF8F7A] hover:text-[#ff7a63] transition-colors">
                        myynti@melers.fi
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-12 rounded-3xl overflow-hidden">
              <Image
                src="/van.webp"
                alt="Melers Pesulapalvelut — nouto ja toimitus"
                width={1200}
                height={500}
                className="w-full object-cover object-center max-h-64 md:max-h-80"
              />
            </div>
            <p className="text-center font-inter text-sm text-[#14375A]/50 mt-8">
              Ensimmäinen nouto on ilmainen — kokeile huoletta.
            </p>
          </div>
        </section>

        {/* Pyykinpesu — dominant */}
        <section id="pyykinpesu" className="bg-white py-20">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-2">01</p>
              <h2 className="font-merriweather font-normal text-[#14375A] text-4xl mb-3">Pyykinpesu</h2>
              <p className="font-sora font-bold text-sm text-[#FF8F7A] mb-4">Arjen tekstiilit huolella hoidettu</p>
              <p className="font-inter text-base leading-relaxed text-[#14375A]/65 mb-8">
                Paidat, lakanat, pyyhkeet, peitot, matot — kaikki samalla tilauksella. Noudamme, pesemme ammattimaisesti ja toimitamme takaisin puhtaana. Hinnoittelu kilon mukaan, minimitilaus 4 kg.
              </p>

              <div className="flex gap-6 mb-8 p-4 rounded-2xl bg-[#F1F2F4]">
                <div className="text-center">
                  <p className="font-sora font-bold text-xs uppercase tracking-widest mb-1 text-[#14375A]/40">Toimitusaika</p>
                  <p className="font-sora font-bold text-sm text-[#14375A]">4–8 päivässä</p>
                </div>
                <div className="w-px bg-[#E9E4DF]" />
                <div className="text-center">
                  <p className="font-sora font-bold text-xs uppercase tracking-widest mb-1 text-[#14375A]/40">Minimitilaus</p>
                  <p className="font-sora font-bold text-sm text-[#14375A]">4 kg</p>
                </div>
                <div className="w-px bg-[#E9E4DF]" />
                <div className="text-center">
                  <p className="font-sora font-bold text-xs uppercase tracking-widest mb-1 text-[#14375A]/40">Kuljetus</p>
                  <p className="font-sora font-bold text-sm text-[#14375A]">alk. 10,99 €</p>
                </div>
              </div>

              <Link
                href="/yhteys"
                className="inline-flex items-center gap-2 bg-[#FF8F7A] text-white font-sora font-bold px-7 py-3.5 rounded-full hover:bg-[#ff7a63] transition-colors text-sm"
              >
                Tilaa nouto →
              </Link>
              <Link
                href="/hinnasto#vesipesu"
                className="inline-flex items-center gap-2 ml-4 text-[#14375A]/60 font-sora font-bold text-sm hover:text-[#14375A] transition-colors"
              >
                Katso hinnat →
              </Link>
            </div>

            <div className="rounded-3xl overflow-hidden bg-[#F1F2F4]">
              <div className="overflow-hidden max-h-52">
                <Image
                  src="/photo-towels.webp"
                  alt="Puhtaita tekstiilejä — Melers Pesulapalvelut"
                  width={800}
                  height={400}
                  className="w-full object-cover object-left"
                />
              </div>
              <div className="p-8">
                <p className="font-sora font-bold text-xs uppercase tracking-widest mb-5 text-[#FF8F7A]">Mitä sisältyy</p>
                <ul className="flex flex-col gap-4">
                  {[
                    "Liinavaatteet: pesu, mankeli ja viikkaus",
                    "Käyttövaatteet: pesu, silitys ja viikkaus",
                    "Tahratakuu — jos tahra ei lähde, pesemme uudelleen veloituksetta",
                    "Nouto ja toimitus kotiovelle alk. 10,99 € / suunta",
                    "Voit myös tuoda myymälään — Kaskenkatu 12, Turku",
                    "Palveluseteli hyväksytty maksuvälineenä (ALV 0 %)",
                  ].map((d) => (
                    <li key={d} className="flex items-start gap-3">
                      <span className="text-[#FF8F7A] shrink-0 mt-0.5">✦</span>
                      <span className="font-inter text-sm leading-relaxed text-[#14375A]/75">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Kemiallinen pesu — secondary */}
        <section id="kemiallinen-pesu" className="bg-[#F1F2F4] py-20">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start md:[&>*:first-child]:order-2">
            <div>
              <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-2">02</p>
              <h2 className="font-merriweather font-normal text-[#14375A] text-4xl mb-3">Kemiallinen pesu</h2>
              <p className="font-sora font-bold text-sm text-[#FF8F7A] mb-4">Juhlavaatteet ja takit oikein käsiteltyinä</p>
              <p className="font-inter text-base leading-relaxed text-[#14375A]/65 mb-8">
                Puvut, juhlavaatteet, takit ja silkki — herkät tekstiilit puhdistetaan kemiallisesti ilman vettä. Muoto ja väri säilyvät, materiaalin rakenne pysyy ehjänä. Hinnoittelu kappaleittain.
              </p>

              <div className="flex gap-6 mb-8 p-4 rounded-2xl bg-white">
                <div className="text-center">
                  <p className="font-sora font-bold text-xs uppercase tracking-widest mb-1 text-[#14375A]/40">Toimitusaika</p>
                  <p className="font-sora font-bold text-sm text-[#14375A]">4–8 päivässä</p>
                </div>
                <div className="w-px bg-[#E9E4DF]" />
                <div className="text-center">
                  <p className="font-sora font-bold text-xs uppercase tracking-widest mb-1 text-[#14375A]/40">Hinnoittelu</p>
                  <p className="font-sora font-bold text-sm text-[#14375A]">Per kappale</p>
                </div>
              </div>

              <Link
                href="/yhteys"
                className="inline-flex items-center gap-2 bg-[#FF8F7A] text-white font-sora font-bold px-7 py-3.5 rounded-full hover:bg-[#ff7a63] transition-colors text-sm"
              >
                Kysy lisää →
              </Link>
              <Link
                href="/hinnasto#juhlavaatteet"
                className="inline-flex items-center gap-2 ml-4 text-[#14375A]/60 font-sora font-bold text-sm hover:text-[#14375A] transition-colors"
              >
                Katso hinnat →
              </Link>
            </div>

            <div className="rounded-3xl overflow-hidden bg-white">
              <div className="overflow-hidden max-h-52">
                <Image
                  src="/photo-dry-cleaning-2.webp"
                  alt="Kemiallinen pesu — Melers Pesulapalvelut"
                  width={800}
                  height={400}
                  className="w-full object-cover object-center"
                />
              </div>
              <div className="p-8">
                <p className="font-sora font-bold text-xs uppercase tracking-widest mb-5 text-[#FF8F7A]">Mitä sisältyy</p>
                <ul className="flex flex-col gap-4">
                  {[
                    "Materiaalitarkistus ennen käsittelyä",
                    "Kemiallinen puhdistus liuottimilla (ei vettä)",
                    "Silitys ja muotoilu käsittelyn jälkeen",
                    "Suojapussitus ja huolellinen pakkaus",
                    "Morsiuspuvut, frakkipuvut ja erikoisvaatteet",
                  ].map((d) => (
                    <li key={d} className="flex items-start gap-3">
                      <span className="text-[#FF8F7A] shrink-0 mt-0.5">✦</span>
                      <span className="font-inter text-sm leading-relaxed text-[#14375A]/75">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Yrityspalvelut */}
        <section id="yrityspalvelut" className="bg-[#DDE7F0] py-20">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-2">03</p>
              <h2 className="font-merriweather font-normal text-[#14375A] text-4xl mb-3">Yrityspalvelut</h2>
              <p className="font-sora font-bold text-sm text-[#FF8F7A] mb-4">Luotettava kumppani yrityksellesi</p>
              <p className="font-inter text-base leading-relaxed text-[#14375A]/65 mb-5">
                Pesemme vuosittain yli 170 000 kg tekstiilejä hoivakodeille, hotelleille ja yrityksille. Säännölliset noudot, volyymipohjainen hinnoittelu ja nimetty palvelupäällikkö — yksi sopimus, ei huolia.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Hoivakodit", "Hotellit", "Ravintolat", "Toimistot"].map((s) => (
                  <span key={s} className="font-sora font-bold text-xs text-[#14375A]/60 border border-[#14375A]/20 rounded-full px-3 py-1">
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex gap-6 mb-8 p-4 rounded-2xl bg-white/60">
                <div className="text-center">
                  <p className="font-sora font-bold text-xs uppercase tracking-widest mb-1 text-[#14375A]/40">Toimitusaika</p>
                  <p className="font-sora font-bold text-sm text-[#14375A]">Sovitun mukaan</p>
                </div>
                <div className="w-px bg-[#14375A]/10" />
                <div className="text-center">
                  <p className="font-sora font-bold text-xs uppercase tracking-widest mb-1 text-[#14375A]/40">Hinnoittelu</p>
                  <p className="font-sora font-bold text-sm text-[#14375A]">Volyymipohjainen</p>
                </div>
              </div>

              <Link
                href="/yrityksille"
                className="inline-flex items-center gap-2 bg-[#14375A] text-white font-sora font-bold px-7 py-3.5 rounded-full hover:bg-[#0f2a45] transition-colors text-sm"
              >
                Pyydä tarjous →
              </Link>
            </div>

            <div className="rounded-3xl overflow-hidden bg-white">
              <div className="overflow-hidden max-h-52">
                <Image
                  src="/photo-hotel.webp"
                  alt="Yrityspalvelut — Melers Pesulapalvelut"
                  width={800}
                  height={400}
                  className="w-full object-cover object-center"
                />
              </div>
              <div className="p-8">
                <p className="font-sora font-bold text-xs uppercase tracking-widest mb-5 text-[#FF8F7A]">Mitä sisältyy</p>
                <ul className="flex flex-col gap-4">
                  {[
                    "Räätälöity nouto- ja toimitusaikataulu",
                    "Volyymipohjainen hinnoittelu",
                    "Hygieniastandardit täytetty (hoiva-ala)",
                    "Liinavaatevuokraus pitkäaikaisasiakkaille — liinavaatteet ja pyyhkeet",
                    "Nimetty palvelupäällikkö",
                  ].map((d) => (
                    <li key={d} className="flex items-start gap-3">
                      <span className="text-[#FF8F7A] shrink-0 mt-0.5">✦</span>
                      <span className="font-inter text-sm leading-relaxed text-[#14375A]/75">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#FF8F7A] py-16">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-merriweather font-normal text-white text-3xl md:text-4xl mb-4">
              Etkö ole varma mitä tarvitset?
            </h2>
            <p className="font-inter text-white/80 text-base leading-relaxed mb-8">
              Kerromme mielellämme mikä palvelu sopii tilanteeseen parhaiten.
            </p>
            <Link
              href="/yhteys"
              className="inline-flex items-center gap-2 bg-white text-[#FF8F7A] font-sora font-bold px-8 py-4 rounded-full hover:bg-[#FFE6E2] transition-colors"
            >
              Ota yhteyttä →
            </Link>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}
