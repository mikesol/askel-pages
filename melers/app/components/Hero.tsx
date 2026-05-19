"use client";
import { useBookingModal } from "./ModalProvider";

export default function Hero() {
  const { openBookingModal } = useBookingModal();
  return (
    <section id="etusivu" className="flex min-h-screen pt-16 bg-white overflow-hidden">

      {/* Left: copy panel */}
      <div className="flex flex-col justify-center w-full md:w-[44%] shrink-0 px-8 md:px-16 py-20">
        <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-5">
          Luotettavaa laatua jo vuodesta 1957
        </p>
        <h1 className="font-merriweather font-normal text-[#14375A] text-5xl md:text-[3.75rem] leading-[1.15] mb-6">
          Kotiovelle.<br />Puhtaana.
        </h1>
        <p className="font-inter text-[#14375A]/65 text-base leading-relaxed mb-10 max-w-sm">
          Melers Pesulapalvelut tarjoaa laadukkaat pesu- ja
          tekstiilihuoltopalvelut kotiin ja yrityksille.
        </p>
        <div className="flex flex-wrap items-center gap-5">
          <button
            onClick={openBookingModal}
            className="inline-flex items-center gap-2 bg-[#FF8F7A] text-white font-sora font-bold px-7 py-3.5 rounded-full hover:bg-[#ff7a63] transition-colors text-base"
          >
            Tilaa kuljetus →
          </button>
          <a
            href="#palvelut"
            className="inline-flex items-center gap-2 text-[#14375A] font-sora font-bold text-base hover:text-[#FF8F7A] transition-colors"
          >
            <span className="w-9 h-9 rounded-full border border-[#14375A]/20 flex items-center justify-center text-sm shrink-0">
              ▶
            </span>
            Näin se toimii
          </a>
        </div>
      </div>

      {/* Right: full-height image */}
      <div className="hidden md:block flex-1 relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-new.webp"
          alt="Melers Pesulapalvelut — puhtaita tekstiilejä"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay: white → transparent, blends left edge into text section */}
        <div className="absolute inset-0" style={{background: "linear-gradient(to right, #ffffff 0%, #ffffff 5%, transparent 40%)"}} />
      </div>

    </section>
  );
}
