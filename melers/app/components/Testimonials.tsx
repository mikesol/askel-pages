const testimonials = [
  {
    quote:
      "Vein juhlamekkoni kemialliseen pesuun ennen sisareni häitä. Mekossa oli pieni tahranäkymä kainalon kohdalla josta olin huolissani. Tuli takaisin täysin puhtaana ja viimeistelty huolellisesti. Ei muuhun pesulaan enää.",
    name: "Reetta S.",
    location: "Turku",
  },
  {
    quote:
      "Matot olivat jo sen verran likaiset etten itse uskaltanut pestä niitä. Soitin Melersille, he neuvoivat miten toimia ja nouto sovittiin samalle viikolle. Matot tulivat takaisin kuin uusina. Hinta oli myös kohtuullinen.",
    name: "Pekka V.",
    location: "Turku",
  },
  {
    quote:
      "Tilasin noutopalvelun äidilleni joka asuu Raisiossa. Lakanat ja pyyhkeet haetaan kerran kuukaudessa ja tuodaan puhtaina takaisin. Äiti sanoo ettei jaksa enää pestä itse, ja tämä on ollut todella helppo ratkaisu. Henkilökunta on ystävällistä ja aina täsmällisiä.",
    name: "Tuula H.",
    location: "Raisio",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#E9E4DF] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-3">
            Asiakkaiden sanoin
          </p>
          <h2 className="font-merriweather font-normal text-[#14375A] text-4xl">
            Mitä asiakkaamme sanovat
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 flex flex-col gap-6">
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#FF8F7A">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="font-inter text-[#14375A]/75 text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Attribution */}
              <div className="flex items-center gap-3 pt-2 border-t border-[#E9E4DF]">
                <div className="w-9 h-9 rounded-full bg-[#DDE7F0] flex items-center justify-center font-sora font-bold text-[#14375A] text-sm shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-sora font-bold text-[#14375A] text-sm">{t.name}</p>
                  <p className="font-inter text-[#14375A]/50 text-xs">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
