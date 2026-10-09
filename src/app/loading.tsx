export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f1f8f3] px-4 py-6">
      <div className="mx-auto w-full max-w-[900px] animate-pulse">
        {/* Hero Skeleton */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <div className="h-5 w-32 rounded-full bg-gray-200" />

              <div className="mt-4 h-7 w-64 rounded bg-gray-200" />
              <div className="mt-2 h-7 w-48 rounded bg-gray-200" />

              <div className="mt-4 h-3 w-full max-w-md rounded bg-gray-200" />
              <div className="mt-2 h-3 w-3/4 rounded bg-gray-200" />

              <div className="mt-5 h-9 w-32 rounded-md bg-gray-200" />
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="h-32 w-48 rounded-xl bg-gray-200" />
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="mt-8">
          <div className="h-6 w-40 rounded bg-gray-200" />
          <div className="mt-2 h-3 w-56 rounded bg-gray-200" />
        </div>

        {/* Product Cards */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="flex items-start gap-3">
                <div className="size-12 shrink-0 rounded-lg bg-gray-200" />

                <div className="flex-1">
                  <div className="h-4 w-24 rounded bg-gray-200" />
                  <div className="mt-2 h-3 w-16 rounded bg-gray-200" />
                </div>
              </div>

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <div className="h-3 w-20 rounded bg-gray-200" />
                  <div className="mt-2 h-5 w-24 rounded bg-gray-200" />
                </div>

                <div className="h-6 w-14 rounded-full bg-gray-200" />
              </div>
            </div>
          ))}
        </div>

        {/* Second Section */}
        <div className="mt-10">
          <div className="h-6 w-44 rounded bg-gray-200" />
          <div className="mt-2 h-3 w-52 rounded bg-gray-200" />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="flex items-start gap-3">
                <div className="size-12 rounded-lg bg-gray-200" />

                <div className="flex-1">
                  <div className="h-4 w-28 rounded bg-gray-200" />
                  <div className="mt-2 h-3 w-16 rounded bg-gray-200" />
                </div>
              </div>

              <div className="mt-5 h-5 w-24 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}