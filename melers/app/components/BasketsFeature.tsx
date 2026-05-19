"use client";
import Image from "next/image";
import { useBookingModal } from "./ModalProvider";

export default function BasketsFeature() {
  const { openBookingModal } = useBookingModal();
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-12">
          <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-3">
            Helppo asioida
          </p>
          <h2 className="font-merriweather font-normal text-[#14375A] text-4xl">
            Valitse sinulle sopiva tapa
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Option 1: Store */}
          <div className="bg-[#F1F2F4] rounded-3xl p-10 flex flex-col gap-5">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 p-3">
              <Image src="/icons/Artboard_10.svg" alt="" width={28} height={28} className="w-full h-full object-contain" style={{ filter: "brightness(0) saturate(100%) invert(20%) sepia(30%) saturate(700%) hue-rotate(180deg)" }} />
            </div>
            <div>
              <h3 className="font-sora font-semibold text-[#14375A] text-2xl mb-2">
                Tuo myymälään
              </h3>
              <p className="font-inter text-[#14375A]/65 text-base leading-relaxed">
                Käy myymälässämme Turun keskustassa. Jätä vaatteet — hoidamme loput.
              </p>
            </div>
            <div className="flex flex-col gap-1.5 font-inter text-sm text-[#14375A]/60">
              <p>Kaskenkatu 12, Turku</p>
              <p>Ma–pe 10–17 · La 10–14</p>
              <p className="text-xs text-[#14375A]/40 mt-1">Valmis 4–8 päivässä</p>
            </div>
          </div>

          {/* Option 2: Home delivery */}
          <div className="bg-[#14375A] rounded-3xl p-10 flex flex-col gap-5">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 p-3">
              <Image src="/icons/Artboard_7.svg" alt="" width={28} height={28} className="w-full h-full object-contain" style={{ filter: "brightness(0) invert(1)" }} />
            </div>
            <div>
              <h3 className="font-sora font-semibold text-white text-2xl mb-2">
                Kotiinkuljetus
              </h3>
              <p className="font-inter text-white/70 text-base leading-relaxed">
                Noudamme tekstiilisi oveltasi ja toimitamme puhtaana takaisin. Turku ja lähikunnat.
              </p>
            </div>
            <div className="mt-auto">
              <p className="font-sora font-bold text-[#FF8F7A] text-2xl mb-4">
                <span className="font-inter font-normal text-white/50 text-xs mr-1">alk.</span>10,99€<span className="font-inter font-normal text-white/50 text-sm">/suunta</span>
              </p>
              <button
                onClick={openBookingModal}
                className="inline-flex items-center gap-2 bg-[#FF8F7A] text-white font-sora font-bold px-6 py-3 rounded-full hover:bg-[#ff7a63] transition-colors text-sm"
              >
                Tilaa nouto →
              </button>
              <p className="text-xs text-white/35 mt-3">Valmis 4–8 päivässä</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
