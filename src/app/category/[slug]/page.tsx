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
  nameBn?: string;
  nameEn?: string;

  productName?: string;
  productNameEn?: string;

  category?: string;
  categoryName?: string;
  categoryNameEn?: string;
  categoryNameBn?: string;
  categoryIcon?: string;

  unit?: string;
  image?: string;

  today?: number | string;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;

  change?: Change;
};

type Category = {
  name: string;
  icon: string;
  description: string;
};

type SortOption = "default" | "low-to-high" | "high-to-low";

const API_URL =
  "https://openapi.programming-hero.com/api/bazardor";

/* =====================================
   CATEGORY INFORMATION
===================================== */

const categoryInfo: Record<string, Category> = {
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
    name: "Egg & Milk",
    icon: "🥚",
    description:
      "Check today's latest egg and milk prices from different markets.",
  },

  "dim-dui": {
    name: "Egg & Milk",
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
   ENGLISH PRODUCT NAMES
===================================== */

const englishProductNames: Record<string, string> = {
  // Rice
  "miniket-chal": "Miniket Rice",
  "najirshail-chal": "Nazirshail Rice",
  "nazirshail-chal": "Nazirshail Rice",
  "atop-chal": "Atap Rice",
  "siddho-chal": "Parboiled Rice",
  "mota-chal": "Coarse Rice",
  "chikon-chal": "Fine Rice",
  "basmati-chal": "Basmati Rice",

  // Lentils
  "mosur-dal": "Red Lentils",
  "masur-dal": "Red Lentils",
  "mug-dal": "Mung Beans",
  "moog-dal": "Mung Beans",
  "chola-dal": "Split Chickpeas",
  "motor-dal": "Split Peas",
  "mashkalai-dal": "Black Gram",

  // Oil
  "soyabin-tel": "Soybean Oil",
  "soyabean-tel": "Soybean Oil",
  "sorisha-tel": "Mustard Oil",
  "sunflower-tel": "Sunflower Oil",
  "palm-tel": "Palm Oil",

  // Vegetables
  alu: "Potato",
  "alu-deshi": "Local Potato",
  peyaj: "Onion",
  "peyaj-deshi": "Local Onion",
  "peyaj-imported": "Imported Onion",
  roshun: "Garlic",
  ada: "Ginger",
  begun: "Eggplant",
  tomato: "Tomato",
  shosha: "Cucumber",
  lau: "Bottle Gourd",
  kumra: "Pumpkin",
  mistikumra: "Sweet Pumpkin",
  potol: "Pointed Gourd",
  korola: "Bitter Gourd",
  dherosh: "Okra",
  fulkopi: "Cauliflower",
  badhakopi: "Cabbage",
  gajor: "Carrot",
  mula: "Radish",
  kacha: "Green",
  "kacha-morich": "Green Chili",
  "kacha-moris": "Green Chili",
  "lal-shak": "Red Amaranth",
  "palong-shak": "Spinach",

  // Fish
  ilish: "Hilsa Fish",
  "ilish-mach": "Hilsa Fish",
  rui: "Rohu Fish",
  "rui-mach": "Rohu Fish",
  katla: "Catla Fish",
  "katla-mach": "Catla Fish",
  pangash: "Pangasius Fish",
  "pangash-mach": "Pangasius Fish",
  tilapia: "Tilapia Fish",
  "tilapia-mach": "Tilapia Fish",
  chingri: "Shrimp",
  "chingri-mach": "Shrimp",
  koi: "Climbing Perch",
  "koi-mach": "Climbing Perch",

  // Meat
  "broiler-murgi": "Broiler Chicken",
  "sonali-murgi": "Sonali Chicken",
  "deshi-murgi": "Local Chicken",
  "gorur-mangsho": "Beef",
  "khasir-mangsho": "Mutton",
  "hash-er-mangsho": "Duck Meat",

  // Egg & Milk
  dim: "Egg",
  "farm-er-dim": "Farm Eggs",
  "farm-dim": "Farm Eggs",
  "deshi-dim": "Local Eggs",
  "hash-er-dim": "Duck Eggs",
  dudh: "Milk",
  "goru-dudh": "Cow Milk",
  "gorur-dudh": "Cow Milk",
  "packet-dudh": "Packaged Milk",
  "gura-dudh": "Powdered Milk",

  // Spices
  "moricher-gura": "Chili Powder",
  "morich-gura": "Chili Powder",
  "morich-er-gura": "Chili Powder",
  "lal-morich-gura": "Red Chili Powder",
  "holuder-gura": "Turmeric Powder",
  "holud-gura": "Turmeric Powder",
  "dhoniya-gura": "Coriander Powder",
  "dhone-gura": "Coriander Powder",
  "jira-gura": "Cumin Powder",
  jira: "Cumin",
  dhoniya: "Coriander",
  daruchini: "Cinnamon",
  elach: "Cardamom",
  lobongo: "Cloves",
  golmorich: "Black Pepper",
  tejpata: "Bay Leaves",
};

/* =====================================
   CATEGORY SLUG HANDLING
===================================== */

function normalizeCategorySlug(slug: string) {
  if (slug === "dim-dudh" || slug === "dim-dui") {
    return "dim-dui";
  }

  return slug;
}

/* =====================================
   FETCH PRODUCTS
===================================== */

async function getCategoryProducts(
  slug: string
): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        "Failed to fetch products:",
        response.status
      );

      return [];
    }

    const result = await response.json();

    let allProducts: Product[] = [];

    if (Array.isArray(result)) {
      allProducts = result;
    } else if (Array.isArray(result?.products)) {
      allProducts = result.products;
    } else if (Array.isArray(result?.data)) {
      allProducts = result.data;
    } else if (Array.isArray(result?.data?.products)) {
      allProducts = result.data.products;
    }

    const currentCategory = normalizeCategorySlug(slug);

    return allProducts.filter((product) => {
      const productCategory = normalizeCategorySlug(
        product.category || ""
      );

      return productCategory === currentCategory;
    });
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

function formatSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => {
      return (
        word.charAt(0).toUpperCase() +
        word.slice(1)
      );
    })
    .join(" ");
}

function getProductName(product: Product) {
  const slug = product.slug.toLowerCase();

  // Prefer the API's explicit English name.
  if (product.nameEn?.trim()) {
    return product.nameEn;
  }

  if (product.productNameEn?.trim()) {
    return product.productNameEn;
  }

  // Translate known product slugs.
  if (englishProductNames[slug]) {
    return englishProductNames[slug];
  }

  // Use an English API name if available.
  if (
    product.name &&
    /^[\x00-\x7F]+$/.test(product.name)
  ) {
    return product.name;
  }

  if (
    product.productName &&
    /^[\x00-\x7F]+$/.test(product.productName)
  ) {
    return product.productName;
  }

  // Fallback to a readable name from the slug.
  return formatSlug(product.slug);
}

/* =====================================
   ENGLISH UNIT
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
    "কেজি": "Per kg",
    "লিটার": "Per litre",
    "ডজন": "Per dozen",
    "পিস": "Per piece",
    "গ্রাম": "Per gram",
  };

  return units[unit.toLowerCase()] ?? `Per ${unit}`;
}

/* =====================================
   CHANGE BADGE
===================================== */

function getChangeStyle(change?: Change) {
  if (!change) {
    return {
      symbol: "—",
      className: "bg-[#f1f3f1] text-[#777777]",
    };
  }

  if (change.dir === "up") {
    return {
      symbol: "▲",
      className: "bg-[#e8f7ed] text-[#009846]",
    };
  }

  if (change.dir === "down") {
    return {
      symbol: "▼",
      className: "bg-[#fff0f0] text-[#e34d4d]",
    };
  }

  return {
    symbol: "—",
    className: "bg-[#f1f3f1] text-[#777777]",
  };
}

/* =====================================
   SORT PRODUCTS
===================================== */

function sortProducts(
  products: Product[],
  sort: SortOption
) {
  const sortedProducts = [...products];

  if (sort === "low-to-high") {
    sortedProducts.sort(
      (a, b) =>
        Number(a.today ?? 0) -
        Number(b.today ?? 0)
    );
  }

  if (sort === "high-to-low") {
    sortedProducts.sort(
      (a, b) =>
        Number(b.today ?? 0) -
        Number(a.today ?? 0)
    );
  }

  return sortedProducts;
}

/* =====================================
   CATEGORY PAGE
===================================== */

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string | string[] }>;
}) {
  const { slug } = await params;
  const query = await searchParams;

  const category = categoryInfo[slug];

  if (!category) {
    notFound();
  }

  const requestedSort = Array.isArray(query.sort)
    ? query.sort[0]
    : query.sort;

  const sort: SortOption =
    requestedSort === "low-to-high" ||
    requestedSort === "high-to-low"
      ? requestedSort
      : "default";

  const products = await getCategoryProducts(slug);

  const sortedProducts = sortProducts(products, sort);

  return (
    <main className="min-h-screen bg-[#f1f8f3]">
      <div className="mx-auto w-full max-w-[900px] px-3 py-5 sm:px-4 sm:py-6">
        {/* BACK TO HOME */}

        <Link
          href="/"
          className="inline-flex items-center gap-1 text-[10px] font-medium text-[#687169] transition-colors hover:text-[#009846]"
        >
          ← Back to Home
        </Link>

        {/* CATEGORY HEADER */}

        <section className="mt-4 rounded-[12px] border border-[#e1e9e3] bg-white px-4 py-5 sm:px-5">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[10px] bg-[#f1f7f3] text-[27px] sm:h-[56px] sm:w-[56px] sm:text-[30px]">
              {category.icon}
            </div>

            <div className="min-w-0">
              <p className="text-[9px] font-semibold uppercase tracking-[1px] text-[#009846]">
                Product Category
              </p>

              <h1 className="mt-1 text-[20px] font-bold leading-tight text-[#17251d] sm:text-[22px]">
                {category.name}
              </h1>

              <p className="mt-1 max-w-[520px] text-[10px] leading-[16px] text-[#707871]">
                {category.description}
              </p>
            </div>
          </div>
        </section>

        {/* PRODUCT TITLE + SORT */}

        <div className="mb-3 mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-[15px] font-bold text-[#202820]">
              {category.name} Products
            </h2>

            <p className="mt-[2px] text-[9px] text-[#7b837d]">
              Today&apos;s latest market prices
            </p>

            <p className="mt-1 text-[9px] text-[#7b837d]">
              {sortedProducts.length}{" "}
              {sortedProducts.length === 1
                ? "Product"
                : "Products"}
            </p>
          </div>

          {/* SORT FORM */}

          <form
            action={`/category/${slug}`}
            method="get"
            className="flex flex-wrap items-center gap-2"
          >
            <label
              htmlFor="sort"
              className="text-[10px] font-medium text-[#5c665e]"
            >
              Sort by:
            </label>

            <select
              id="sort"
              name="sort"
              defaultValue={sort}
              className="min-w-0 max-w-full rounded-[6px] border border-[#dce5de] bg-white px-3 py-[9px] text-[10px] font-medium text-[#273029] outline-none transition-colors focus:border-[#009846]"
            >
              <option value="default">
                Default
              </option>

              <option value="low-to-high">
                Price: Low to High
              </option>

              <option value="high-to-low">
                Price: High to Low
              </option>
            </select>

            <button
              type="submit"
              className="rounded-[6px] bg-[#009846] px-4 py-[9px] text-[10px] font-semibold text-white transition-colors hover:bg-[#00843d]"
            >
              Apply
            </button>
          </form>
        </div>

        {/* PRODUCTS */}

        {sortedProducts.length > 0 ? (
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {sortedProducts.map((product) => {
              const change = getChangeStyle(
                product.change
              );

              const percentage =
                product.change?.pct ?? 0;

              const todayPrice = Number(
                product.today ?? 0
              );

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
          /* EMPTY STATE */

          <section className="rounded-[10px] border border-[#e1e8e3] bg-white px-5 py-12 text-center">
            <div className="text-[35px]">
              {category.icon}
            </div>

            <h2 className="mt-3 text-[14px] font-bold text-[#222a24]">
              No products found
            </h2>

            <p className="mt-1 text-[9px] text-[#7b837d]">
              No products are currently available
              in this category.
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