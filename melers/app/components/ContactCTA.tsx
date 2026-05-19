export default function ContactCTA() {
  return (
    <section id="yhteys" className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        {/* Left: info */}
        <div>
          <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-4">
            Ota Yhteyttä
          </p>
          <h2 className="font-merriweather font-normal text-[#14375A] text-4xl mb-6">
            Varaa aika tai<br />pyydä tarjous
          </h2>
          <p className="font-inter text-[#14375A]/65 text-base leading-relaxed mb-10">
            Jätä yhteystietosi niin otamme yhteyttä mahdollisimman pian.
            Yritysasiakkaat — pyydä tarjous niin räätälöimme teille sopivan ratkaisun.
          </p>

          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFE6E2] flex items-center justify-center text-[#FF8F7A] text-sm shrink-0">
                ✦
              </div>
              <div>
                <p className="font-sora font-bold text-[#14375A] text-sm">Sijainti</p>
                <p className="font-inter text-[#14375A]/60 text-sm">Turku, Finland — Kaskenkatu 12</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFE6E2] flex items-center justify-center text-[#FF8F7A] text-sm shrink-0">
                ✦
              </div>
              <div>
                <p className="font-sora font-bold text-[#14375A] text-sm">Palvelualue</p>
                <p className="font-inter text-[#14375A]/60 text-sm">Turku ja lähikunnat</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="bg-[#F1F2F4] rounded-3xl p-8">
          <form className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-sora text-xs font-bold text-[#14375A]">Nimi</label>
                <input
                  type="text"
                  placeholder="Etunimi Sukunimi"
                  className="bg-white border border-[#E9E4DF] rounded-xl px-4 py-3 font-inter text-sm text-[#14375A] placeholder-[#14375A]/30 outline-none focus:border-[#FF8F7A] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-sora text-xs font-bold text-[#14375A]">Yritys (valinnainen)</label>
                <input
                  type="text"
                  placeholder="Yrityksen nimi"
                  className="bg-white border border-[#E9E4DF] rounded-xl px-4 py-3 font-inter text-sm text-[#14375A] placeholder-[#14375A]/30 outline-none focus:border-[#FF8F7A] transition-colors"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-sora text-xs font-bold text-[#14375A]">Sähköposti</label>
              <input
                type="email"
                placeholder="sinä@esimerkki.fi"
                className="bg-white border border-[#E9E4DF] rounded-xl px-4 py-3 font-inter text-sm text-[#14375A] placeholder-[#14375A]/30 outline-none focus:border-[#FF8F7A] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-sora text-xs font-bold text-[#14375A]">Palvelu</label>
              <select className="bg-white border border-[#E9E4DF] rounded-xl px-4 py-3 font-inter text-sm text-[#14375A] outline-none focus:border-[#FF8F7A] transition-colors appearance-none">
                <option value="">Valitse palvelu</option>
                <option>Pyykinpesu</option>
                <option>Tekstiilihuolto</option>
                <option>Yrityspalvelut / Tarjouspyyntö</option>
                <option>Muu</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-sora text-xs font-bold text-[#14375A]">Viesti (valinnainen)</label>
              <textarea
                rows={3}
                placeholder="Kerro lisää tarpeistasi..."
                className="bg-white border border-[#E9E4DF] rounded-xl px-4 py-3 font-inter text-sm text-[#14375A] placeholder-[#14375A]/30 outline-none focus:border-[#FF8F7A] transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#FF8F7A] text-white font-sora font-bold py-3.5 rounded-full hover:bg-[#ff7a63] transition-colors"
            >
              Lähetä →
            </button>
            <p className="font-inter text-xs text-[#14375A]/40 text-center">
              Vastaamme 1 arkipäivän kuluessa.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
