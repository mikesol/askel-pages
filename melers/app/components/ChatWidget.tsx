"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [nimi, setNimi] = useState("");
  const [email, setEmail] = useState("");
  const [viesti, setViesti] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const pathname = usePathname();

  async function handleSend() {
    if (!viesti.trim()) { setError("Kirjoita viesti."); return; }
    setSending(true);
    setError("");
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nimi, email, viesti, source: pathname }),
      });
      if (r.ok) {
        setSent(true);
      } else {
        setError("Virhe. Soita: +358 22 331718");
      }
    } catch {
      setError("Virhe. Soita: +358 22 331718");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 w-[300px] bg-white rounded-2xl shadow-2xl p-6 z-[9999]">
          {sent ? (
            <>
              <p className="font-sora font-bold text-[#14375A] mb-2">Viesti lähetetty!</p>
              <p className="font-inter text-sm text-[#14375A]/70">Palataan teille pian. 👋</p>
            </>
          ) : (
            <>
              <p className="font-sora font-bold text-[#14375A] mb-1">Lähetä viesti</p>
              <p className="font-inter text-[13px] text-[#14375A]/60 mb-4">Vastaamme 1 arkipäivässä.</p>
              <div className="flex flex-col gap-2.5">
                <input
                  type="text"
                  placeholder="Nimi"
                  value={nimi}
                  onChange={(e) => setNimi(e.target.value)}
                  className="bg-[#F1F2F4] rounded-xl px-3.5 py-2.5 font-inter text-[13px] text-[#14375A] outline-none"
                />
                <input
                  type="email"
                  placeholder="Sähköposti"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#F1F2F4] rounded-xl px-3.5 py-2.5 font-inter text-[13px] text-[#14375A] outline-none"
                />
                <textarea
                  rows={3}
                  placeholder="Kirjoita viesti..."
                  value={viesti}
                  onChange={(e) => setViesti(e.target.value)}
                  className="bg-[#F1F2F4] rounded-xl px-3.5 py-2.5 font-inter text-[13px] text-[#14375A] outline-none resize-none"
                />
                {error && <p className="font-inter text-red-500 text-[12px]">{error}</p>}
                <button
                  onClick={handleSend}
                  disabled={sending}
                  className="bg-[#FF8F7A] text-white font-sora font-bold text-[13px] py-3 rounded-full hover:bg-[#ff7a63] transition-colors disabled:opacity-60"
                >
                  {sending ? "Lähetetään..." : "Lähetä →"}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Trigger button */}
      <button
        aria-label="Avaa chat"
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#FF8F7A] text-white rounded-full flex items-center justify-center text-2xl shadow-lg z-[9998] hover:scale-110 transition-transform"
      >
        💬
      </button>
    </>
  );
}
