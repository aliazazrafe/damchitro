import Link from "next/link";

export default function Navbar() {
  const categories = [
    { name: "Rice", icon: "🍚", href: "/category/chal" },
    { name: "Lentils", icon: "🫘", href: "/category/dal" },
    { name: "Oil", icon: "🛢️", href: "/category/tel" },
    { name: "Vegetables", icon: "🥬", href: "/category/sobji" },
    { name: "Fish", icon: "🐟", href: "/category/mach" },
    { name: "Meat", icon: "🍗", href: "/category/mangsho" },
    { name: "Eggs-Milk", icon: "🥚", href: "/category/dim-dudh" },
    { name: "Spices", icon: "🌶️", href: "/category/mosla" },
  ];

  const tickerItems = [
    {
      icon: "🍚",
      name: "Miniket Rice",
      price: "৳78/kg",
      change: "▲ 2.5%",
      color: "text-red-500",
    },
    {
      icon: "🫘",
      name: "Red Lentils",
      price: "৳130/kg",
      change: "▼ 2.1%",
      color: "text-green-600",
    },
    {
      icon: "🛢️",
      name: "Soybean Oil",
      price: "৳175/litre",
      change: "▲ 1.5%",
      color: "text-red-500",
    },
    {
      icon: "🥔",
      name: "Potato",
      price: "৳45/kg",
      change: "▼ 3.2%",
      color: "text-green-600",
    },
    {
      icon: "🐟",
      name: "Hilsa Fish",
      price: "৳1200/kg",
      change: "▲ 4.1%",
      color: "text-red-500",
    },
    {
      icon: "🍗",
      name: "Chicken",
      price: "৳190/kg",
      change: "▼ 1.8%",
      color: "text-green-600",
    },
  ];

  return (
    <header className="w-full bg-white">

      {/* ================= TOP NAVBAR ================= */}
      <div className="mx-auto flex h-[64px] w-full max-w-[900px] items-center justify-between px-4">

        {/* Left Side */}
        <Link href="/" className="flex items-center gap-3">

          {/* Logo */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#009846]">
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

              <circle cx="9" cy="19" r="1.2" fill="white" />
              <circle cx="18" cy="19" r="1.2" fill="white" />
            </svg>
          </div>

          {/* Brand + Date */}
          <div>
            <h1 className="text-[16px] font-bold leading-[19px] text-[#181818]">
              Bazar Dor
            </h1>

            <p className="mt-[2px] text-[10px] leading-[12px] text-[#666666]">
              Wednesday, 7 October 2026
            </p>
          </div>

        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-6">

          <Link
            href="/signin"
            className="text-[12px] font-medium text-[#222222] transition-colors hover:text-[#009846]"
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            className="rounded-[5px] bg-[#009846] px-4 py-[9px] text-[12px] font-medium text-white transition-colors hover:bg-[#00843d]"
          >
            Sign Up
          </Link>

        </div>
      </div>

      {/* ================= CATEGORY ROW ================= */}
      <div className="border-y border-[#eeeeee] bg-white">

        <nav className="mx-auto flex w-full max-w-[900px] items-center px-4">

          <div className="flex min-w-max items-center gap-7 py-[10px]">

            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="flex items-center gap-[5px] whitespace-nowrap text-[12px] font-medium text-[#333333] transition-colors hover:text-[#009846]"
              >
                <span className="text-[13px]">
                  {category.icon}
                </span>

                <span>{category.name}</span>
              </Link>
            ))}

          </div>
        </nav>
      </div>

      {/* ================= PRICE MARQUEE ================= */}
      <div className="w-full overflow-hidden border-b border-[#e7e7e7] bg-[#f8fbf9]">

        {/* Moving Container */}
        <div className="marquee-animation">

          {/* First Copy */}
          <div className="flex shrink-0 items-center">

            {tickerItems.map((item, index) => (
              <div
                key={`ticker-first-${index}`}
                className="flex shrink-0 items-center gap-2 whitespace-nowrap border-r border-[#e5e5e5] px-6 py-[8px] text-[11px]"
              >

                <span className="text-[13px]">
                  {item.icon}
                </span>

                <span className="font-medium text-[#333333]">
                  {item.name}
                </span>

                <span className="text-[#555555]">
                  {item.price}
                </span>

                <span className={`font-semibold ${item.color}`}>
                  {item.change}
                </span>

              </div>
            ))}

          </div>

          {/* Second Copy */}
          <div
            className="flex shrink-0 items-center"
            aria-hidden="true"
          >

            {tickerItems.map((item, index) => (
              <div
                key={`ticker-second-${index}`}
                className="flex shrink-0 items-center gap-2 whitespace-nowrap border-r border-[#e5e5e5] px-6 py-[8px] text-[11px]"
              >

                <span className="text-[13px]">
                  {item.icon}
                </span>

                <span className="font-medium text-[#333333]">
                  {item.name}
                </span>

                <span className="text-[#555555]">
                  {item.price}
                </span>

                <span className={`font-semibold ${item.color}`}>
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