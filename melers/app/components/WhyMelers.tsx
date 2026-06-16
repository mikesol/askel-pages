import Link from "next/link";

export default function WhyMelers() {
  return (
    <section className="bg-[#E9E4DF] py-20">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-8 items-stretch">

          {/* Left: Google Maps */}
          <div className="rounded-3xl overflow-hidden min-h-[380px]">
            <iframe
              src="https://maps.google.com/maps?q=Kaskenkatu+12,+20700+Turku,+Finland&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "380px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Melers Pesulapalvelut — Kaskenkatu 12, Turku"
            />
          </div>

          {/* Right: Promotion card */}
          <div className="bg-[#14375A] rounded-3xl p-10 flex flex-col justify-between">
            <div>
              <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-4">
                Tarjous uusille asiakkaille
              </p>
              <h2 className="font-merriweather font-normal text-white text-3xl md:text-4xl mb-5">
                Ensimmäinen nouto ilmaiseksi
              </h2>
              <p className="font-inter text-white/70 text-base leading-relaxed mb-2">
                Uusille asiakkaille: ensimmäinen noutokerta veloituksetta. Kokeile kotiinkuljetuspalvelua ilman riskiä.
              </p>
            </div>

            <div className="mt-8">
              <Link
                href="/yhteys"
                className="inline-flex items-center gap-2 bg-[#FF8F7A] text-white font-sora font-bold px-7 py-3.5 rounded-full hover:bg-[#ff7a63] transition-colors text-sm"
              >
                Tilaa ilmainen nouto →
              </Link>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="font-sora font-semibold text-white text-sm mb-1">Kaskenkatu 12, Turku</p>
                <p className="font-inter text-white/50 text-xs">Ma–pe 10–17 · La 10–14</p>
                <p className="font-inter text-[#FFE6E2] text-xs font-semibold">Kesä: la suljettu 1.6.–31.8. · Heinäkuu suljettu.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
