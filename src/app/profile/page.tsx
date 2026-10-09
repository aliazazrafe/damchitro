import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../../lib/auth";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(
      `/signin?callbackURL=${encodeURIComponent(
        "/profile"
      )}&reason=protected`
    );
  }

  const userName =
    session.user.name?.trim() ||
    session.user.email?.split("@")[0] ||
    "User";

  const userEmail = session.user.email || "";
  const userImage = session.user.image || "";

  const firstLetter =
    userName.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-[#f1f6f2] px-3 py-5 sm:px-4 sm:py-8">
      <div className="mx-auto w-full max-w-[900px]">
        {/* BACK */}

        <Link
          href="/"
          className="mb-3 inline-flex items-center gap-1 text-[10px] font-medium text-[#606861] transition-colors hover:text-[#009846] sm:mb-4 sm:text-[11px]"
        >
          ← Back to Home
        </Link>

        {/* PROFILE CARD */}

        <section className="overflow-hidden rounded-[12px] border border-[#dfe7e1] bg-white shadow-[0_4px_18px_rgba(0,0,0,0.05)] sm:rounded-[14px]">
          {/* COVER */}

          <div className="h-[85px] border-b-[3px] border-[#009846] bg-[#e9f5ec] sm:h-[105px]" />

          {/* PROFILE CONTENT */}

          <div className="relative px-4 pb-6 sm:px-8 sm:pb-7">
            {/* AVATAR */}

            <div className="absolute left-4 top-0 -translate-y-1/2 sm:left-8">
              {userImage ? (
                <img
                  src={userImage}
                  alt={`${userName} profile`}
                  className="h-[76px] w-[76px] rounded-full border-[4px] border-white bg-white object-cover shadow-[0_3px_10px_rgba(0,0,0,0.14)] sm:h-[90px] sm:w-[90px] sm:border-[5px]"
                />
              ) : (
                <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full border-[4px] border-white bg-[#e7f5eb] text-[25px] font-bold text-[#009846] shadow-[0_3px_10px_rgba(0,0,0,0.14)] sm:h-[90px] sm:w-[90px] sm:border-[5px] sm:text-[30px]">
                  {firstLetter}
                </div>
              )}
            </div>

            {/* NAME */}

            <div className="pt-[48px] sm:pt-[58px]">
              <h1 className="break-words text-[19px] font-bold text-[#202820] sm:text-[21px]">
                {userName}
              </h1>

              <p className="mt-1 text-[10px] text-[#737c76] sm:text-[11px]">
                Bazar Dor User
              </p>
            </div>

            {/* PROFILE INFORMATION */}

            <div className="mt-6 sm:mt-7">
              <h2 className="text-[13px] font-bold text-[#273029] sm:text-[14px]">
                Profile Information
              </h2>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {/* FULL NAME */}

                <div className="min-w-0 rounded-[9px] border border-[#e2e8e3] bg-[#fbfcfb] px-3 py-3 sm:px-4 sm:py-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#e7f5eb] sm:h-[36px] sm:w-[36px]">
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="12"
                          cy="8"
                          r="4"
                          stroke="#009846"
                          strokeWidth="1.7"
                        />

                        <path
                          d="M4.5 20C5.2 16.5 8.1 14 12 14C15.9 14 18.8 16.5 19.5 20"
                          stroke="#009846"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                    <div className="min-w-0">
                      <p className="text-[8px] text-[#818983] sm:text-[9px]">
                        Full Name
                      </p>

                      <p className="mt-[2px] truncate text-[11px] font-semibold text-[#303832] sm:text-[12px]">
                        {userName}
                      </p>
                    </div>
                  </div>
                </div>

                {/* EMAIL */}

                <div className="min-w-0 rounded-[9px] border border-[#e2e8e3] bg-[#fbfcfb] px-3 py-3 sm:px-4 sm:py-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#e7f5eb] sm:h-[36px] sm:w-[36px]">
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="3"
                          y="5"
                          width="18"
                          height="14"
                          rx="2"
                          stroke="#009846"
                          strokeWidth="1.7"
                        />

                        <path
                          d="M4 7L12 13L20 7"
                          stroke="#009846"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <div className="min-w-0">
                      <p className="text-[8px] text-[#818983] sm:text-[9px]">
                        Email Address
                      </p>

                      <p
                        title={userEmail}
                        className="mt-[2px] truncate text-[11px] font-semibold text-[#303832] sm:text-[12px]"
                      >
                        {userEmail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ACCOUNT STATUS */}

            <div className="mt-5 rounded-[9px] border border-[#dcebe0] bg-[#f4faf5] px-3 py-3 sm:px-4 sm:py-4">
              <div className="flex flex-col gap-3 min-[360px]:flex-row min-[360px]:items-center min-[360px]:justify-between">
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-[#303832] sm:text-[11px]">
                    Account Status
                  </p>

                  <p className="mt-1 text-[8px] leading-4 text-[#7a837c] sm:text-[9px]">
                    Your Bazar Dor account is active.
                  </p>
                </div>

                <span className="w-fit shrink-0 rounded-full bg-[#dff3e5] px-3 py-[5px] text-[9px] font-semibold text-[#009846]">
                  Active
                </span>
              </div>
            </div>

            {/* BUTTON */}

            <div className="mt-5 sm:mt-6">
              <Link
                href="/"
                className="inline-flex w-full items-center justify-center rounded-[6px] bg-[#009846] px-5 py-[10px] text-[10px] font-semibold text-white transition-colors hover:bg-[#00843d] min-[400px]:w-auto sm:text-[11px]"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}