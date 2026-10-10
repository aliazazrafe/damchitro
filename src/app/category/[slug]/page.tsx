import Link from "next/link";
import { notFound } from "next/navigation";

type Change = {
  dir: "up" | "down" | "flat";
  pct: number;
};

type Product = {
  id: number;
  slug: string;

  name?: string;
  nameEn?: string;
  productName?: string;
  productNameEn?: string;

  categoryName?: string;
  categoryNameEn?: string;
  categoryNameBn?: string;
  categoryIcon?: string;

  unit?: string;
  image?: string;

  today?: number;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;

  change?: Change;
};

/* =====================================
   CATEGORY INFORMATION
===================================== */

const categoryInfo: Record<
  string,
  {
    name: string;
    icon: string;
    description: string;
  }
> = {
  chal: {
    name: "Rice",
    icon: "🍚",
    description:
      "Check today's latest rice prices from different markets.",
  },

  dal: {
    name: "Lentils",
    icon: "🫘",
    description:
      "Check today's latest lentil prices from different markets.",
  },

  tel: {
    name: "Oil",
    icon: "🛢️",
    description:
      "Check today's latest cooking oil prices from different markets.",
  },

  sobji: {
    name: "Vegetables",
    icon: "🥬",
    description:
      "Check today's latest vegetable prices from different markets.",
  },

  mach: {
    name: "Fish",
    icon: "🐟",
    description:
      "Check today's latest fish prices from different markets.",
  },

  mangsho: {
    name: "Meat",
    icon: "🍗",
    description:
      "Check today's latest meat prices from different markets.",
  },

  "dim-dudh": {
    name: "Eggs & Milk",
    icon: "🥚",
    description:
      "Check today's latest egg and milk prices from different markets.",
  },

  mosla: {
    name: "Spices",
    icon: "🌶️",
    description:
      "Check today's latest spice prices from different markets.",
  },
};

/* =====================================
   FETCH CATEGORY PRODUCTS
===================================== */

async function getCategoryProducts(
  slug: string
): Promise<Product[]> {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(
        slug
      )}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return [];
    }

    const result = await response.json();

    if (Array.isArray(result)) {
      return result;
    }

    if (Array.isArray(result?.products)) {
      return result.products;
    }

    if (Array.isArray(result?.data)) {
      return result.data;
    }

    if (Array.isArray(result?.data?.products)) {
      return result.data.products;
    }

    return [];
  } catch (error) {
    console.error(
      "Failed to load category products:",
      error
    );

    return [];
  }
}

/* =====================================
   PRODUCT NAME
===================================== */

function getProductName(product: Product) {
  if (product.nameEn) {
    return product.nameEn;
  }

  if (product.productNameEn) {
    return product.productNameEn;
  }

  if (product.name) {
    return product.name;
  }

  if (product.productName) {
    return product.productName;
  }

  return product.slug
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}

/* =====================================
   UNIT
===================================== */

function getEnglishUnit(unit?: string) {
  if (!unit) {
    return "Per unit";
  }

  const units: Record<string, string> = {
    kg: "Per kg",
    litre: "Per litre",
    liter: "Per litre",
    dozen: "Per dozen",
    piece: "Per piece",
    pcs: "Per piece",
    gram: "Per gram",
  };

  return (
    units[unit.toLowerCase()] ??
    `Per ${unit}`
  );
}

/* =====================================
   CHANGE BADGE
===================================== */

function getChangeStyle(change?: Change) {
  if (!change) {
    return {
      symbol: "—",
      className:
        "bg-[#f1f3f1] text-[#777777]",
    };
  }

  if (change.dir === "up") {
    return {
      symbol: "▲",
      className:
        "bg-[#e8f7ed] text-[#009846]",
    };
  }

  if (change.dir === "down") {
    return {
      symbol: "▼",
      className:
        "bg-[#fff0f0] text-[#e34d4d]",
    };
  }

  return {
    symbol: "—",
    className:
      "bg-[#f1f3f1] text-[#777777]",
  };
}

/* =====================================
   CATEGORY PAGE
===================================== */

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = categoryInfo[slug];

  if (!category) {
    notFound();
  }

  const products =
    await getCategoryProducts(slug);

  return (
    <main className="min-h-screen bg-[#f1f8f3]">

      <div className="mx-auto w-full max-w-[900px] px-4 py-6">

        {/* =============================
            BACK TO HOME
        ============================== */}

        <Link
          href="/"
          className="inline-flex items-center gap-1 text-[10px] font-medium text-[#687169] transition-colors hover:text-[#009846]"
        >
          ← Back to Home
        </Link>

        {/* =============================
            CATEGORY HEADER
        ============================== */}

        <section className="mt-4 rounded-[12px] border border-[#e1e9e3] bg-white px-5 py-5">

          <div className="flex items-center gap-4">

            <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[10px] bg-[#f1f7f3] text-[30px]">
              {category.icon}
            </div>

            <div>

              <p className="text-[9px] font-semibold uppercase tracking-[1px] text-[#009846]">
                Product Category
              </p>

              <h1 className="mt-1 text-[22px] font-bold leading-tight text-[#17251d]">
                {category.name}
              </h1>

              <p className="mt-1 max-w-[520px] text-[10px] leading-[16px] text-[#707871]">
                {category.description}
              </p>

            </div>

          </div>

        </section>

        {/* =============================
            PRODUCT TITLE
        ============================== */}

        <div className="mb-3 mt-6 flex items-end justify-between">

          <div>
            <h2 className="text-[15px] font-bold text-[#202820]">
              {category.name} Products
            </h2>

            <p className="mt-[2px] text-[9px] text-[#7b837d]">
              Today&apos;s latest market prices
            </p>
          </div>

          <p className="text-[9px] text-[#7b837d]">
            {products.length}{" "}
            {products.length === 1
              ? "Product"
              : "Products"}
          </p>

        </div>

        {/* =============================
            PRODUCTS
        ============================== */}

        {products.length > 0 ? (

          <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">

            {products.map((product) => {
              const change =
                getChangeStyle(product.change);

              const percentage =
                product.change?.pct ?? 0;

              const todayPrice =
                typeof product.today === "number"
                  ? product.today
                  : 0;

              return (
                <Link
                  href={`/product/${product.slug}`}
                  key={product.id}
                  className="group rounded-[10px] border border-[#e1e8e3] bg-white p-3 transition-all duration-200 hover:-translate-y-[2px] hover:border-[#cbdacf] hover:shadow-sm"
                >

                  {/* TOP */}

                  <div className="flex items-start justify-between">

                    <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[8px] bg-[#f2f6f3] text-[23px]">
                      {product.image ||
                        product.categoryIcon ||
                        category.icon}
                    </div>

                    <span
                      className={`rounded-full px-[7px] py-[3px] text-[8px] font-semibold ${change.className}`}
                    >
                      {change.symbol}{" "}
                      {Math.abs(
                        percentage
                      ).toFixed(1)}
                      %
                    </span>

                  </div>

                  {/* NAME */}

                  <div className="mt-3">

                    <h3 className="text-[12px] font-semibold text-[#222a24] transition-colors group-hover:text-[#009846]">
                      {getProductName(product)}
                    </h3>

                    <p className="mt-[2px] text-[8px] text-[#858c87]">
                      {getEnglishUnit(
                        product.unit
                      )}
                    </p>

                  </div>

                  {/* PRICE */}

                  <div className="mt-4 flex items-end justify-between border-t border-[#edf0ed] pt-3">

                    <div>

                      <p className="text-[8px] text-[#888f8a]">
                        Today&apos;s Price
                      </p>

                      <p className="mt-[2px] text-[15px] font-bold text-[#17251d]">
                        ৳
                        {todayPrice.toLocaleString()}
                      </p>

                    </div>

                    <span className="text-[12px] text-[#a1a7a2] transition-all group-hover:translate-x-[2px] group-hover:text-[#009846]">
                      →
                    </span>

                  </div>

                </Link>
              );
            })}

          </section>

        ) : (

          /* =============================
              EMPTY STATE
          ============================== */

          <section className="rounded-[10px] border border-[#e1e8e3] bg-white px-5 py-12 text-center">

            <div className="text-[35px]">
              {category.icon}
            </div>

            <h2 className="mt-3 text-[14px] font-bold text-[#222a24]">
              No products found
            </h2>

            <p className="mt-1 text-[9px] text-[#7b837d]">
              No products are currently
              available in this category.
            </p>

            <Link
              href="/"
              className="mt-4 inline-flex rounded-[5px] bg-[#009846] px-4 py-[8px] text-[9px] font-semibold text-white transition-colors hover:bg-[#00843d]"
            >
              Back to Home
            </Link>

          </section>

        )}

      </div>

    </main>
  );
}