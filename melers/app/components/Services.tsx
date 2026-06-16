import Image from "next/image";
import BookingButton from "./BookingButton";

const services = [
  {
    icon: "/icons/Artboard_2.svg",
    title: "Pyykinpesu",
    desc: "Arjen tekstiileille hellävaraista ja tehokasta pesua. Paidat, lakanat, pyyhkeet, peitot ja matot — kaikki puhtaana kotiovellesi.",
  },
  {
    icon: "/icons/Artboard_9.svg",
    title: "Kemiallinen pesu",
    desc: "Puvut, juhlavaatteet, takit ja silkki — herkät vaatteet käsitelty oikein, muoto ja väri säilyvät.",
  },
  {
    icon: "/icons/Artboard_4.svg",
    title: "Yrityspalvelut",
    desc: "Luotettavat pesulapalvelut yrityksille ja yhteisöille. Hoivakodit, hotellit ja ravintolat — sujuvasti hoidettu.",
    highlight: true,
  },
];

export default function Services() {
  return (
    <section id="palvelut" className="bg-[#F1F2F4] py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header + photo */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-3">
              Palvelumme
            </p>
            <h2 className="font-merriweather font-normal text-[#14375A] text-4xl">
              Kaikki tekstiilihuolto<br />yhdestä paikasta
            </h2>
          </div>
          <div className="rounded-3xl overflow-hidden aspect-[4/3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/photo-towels.webp"
              alt="Puhtaita tekstiilejä"
              className="w-full h-full object-cover object-[center_40%]"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-5">
          {services.map((s) => (
            <div
              key={s.title}
              className={`rounded-2xl p-7 flex flex-col gap-4 ${
                s.highlight
                  ? "bg-[#14375A] text-white"
                  : "bg-white text-[#14375A]"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center p-2 ${
                s.highlight ? "bg-white/10" : "bg-[#FFE6E2]"
              }`}>
                <Image
                  src={s.icon}
                  alt={s.title}
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                  style={{
                    filter: s.highlight
                      ? "brightness(0) invert(1)"
                      : "brightness(0) saturate(100%) invert(63%) sepia(60%) saturate(400%) hue-rotate(320deg)",
                  }}
                />
              </div>
              <h3 className={`font-sora font-semibold text-lg ${s.highlight ? "text-white" : "text-[#14375A]"}`}>
                {s.title}
              </h3>
              <p className={`font-inter text-sm leading-relaxed ${s.highlight ? "text-white/75" : "text-[#14375A]/65"}`}>
                {s.desc}
              </p>
              <a
                href={s.highlight ? "/yrityksille" : "#yhteys"}
                className="text-sm font-sora font-bold mt-auto text-[#FF8F7A]"
              >
                Lue lisää →
              </a>
            </div>
          ))}

          {/* Booking card */}
          <div className="rounded-2xl bg-[#FF8F7A] text-white p-7 flex flex-col justify-between">
            <div>
              <h3 className="font-sora font-semibold text-xl mb-3">
                Varaa pesulapalvelu
              </h3>
              <p className="font-inter text-sm text-white/80 leading-relaxed mb-6">
                Valitse sinulle sopiva aika — me hoidamme loput.
              </p>
            </div>
            <div>
              <BookingButton className="inline-flex items-center gap-2 bg-white text-[#FF8F7A] font-sora font-bold text-sm px-5 py-2.5 rounded-full hover:bg-[#FFE6E2] transition-colors">
                Varaa aika →
              </BookingButton>
              <p className="mt-3 text-xs text-white/60 font-inter">
                ⏱ Varaus vie vain 2 minuuttia
              </p>
            </div>
          </div>
        </div>

        {/* Quality promise */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="text-[#FF8F7A] text-lg">✦</span>
          <p className="font-inter text-[#14375A]/60 text-sm">
            <span className="font-sora font-bold text-[#14375A]">Tahratakuu:</span>{" "}
            Jos vaikea tahra ei lähde, pesemme uudelleen — veloituksetta.
          </p>
        </div>

      </div>
    </section>
  );
}
