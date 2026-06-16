import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";

export const metadata = {
  title: "Ota Yhteyttä — Melers Pesulapalvelut",
  description: "Ota yhteyttä Melersiin — varaa aika, pyydä tarjous tai kysy lisää. Vastaamme 1 arkipäivässä.",
};

export default function Yhteys() {
  return (
    <>
      <Nav />
      <div className="pt-16">

        {/* Hero */}
        <section className="bg-[#14375A] overflow-hidden min-h-[55vh] flex items-stretch">
          <div className="w-full grid md:grid-cols-[55%_45%]">
            {/* Copy */}
            <div className="flex items-center px-8 md:px-16 py-20 md:py-0">
              <div className="max-w-lg">
                <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-6">
                  Ota Yhteyttä
                </p>
                <h1 className="font-merriweather font-normal text-white text-4xl md:text-5xl leading-snug mb-6">
                  Olemme täällä<br />
                  <span className="text-[#FF8F7A]">sinua varten</span>
                </h1>
                <p className="font-inter text-white/65 text-base leading-relaxed">
                  Käy liikkeessä, soita tai jätä viesti — hoidetaan asia yhdessä.
                </p>
              </div>
            </div>
            {/* Photo with gradient blend */}
            <div className="hidden md:block relative min-h-[55vh]">
              <img
                src="/photo-baskets.webp"
                alt="Melers Pesulapalvelut"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0" style={{background: "linear-gradient(to right, #14375A 0%, #14375A 5%, transparent 45%)"}} />
            </div>
          </div>
        </section>

        {/* Quick contact chips */}
        <section className="bg-white border-b border-[#E9E4DF]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E9E4DF]">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  ),
                  label: "Soita meille",
                  value: "+358 22 331718",
                  href: "tel:+35822331718",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  ),
                  label: "Sähköposti",
                  value: "myynti@melers.fi",
                  href: "mailto:myynti@melers.fi",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  ),
                  label: "Toimipiste",
                  value: "Kaskenkatu 12, Turku",
                  href: "https://maps.google.com/?q=Kaskenkatu+12,+Turku",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("https") ? "_blank" : undefined}
                  rel={item.href.startsWith("https") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 px-8 py-7 hover:bg-[#F1F2F4] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#FFE6E2] text-[#FF8F7A] flex items-center justify-center shrink-0 group-hover:bg-[#FF8F7A] group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-sora font-bold text-[#14375A] text-sm">{item.label}</p>
                    <p className="font-inter text-[#14375A]/60 text-sm">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Main: form + palvelujohtaja / calendar */}
        <section className="bg-[#F1F2F4] py-20">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-start">

            {/* Left: Contact form */}
            <ContactForm />

            {/* Right: palvelujohtaja + calendar */}
            <div className="flex flex-col gap-6">

              {/* Palvelujohtaja card */}
              <div className="bg-white rounded-3xl p-8 flex items-center gap-6">
                <img
                  src="/photo-palvelujohtaja.webp"
                  alt="Palvelujohtaja"
                  className="w-20 h-20 rounded-full object-cover object-top shrink-0"
                />
                <div className="flex-1">
                  <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-1">Palvelujohtaja</p>
                  <p className="font-inter text-[#14375A]/65 text-sm leading-relaxed mb-3">
                    Soita suoraan tai varaa tapaaminen alla olevasta kalenterista.
                  </p>
                  <a href="tel:0222321300" className="font-sora font-bold text-[#14375A] text-xl hover:text-[#FF8F7A] transition-colors">
                    02 2321300
                  </a>
                </div>
              </div>

              {/* Calendar booking */}
              <div className="bg-white rounded-3xl overflow-hidden">
                <div className="px-8 pt-7 pb-3">
                  <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-1">Varaa tapaaminen</p>
                  <p className="font-inter text-[#14375A]/60 text-sm">Valitse sinulle sopiva aika suoraan kalenterista.</p>
                </div>
                <iframe
                  src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ14fXOqowBDfPHNey_5OQgSrmRjQjYI84HGqepJbs9BCIpRU9rp9u7PZ50LSc3TnnHgUshxJJQD?gv=true"
                  style={{width: "100%", height: "600px", border: "none"}}
                  title="Varaa tapaaminen"
                />
              </div>

            </div>
          </div>
        </section>

        {/* Location + hours */}
        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Photo */}
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="/photo-van-big.webp"
                  alt="Melers Pesulapalvelut — toimitus"
                  className="w-full object-cover max-h-64 object-center"
                />
              </div>
              {/* Info */}
              <div>
                <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-4">Toimipiste</p>
                <h2 className="font-merriweather font-normal text-[#14375A] text-3xl mb-6">Löydät meidät Turusta</h2>
                <div className="flex flex-col gap-5">
                  {[
                    { label: "Osoite", value: "Kaskenkatu 12, 20700 Turku" },
                    { label: "Aukioloajat", value: "Ma–Pe 10–17 · La 10–14" },
                    { label: "Kesän poikkeusaukiolot", value: "Lauantait suljettu 1.6.–31.8. · Heinäkuu suljettu kokonaan." },
                    { label: "Yritysasiakkaat", value: "Ma–Pe 6–17" },
                    { label: "Palvelualue", value: "Turku ja lähikunnat — nouto ja toimitus" },
                    { label: "Vastausaika", value: "1 arkipäivä" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-[#FF8F7A] shrink-0 mt-1.5" />
                      <div>
                        <p className="font-sora font-bold text-[#14375A] text-sm">{item.label}</p>
                        <p className="font-inter text-[#14375A]/60 text-sm">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <a
                  href="https://maps.google.com/?q=Kaskenkatu+12,+Turku"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-8 font-sora font-bold text-sm text-[#14375A] hover:text-[#FF8F7A] transition-colors"
                >
                  Avaa Google Mapsissa →
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}
