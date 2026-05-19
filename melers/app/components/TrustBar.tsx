import Image from "next/image";

const items = [
  {
    icon: "/icons/Artboard_11.svg",
    title: "Vuodesta 1967",
    desc: "Lähes 60 vuotta pesulakokemusta Turussa.",
  },
  {
    icon: "/icons/Artboard_7.svg",
    title: "Paikallinen palveluntarjoaja",
    desc: "Turku, Raisio, Naantali ja lähikunnat.",
  },
  {
    icon: "/icons/Artboard_3.svg",
    title: "Aina tavoitettavissa",
    desc: (
      <>
        Soita meille:
        <br />
        <a href="tel:+35822331718" className="font-bold text-[#FF8F7A] hover:underline">
          +358 22 331718
        </a>
      </>
    ),
  },
  {
    icon: "/icons/Artboard_9.svg",
    title: "Joustava palvelu",
    desc: "Myymälä Turussa tai nouto kotioveltasi.",
  },
];

export default function TrustBar() {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-10 md:py-12 grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-0">
        {items.map((item, i) => (
          <div key={item.title} className={`flex items-start gap-3 md:gap-4 px-4 md:px-6 ${
            i === 0 ? "pl-0 md:pl-0" :
            i === 2 ? "pl-0 md:pl-6 md:border-l md:border-[#E9E4DF]" :
            "border-l border-[#E9E4DF]"
          }`}>
            <div className="w-10 h-10 rounded-full bg-[#F1F2F4] flex items-center justify-center shrink-0 p-2 mt-0.5">
              <Image
                src={item.icon}
                alt={item.title}
                width={24}
                height={24}
                className="w-full h-full object-contain"
                style={{ filter: "brightness(0) saturate(100%) invert(20%) sepia(30%) saturate(700%) hue-rotate(180deg)" }}
              />
            </div>
            <div>
              <h3 className="font-sora font-bold text-[#14375A] text-sm mb-1.5">
                {item.title}
              </h3>
              <p className="font-inter text-[#14375A]/55 text-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
