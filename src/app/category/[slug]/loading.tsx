export default function CategoryLoading() {
  return (
    <main className="min-h-screen bg-[#f1f8f3]">
      <div className="mx-auto w-full max-w-[900px] px-3 py-5 sm:px-4 sm:py-6">
        <div className="animate-pulse">
          {/* Back Button Skeleton */}
          <div className="h-[9px] w-[85px] rounded-full bg-[#dfe6e1]" />

          {/* Category Header Skeleton */}
          <section className="mt-4 rounded-[12px] border border-[#e1e9e3] bg-white px-4 py-5 sm:px-5">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="h-[50px] w-[50px] shrink-0 rounded-[10px] bg-[#e7ede8] sm:h-[56px] sm:w-[56px]" />

              <div className="w-full">
                <div className="h-[7px] w-[90px] rounded-full bg-[#dce5de]" />

                <div className="mt-3 h-[18px] w-[140px] rounded-[5px] bg-[#dce5de]" />

                <div className="mt-3 h-[8px] w-[75%] max-w-[340px] rounded-full bg-[#e7ece8]" />
              </div>
            </div>
          </section>

          {/* Products Title + Sort Skeleton */}
          <div className="mb-3 mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="h-[14px] w-[145px] rounded-[4px] bg-[#dce5de]" />
              <div className="mt-2 h-[7px] w-[170px] rounded-full bg-[#e5ebe6]" />
              <div className="mt-2 h-[7px] w-[70px] rounded-full bg-[#e5ebe6]" />
            </div>

            <div className="flex items-center gap-2">
              <div className="h-[8px] w-[40px] rounded-full bg-[#dfe6e1]" />
              <div className="h-[32px] w-[135px] rounded-[6px] bg-[#e3e9e4]" />
              <div className="h-[32px] w-[50px] rounded-[6px] bg-[#dce5de]" />
            </div>
          </div>

          {/* Product Cards Skeleton */}
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="rounded-[10px] border border-[#e1e8e3] bg-white p-3"
              >
                <div className="flex items-start justify-between">
                  <div className="h-[42px] w-[42px] rounded-[8px] bg-[#e8eee9]" />
                  <div className="h-[18px] w-[50px] rounded-full bg-[#e8eee9]" />
                </div>

                <div className="mt-4 h-[11px] w-[60%] rounded-[4px] bg-[#dfe6e1]" />

                <div className="mt-2 h-[7px] w-[35%] rounded-full bg-[#e8ede9]" />

                <div className="mt-4 flex items-end justify-between border-t border-[#edf0ed] pt-3">
                  <div>
                    <div className="h-[7px] w-[65px] rounded-full bg-[#e8ede9]" />
                    <div className="mt-2 h-[17px] w-[75px] rounded-[4px] bg-[#dfe6e1]" />
                  </div>

                  <div className="h-[14px] w-[14px] rounded-full bg-[#e8ede9]" />
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}