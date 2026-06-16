import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#14375A] text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image src="/logo-footer-transparent.webp" alt="Melers Pesulapalvelut" width={110} height={110} className="w-[110px] h-auto" />
            </div>
            <p className="font-inter text-white/60 text-base leading-relaxed">
              Kotiovelle. Puhtaana.<br />Turussa vuodesta 1967.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-sora font-bold text-white/50 text-base uppercase tracking-widest mb-4">Sivut</p>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Etusivu", href: "/" },
                { label: "Palvelut", href: "/palvelut" },
                { label: "Hinnasto", href: "/hinnasto" },
                { label: "Yrityksille", href: "/yrityksille" },
                { label: "Meistä", href: "/meista" },
                { label: "Ota Yhteyttä", href: "/yhteys" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="font-inter text-white/60 text-base hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sora font-bold text-white/50 text-base uppercase tracking-widest mb-4">Yhteystiedot</p>
            <div className="flex flex-col gap-2.5 font-inter text-white/60 text-base">
              <p>Kaskenkatu 12, 20700 Turku</p>
              <p>Ma–pe 10–17 · La 10–14</p>
              <p className="text-[#FFE6E2] text-xs font-semibold">Kesä: lauantait suljettu 1.6.–31.8. · Heinäkuu suljettu kokonaan.</p>
              <p className="text-white/40 text-xs">Yritysasiakkaat: ma–pe 6–17</p>
              <a href="tel:+35822331718" className="text-[#FF8F7A] hover:text-[#FFE6E2] transition-colors">
                +358 22 331718
              </a>
              <a href="/yhteys" className="text-[#FF8F7A] hover:text-[#FFE6E2] transition-colors">
                Ota yhteyttä →
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-inter text-white/30 text-base">
            © {new Date().getFullYear()} Melers Pesulapalvelut Oy. Kaikki oikeudet pidätetään.
          </p>
          <p className="font-inter text-white/20 text-base italic">
            Kotiovelle. Puhtaana.
          </p>
        </div>
      </div>
    </footer>
  );
}
