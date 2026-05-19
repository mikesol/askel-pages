"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useBookingModal } from "./ModalProvider";

const links = [
  { label: "Etusivu", href: "/" },
  { label: "Palvelut", href: "/palvelut" },
  { label: "Hinnasto", href: "/hinnasto" },
  { label: "Yrityksille", href: "/yrityksille" },
  { label: "Meistä", href: "/meista" },
  { label: "Ota Yhteyttä", href: "/yhteys" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openBookingModal } = useBookingModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-white/35 backdrop-blur-md border-b border-white/20 shadow-sm"
        : "bg-transparent border-b border-transparent"
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="shrink-0">
          <Image src="/logo-nav.webp" alt="Melers Pesulapalvelut" width={148} height={36} className="h-9 w-auto" />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-sora text-sm text-[#14375A]/70 hover:text-[#14375A] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Phone + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+35822331718"
            className="font-sora text-sm font-semibold text-[#14375A]/70 hover:text-[#14375A] transition-colors"
          >
            +358 22 331718
          </a>
          <button
            onClick={openBookingModal}
            className="inline-flex items-center gap-2 bg-[#FF8F7A] text-white font-sora font-bold text-sm px-5 py-2.5 rounded-full hover:bg-[#ff7a63] transition-colors"
          >
            Tilaa kuljetus
          </button>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-[#14375A]">
          <div className="w-5 h-px bg-current mb-1.5" />
          <div className="w-5 h-px bg-current mb-1.5" />
          <div className="w-5 h-px bg-current" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-[#E9E4DF] px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-sora text-sm text-[#14375A]"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => { setOpen(false); openBookingModal(); }}
            className="inline-flex items-center justify-center bg-[#FF8F7A] text-white font-sora font-bold text-sm px-5 py-2.5 rounded-full"
          >
            Tilaa kuljetus
          </button>
          <a
            href="tel:+35822331718"
            className="font-sora font-semibold text-sm text-[#14375A] text-center"
          >
            +358 22 331718
          </a>
        </div>
      )}
    </nav>
  );
}
