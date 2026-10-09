export default function Hero() {
  return (
    <section className="bg-[#f1f8f3] px-3 py-4 sm:px-4">
      <div className="mx-auto w-full max-w-[900px]">
        <div
          className="
            grid grid-cols-1 items-center overflow-hidden
            rounded-[12px] border border-[#e3ebe5] bg-white
            px-4 py-5
            sm:px-5 sm:py-6
            md:min-h-[160px]
            md:grid-cols-[1fr_280px]
            md:px-7 md:py-5
          "
        >
          {/* =========================
              LEFT SIDE
          ========================== */}

          <div className="text-center md:text-left">
            {/* Eyebrow */}
            <span
              className="
                inline-flex rounded-full bg-[#e7f6ec]
                px-3 py-[5px]
                text-[8px] font-medium text-[#159447]
                sm:text-[9px]
              "
            >
              Updated Today, 8 October 2026
            </span>

            {/* Main Heading */}
            <h2
              className="
                mt-3
                text-[22px] font-bold
                leading-[1.18]
                tracking-[-0.4px]
                text-[#17251d]
                sm:text-[24px]
                md:mt-2 md:text-[27px]
              "
            >
              Today&apos;s Market Prices
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              At a Glance
            </h2>

            {/* Subtitle */}
            <p
              className="
                mx-auto mt-3
                max-w-[520px]
                text-[10px] leading-[16px]
                text-[#6b746e]
                sm:text-[10px] sm:leading-[17px]
                md:mx-0 md:text-[11px]
              "
            >
              Rice, lentils, oil, vegetables, fish, meat, eggs and other daily
              essentials — check today&apos;s latest market prices in one place.
            </p>

            {/* CTA Button */}
            <a
              href="#all-products"
              className="
                mt-4 inline-flex
                items-center justify-center
                rounded-[5px]
                bg-[#009846]
                px-4 py-[9px]
                text-[10px] font-semibold
                text-white
                transition-colors
                hover:bg-[#00843d]
                sm:px-5
              "
            >
              View All Products
            </a>
          </div>

          {/* =========================
              RIGHT SIDE
          ========================== */}

          <div
            className="
              mt-6 flex
              items-center justify-center
              md:mt-0 md:justify-end
            "
          >
            <div
              className="
                relative flex
                h-[115px] w-[170px]
                scale-[0.9]
                items-center justify-center
                sm:h-[130px] sm:w-[190px] sm:scale-100
              "
            >
              {/* Vegetables */}

              <div className="absolute left-[60px] top-[4px] text-[36px] sm:left-[70px] sm:text-[40px]">
                🍅
              </div>

              <div className="absolute left-[91px] top-[12px] text-[35px] sm:left-[102px] sm:text-[39px]">
                🫑
              </div>

              <div className="absolute left-[37px] top-[34px] text-[27px] sm:left-[45px] sm:text-[30px]">
                🧅
              </div>

              <div className="absolute left-[112px] top-[36px] text-[26px] sm:left-[125px] sm:text-[29px]">
                🍊
              </div>

              {/* Basket */}

              <div
                className="
                  absolute bottom-[18px]
                  flex h-[52px] w-[96px]
                  items-center justify-center
                  rounded-b-[13px]
                  bg-[#b95a0b]
                  sm:h-[57px] sm:w-[105px]
                "
              >
                <div
                  className="
                    absolute top-0
                    h-[8px] w-[106px]
                    rounded-[2px]
                    bg-[#d86a0a]
                    sm:w-[115px]
                  "
                />

                <div className="h-[43px] w-[2px] bg-[#7e3906] sm:h-[48px]" />

                <div className="ml-[15px] h-[43px] w-[2px] bg-[#7e3906] sm:ml-[17px] sm:h-[48px]" />

                <div className="ml-[15px] h-[43px] w-[2px] bg-[#7e3906] sm:ml-[17px] sm:h-[48px]" />

                <div className="ml-[15px] h-[43px] w-[2px] bg-[#7e3906] sm:ml-[17px] sm:h-[48px]" />
              </div>

              {/* Shadow */}

              <div
                className="
                  absolute bottom-[8px]
                  h-[10px] w-[120px]
                  rounded-[50%]
                  bg-black/10
                  sm:h-[12px] sm:w-[135px]
                "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}