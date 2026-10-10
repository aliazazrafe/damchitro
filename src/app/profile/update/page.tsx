import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../../../lib/auth";
import UpdateProfileForm from "./UpdateProfileForm";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(
      `/signin?callbackURL=${encodeURIComponent(
        "/profile/update"
      )}&reason=protected`
    );
  }

  const userName =
    session.user.name?.trim() ||
    session.user.email?.split("@")[0] ||
    "User";

  const userEmail = session.user.email || "";
  const userImage = session.user.image || "";

  const firstLetter = userName.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-[#f1f6f2] px-3 py-8 sm:px-4 sm:py-12">
      <div className="mx-auto w-full max-w-[740px]">
        {/* PAGE TITLE */}

        <div className="mb-5">
          <h1 className="text-[20px] font-bold text-[#1f2822] sm:text-[22px]">
            Update Profile
          </h1>

          <p className="mt-1 text-[10px] text-[#7b837d] sm:text-[11px]">
            Update your account information.
          </p>
        </div>

        {/* USER CARD */}

        <section className="rounded-[12px] border border-[#dfe7e1] bg-white px-4 py-4 sm:px-5">
          <div className="flex items-center gap-3">
            {userImage ? (
              <img
                src={userImage}
                alt={`${userName} profile`}
                className="h-[52px] w-[52px] shrink-0 rounded-[9px] object-cover"
              />
            ) : (
              <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[9px] bg-[#e7f5eb] text-[20px] font-bold text-[#009846]">
                {firstLetter}
              </div>
            )}

            <div className="min-w-0">
              <h2 className="truncate text-[13px] font-bold text-[#28302a] sm:text-[14px]">
                {userName}
              </h2>

              <p
                title={userEmail}
                className="mt-[3px] truncate text-[9px] text-[#7b837d] sm:text-[10px]"
              >
                {userEmail}
              </p>
            </div>
          </div>
        </section>

        {/* INFORMATION CARD */}

        <section className="mt-4 rounded-[12px] border border-[#dfe7e1] bg-white px-4 py-5 sm:px-5 sm:py-6">
          <h2 className="text-[12px] font-bold text-[#273029] sm:text-[13px]">
            Information
          </h2>

          <UpdateProfileForm currentName={userName} />
        </section>

        {/* BACK */}

        <div className="mt-4 text-center">
          <Link
            href="/profile"
            className="text-[9px] font-medium text-[#6f7871] transition-colors hover:text-[#009846] sm:text-[10px]"
          >
            ← Back to Profile
          </Link>
        </div>
      </div>
    </main>
  );
}