"use client";
import Image from "next/image";
import { useBookingModal } from "./ModalProvider";

const steps = [
  {
    num: "01",
    title: "Tilaa palvelu",
    desc: "Varaa aika verkossa tai soittamalla. Kerro tarpeesi — räätälöimme palvelun sinulle.",
  },
  {
    num: "02",
    title: "Nouto kotioveltasi",
    desc: "Noudamme tekstiilit sovittuna aikana suoraan oveltasi Turussa.",
  },
  {
    num: "03",
    title: "Toimitetaan puhtaana",
    desc: "Puhdistetut ja viimeistellyt tekstiilit toimitetaan takaisin. Valmis 4–8 päivässä.",
  },
];

export default function HowItWorks() {
  const { openBookingModal } = useBookingModal();
  return (
    <section id="palvelut" className="bg-white py-20 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Van image strip */}
        <div className="relative rounded-2xl overflow-hidden mb-16">
          <Image
            src="/van.webp"
            alt="Melers kuljetusauto"
            width={1200}
            height={500}
            className="w-full h-64 md:h-80 object-cover object-center"
          />
          {/* Overlay with CTA */}
          <div className="absolute inset-0 bg-[#14375A]/40 flex items-center px-10 md:px-16">
            <div>
              <p className="font-sora font-bold text-white/80 text-xs uppercase tracking-widest mb-3">
                Kotiinkuljetus Turussa
              </p>
              <p className="font-merriweather font-normal text-white text-3xl md:text-4xl mb-6">
                Noudamme ja toimitamme<br />suoraan ovellesi.
              </p>
              <button
                onClick={openBookingModal}
                className="inline-flex items-center gap-2 bg-[#FF8F7A] text-white font-sora font-bold px-6 py-3 rounded-full hover:bg-[#ff7a63] transition-colors text-sm"
              >
                Tilaa kuljetus →
              </button>
            </div>
          </div>
        </div>

        <div className="mb-14 text-center">
          <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-3">
            Näin se toimii
          </p>
          <h2 className="font-merriweather font-normal text-[#14375A] text-4xl">
            Tilaa. Noudamme. Puhtaana takaisin.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* connector line */}
          <div className="hidden md:block absolute top-8 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-[#E9E4DF]" />

          {steps.map((step) => (
            <div key={step.num} className="flex flex-col items-center text-center gap-5">
              <div className="w-16 h-16 rounded-full bg-[#14375A] text-white font-sora font-semibold text-xl flex items-center justify-center shrink-0 relative z-10">
                {step.num}
              </div>
              <div>
                <h3 className="font-sora font-semibold text-[#14375A] text-xl mb-2">
                  {step.title}
                </h3>
                <p className="font-inter text-[#14375A]/65 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
