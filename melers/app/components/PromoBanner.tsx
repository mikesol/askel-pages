import pricingData from "../../content/pricing.json";

export default function PromoBanner() {
  const { campaign } = pricingData;
  if (!campaign.active) return null;

  return (
    <section className="mt-16 bg-[#14375A] py-20 text-center">
      <div className="max-w-2xl mx-auto px-6">
        <span className="inline-block bg-[#FF8F7A]/20 text-[#FF8F7A] font-sora font-bold text-xs tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
          {campaign.badge}
        </span>
        <h2 className="font-merriweather font-normal text-white text-4xl md:text-5xl mb-4">
          {campaign.headline}
        </h2>
        <p className="font-inter text-white/60 text-base leading-relaxed mb-10">
          {campaign.body}
        </p>
        <a
          href={campaign.ctaHref}
          className="inline-flex items-center gap-2 bg-[#FF8F7A] text-white font-sora font-bold px-8 py-4 rounded-full hover:bg-[#ff7a63] transition-colors text-base"
        >
          {campaign.cta} →
        </a>
      </div>
    </section>
  );
}
