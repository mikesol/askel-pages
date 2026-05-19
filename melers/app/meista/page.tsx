import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Meistä — Melers Pesulapalvelut",
  description: "Melers Pesulapalvelut on turkulainen perheyritys vuodesta 1967. Lue tarina, arvot ja tiimi.",
};

const values = [
  {
    title: "Laatu",
    subtitle: "Oikea tulos joka kerta",
    desc: "Oikea pesuohjelma jokaiselle tekstiilille. Ammattilaismenetelmät, asiantunteva käsittely ja laadukkaat pesuaineet — ei kompromisseja.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
  {
    title: "Helppous",
    subtitle: "Varaa helposti, me hoidamme loput",
    desc: "Tilaa verkossa tai soittamalla, nouto ovelta, toimitus sovitusti. Pesutilauksen tekeminen kestää minuutin — pesula ei saa olla lisävaiva.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
  },
  {
    title: "Ystävällisyys",
    subtitle: "Henkilökohtainen palvelu",
    desc: "Tuttu kasvo, nimetty palvelupäällikkö, nopea vastaus. Olemme ihmisiä ihmisille — jokaisella asiakkaalla on oma yhteyshenkilö.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

const timeline = [
  { year: "1967", event: "Pesutoiminta alkaa Kaskenkadussa 12 — sama osoite, jossa toimimme tänäkin päivänä." },
  { year: "2001", event: "Minna ja Mika Elers perustavat Pesulan ja jatkavat pitkää pesulaperintöä." },
  { year: "2010", event: "Turun Suurpesula perustetaan — teollisuuspesulakapasiteetti kasvaa merkittävästi." },
  { year: "2026", event: "Uusi brändi, sama lupaus: Kotiovelle. Puhtaana." },
];


export default function Meista() {
  return (
    <>
      <Nav />
      <div className="pt-16">

        {/* Hero — group photo + headline */}
        <section className="bg-[#14375A] overflow-hidden min-h-[70vh] flex items-stretch">
          <div className="w-full grid md:grid-cols-[50%_50%]">
            {/* Copy */}
            <div className="flex items-center px-8 md:px-16 py-20 md:py-0">
              <div className="max-w-lg">
                <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-6">
                  Meistä
                </p>
                <h1 className="font-merriweather font-normal text-white text-4xl md:text-5xl leading-snug mb-6">
                  Turkulainen perheyritys.<br />
                  <span className="text-[#FF8F7A]">Vuodesta 1967.</span>
                </h1>
                <p className="font-inter text-white/65 text-base leading-relaxed mb-10">
                  Melers on syntynyt turkulaisesta yrittäjyydestä ja kasvanut kahden sukupolven huolellisen työn tuloksena. Alusta asti sama ajatus: hoidetaan pyykit niin hyvin, että asiakas voi keskittyä muuhun.
                </p>
                {/* Value pills */}
                <div className="flex flex-wrap gap-3">
                  {["Laatu", "Helppous", "Ystävällisyys"].map((v) => (
                    <span key={v} className="font-sora font-bold text-xs tracking-wide text-white border border-white/25 px-4 py-2 rounded-full">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* Group photo with gradient blend */}
            <div className="hidden md:block relative min-h-[70vh]">
              <img
                src="/team.webp"
                alt="Melersin tiimi"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0" style={{background: "linear-gradient(to right, #14375A 0%, #14375A 5%, transparent 40%)"}} />
            </div>
          </div>
        </section>

        {/* Values — 3 cards */}
        <section className="bg-white py-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-3">
                Arvomme
              </p>
              <h2 className="font-merriweather font-normal text-[#14375A] text-3xl md:text-4xl">
                Mitä uskomme
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {values.map((v) => (
                <div key={v.title} className="bg-[#F1F2F4] rounded-2xl p-8 flex flex-col gap-4">
                  <div className="text-[#FF8F7A]">{v.icon}</div>
                  <div>
                    <h3 className="font-sora font-bold text-[#14375A] text-xl mb-1">{v.title}</h3>
                    <p className="font-sora text-[#FF8F7A] text-xs font-semibold mb-3">{v.subtitle}</p>
                    <p className="font-inter text-[#14375A]/65 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story + Timeline */}
        <section className="bg-[#F1F2F4] py-20">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-4">
                Tarina
              </p>
              <h2 className="font-merriweather font-normal text-[#14375A] text-3xl mb-6">
                Puhtautta Turussa yli puoli vuosisataa
              </h2>
              <div className="flex flex-col gap-5 font-inter text-[#14375A]/65 text-base leading-relaxed">
                <p>
                  Pesutoiminta Kaskenkadussa 12 alkoi jo vuonna 1967. Vuonna 2001 Minna ja Mika Elers jatkoivat tätä perinnettä perustamalla Pesulan — ja vuonna 2010 syntyi Turun Suurpesula, kun kapasiteetti kasvoi teollisuusluokkaan.
                </p>
                <p>
                  Vuosikymmenten aikana olemme palvelleet tuhansia turkulaisperheitä, hoivakoteja, hotelleja ja ravintoloita.
                  Kasvamme harkitusti — emme koskaan laadun kustannuksella.
                </p>
                <p>
                  Kotiinkuljetuspalvelu syntyi kuuntelemalla asiakkaitamme: elämä on kiireistä, pesula ei saa olla se lisähuoli.
                  Nyt haemme ja toimitamme suoraan ovellesi.
                </p>
              </div>
            </div>
            {/* Timeline */}
            <div className="flex flex-col gap-0">
              {timeline.map((t, i) => (
                <div key={t.year} className="flex gap-5">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#14375A] text-white flex items-center justify-center font-sora font-bold text-xs shrink-0">
                      {t.year.slice(2)}
                    </div>
                    {i < timeline.length - 1 && (
                      <div className="w-px flex-1 bg-[#E9E4DF] my-1" />
                    )}
                  </div>
                  <div className="pb-8">
                    <p className="font-sora font-bold text-[#FF8F7A] text-xs mb-1">{t.year}</p>
                    <p className="font-inter text-[#14375A]/70 text-sm leading-relaxed">{t.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-white py-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-3">
                Tiimi
              </p>
              <h2 className="font-merriweather font-normal text-[#14375A] text-3xl md:text-4xl">
                Teitä palvelevat
              </h2>
              <p className="font-inter text-[#14375A]/55 text-base mt-4 max-w-lg mx-auto">
                Tiimimme yhteenlaskettu kokemus pesulaalalta on yli <span className="font-semibold text-[#14375A]">79 vuotta</span>. Jokainen tekstiili käsitellään ammattitaidolla.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-sm">
              <img
                src="/team.webp"
                alt="Melersin tiimi"
                className="w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Pull quote */}
        <section className="bg-[#14375A] py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <div className="font-merriweather font-normal text-[#FF8F7A] text-6xl leading-none mb-4">&ldquo;</div>
            <blockquote className="font-merriweather font-normal text-white text-2xl md:text-3xl leading-snug mb-6">
              Puhdasta arkea pehmeällä otteella.
            </blockquote>
            <p className="font-inter text-white/50 text-sm">Kotiovelle. Puhtaana. — Melers Pesulapalvelut, Turku</p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#FF8F7A] py-14">
          <div className="max-w-3xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-merriweather font-normal text-white text-3xl mb-2">Tule tutustumaan</h2>
              <p className="font-inter text-white/80 text-base">Tai tilaa ensimmäinen nouto verkossa.</p>
            </div>
            <Link
              href="/yhteys"
              className="font-sora font-bold bg-white text-[#FF8F7A] px-8 py-4 rounded-full hover:bg-[#FFE6E2] transition-colors shrink-0"
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
