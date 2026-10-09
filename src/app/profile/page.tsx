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

  const userEmail =
    session.user.email || "";

  const userImage =
    session.user.image || "";

  const firstLetter =
    userName.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-[#f1f6f2] px-4 py-8">
      <div className="mx-auto w-full max-w-[900px]">

        {/* BACK */}

        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1 text-[11px] font-medium text-[#606861] transition-colors hover:text-[#009846]"
        >
          ← Back to Home
        </Link>

        {/* PROFILE CARD */}

        <section className="overflow-hidden rounded-[14px] border border-[#dfe7e1] bg-white shadow-[0_4px_18px_rgba(0,0,0,0.05)]">

          {/* COVER */}

          <div className="h-[105px] border-b-[3px] border-[#009846] bg-[#e9f5ec]" />

          {/* PROFILE CONTENT */}

          <div className="relative px-6 pb-7 sm:px-8">

            {/* AVATAR */}

            <div className="absolute left-6 top-0 -translate-y-1/2 sm:left-8">
              {userImage ? (
                <img
                  src={userImage}
                  alt={`${userName} profile`}
                  className="h-[90px] w-[90px] rounded-full border-[5px] border-white bg-white object-cover shadow-[0_3px_10px_rgba(0,0,0,0.14)]"
                />
              ) : (
                <div className="flex h-[90px] w-[90px] items-center justify-center rounded-full border-[5px] border-white bg-[#e7f5eb] text-[30px] font-bold text-[#009846] shadow-[0_3px_10px_rgba(0,0,0,0.14)]">
                  {firstLetter}
                </div>
              )}
            </div>

            {/* NAME */}

            <div className="pt-[58px]">
              <h1 className="text-[21px] font-bold text-[#202820]">
                {userName}
              </h1>

              <p className="mt-1 text-[11px] text-[#737c76]">
                Bazar Dor User
              </p>
            </div>

            {/* PROFILE INFORMATION */}

            <div className="mt-7">
              <h2 className="text-[14px] font-bold text-[#273029]">
                Profile Information
              </h2>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">

                {/* FULL NAME */}

                <div className="rounded-[9px] border border-[#e2e8e3] bg-[#fbfcfb] px-4 py-4">
                  <div className="flex items-center gap-3">

                    <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-[#e7f5eb]">
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
                      <p className="text-[9px] text-[#818983]">
                        Full Name
                      </p>

                      <p className="mt-[2px] truncate text-[12px] font-semibold text-[#303832]">
                        {userName}
                      </p>
                    </div>

                  </div>
                </div>

                {/* EMAIL */}

                <div className="rounded-[9px] border border-[#e2e8e3] bg-[#fbfcfb] px-4 py-4">
                  <div className="flex items-center gap-3">

                    <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-[#e7f5eb]">
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
                      <p className="text-[9px] text-[#818983]">
                        Email Address
                      </p>

                      <p className="mt-[2px] truncate text-[12px] font-semibold text-[#303832]">
                        {userEmail}
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* ACCOUNT STATUS */}

            <div className="mt-5 rounded-[9px] border border-[#dcebe0] bg-[#f4faf5] px-4 py-4">
              <div className="flex items-center justify-between gap-4">

                <div>
                  <p className="text-[11px] font-semibold text-[#303832]">
                    Account Status
                  </p>

                  <p className="mt-1 text-[9px] text-[#7a837c]">
                    Your Bazar Dor account is active.
                  </p>
                </div>

                <span className="rounded-full bg-[#dff3e5] px-3 py-[5px] text-[9px] font-semibold text-[#009846]">
                  Active
                </span>

              </div>
            </div>

            {/* BUTTON */}

            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-[6px] bg-[#009846] px-5 py-[10px] text-[11px] font-semibold text-white transition-colors hover:bg-[#00843d]"
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