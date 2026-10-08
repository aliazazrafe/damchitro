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
    console.error("Failed to load all products:", error);
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

function getChangeStyle(change: Change) {
  if (change?.dir === "up") {
    return {
      symbol: "▲",
      className: "bg-[#e9f7ee] text-[#009846]",
    };
  }

  if (change?.dir === "down") {
    return {
      symbol: "▼",
      className: "bg-[#fff0f0] text-[#e84c4c]",
    };
  }

  return {
    symbol: "—",
    className: "bg-[#f1f2f1] text-[#777777]",
  };
}

export default async function AllProducts() {
  const products = await getProducts();

  return (
    <section
      id="all-products"
      className="bg-[#f1f8f3] px-4 py-8"
    >
      <div className="mx-auto w-full max-w-[900px]">

        {/* Heading */}
        <div className="mb-5">
          <h2 className="text-[18px] font-bold text-[#17251d]">
            All Products
          </h2>

          <p className="mt-1 text-[10px] leading-[16px] text-[#7c857f]">
            Check today&apos;s latest market prices for all daily essentials.
          </p>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const changeStyle = getChangeStyle(product.change);

              return (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="group rounded-[9px] border border-[#e0e8e2] bg-white px-4 py-3 transition duration-200 hover:-translate-y-[1px] hover:border-[#cad8ce] hover:shadow-sm"
                >
                  {/* Product Top */}
                  <div className="flex items-start gap-3">

                    {/* Emoji */}
                    <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[8px] bg-[#f3f7f4] text-[20px]">
                      {product.image ||
                        product.categoryIcon ||
                        "🛒"}
                    </div>

                    {/* Name */}
                    <div>
                      <h3 className="text-[12px] font-semibold leading-[16px] text-[#202820] transition-colors group-hover:text-[#009846]">
                        {getProductName(product)}
                      </h3>

                      <p className="mt-[2px] text-[9px] text-[#7f8982]">
                        {getEnglishUnit(product.unit)}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-3 flex items-end justify-between">

                    <div>
                      <p className="text-[8px] text-[#858d87]">
                        Today&apos;s Price
                      </p>

                      <p className="mt-[1px] text-[14px] font-bold text-[#17251d]">
                        ৳{product.today.toLocaleString()}
                      </p>
                    </div>

                    {/* Change Badge */}
                    <span
                      className={`rounded-full px-[7px] py-[3px] text-[8px] font-semibold ${changeStyle.className}`}
                    >
                      {changeStyle.symbol}{" "}
                      {Math.abs(product.change?.pct ?? 0).toFixed(1)}%
                    </span>

                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-[9px] border border-[#e0e8e2] bg-white p-8 text-center">
            <p className="text-[12px] text-[#707970]">
              No products found.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}