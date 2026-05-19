import pricingData from "../../content/pricing.json";
import Link from "next/link";

export default function PriceTeaser() {
  const { consumer } = pricingData;

  return (
    <section className="bg-[#F1F2F4] py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-3">
              Hinnasto
            </p>
            <h2 className="font-merriweather font-normal text-[#14375A] text-3xl">
              Selkeä hinnoittelu. Ei yllätyksiä.
            </h2>
          </div>
          <Link
            href="/hinnasto"
            className="font-sora font-bold text-sm text-[#14375A] hover:text-[#FF8F7A] transition-colors shrink-0"
          >
            Katso kaikki hinnat →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {consumer.tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl p-7 ${tier.highlight ? "bg-[#14375A]" : "bg-white"}`}
            >
              <p className="font-sora font-bold text-xs uppercase tracking-widest text-[#FF8F7A] mb-4">
                {tier.name}
              </p>
              <div className="flex items-baseline gap-1 mb-3">
                <span className={`font-sora font-bold text-4xl ${tier.highlight ? "text-white" : "text-[#14375A]"}`}>
                  {tier.price}€
                </span>
                <span className={`font-inter text-sm ${tier.highlight ? "text-white/55" : "text-[#14375A]/50"}`}>
                  {tier.unit}
                </span>
              </div>
              <p className={`font-inter text-sm leading-relaxed ${tier.highlight ? "text-white/70" : "text-[#14375A]/65"}`}>
                {tier.description}
              </p>
            </div>
          ))}
        </div>

        <p className="font-inter text-xs text-[#14375A]/45 mt-6 text-center">
          {consumer.note}
        </p>
      </div>
    </section>
  );
}
