import Link from "next/link";

type Change = {
  dir: "up" | "down" | "flat";
  pct: number;
};

type Product = {
  id: number;
  slug: string;

  name?: string;
  nameEn?: string;
  nameBn?: string;
  productName?: string;
  productNameEn?: string;
  productNameBn?: string;

  categoryName?: string;
  categoryNameEn?: string;
  categoryNameBn?: string;
  categoryIcon?: string;

  unit: string;
  image: string;

  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;

  change: Change;
};

async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(
      "https://api.api-store.workers.dev/api/bazardor/products",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    if (Array.isArray(data)) {
      return data;
    }

    if (Array.isArray(data.products)) {
      return data.products;
    }

    if (Array.isArray(data.data)) {
      return data.data;
    }

    if (Array.isArray(data.data?.products)) {
      return data.data.products;
    }

    return [];
  } catch (error) {
    console.error("Failed to load products:", error);
    return [];
  }
}

function getEnglishUnit(unit: string) {
  const units: Record<string, string> = {
    kg: "Per kg",
    litre: "Per litre",
    liter: "Per litre",
    dozen: "Per dozen",
    piece: "Per piece",
    pcs: "Per piece",
    gram: "Per gram",
  };

  return units[unit?.toLowerCase()] ?? `Per ${unit}`;
}

function getProductName(product: Product) {
  if (product.nameEn) return product.nameEn;

  if (product.productNameEn) return product.productNameEn;

  if (product.name) return product.name;

  if (product.productName) return product.productName;

  // English fallback from slug
  if (product.slug) {
    return product.slug
      .split("-")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");
  }

  return "Product";
}

export default async function PriceDecreased() {
  const products = await getProducts();

  /*
    Top 6 fallers

    API:
    change.dir = "down"
    change.pct = negative percentage
  */

  const decreasedProducts = products
    .filter(
      (product) =>
        product.change &&
        product.change.dir === "down"
    )
    .sort(
      (a, b) =>
        Math.abs(b.change.pct) -
        Math.abs(a.change.pct)
    )
    .slice(0, 6);

  return (
    <section className="bg-[#f1f8f3] px-4 py-6">
      <div className="mx-auto w-full max-w-[900px]">

        {/* Section Heading */}
        <div className="mb-4 flex items-center gap-2">
          <span className="text-[11px] font-bold text-[#009846]">
            ▼
          </span>

          <h2 className="text-[16px] font-bold text-[#1c2921]">
            Today&apos;s Price Decreased
          </h2>
        </div>

        {/* Product Grid */}
        {decreasedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

            {decreasedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="rounded-[9px] border border-[#e0e8e2] bg-white px-4 py-3 transition hover:border-[#cad8ce] hover:shadow-sm"
              >

                {/* Product Top */}
                <div className="flex items-start gap-3">

                  {/* Product Emoji */}
                  <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[8px] bg-[#f3f7f4] text-[20px]">
                    {product.image || product.categoryIcon || "🛒"}
                  </div>

                  {/* Product Info */}
                  <div>
                    <h3 className="text-[12px] font-semibold leading-[16px] text-[#202820]">
                      {getProductName(product)}
                    </h3>

                    <p className="mt-[2px] text-[9px] text-[#7f8982]">
                      {getEnglishUnit(product.unit)}
                    </p>
                  </div>

                </div>

                {/* Price Area */}
                <div className="mt-3 flex items-end justify-between">

                  <div>
                    <p className="text-[8px] text-[#858d87]">
                      Today&apos;s Price
                    </p>

                    <p className="mt-[1px] text-[14px] font-bold text-[#17251d]">
                      ৳{product.today.toLocaleString()}
                    </p>
                  </div>

                  {/* Decreased Badge */}
                  <span className="rounded-full bg-[#fff0f0] px-[7px] py-[3px] text-[8px] font-semibold text-[#e84c4c]">
                    ▼ {Math.abs(product.change.pct).toFixed(1)}%
                  </span>

                </div>

              </Link>
            ))}

          </div>
        ) : (
          <div className="rounded-[9px] border border-[#e0e8e2] bg-white p-8 text-center">
            <p className="text-[12px] text-[#707970]">
              No decreased products found.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}