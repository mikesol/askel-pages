import Image from "next/image";
import Link from "next/link";

export default function TeamSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left: photo */}
          <div className="flex justify-center md:justify-start">
            <div className="w-72 rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/team.webp"
                alt="Melersin tiimi"
                width={288}
                height={216}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right: text */}
          <div>
            <p className="font-sora text-xs font-bold tracking-widest text-[#FF8F7A] uppercase mb-3">
              Tiimimme
            </p>
            <h2 className="font-merriweather font-normal text-[#14375A] text-4xl mb-5">
              Teitä palvelevat
            </h2>
            <p className="font-inter text-[#14375A]/65 text-base leading-relaxed mb-8">
              Tiimimme yhteenlaskettu kokemus pesulaalalta on yli <span className="font-semibold text-[#14375A]">79 vuotta</span>. Jokainen tekstiili käsitellään ihmiseltä ihmiselle, ammattitaidolla.
            </p>

            <Link
              href="/meista"
              className="font-sora font-bold text-sm text-[#14375A] hover:text-[#FF8F7A] transition-colors"
            >
              Tutustu tarinamme →
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
