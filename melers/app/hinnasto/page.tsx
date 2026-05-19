import Nav from "../components/Nav";
import Footer from "../components/Footer";
import HinnastoNav from "../components/HinnastoNav";
import pricing from "../../content/pricing.json";
import Link from "next/link";

export const metadata = {
  title: "Hinnasto — Melers Pesulapalvelut",
  description: "Selkeä hinnoittelu kemialliselle pesulle, kodintekstiileille ja kuljetukselle. Ensimmäinen nouto ilmaiseksi uusille asiakkaille.",
};

const juhlavaatteet = [
  { name: "Miesten puku", price: "39,00 €" },
  { name: "Miesten puku liivillä", price: "43,00 €" },
  { name: "Jakkupuku", price: "39,00 €" },
  { name: "Pikkutakki / Blazer", price: "23,00 €" },
  { name: "Suorat housut", price: "19,50 €" },
  { name: "Kauluspaita", price: "9,00 €" },
  { name: "Liivi", price: "13,00 €" },
  { name: "Leninki", price: "alk. 30,00 €" },
  { name: "Iltapuku pitkä", price: "alk. 49,00 €" },
  { name: "Morsiuspuku", price: "alk. 99,00 €" },
  { name: "Frakkipuku / Smokkipuku", price: "48,00 €" },
  { name: "Frakkitakki / Smokkitakki", price: "32,00 €" },
  { name: "Frakkihousut / Smokkihousut", price: "20,00 €" },
  { name: "Frakkiliivi", price: "13,50 €" },
  { name: "Frakkipaita", price: "19,00 €" },
  { name: "Puolihame", price: "19,50 €" },
  { name: "Hame pitkä", price: "21,00 €" },
  { name: "Hame vekattu", price: "28,00 €" },
  { name: "Neuleet (puserot, jakut)", price: "alk. 14,50 €" },
  { name: "Solmio / Huivi", price: "10,00 €" },
  { name: "Rusetti", price: "5,50 €" },
  { name: "Kastepuku", price: "alk. 30,00 €" },
];

const takit = [
  { name: "Ulkoilutakki / Pusakka", price: "23,00 €" },
  { name: "Trenssi ½", price: "34,00 €" },
  { name: "Trenssi ¾", price: "36,00 €" },
  { name: "Trenssi pitkä", price: "40,00 €" },
  { name: "Villakangastakki ½", price: "34,00 €" },
  { name: "Villakangastakki ¾", price: "36,00 €" },
  { name: "Villakangastakki pitkä", price: "40,00 €" },
  { name: "Kevytuntuvatakki / Toppatakki", price: "alk. 35,00 €" },
  { name: "Untuvatakki ½", price: "alk. 35,00 €" },
  { name: "Untuvatakki ¾", price: "alk. 38,00 €" },
  { name: "Untuvatakki pitkä", price: "alk. 40,00 €" },
  { name: "Canada Goose -takit", price: "alk. 55,00 €" },
  { name: "Nahkatakki / Mokkatakki", price: "alk. 80,00 €" },
];

const kodintekstiilit = [
  { name: "Liinavaatteet — lakanat, pussilakanat, pyyhkeet", price: "6,30 €/kg", note: "min. 4 kg, sisältää mankeloinnin" },
  { name: "Froteetekstiili (yli 50 % froteeta)", price: "7,90 €/kg", note: "min. 4 kg · sisältää: pesu, kuivaus ja viikkaus" },
  { name: "Pöytäliinat (mankeloitava)", price: "8,50 €/m²", note: "min. 1 m²" },
  { name: "Verhot (mankeloitava)", price: "alk. 7,50 €/m²", note: "" },
  { name: "Rumpupestävät matot", price: "alk. 16,50 €/m²", note: "" },
  { name: "Laakamatot", price: "alk. 16,50 €/m²", note: "" },
  { name: "Täkki", price: "alk. 30,00 €", note: "" },
  { name: "Huopa", price: "alk. 20,00 €", note: "" },
  { name: "Päiväpeite", price: "alk. 28,00 €", note: "" },
  { name: "Tyyny", price: "alk. 10,00 €", note: "" },
  { name: "Ryijy", price: "alk. 33,00 €/m²", note: "min. 1 m²" },
];

const muutpesut = [
  { name: "Vaatekilopesu — vesipestävä käyttövaate", price: "8,30 €/kg", note: "min. 4 kg, sisältää pesun ja kuivauksen" },
  { name: "Työtakki, ohut", price: "12,50 €", note: "" },
  { name: "Työtakki, paksu", price: "18,00 €", note: "" },
  { name: "Labratakki, lyhyt", price: "10,00 €", note: "" },
  { name: "Labratakki, pitkä", price: "12,50 €", note: "" },
];

const kuljetus = [
  { range: "0 – 5 km", price: "10,99 €" },
  { range: "5 – 8 km", price: "12,50 €" },
  { range: "8 – 10 km", price: "16,00 €" },
];

function PriceRow({ name, price, note }: { name: string; price: string; note?: string }) {
  return (
    <div className="flex items-start justify-between gap-6 py-3.5 border-b border-[#E9E4DF] last:border-0">
      <div className="flex-1">
        <span className="font-inter text-sm text-[#14375A] leading-snug">{name}</span>
        {note && <p className="font-inter text-xs text-[#14375A]/40 mt-0.5">{note}</p>}
      </div>
      <span className="font-sora font-bold text-sm text-[#FF8F7A] shrink-0 tabular-nums">{price}</span>
    </div>
  );
}

function PriceCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="bg-[#F1F2F4] px-6 py-4 border-b border-[#E9E4DF]">
        <p className="font-sora font-bold text-xs uppercase tracking-widest text-[#14375A]/50">{title}</p>
      </div>
      <div className="px-6 pb-2">{children}</div>
    </div>
  );
}

function UnitHeader({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="pt-5 pb-1">
      <div className="flex items-center gap-3 mb-1">
        <span className="font-sora font-bold text-xs uppercase tracking-widest text-[#FF8F7A]">{label}</span>
        <div className="flex-1 h-px bg-[#E9E4DF]" />
      </div>
      {hint && <p className="font-inter text-xs text-[#14375A]/45 leading-relaxed">{hint}</p>}
    </div>
  );
}

export default function Hinnasto() {
  const { campaign } = pricing;

  return (
    <>
      <Nav />
      <div className="pt-16">

        {/* Hero — navy */}
        <section className="bg-[#14375A] pt-20 pb-16">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-4">
              Hinnasto
            </p>
            <h1 className="font-merriweather font-normal text-white text-4xl md:text-5xl leading-snug mb-4">
              Selkeä hinnoittelu.<br />Ei yllätyksiä.
            </h1>
            <p className="font-inter text-white/60 text-base leading-relaxed mb-4">
              Kaikki hinnat selkeästi. Kuljetus veloitetaan erikseen etäisyyden mukaan.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <span className="text-[#FF8F7A] text-xs">✦</span>
              <p className="font-sora font-bold text-white text-xs">
                Palvelusetelillä ALV 0 % — hyväksymme kunnan palvelusetelit
              </p>
            </div>
          </div>
        </section>

        {/* Campaign card */}
        {campaign.active && (
          <section className="bg-white py-10 border-b border-[#E9E4DF]">
            <div className="max-w-5xl mx-auto px-6">
              <div className="bg-[#FF8F7A] rounded-3xl px-8 py-10 md:px-12 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                  <p className="font-sora text-xs font-bold tracking-widest text-white/60 uppercase mb-3">
                    Tarjous uusille asiakkaille
                  </p>
                  <h2 className="font-merriweather font-normal text-white text-3xl md:text-4xl mb-3">
                    Ensimmäinen nouto ilmaiseksi
                  </h2>
                  <p className="font-inter text-white/75 text-sm leading-relaxed max-w-md">
                    Kokeile kotiinkuljetuspalvelua ilman riskiä. Tilaa nouto ja me hoidamme loput.
                  </p>
                </div>
                <div className="shrink-0 text-center">
                  <div className="font-merriweather font-normal text-white text-6xl leading-none mb-1">0 €</div>
                  <p className="font-inter text-white/60 text-xs mb-6">ensimmäinen nouto</p>
                  <Link
                    href="/yhteys"
                    className="inline-block font-sora font-bold text-sm bg-white text-[#FF8F7A] px-7 py-3 rounded-full hover:bg-[#FFE6E2] transition-colors"
                  >
                    Hyödynnä tarjous →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        <HinnastoNav />

        {/* Trust strip */}
        <section className="bg-white border-b border-[#E9E4DF]">
          <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title: "Tahratakuu", desc: "Jos tahra ei lähde, pesemme uudelleen — veloituksetta." },
              { title: "Valmis 4–8 päivässä", desc: "Useimmille tekstiileille." },
              { title: "Kuljetus alk. 10,99 €", desc: "Kaskenkadulta Turun alueelle, suuntaansa." },
            ].map((t) => (
              <div key={t.title} className="flex gap-3">
                <span className="text-[#FF8F7A] text-base mt-0.5 shrink-0">✦</span>
                <div>
                  <p className="font-sora font-bold text-[#14375A] text-sm mb-1">{t.title}</p>
                  <p className="font-inter text-[#14375A]/55 text-xs leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Kemiallinen pesu — Juhlavaatteet + Takit side by side */}
        <section id="juhlavaatteet" className="bg-[#F1F2F4] py-16 scroll-mt-28">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-8">
              <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-3">Kemiallinen pesu — per kappale</p>
              <h2 className="font-merriweather font-normal text-[#14375A] text-3xl">Juhlavaatteet ja takit</h2>
              <p className="font-inter text-[#14375A]/55 text-sm mt-2">Puvut, juhlavaatteet, silkki ja herkät kankaat. Muoto ja väri säilyvät.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-5 items-start">
              <div id="juhlavaatteet-card">
                <PriceCard title="Juhlavaatteet">
                  {juhlavaatteet.map((item) => <PriceRow key={item.name} name={item.name} price={item.price} />)}
                </PriceCard>
              </div>
              <div id="takit">
                <PriceCard title="Takit">
                  {takit.map((item) => <PriceRow key={item.name} name={item.name} price={item.price} />)}
                </PriceCard>
              </div>
            </div>
          </div>
        </section>

        {/* Vesipesu — Arjen vaatteet */}
        <section id="vesipesu" className="bg-white pt-16 pb-8 scroll-mt-28">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-8">
              <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-3">Vesipesu — per kg</p>
              <h2 className="font-merriweather font-normal text-[#14375A] text-3xl">Arjen vaatteet & työvaatteet</h2>
              <p className="font-inter text-[#14375A]/55 text-sm mt-2">Vesipestävä käyttövaate painon mukaan. Sisältää pesun ja kuivauksen.</p>
            </div>
            <div className="max-w-xl">
              <PriceCard title="Arjen vaatteet & työvaatteet">
                <UnitHeader label="Per kg" />
                {[
                  { name: "Vaatekilopesu — vesipestävä käyttövaate", price: "8,30 €/kg", note: "min. 4 kg · sisältää: pesu, silitys ja viikkaus" },
                ].map((item) => <PriceRow key={item.name} name={item.name} price={item.price} note={item.note} />)}

                <UnitHeader label="Per kappale" />
                {[
                  { name: "Työtakki, ohut", price: "12,50 €", note: "" },
                  { name: "Työtakki, paksu", price: "18,00 €", note: "" },
                  { name: "Labratakki, lyhyt", price: "10,00 €", note: "" },
                  { name: "Labratakki, pitkä", price: "12,50 €", note: "" },
                ].map((item) => <PriceRow key={item.name} name={item.name} price={item.price} note={item.note} />)}
              </PriceCard>
            </div>
          </div>
        </section>

        {/* Vesipesu — Kodintekstiilit */}
        <section id="kodintekstiilit" className="bg-white pt-8 pb-16 scroll-mt-28">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-8">
              <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-3">Vesipesu — per kg / m²</p>
              <h2 className="font-merriweather font-normal text-[#14375A] text-3xl">Lakanat, matot & täkit</h2>
              <p className="font-inter text-[#14375A]/55 text-sm mt-2">Kilohinnoittelu liinavaatteille, pinta-alaperusteinen hinnoittelu matoille ja verhoille.</p>
            </div>
            <div className="max-w-2xl">
              <PriceCard title="Kodintekstiilit">
                <UnitHeader label="Per kg" />
                {[
                  { name: "Liinavaatteet — lakanat, pussilakanat, pyyhkeet", price: "6,30 €/kg", note: "min. 4 kg · sisältää: pesu, mankeli ja viikkaus" },
                  { name: "Froteetekstiili (yli 50 % froteeta)", price: "7,90 €/kg", note: "min. 4 kg · sisältää: pesu, kuivaus ja viikkaus" },
                ].map((item) => <PriceRow key={item.name} name={item.name} price={item.price} note={item.note} />)}

                <UnitHeader label="Per m²" />
                {[
                  { name: "Rumpupestävät matot", price: "alk. 16,50 €/m²", note: "" },
                  { name: "Laakamatot", price: "alk. 16,50 €/m²", note: "" },
                  { name: "Ryijy", price: "alk. 33,00 €/m²", note: "min. 1 m²" },
                  { name: "Verhot (mankeloitava)", price: "alk. 7,50 €/m²", note: "" },
                  { name: "Pöytäliinat (mankeloitava)", price: "8,50 €/m²", note: "min. 1 m²" },
                ].map((item) => <PriceRow key={item.name} name={item.name} price={item.price} note={item.note} />)}

                <UnitHeader label="Per kappale" />
                {[
                  { name: "Täkki", price: "alk. 30,00 €", note: "" },
                  { name: "Huopa", price: "alk. 20,00 €", note: "" },
                  { name: "Päiväpeite", price: "alk. 28,00 €", note: "" },
                  { name: "Tyyny", price: "alk. 10,00 €", note: "" },
                ].map((item) => <PriceRow key={item.name} name={item.name} price={item.price} note={item.note} />)}
              </PriceCard>
            </div>
          </div>
        </section>

        {/* Kuljetus */}
        <section id="kuljetus" className="bg-[#14375A] py-16 scroll-mt-28">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-10">
              <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-3">Kuljetus</p>
              <h2 className="font-merriweather font-normal text-white text-3xl">Kotiinkuljetus Turun alueelle</h2>
              <p className="font-inter text-white/55 text-sm mt-2">Etäisyys lasketaan Kaskenkadun myymälästä. Hinta on per suunta.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 max-w-2xl">
              {kuljetus.map((item) => (
                <div key={item.range} className="bg-white/10 rounded-2xl p-6 text-center">
                  <p className="font-inter text-white/60 text-sm mb-3">{item.range}</p>
                  <p className="font-merriweather font-normal text-[#FF8F7A] text-3xl">{item.price}</p>
                  <p className="font-inter text-white/40 text-xs mt-2">per suunta</p>
                </div>
              ))}
            </div>
            <p className="font-inter text-white/35 text-xs mt-6">
              Ensimmäinen nouto on ilmainen uusille asiakkaille. Yli 10 km etäisyyksistä sovitaan erikseen.
            </p>
          </div>
        </section>

        {/* Business CTA */}
        <section className="bg-[#F1F2F4] py-16">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-white rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-3">Yrityksille</p>
                <h2 className="font-merriweather font-normal text-[#14375A] text-2xl md:text-3xl mb-2">Räätälöity sopimus yrityksellesi</h2>
                <p className="font-inter text-[#14375A]/65 text-sm leading-relaxed max-w-lg">
                  Hoivakodeille, hotelleille, ravintoloille ja toimistoille. Volyymipohjainen hinnoittelu ja joustava noutoaikataulu. Pyydä tarjous niin palataan sinulle 24 tunnissa.
                </p>
              </div>
              <Link
                href="/yrityksille"
                className="font-sora font-bold text-sm bg-[#FF8F7A] text-white px-8 py-3.5 rounded-full hover:bg-[#ff7a63] transition-colors shrink-0"
              >
                Pyydä tarjous →
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-16">
          <div className="max-w-3xl mx-auto px-6">
            <div className="mb-10 text-center">
              <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-3">Usein kysyttyä</p>
              <h2 className="font-merriweather font-normal text-[#14375A] text-3xl">Hinnoittelusta</h2>
            </div>
            <div className="flex flex-col divide-y divide-[#E9E4DF]">
              {[
                { q: "Sisältyykö kuljetus hintaan?", a: "Ei. Kuljetus veloitetaan erikseen etäisyyden mukaan: 10,99–16 € per suunta Turun alueella. Ensimmäinen nouto on uusille asiakkaille ilmainen." },
                { q: "Mikä on minimitilaus kilopesulla?", a: "Minimitilaus on 4 kg liinavaatteille ja vaatekilopesulla." },
                { q: "Mikä on Tahratakuu?", a: "Jos vaikea tahra ei lähde, pesemme vaatteen uudelleen — veloituksetta. Kerro tahrasta tilauksen yhteydessä." },
                { q: "Kuinka kauan pesu kestää?", a: "Useimmat tuotteet ovat valmiina 4–8 päivässä. Juhlavaatteet ja takit viikossa, liinavaatteet 4–8 päivässä." },
                { q: "Miten maksaminen toimii?", a: "Maksu tapahtuu toimituksen yhteydessä. Hyväksymme pankkikortin, laskun ja palvelusetelin. Palvelusetelillä palvelu on ALV 0 % — otathan yhteyttä jos haluat tietää lisää." },
              ].map((f) => (
                <div key={f.q} className="py-6">
                  <div className="font-sora font-bold text-[#14375A] text-base mb-2">{f.q}</div>
                  <div className="font-inter text-[#14375A]/65 text-sm leading-relaxed">{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}
