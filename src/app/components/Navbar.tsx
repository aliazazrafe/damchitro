"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../../lib/auth-client";

export default function Navbar() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  /* =========================================
     CATEGORIES
  ========================================= */

  const categories = [
    {
      name: "Rice",
      icon: "🍚",
      href: "/category/chal",
    },
    {
      name: "Lentils",
      icon: "🫘",
      href: "/category/dal",
    },
    {
      name: "Oil",
      icon: "🛢️",
      href: "/category/tel",
    },
    {
      name: "Vegetables",
      icon: "🥬",
      href: "/category/sobji",
    },
    {
      name: "Fish",
      icon: "🐟",
      href: "/category/mach",
    },
    {
      name: "Meat",
      icon: "🍗",
      href: "/category/mangsho",
    },
    {
      name: "Eggs-Milk",
      icon: "🥚",
      href: "/category/dim-dudh",
    },
    {
      name: "Spices",
      icon: "🌶️",
      href: "/category/mosla",
    },
  ];

  /* =========================================
     PRICE TICKER
  ========================================= */

  const tickerItems = [
    {
      icon: "🍚",
      name: "Miniket Rice",
      price: "৳78/kg",
      change: "▲ 2.5%",
      color: "text-green-600",
    },
    {
      icon: "🫘",
      name: "Red Lentils",
      price: "৳130/kg",
      change: "▼ 2.1%",
      color: "text-red-500",
    },
    {
      icon: "🛢️",
      name: "Soybean Oil",
      price: "৳175/litre",
      change: "▲ 1.5%",
      color: "text-green-600",
    },
    {
      icon: "🥔",
      name: "Potato",
      price: "৳45/kg",
      change: "▼ 3.2%",
      color: "text-red-500",
    },
    {
      icon: "🐟",
      name: "Hilsa Fish",
      price: "৳1200/kg",
      change: "▲ 4.1%",
      color: "text-green-600",
    },
    {
      icon: "🍗",
      name: "Chicken",
      price: "৳190/kg",
      change: "▼ 1.8%",
      color: "text-red-500",
    },
  ];

  /* =========================================
     USER INFORMATION
  ========================================= */

  const userName =
    session?.user?.name?.trim() ||
    session?.user?.email?.split("@")[0] ||
    "User";

  const firstName = userName.split(" ")[0] || "User";

  const firstLetter = firstName.charAt(0).toUpperCase();

  const userEmail = session?.user?.email || "";

  const userImage = session?.user?.image || "";

  /* =========================================
     CLOSE PROFILE DROPDOWN
  ========================================= */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* =========================================
     SIGN OUT
  ========================================= */

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(
          error.message ||
            "Failed to sign out. Please try again."
        );
        return;
      }

      setProfileOpen(false);

      toast.success("Signed out successfully!");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);

      toast.error(
        "Failed to sign out. Please try again."
      );
    }
  };

  return (
    <header className="relative z-50 w-full bg-white">
      {/* =====================================
          TOP NAVBAR
      ====================================== */}

      <div className="mx-auto flex h-[58px] w-full max-w-[900px] items-center justify-between gap-2 px-3 sm:h-[64px] sm:px-4">
        {/* LEFT SIDE */}

        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 sm:gap-3"
        >
          {/* LOGO */}

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#009846] sm:h-10 sm:w-10">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M3 4H5L7.2 14.2C7.3 14.7 7.6 15.1 8 15.4C8.4 15.7 8.9 15.8 9.4 15.8H17.5C18 15.8 18.5 15.6 18.9 15.3C19.3 15 19.6 14.5 19.7 14L21 7H6"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <circle
                cx="9"
                cy="19"
                r="1.2"
                fill="white"
              />

              <circle
                cx="18"
                cy="19"
                r="1.2"
                fill="white"
              />
            </svg>
          </div>

          {/* BRAND + DATE */}

          <div className="min-w-0">
            <h1 className="whitespace-nowrap text-[14px] font-bold leading-[18px] text-[#181818] sm:text-[16px] sm:leading-[19px]">
              Bazar Dor
            </h1>

            <p className="mt-[2px] hidden whitespace-nowrap text-[10px] leading-[12px] text-[#666666] sm:block">
              Wednesday, 7 October 2026
            </p>
          </div>
        </Link>

        {/* RIGHT SIDE */}

        <div className="flex shrink-0 items-center">
          {/* SESSION LOADING */}

          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="h-[30px] w-[30px] animate-pulse rounded-full bg-[#eeeeee] sm:h-[32px] sm:w-[32px]" />

              <div className="hidden h-[12px] w-[55px] animate-pulse rounded bg-[#eeeeee] sm:block" />
            </div>
          ) : session?.user ? (
            /* LOGGED IN USER */

            <div
              ref={profileRef}
              className="relative"
            >
              {/* PROFILE BUTTON */}

              <button
                type="button"
                onClick={() =>
                  setProfileOpen(
                    (previous) => !previous
                  )
                }
                className="flex items-center gap-1.5 rounded-[7px] px-1.5 py-[5px] transition-colors hover:bg-[#f6f8f6] sm:gap-2 sm:px-2 sm:py-[6px]"
                aria-expanded={profileOpen}
                aria-label="Open profile menu"
              >
                {/* USER AVATAR */}

                {userImage ? (
                  <img
                    src={userImage}
                    alt={`${userName} profile`}
                    className="h-[30px] w-[30px] shrink-0 rounded-full border border-[#e5e5e5] object-cover sm:h-[32px] sm:w-[32px]"
                  />
                ) : (
                  <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#e7f5eb] text-[11px] font-bold text-[#009846] sm:h-[32px] sm:w-[32px] sm:text-[12px]">
                    {firstLetter}
                  </div>
                )}

                {/* FIRST NAME */}

                <span className="hidden max-w-[100px] truncate text-[12px] font-medium text-[#333333] sm:block">
                  {firstName}
                </span>

                {/* DROPDOWN ARROW */}

                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform duration-200 ${
                    profileOpen
                      ? "rotate-180"
                      : ""
                  }`}
                  aria-hidden="true"
                >
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="#555555"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* PROFILE DROPDOWN */}

              {profileOpen && (
                <div className="absolute right-0 top-[44px] z-[100] w-[210px] max-w-[calc(100vw-24px)] overflow-hidden rounded-[12px] border border-[#e5e5e5] bg-white shadow-[0_6px_20px_rgba(0,0,0,0.15)] sm:top-[48px]">
                  {/* USER DETAILS */}

                  <div className="border-b border-[#eeeeee] px-4 py-4">
                    <div className="flex items-center gap-3">
                      {/* SMALL AVATAR */}

                      {userImage ? (
                        <img
                          src={userImage}
                          alt={`${userName} profile`}
                          className="h-[36px] w-[36px] shrink-0 rounded-full border border-[#e5e5e5] object-cover"
                        />
                      ) : (
                        <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-[#e7f5eb] text-[13px] font-bold text-[#009846]">
                          {firstLetter}
                        </div>
                      )}

                      {/* NAME + EMAIL */}

                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-semibold leading-[18px] text-[#282828]">
                          {userName}
                        </p>

                        <p className="mt-[2px] truncate text-[10px] leading-[14px] text-[#777777]">
                          {userEmail}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* MY PROFILE */}

                  <Link
                    href="/profile"
                    onClick={() =>
                      setProfileOpen(false)
                    }
                    className="flex items-center gap-2.5 px-4 py-3 text-[12px] font-medium text-[#444444] transition-colors hover:bg-[#f6f8f6]"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <circle
                        cx="12"
                        cy="8"
                        r="4"
                        stroke="#3977b7"
                        strokeWidth="1.8"
                      />

                      <path
                        d="M4.5 20C5.2 16.5 8.1 14 12 14C15.9 14 18.8 16.5 19.5 20"
                        stroke="#3977b7"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>

                    <span>My Profile</span>
                  </Link>

                  {/* SIGN OUT */}

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2.5 px-4 py-3 text-left text-[12px] font-medium text-[#e34b4b] transition-colors hover:bg-[#fff5f5]"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M10 17L15 12L10 7"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M15 12H3"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />

                      <path
                        d="M13 4H19C20.1 4 21 4.9 21 6V18C21 19.1 20.1 20 19 20H13"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>

                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* LOGGED OUT USER */

            <div className="flex items-center gap-2 sm:gap-6">
              <Link
                href="/signin"
                className="whitespace-nowrap text-[11px] font-medium text-[#222222] transition-colors hover:text-[#009846] sm:text-[12px]"
              >
                Sign In
              </Link>

              <Link
                href="/signup"
                className="whitespace-nowrap rounded-[5px] bg-[#009846] px-2.5 py-[7px] text-[11px] font-medium text-white transition-colors hover:bg-[#00843d] sm:px-4 sm:py-[9px] sm:text-[12px]"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* =====================================
          CATEGORY ROW
      ====================================== */}

      <div className="border-y border-[#eeeeee] bg-white">
        <nav
          className="mx-auto w-full max-w-[900px] overflow-x-auto px-3 sm:px-4"
          aria-label="Product categories"
        >
          <div className="flex min-w-max items-center gap-5 py-[9px] sm:gap-7 sm:py-[10px]">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="flex shrink-0 items-center gap-[5px] whitespace-nowrap text-[11px] font-medium text-[#333333] transition-colors hover:text-[#009846] sm:text-[12px]"
              >
                <span className="text-[12px] sm:text-[13px]">
                  {category.icon}
                </span>

                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* =====================================
          PRICE MARQUEE
      ====================================== */}

      <div className="w-full overflow-hidden border-b border-[#e7e7e7] bg-[#f8fbf9]">
        <div className="marquee-animation">
          {/* FIRST COPY */}

          <div className="flex shrink-0 items-center">
            {tickerItems.map((item, index) => (
              <div
                key={`ticker-first-${index}`}
                className="flex shrink-0 items-center gap-1.5 whitespace-nowrap border-r border-[#e5e5e5] px-4 py-[7px] text-[10px] sm:gap-2 sm:px-6 sm:py-[8px] sm:text-[11px]"
              >
                <span className="text-[12px] sm:text-[13px]">
                  {item.icon}
                </span>

                <span className="font-medium text-[#333333]">
                  {item.name}
                </span>

                <span className="text-[#555555]">
                  {item.price}
                </span>

                <span
                  className={`font-semibold ${item.color}`}
                >
                  {item.change}
                </span>
              </div>
            ))}
          </div>

          {/* SECOND COPY */}

          <div
            className="flex shrink-0 items-center"
            aria-hidden="true"
          >
            {tickerItems.map((item, index) => (
              <div
                key={`ticker-second-${index}`}
                className="flex shrink-0 items-center gap-1.5 whitespace-nowrap border-r border-[#e5e5e5] px-4 py-[7px] text-[10px] sm:gap-2 sm:px-6 sm:py-[8px] sm:text-[11px]"
              >
                <span className="text-[12px] sm:text-[13px]">
                  {item.icon}
                </span>

                <span className="font-medium text-[#333333]">
                  {item.name}
                </span>

                <span className="text-[#555555]">
                  {item.price}
                </span>

                <span
                  className={`font-semibold ${item.color}`}
                >
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}