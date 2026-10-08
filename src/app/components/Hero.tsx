export default function Hero() {
  return (
    <section className="bg-[#f1f8f3] px-4 py-4">
      <div className="mx-auto w-full max-w-[900px]">
        <div className="grid min-h-[160px] grid-cols-1 items-center overflow-hidden rounded-[12px] border border-[#e3ebe5] bg-white px-5 py-5 md:grid-cols-[1fr_280px] md:px-7">

          {/* LEFT SIDE */}
          <div>
            {/* Eyebrow */}
            <span className="inline-flex rounded-full bg-[#e7f6ec] px-3 py-[5px] text-[9px] font-medium text-[#159447]">
              Updated Today, 8 October 2026
            </span>

            {/* Main Heading */}
            <h2 className="mt-2 text-[24px] font-bold leading-[1.2] tracking-[-0.4px] text-[#17251d] md:text-[27px]">
              Today&apos;s Market Prices
              <br />
              At a Glance
            </h2>

            {/* Subtitle */}
            <p className="mt-3 max-w-[520px] text-[10px] leading-[17px] text-[#6b746e] md:text-[11px]">
              Rice, lentils, oil, vegetables, fish, meat, eggs and other daily
              essentials — check today&apos;s latest market prices in one place.
            </p>

            {/* CTA Button */}
            <a
              href="#all-products"
              className="mt-4 inline-flex items-center justify-center rounded-[5px] bg-[#009846] px-4 py-[9px] text-[10px] font-semibold text-white transition-colors hover:bg-[#00843d]"
            >
              View All Products
            </a>
          </div>

          {/* RIGHT SIDE */}
          <div className="mt-8 flex items-center justify-center md:mt-0 md:justify-end">

            <div className="relative flex h-[130px] w-[190px] items-center justify-center">

              {/* Vegetables */}
              <div className="absolute top-[4px] left-[70px] text-[40px]">
                🍅
              </div>

              <div className="absolute top-[12px] left-[102px] text-[39px]">
                🫑
              </div>

              <div className="absolute top-[34px] left-[45px] text-[30px]">
                🧅
              </div>

              <div className="absolute top-[36px] left-[125px] text-[29px]">
                🍊
              </div>

              {/* Basket */}
              <div className="absolute bottom-[18px] flex h-[57px] w-[105px] items-center justify-center rounded-b-[13px] bg-[#b95a0b]">

                <div className="absolute top-0 h-[8px] w-[115px] rounded-[2px] bg-[#d86a0a]" />

                <div className="h-[48px] w-[2px] bg-[#7e3906]" />
                <div className="ml-[17px] h-[48px] w-[2px] bg-[#7e3906]" />
                <div className="ml-[17px] h-[48px] w-[2px] bg-[#7e3906]" />
                <div className="ml-[17px] h-[48px] w-[2px] bg-[#7e3906]" />

              </div>

              {/* Shadow */}
              <div className="absolute bottom-[8px] h-[12px] w-[135px] rounded-[50%] bg-black/10" />

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}