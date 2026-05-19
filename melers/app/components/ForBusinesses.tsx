const services = [
  {
    icon: "↻",
    title: "Säännöllinen nouto ja toimitus",
    desc: "Sopitun aikataulun mukaan — viikoittain tai useammin. Ei häiriöitä toimintaanne.",
  },
  {
    icon: "✓",
    title: "Hygieniastandardit täytetty",
    desc: "Hoiva-alan vaatimukset huomioitu. Puhdas, turvallinen ja dokumentoitu prosessi.",
  },
  {
    icon: "◇",
    title: "Joustava sopimus",
    desc: "Skaalautuu tarpeen mukaan. Enemmän lomakaudella, vähemmän hiljaisena aikana.",
  },
  {
    icon: "≡",
    title: "Volyymipohjainen hinnoittelu",
    desc: "Mitä enemmän, sen edullisemmin. Tarjoukset aina yksilöllisesti.",
  },
  {
    icon: "◻",
    title: "Liinavaatevuokraus",
    desc: "Pitkäaikaisasiakkaille tarjoamme liinavaatteiden ja pyyhkeiden vuokrauksen — ei omaa hankintaa, ei varastointia.",
  },
];

const customerTypes = [
  {
    label: "Hoivakodit",
    vatExempt: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 21C12 21 3 15.5 3 9.5a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-9 11.5-9 11.5z"/>
      </svg>
    ),
    desc: "Hygieniastandardit täytetty. Asukkaiden vaatteet kirjataan ja palautetaan oikealle henkilölle — ei sekaannuksia, ei katoamisia. Liinavaatevuokraus saatavilla. Palvelu toimitetaan ALV 0 % — merkittävä kustannussäästö.",
  },
  {
    label: "Päiväkodit",
    vatExempt: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="9" cy="7" r="2"/>
        <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        <path d="M21 21v-2a4 4 0 0 0-3-3.85"/>
      </svg>
    ),
    desc: "Lasten vaatteet ja tekstiilit puhtaina turvallisesti. Hygieniavaatimukset täytetty. Palvelu toimitetaan ALV 0 % — merkittävä kustannussäästö budjetille.",
  },
  {
    label: "Hotellit",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/>
        <path d="M2 14h20"/>
        <path d="M7 14v-3a1 1 0 0 1 1-1h3v4"/>
      </svg>
    ),
    desc: "Nopea liinojen kierto — lakanat ja pyyhkeet takaisin käyttöön ajoissa. Liinavaatevuokraus pitkäaikaisasiakkaille, ei omaa varastoa eikä hankintaa.",
  },
  {
    label: "Ravintolat",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M3 11l19-9-9 19-2-8-8-2z"/>
      </svg>
    ),
    desc: "Pöytäliinat, esiliinat ja keittiötekstiilit puhtaina viikosta toiseen. Tahranpoisto ammattimaisesti — ei hylättyjä liinoja.",
  },
  {
    label: "Kuntosalit",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M6.5 6.5h11M6.5 17.5h11M2 9.5h3v5H2zM19 9.5h3v5h-3zM5 12h14"/>
      </svg>
    ),
    desc: "Pyyhkeiden jatkuva kierto ilman katkoksia. Ei varastohuolia — puhtaita pyyhkeitä aina saatavilla. Mattopesu ammattimaisesti.",
  },
  {
    label: "Toimistot",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      </svg>
    ),
    desc: "Työvaatteet ja matot hoidettu ilman omaa logistiikkaa. Yksinkertainen sopimus, joustava aikataulu.",
  },
];

const steps = [
  { num: "1", title: "Ota yhteyttä", desc: "Kerro tarpeestasi — lähetämme tarjouksen 24 tunnissa." },
  { num: "2", title: "Sovitaan aikataulu", desc: "Räätälöimme noudot ja toimitukset kalenterisi mukaan." },
  { num: "3", title: "Me hoidamme loput", desc: "Tekstiilit noudetaan, pestään ja toimitetaan. Sinulle jää aika tärkeämpään." },
];

const faqs = [
  {
    q: "Kuinka usein nouto tapahtuu?",
    a: "Sovitaan yhdessä — viikoittain, kaksi kertaa viikossa tai tarpeen mukaan. Aikataulua voidaan muuttaa joustoin.",
  },
  {
    q: "Onko minimisopimusta tai sitoutumisaikaa?",
    a: "Sopimusehdot sovitaan aina asiakkaan tarpeen mukaan. Volyymi vaihtelee — enemmän kiireaikoina, vähemmän hiljaisina jaksoina. Joustamme teidän rytmiinne.",
  },
  {
    q: "Täyttääkö pesuprosessinne hoiva-alan hygieniastandardit?",
    a: "Kyllä. Pesuprosessimme täyttää sosiaali- ja terveydenhuollon tekstiilihuollon vaatimukset.",
  },
  {
    q: "Miten hinnoittelu toimii?",
    a: "Volyymipohjainen — tarjous räätälöidään teidän tarpeenne mukaan. Mitä enemmän, sitä edullisemmin per kg.",
  },
];

export default function ForBusinesses() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#14375A] overflow-hidden min-h-screen flex items-stretch">
        <div className="w-full grid md:grid-cols-[45%_55%]">
          {/* Copy */}
          <div className="flex items-center px-8 md:px-16 py-20 md:py-0">
            <div className="max-w-lg">
              <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-6">
                Yrityksille · Turun Suurpesula
              </p>
              <h1 className="font-merriweather font-normal text-white text-4xl md:text-5xl leading-snug mb-6">
                Tekstiilihuolto —<br />
                <span className="text-[#FF8F7A]">sujuvasti ja luotettavasti</span>
              </h1>
              <p className="font-inter text-white/65 text-base leading-relaxed mb-10">
                Pesemme vuosittain yli 170 000 kg tekstiilejä hoivakodeille, hotelleille ja yrityksille. Yksi sopimus, nimetty palvelupäällikkö, ei häiriöitä arkeesi.
              </p>
              <div className="flex flex-wrap gap-4 mb-14">
                <a
                  href="#yhteys"
                  className="inline-flex items-center gap-2 bg-[#FF8F7A] text-white font-sora font-bold px-7 py-3.5 rounded-full hover:bg-[#ff7a63] transition-colors text-sm"
                >
                  Pyydä tarjous →
                </a>
                <a
                  href="#miten-toimii"
                  className="inline-flex items-center gap-2 border border-white/30 text-white font-sora font-bold px-7 py-3.5 rounded-full hover:border-white/60 transition-colors text-sm"
                >
                  Miten se toimii?
                </a>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
                <div>
                  <div className="font-merriweather font-normal text-3xl text-[#FF8F7A] mb-1">25+</div>
                  <div className="font-inter text-white/50 text-xs leading-snug">vuotta teollisuuspesula<br />toiminnassa</div>
                </div>
                <div>
                  <div className="font-merriweather font-normal text-3xl text-[#FF8F7A] mb-1">24 h</div>
                  <div className="font-inter text-white/50 text-xs leading-snug">tarjouksen<br />toimitusaika</div>
                </div>
              </div>
            </div>
          </div>
          {/* Image — full height right half with gradient blend */}
          <div className="hidden md:block relative min-h-screen">
            <img
              src="/photo-van-big.webp"
              alt="Melers Pesulapalvelut — yrityskuljetus"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Gradient overlay: navy → transparent, blends left edge into the text section */}
            <div className="absolute inset-0" style={{background: "linear-gradient(to right, #14375A 0%, #14375A 5%, transparent 40%)"}} />
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="bg-[#F1F2F4] py-20">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-4">
              Miksi Melers?
            </p>
            <h2 className="font-merriweather font-normal text-[#14375A] text-3xl md:text-4xl leading-snug mb-6">
              Me hoidamme —<br />te teette omaa työtänne
            </h2>
            <p className="font-inter text-[#14375A]/65 text-base leading-relaxed mb-4">
              Tekstiilihuolto toimii parhaiten silloin, kun ette joudu ajattelemaan sitä. Säännölliset noudot sovitun aikataulun mukaan, kaikki kirjataan ja palautetaan — ei kadonneita pyyhkeitä, ei yllätyksiä.
            </p>
            <p className="font-inter text-[#14375A]/65 text-base leading-relaxed">
              Jokaisella asiakkaalla on nimetty palvelupäällikkö, joka tuntee teidän tilanteenne. Kun tarvitsette jotain, vastaukseen ei mene kauan.
            </p>
          </div>
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-hidden max-h-48">
              <img
                src="/photo-hotel.webp"
                alt="Puhtaita liinavaatteita hotelleille"
                className="w-full object-cover object-center"
              />
            </div>
            <div className="p-8">
              <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-5">
                Mitä saat meiltä
              </p>
              <ul className="flex flex-col gap-5">
                {services.map((s) => (
                  <li key={s.title} className="flex items-start gap-4">
                    <span className="text-[#FF8F7A] text-xl shrink-0 mt-0.5 w-6">{s.icon}</span>
                    <div>
                      <div className="font-sora font-bold text-[#14375A] text-sm mb-1">{s.title}</div>
                      <div className="font-inter text-[#14375A]/60 text-sm leading-relaxed">{s.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Customer types */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12 text-center">
            <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-4">
              Palvelemme muun muassa
            </p>
            <h2 className="font-merriweather font-normal text-[#14375A] text-3xl md:text-4xl">
              Ratkaisut eri toimialoille
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {customerTypes.map((c) => (
              <div key={c.label} className="bg-[#F1F2F4] rounded-2xl p-6 relative">
                {c.vatExempt && (
                  <span className="absolute top-4 right-4 bg-[#14375A] text-white font-sora font-bold text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full">
                    ALV 0 %
                  </span>
                )}
                <div className="text-[#FF8F7A] mb-3">{c.icon}</div>
                <div className="font-sora font-semibold text-[#14375A] text-base mb-2">{c.label}</div>
                <div className="font-inter text-[#14375A]/65 text-sm leading-relaxed">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="miten-toimii" className="bg-[#F1F2F4] py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12 text-center">
            <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-4">
              Prosessi
            </p>
            <h2 className="font-merriweather font-normal text-[#14375A] text-3xl md:text-4xl">
              Kolme askelta puhtaaseen ratkaisuun
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {steps.map((s) => (
              <div key={s.num} className="bg-white rounded-2xl p-7 relative">
                <div className="font-merriweather font-normal text-6xl text-[#FF8F7A]/20 leading-none mb-4">
                  {s.num}
                </div>
                <div className="font-sora font-semibold text-[#14375A] text-lg mb-3">{s.title}</div>
                <div className="font-inter text-[#14375A]/60 text-sm leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>

          {/* Facility note */}
          <div className="flex items-center gap-4 bg-white/60 rounded-2xl px-6 py-4 mb-8">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#FF8F7A] shrink-0">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <p className="font-inter text-[#14375A]/65 text-sm">
              Pesulatoimintamme pyörii Turun Suurpesulan teollisuuslaitoksessa <span className="font-semibold text-[#14375A]">Telekatu 6, Turku</span> — kapasiteetti yli 170 000 kg vuodessa.
            </p>
          </div>

          {/* Palvelujohtaja CTA */}
          <div className="bg-white rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Contact info */}
              <div className="p-8 flex flex-col justify-center gap-6">
                <div className="flex items-center gap-4">
                  <img
                    src="/photo-palvelujohtaja.webp"
                    alt="Palvelujohtaja"
                    className="w-16 h-16 rounded-full object-cover object-top shrink-0"
                  />
                  <div>
                    <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-1">Ota yhteyttä</p>
                    <p className="font-inter text-[#14375A]/70 text-sm leading-relaxed">
                      Soita palvelujohtajalle suoraan tai varaa aika kalenterista.
                    </p>
                  </div>
                </div>
                <a href="tel:+123456789" className="font-sora font-bold text-[#14375A] text-2xl hover:text-[#FF8F7A] transition-colors">
                  +123456789
                </a>
                <a
                  href="#yhteys"
                  className="inline-flex items-center gap-2 bg-[#FF8F7A] text-white font-sora font-bold px-7 py-3.5 rounded-full hover:bg-[#ff7a63] transition-colors text-sm w-fit"
                >
                  Täytä lomake →
                </a>
              </div>
              {/* Calendar */}
              <div className="border-t md:border-t-0 md:border-l border-[#E9E4DF]">
                <div className="px-6 pt-6 pb-2">
                  <p className="font-sora font-bold text-xs uppercase tracking-widest text-[#FF8F7A] mb-1">Varaa tapaaminen</p>
                  <p className="font-inter text-[#14375A]/60 text-sm">Valitse sinulle sopiva aika.</p>
                </div>
                <iframe
                  src="https://calendar.app.google/d9QWgxLT7vrYU8ar6"
                  style={{width: "100%", height: "420px", border: "none"}}
                  title="Varaa tapaaminen"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-[#14375A] py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="font-merriweather font-normal text-[#FF8F7A] text-6xl leading-none mb-6">&ldquo;</div>
          <blockquote className="font-merriweather font-normal text-white text-2xl md:text-3xl leading-snug mb-8">
            Melers on hoitanut tekstiilihuoltomme jo vuosia. Luotettava, joustava ja aina ajallaan.
            Suosittelen kaikille hoivakodin johtajille.
          </blockquote>
          <p className="font-sora text-[#FF8F7A] font-bold text-sm tracking-wide">— Asiakas, Turku</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-12 text-center">
            <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-4">
              Usein kysyttyä
            </p>
            <h2 className="font-merriweather font-normal text-[#14375A] text-3xl">
              Kysymyksiä ja vastauksia
            </h2>
          </div>
          <div className="flex flex-col divide-y divide-[#E9E4DF]">
            {faqs.map((f) => (
              <div key={f.q} className="py-6">
                <div className="font-sora font-bold text-[#14375A] text-base mb-2">{f.q}</div>
                <div className="font-inter text-[#14375A]/65 text-sm leading-relaxed">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="yhteys" className="bg-[#FF8F7A] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-merriweather font-normal text-white text-4xl md:text-5xl leading-snug mb-4">
              Pyydä maksuton tarjous
            </h2>
            <p className="font-inter text-white/80 text-base leading-relaxed max-w-xl mx-auto">
              Täytä lomake tai varaa suoraan tapaaminen kalenterista — palataan teille 24 tunnissa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Form */}
            <div className="bg-white rounded-2xl p-8 text-left">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Yrityksen nimi"
                className="font-inter text-[#14375A] placeholder-[#14375A]/40 border border-[#E9E4DF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF8F7A]"
              />
              <input
                type="text"
                placeholder="Toimiala (esim. hoivakoti, hotelli)"
                className="font-inter text-[#14375A] placeholder-[#14375A]/40 border border-[#E9E4DF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF8F7A]"
              />
              <input
                type="email"
                placeholder="Sähköposti"
                className="font-inter text-[#14375A] placeholder-[#14375A]/40 border border-[#E9E4DF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF8F7A]"
              />
              <input
                type="tel"
                placeholder="Puhelin"
                className="font-inter text-[#14375A] placeholder-[#14375A]/40 border border-[#E9E4DF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF8F7A]"
              />
              <textarea
                rows={3}
                placeholder="Kerro tarpestasi — volyymi, toimiala, aikataulu..."
                className="font-inter text-[#14375A] placeholder-[#14375A]/40 border border-[#E9E4DF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF8F7A] resize-none"
              />
              <button
                type="submit"
                className="font-sora font-bold text-sm bg-[#FF8F7A] text-white px-6 py-3.5 rounded-full hover:bg-[#ff7a63] transition-colors mt-2"
              >
                Lähetä tarjouspyyntö →
              </button>
            </div>
            <p className="font-inter text-[#14375A]/40 text-xs text-center mt-4">
              ⏱ Vastaamme 24 tunnissa. Ei sitoumuksia.
            </p>
            </div>

            {/* Calendar booking */}
            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="px-8 pt-8 pb-4">
                <p className="font-sora font-bold text-xs uppercase tracking-widest text-[#FF8F7A] mb-1">Tai varaa tapaaminen</p>
                <p className="font-inter text-[#14375A]/60 text-sm">Valitse sinulle sopiva aika suoraan kalenterista.</p>
              </div>
              <iframe
                src="https://calendar.app.google/d9QWgxLT7vrYU8ar6"
                style={{width: "100%", height: "500px", border: "none"}}
                title="Varaa tapaaminen"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
