import Link from "next/link";
import Image from "next/image";

export default function TeamTeaser() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Team photo */}
          <div className="rounded-3xl overflow-hidden h-80 md:h-[420px]">
            <Image
              src="/team.webp"
              alt="Melers tiimi"
              width={700}
              height={420}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Copy */}
          <div>
            <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-4">
              Tiimimme
            </p>
            <h2 className="font-merriweather font-normal text-[#14375A] text-4xl leading-snug mb-6">
              Tutut kasvot.<br />Luotettu käsi.
            </h2>
            <p className="font-inter text-[#14375A]/65 text-base leading-relaxed mb-5">
              Melers on turkulainen perheyritys vuodesta 1967. Sama omistautunut tiimi, joka on palvellut paikallisia koteja ja yrityksiä sukupolvien ajan — tuntee asiakkaansa nimeltä.
            </p>
            <p className="font-inter text-[#14375A]/65 text-base leading-relaxed mb-10">
              Jokainen tilaus käsitellään huolella. Ei tehtaan tahtia — ihmisen tahtia.
            </p>
            <Link
              href="/meista"
              className="inline-flex items-center gap-2 font-sora font-bold text-[#14375A] hover:text-[#FF8F7A] transition-colors"
            >
              Tutustu tiimiimme →
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
