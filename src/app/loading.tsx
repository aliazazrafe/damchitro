export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f1f6f2]">
      <div className="mx-auto w-full max-w-[900px] px-3 py-5 sm:px-4 sm:py-7">
        <div className="animate-pulse">
          {/* Hero Skeleton */}
          <section className="rounded-[12px] border border-[#e1e8e3] bg-white px-4 py-7 sm:px-6 sm:py-9">
            <div className="mx-auto flex max-w-[620px] flex-col items-center">
              <div className="h-[10px] w-[110px] rounded-full bg-[#e5ebe6]" />

              <div className="mt-4 h-[24px] w-[85%] max-w-[420px] rounded-[6px] bg-[#e1e8e3]" />

              <div className="mt-3 h-[9px] w-[70%] max-w-[340px] rounded-full bg-[#e8ede9]" />

              <div className="mt-2 h-[9px] w-[55%] max-w-[260px] rounded-full bg-[#e8ede9]" />
            </div>
          </section>

          {/* Price Increased Skeleton */}
          <section className="mt-7">
            <div className="h-[15px] w-[150px] rounded-[4px] bg-[#dce5de]" />

            <div className="mt-2 h-[8px] w-[220px] rounded-full bg-[#e3e9e4]" />

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
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

                  <div className="mt-4 border-t border-[#edf0ed] pt-3">
                    <div className="h-[7px] w-[65px] rounded-full bg-[#e8ede9]" />

                    <div className="mt-2 h-[17px] w-[75px] rounded-[4px] bg-[#dfe6e1]" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Price Decreased Skeleton */}
          <section className="mt-8">
            <div className="h-[15px] w-[165px] rounded-[4px] bg-[#dce5de]" />

            <div className="mt-2 h-[8px] w-[200px] rounded-full bg-[#e3e9e4]" />

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-[10px] border border-[#e1e8e3] bg-white p-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="h-[42px] w-[42px] rounded-[8px] bg-[#e8eee9]" />

                    <div className="h-[18px] w-[50px] rounded-full bg-[#e8eee9]" />
                  </div>

                  <div className="mt-4 h-[11px] w-[65%] rounded-[4px] bg-[#dfe6e1]" />

                  <div className="mt-2 h-[7px] w-[30%] rounded-full bg-[#e8ede9]" />

                  <div className="mt-4 border-t border-[#edf0ed] pt-3">
                    <div className="h-[7px] w-[65px] rounded-full bg-[#e8ede9]" />

                    <div className="mt-2 h-[17px] w-[75px] rounded-[4px] bg-[#dfe6e1]" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}