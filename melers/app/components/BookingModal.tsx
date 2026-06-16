"use client";
import { useEffect, useState } from "react";

interface Slot {
  date: string;
  period: string;
  fi: string;
  fiPeriod: string;
}

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00Z");
  return `${d.getUTCDate()}.${d.getUTCMonth() + 1}.`;
}

type Step = "slots" | "form" | "success" | "error";

const PAGE_SIZE = 8; // 4 cols × 2 rows desktop, 2 cols × 4 rows mobile

export default function BookingModal({ open, onClose }: BookingModalProps) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoaded, setSlotsLoaded] = useState(false);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState(false);
  const [page, setPage] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [step, setStep] = useState<Step>("slots");

  const [nimi, setNimi] = useState("");
  const [osoite, setOsoite] = useState("");
  const [puhelin, setPuhelin] = useState("");
  const [email, setEmail] = useState("");
  const [lisatiedot, setLisatiedot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (open && !slotsLoaded) {
      setSlotsLoaded(true);
      setSlotsLoading(true);
      fetch("/api/booking/slots")
        .then((r) => r.json())
        .then((data) => {
          const fetched = data.slots ?? [];
          setSlots(fetched);
          if (fetched.length === 0) setSlotsError(true);
        })
        .catch(() => setSlotsError(true))
        .finally(() => setSlotsLoading(false));
    }
  }, [open, slotsLoaded]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  function reset() {
    setSelectedSlot(null);
    setStep("slots");
    setPage(0);
    setNimi(""); setOsoite(""); setPuhelin(""); setEmail(""); setLisatiedot("");
    setFormError("");
    setSubmitting(false);
  }

  function handleClose() {
    reset();
    onClose();
  }

  async function handleSubmit() {
    if (!nimi.trim() || !osoite.trim()) {
      setFormError("Täytä pakolliset kentät (*).");
      return;
    }
    setSubmitting(true);
    setFormError("");
    try {
      const r = await fetch("/api/booking/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slot_date: selectedSlot!.date,
          slot_period: selectedSlot!.period,
          nimi, osoite, puhelin, email, lisatiedot,
        }),
      });
      if (r.ok) {
        setStep("success");
      } else {
        setStep("error");
      }
    } catch {
      setStep("error");
    } finally {
      setSubmitting(false);
    }
  }

  const totalPages = Math.ceil(slots.length / PAGE_SIZE);
  const pageSlots = slots.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const periodTime = selectedSlot?.period === "morning" ? "klo 7–12" : "klo 12–16";

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] overflow-y-auto"
      style={{ background: "rgba(20,55,90,0.6)" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className="min-h-full flex items-start justify-center px-4 py-6">
        <div className="bg-white rounded-3xl w-full max-w-[680px] p-10 relative my-auto">
          <button
            aria-label="Sulje"
            onClick={handleClose}
            className="absolute top-4 right-4 text-[#14375A] text-2xl leading-none px-2 py-1 hover:opacity-60 transition-opacity"
          >
            ✕
          </button>

          <p className="font-sora text-[11px] font-bold tracking-widest text-[#FF8F7A] uppercase mb-2.5">
            Tilaa kuljetus
          </p>
          <h2 className="font-merriweather font-normal text-[#14375A] text-[32px] mb-2">
            Varaa nouto
          </h2>
          <p className="font-inter text-[#14375A]/65 text-[15px] mb-7">
            Valitse sinulle sopiva päivä ja aika.
          </p>

          {/* Slot grid */}
          {slotsError ? (
            <p className="font-inter text-red-500 text-sm">
              Ei saatavilla. Soita: +358 22 331718
            </p>
          ) : slotsLoading ? (
            <p className="font-inter text-[#999] text-sm">Ladataan...</p>
          ) : (
            <div className="mb-7">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
                {pageSlots.map((slot) => {
                  const key = `${slot.date}-${slot.period}`;
                  const isSelected = selectedSlot?.date === slot.date && selectedSlot?.period === slot.period;
                  return (
                    <button
                      key={key}
                      onClick={() => { setSelectedSlot(slot); setStep("form"); }}
                      className={`border-2 rounded-2xl px-4 py-3 font-sora text-left transition-colors ${
                        isSelected
                          ? "border-[#FF8F7A] bg-[#FFF5F3]"
                          : "border-[#E9E4DF] bg-white hover:border-[#FF8F7A]"
                      }`}
                    >
                      <div className="font-bold text-[#14375A] text-sm leading-snug">{slot.fi} {formatDate(slot.date)}</div>
                      <div className="text-[#14375A]/60 text-[12px] mt-0.5">{slot.fiPeriod}</div>
                    </button>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="flex items-center gap-1.5 font-sora font-bold text-sm text-[#14375A] disabled:opacity-30 hover:text-[#FF8F7A] transition-colors disabled:hover:text-[#14375A]"
                  >
                    ← Edellinen
                  </button>
                  <span className="font-inter text-[#14375A]/40 text-xs">{page + 1} / {totalPages}</span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={page === totalPages - 1}
                    className="flex items-center gap-1.5 font-sora font-bold text-sm text-[#14375A] disabled:opacity-30 hover:text-[#FF8F7A] transition-colors disabled:hover:text-[#14375A]"
                  >
                    Seuraava →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Booking form */}
          {step === "form" && selectedSlot && (
            <div className="bg-[#F1F2F4] rounded-2xl p-7 max-w-[520px]">
              <h3 className="font-sora font-bold text-[#14375A] text-[15px] mb-4">
                Varaa {selectedSlot.fi} {formatDate(selectedSlot.date)} — {selectedSlot.fiPeriod}
              </h3>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Nimi *"
                  value={nimi}
                  onChange={(e) => setNimi(e.target.value)}
                  className="bg-white border border-[#E9E4DF] rounded-xl px-4 py-3 font-inter text-sm text-[#14375A] outline-none focus:border-[#FF8F7A] transition-colors"
                />
                <input
                  type="text"
                  placeholder="Nouto-osoite *"
                  value={osoite}
                  onChange={(e) => setOsoite(e.target.value)}
                  className="bg-white border border-[#E9E4DF] rounded-xl px-4 py-3 font-inter text-sm text-[#14375A] outline-none focus:border-[#FF8F7A] transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Puhelin"
                  value={puhelin}
                  onChange={(e) => setPuhelin(e.target.value)}
                  className="bg-white border border-[#E9E4DF] rounded-xl px-4 py-3 font-inter text-sm text-[#14375A] outline-none focus:border-[#FF8F7A] transition-colors"
                />
                <input
                  type="email"
                  placeholder="Sähköposti"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border border-[#E9E4DF] rounded-xl px-4 py-3 font-inter text-sm text-[#14375A] outline-none focus:border-[#FF8F7A] transition-colors"
                />
                <textarea
                  rows={3}
                  placeholder="Lisätiedot (valinnainen)"
                  value={lisatiedot}
                  onChange={(e) => setLisatiedot(e.target.value)}
                  className="bg-white border border-[#E9E4DF] rounded-xl px-4 py-3 font-inter text-sm text-[#14375A] outline-none focus:border-[#FF8F7A] transition-colors resize-none"
                />
                {formError && (
                  <p className="font-inter text-red-500 text-sm text-center">{formError}</p>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="bg-[#FF8F7A] text-white font-sora font-bold text-sm py-3.5 px-6 rounded-full hover:bg-[#ff7a63] transition-colors disabled:opacity-60"
                >
                  {submitting ? "Lähetetään..." : "Vahvista varaus →"}
                </button>
              </div>
            </div>
          )}

          {/* Success */}
          {step === "success" && selectedSlot && (
            <div className="bg-[#14375A] text-white rounded-2xl p-8 text-center max-w-[520px]">
              <p className="font-sora font-bold text-xl mb-2">Varaus vahvistettu!</p>
              <p className="font-inter text-sm opacity-80 mb-5">
                Nouto {selectedSlot.fi.toLowerCase()}na {formatDate(selectedSlot.date)} {selectedSlot.fiPeriod} {periodTime}.<br />
                Vahvistus lähetetty sähköpostiisi.
              </p>
              <button
                onClick={handleClose}
                className="bg-[#FF8F7A] text-white font-sora font-bold text-sm px-6 py-3 rounded-full hover:bg-[#ff7a63] transition-colors"
              >
                Sulje
              </button>
            </div>
          )}

          {/* Error */}
          {step === "error" && (
            <p className="font-inter text-red-500 text-sm mt-3">
              Virhe. Soita: +358 22 331718
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
