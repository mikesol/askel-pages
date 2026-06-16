import { useState } from 'react'

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const data: Record<string, string> = { source: window.location.pathname }
    new FormData(e.currentTarget).forEach((v, k) => { data[k] = v as string })
    try {
      const r = await fetch('/api/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (r.ok) setDone(true)
      else setError('Virhe. Yritä uudelleen tai soita: +358 22 331718')
    } catch {
      setError('Virhe. Yritä uudelleen tai soita: +358 22 331718')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center">
        <p className="font-sora font-bold text-[#14375A] text-lg mb-2">Viesti lähetetty!</p>
        <p className="font-inter text-[#14375A]/65 text-sm">Palataan teille 24 tunnissa.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl p-8">
      <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-2">Lomake</p>
      <h2 className="font-merriweather font-normal text-[#14375A] text-2xl mb-6">Lähetä viesti</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-sora text-xs font-bold text-[#14375A]">Nimi *</label>
            <input name="nimi" type="text" placeholder="Etunimi Sukunimi" required className="bg-[#F1F2F4] border border-transparent rounded-xl px-4 py-3 font-inter text-sm text-[#14375A] placeholder-[#14375A]/30 outline-none focus:border-[#FF8F7A] focus:bg-white transition-colors" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-sora text-xs font-bold text-[#14375A]">Yritys</label>
            <input name="yritys" type="text" placeholder="Valinnainen" className="bg-[#F1F2F4] border border-transparent rounded-xl px-4 py-3 font-inter text-sm text-[#14375A] placeholder-[#14375A]/30 outline-none focus:border-[#FF8F7A] focus:bg-white transition-colors" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-sora text-xs font-bold text-[#14375A]">Sähköposti *</label>
          <input name="email" type="email" placeholder="sinä@esimerkki.fi" required className="bg-[#F1F2F4] border border-transparent rounded-xl px-4 py-3 font-inter text-sm text-[#14375A] placeholder-[#14375A]/30 outline-none focus:border-[#FF8F7A] focus:bg-white transition-colors" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-sora text-xs font-bold text-[#14375A]">Puhelin</label>
          <input name="puhelin" type="tel" placeholder="+358 40 123 4567" className="bg-[#F1F2F4] border border-transparent rounded-xl px-4 py-3 font-inter text-sm text-[#14375A] placeholder-[#14375A]/30 outline-none focus:border-[#FF8F7A] focus:bg-white transition-colors" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-sora text-xs font-bold text-[#14375A]">Asia *</label>
          <select name="asia" required className="bg-[#F1F2F4] border border-transparent rounded-xl px-4 py-3 font-inter text-sm text-[#14375A] outline-none focus:border-[#FF8F7A] focus:bg-white transition-colors appearance-none">
            <option value="">Valitse</option>
            <option>Pyykinpesu — nouto ja toimitus</option>
            <option>Kemiallinen pesu</option>
            <option>Yrityspalvelut / Tarjouspyyntö</option>
            <option>Liinavaatevuokraus</option>
            <option>Muu kysymys</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-sora text-xs font-bold text-[#14375A]">Viesti</label>
          <textarea name="viesti" rows={3} placeholder="Kerro lisää tarpestasi..." className="bg-[#F1F2F4] border border-transparent rounded-xl px-4 py-3 font-inter text-sm text-[#14375A] placeholder-[#14375A]/30 outline-none focus:border-[#FF8F7A] focus:bg-white transition-colors resize-none" />
        </div>
        {error && <p className="font-inter text-red-500 text-sm text-center">{error}</p>}
        <button type="submit" disabled={submitting} className="w-full bg-[#FF8F7A] text-white font-sora font-bold py-3.5 rounded-full hover:bg-[#ff7a63] transition-colors mt-1 disabled:opacity-60">
          {submitting ? 'Lähetetään...' : 'Lähetä →'}
        </button>
        <p className="font-inter text-xs text-[#14375A]/40 text-center">Vastaamme 1 arkipäivän kuluessa.</p>
      </form>
    </div>
  )
}
