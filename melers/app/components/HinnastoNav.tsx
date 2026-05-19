"use client";
import { useState } from "react";

const groups = [
  {
    label: "Kemiallinen pesu",
    items: [
      { label: "Juhlavaatteet", note: "per kappale", href: "#juhlavaatteet" },
      { label: "Takit", note: "per kappale", href: "#takit" },
    ],
  },
  {
    label: "Vesipesu",
    items: [
      { label: "Arjen vaatteet & työvaatteet", note: "per kg", href: "#vesipesu" },
      { label: "Lakanat, matot & täkit", note: "per kg / m²", href: "#kodintekstiilit" },
    ],
  },
];

const standalone = { label: "Kuljetus", href: "#kuljetus" };

export default function HinnastoNav() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="sticky top-16 z-40 bg-white border-b border-[#E9E4DF] shadow-sm">
      {/* Desktop */}
      <div className="hidden md:flex max-w-5xl mx-auto px-6 h-12 items-center gap-1">
        {groups.map((group) => (
          <div
            key={group.label}
            className="relative"
            onMouseEnter={() => setOpen(group.label)}
            onMouseLeave={() => setOpen(null)}
          >
            <button className="flex items-center gap-1.5 px-4 h-12 font-sora font-bold text-xs text-[#14375A] hover:text-[#FF8F7A] transition-colors">
              {group.label}
              <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor" className="opacity-50">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </svg>
            </button>
            {open === group.label && (
              <div className="absolute top-full left-0 bg-white rounded-xl shadow-lg border border-[#E9E4DF] py-2 min-w-[240px] z-50">
                {group.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(null)}
                    className="flex items-center justify-between gap-6 px-4 py-2.5 hover:bg-[#F1F2F4] transition-colors group"
                  >
                    <span className="font-sora font-bold text-sm text-[#14375A] group-hover:text-[#FF8F7A] transition-colors">
                      {item.label}
                    </span>
                    <span className="font-inter text-xs text-[#14375A]/40 shrink-0">{item.note}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="w-px h-5 bg-[#E9E4DF] mx-1" />

        <a
          href={standalone.href}
          className="px-4 h-12 flex items-center font-sora font-bold text-xs text-[#14375A] hover:text-[#FF8F7A] transition-colors"
        >
          {standalone.label}
        </a>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between px-6 h-12 font-sora font-bold text-xs text-[#14375A]"
        >
          <span>Siirry osioon</span>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor" className={`transition-transform ${mobileOpen ? "rotate-180" : ""}`}>
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </button>
        {mobileOpen && (
          <div className="border-t border-[#E9E4DF] pb-2">
            {groups.map((group) => (
              <div key={group.label}>
                <p className="font-sora font-bold text-xs text-[#14375A]/40 uppercase tracking-widest px-6 pt-4 pb-1">
                  {group.label}
                </p>
                {group.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-6 py-2.5 hover:bg-[#F1F2F4]"
                  >
                    <span className="font-sora font-bold text-sm text-[#14375A]">{item.label}</span>
                    <span className="font-inter text-xs text-[#14375A]/40">{item.note}</span>
                  </a>
                ))}
              </div>
            ))}
            <div className="border-t border-[#E9E4DF] mt-2">
              <a
                href={standalone.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-6 py-2.5 hover:bg-[#F1F2F4]"
              >
                <span className="font-sora font-bold text-sm text-[#14375A]">{standalone.label}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
