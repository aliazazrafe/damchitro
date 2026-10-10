import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f1f8f3] px-4 py-12">
      <div className="w-full max-w-[560px] rounded-[14px] border border-[#dfe8e1] bg-white px-6 py-10 text-center shadow-sm sm:px-10 sm:py-12">
        <div className="mx-auto flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#e9f7ed]">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 9V13"
              stroke="#009846"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M12 17H12.01"
              stroke="#009846"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M10.29 3.86L1.82 18A2 2 0 0 0 3.53 21H20.47A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z"
              stroke="#009846"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#009846]">
          Error 404
        </p>

        <h1 className="mt-2 text-[24px] font-bold text-[#202923] sm:text-[28px]">
          Page Not Found
        </h1>

        <p className="mx-auto mt-3 max-w-[390px] text-[11px] leading-5 text-[#747d76] sm:text-[12px]">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-[7px] bg-[#009846] px-5 py-[10px] text-[10px] font-semibold text-white transition-colors hover:bg-[#00843d] sm:text-[11px]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 11L12 4L21 11"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 10V20H19V10"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 20V14H15V20"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          Back to Home
        </Link>
      </div>
    </main>
  );
}