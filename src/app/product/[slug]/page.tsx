import Link from "next/link";
import { notFound } from "next/navigation";

type Change = {
  dir: "up" | "down" | "flat";
  pct: number;
};

type Market = Record<string, unknown>;

type Product = {
  id: number;
  slug: string;

  name?: string;
  nameEn?: string;
  productName?: string;
  productNameEn?: string;

  description?: string;
  descriptionEn?: string;

  categoryName?: string;
  categoryNameEn?: string;
  categoryIcon?: string;

  unit?: string;
  image?: string;

  today?: number;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;

  change?: Change;
  markets?: Market[];
};

/* ==============================
   GET PRODUCT FROM API
================================ */

async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  try {
    const response = await fetch(
      "https://api.api-store.workers.dev/api/bazardor/products",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    const result = await response.json();

    let products: Product[] = [];

    if (Array.isArray(result)) {
      products = result;
    } else if (Array.isArray(result?.products)) {
      products = result.products;
    } else if (Array.isArray(result?.data)) {
      products = result.data;
    } else if (Array.isArray(result?.data?.products)) {
      products = result.data.products;
    }

    return (
      products.find(
        (product) => product.slug === slug
      ) ?? null
    );
  } catch (error) {
    console.error("Failed to load product:", error);
    return null;
  }
}

/* ==============================
   PRODUCT NAME
================================ */

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

/* ==============================
   UNIT
================================ */

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

/* ==============================
   GET STRING FROM MARKET
================================ */

function getStringValue(
  market: Market,
  keys: string[],
  fallback: string
) {
  for (const key of keys) {
    const value = market[key];

    if (
      typeof value === "string" &&
      value.trim() !== ""
    ) {
      return value;
    }
  }

  return fallback;
}

/* ==============================
   GET NUMBER FROM MARKET
================================ */

function getNumberValue(
  market: Market,
  keys: string[]
): number | null {
  for (const key of keys) {
    const value = market[key];

    if (
      typeof value === "number" &&
      Number.isFinite(value)
    ) {
      return value;
    }

    if (
      typeof value === "string" &&
      value.trim() !== "" &&
      Number.isFinite(Number(value))
    ) {
      return Number(value);
    }
  }

  return null;
}

/* ==============================
   MARKET NAME
================================ */

function getMarketName(
  market: Market,
  index: number
) {
  return getStringValue(
    market,
    [
      "nameEn",
      "marketNameEn",
      "marketName",
      "name",
      "market",
      "bazarName",
      "bazar",
    ],
    `Market ${index + 1}`
  );
}

/* ==============================
   DIVISION
================================ */

function getDivision(market: Market) {
  return getStringValue(
    market,
    [
      "divisionEn",
      "divisionNameEn",
      "divisionName",
      "division",
      "area",
      "location",
    ],
    "Bangladesh"
  );
}

/* ==============================
   MARKET MINIMUM
================================ */

function getMarketMinimum(market: Market) {
  return getNumberValue(market, [
    "min",
    "minPrice",
    "minimum",
    "minimumPrice",
    "lowest",
    "lowestPrice",
    "low",
  ]);
}

/* ==============================
   MARKET MAXIMUM
================================ */

function getMarketMaximum(market: Market) {
  return getNumberValue(market, [
    "max",
    "maxPrice",
    "maximum",
    "maximumPrice",
    "highest",
    "highestPrice",
    "high",
  ]);
}

/* ==============================
   MARKET AVERAGE
================================ */

function getMarketAverage(market: Market) {
  return getNumberValue(market, [
    "avg",
    "avgPrice",
    "average",
    "averagePrice",
    "price",
    "today",
    "todayPrice",
  ]);
}

/* ==============================
   PAGE
================================ */

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const todayPrice =
    typeof product.today === "number"
      ? product.today
      : 0;

  const markets = Array.isArray(product.markets)
    ? product.markets
    : [];

  /* ==============================
     PREPARE MARKET ROWS
  ================================ */

  const marketRows = markets.map(
    (market, index) => {
      const min =
        getMarketMinimum(market) ??
        todayPrice;

      const max =
        getMarketMaximum(market) ??
        todayPrice;

      const average =
        getMarketAverage(market) ??
        Math.round((min + max) / 2);

      return {
        name: getMarketName(market, index),
        division: getDivision(market),
        min,
        max,
        average,
      };
    }
  );

  /* ==============================
     PRICE SUMMARY
  ================================ */

  const minimumPrice =
    marketRows.length > 0
      ? Math.min(
          ...marketRows.map(
            (market) => market.min
          )
        )
      : todayPrice;

  const maximumPrice =
    marketRows.length > 0
      ? Math.max(
          ...marketRows.map(
            (market) => market.max
          )
        )
      : todayPrice;

  const averagePrice =
    marketRows.length > 0
      ? Math.round(
          marketRows.reduce(
            (total, market) =>
              total + market.average,
            0
          ) / marketRows.length
        )
      : todayPrice;

  /* ==============================
     CHANGE
  ================================ */

  const direction =
    product.change?.dir ?? "flat";

  const percentage =
    product.change?.pct ?? 0;

  const changeStyle =
    direction === "up"
      ? {
          symbol: "▲",
          className: "text-[#e84c4c]",
        }
      : direction === "down"
      ? {
          symbol: "▼",
          className: "text-[#009846]",
        }
      : {
          symbol: "—",
          className: "text-[#777777]",
        };

  return (
    <main className="min-h-screen bg-[#f1f6f2]">
      <div className="mx-auto w-full max-w-[900px] px-4 py-7">

        {/* Back */}

        <Link
          href="/"
          className="mb-4 inline-flex text-[10px] font-medium text-[#606861] transition hover:text-[#009846]"
        >
          ← Back to Home
        </Link>

        {/* ==============================
            PRODUCT SUMMARY
        ================================ */}

        <section className="rounded-[10px] border border-[#e1e8e3] bg-white px-5 py-4">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            {/* Left */}

            <div className="flex items-center gap-4">

              <div className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-[10px] bg-[#f1f5f2] text-[28px]">
                {product.image ||
                  product.categoryIcon ||
                  "🛒"}
              </div>

              <div>
                <h1 className="text-[18px] font-bold text-[#202820]">
                  {getProductName(product)}
                </h1>

                <p className="mt-[3px] text-[9px] text-[#777f79]">
                  {product.categoryIcon || "🛒"}{" "}
                  {product.categoryNameEn ||
                    product.categoryName ||
                    "Daily Essential"}
                  {" · "}
                  {getEnglishUnit(product.unit)}
                </p>

                <p className="mt-2 text-[9px] text-[#737c76]">
                  {product.descriptionEn ||
                    product.description ||
                    `Today's average market price is ৳${todayPrice.toLocaleString()}.`}
                </p>
              </div>

            </div>

            {/* Today's Price */}

            <div className="rounded-[9px] bg-[#f5f8f5] px-5 py-3 sm:text-right">

              <p className="text-[8px] text-[#858d87]">
                Today&apos;s Price
              </p>

              <p className="mt-[2px] text-[20px] font-bold text-[#17251d]">
                ৳{todayPrice.toLocaleString()}
              </p>

              <p
                className={`mt-[2px] text-[8px] font-semibold ${changeStyle.className}`}
              >
                {changeStyle.symbol}{" "}
                {Math.abs(percentage).toFixed(1)}%
              </p>

            </div>

          </div>
        </section>

        {/* ==============================
            DETAILS CONTAINER
        ================================ */}

        <section className="mt-4 rounded-[10px] border border-[#e1e8e3] bg-white p-4">

          {/* PRICE SUMMARY */}

          <h2 className="text-[13px] font-bold text-[#273029]">
            Price Summary
          </h2>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">

            {/* Minimum */}

            <div className="rounded-[9px] border border-[#e2e8e3] px-4 py-3">

              <p className="text-[8px] text-[#737c76]">
                Minimum Price
              </p>

              <p className="mt-1 text-[17px] font-bold text-[#009846]">
                ৳{minimumPrice.toLocaleString()}
              </p>

              <p className="mt-1 text-[8px] text-[#8a918c]">
                Lowest price in markets
              </p>

            </div>

            {/* Maximum */}

            <div className="rounded-[9px] border border-[#e2e8e3] px-4 py-3">

              <p className="text-[8px] text-[#737c76]">
                Maximum Price
              </p>

              <p className="mt-1 text-[17px] font-bold text-[#e84c4c]">
                ৳{maximumPrice.toLocaleString()}
              </p>

              <p className="mt-1 text-[8px] text-[#8a918c]">
                Highest price in markets
              </p>

            </div>

            {/* Average */}

            <div className="rounded-[9px] border border-[#e2e8e3] px-4 py-3">

              <p className="text-[8px] text-[#737c76]">
                Average Price
              </p>

              <p className="mt-1 text-[17px] font-bold text-[#009846]">
                ৳{averagePrice.toLocaleString()}
              </p>

              <p className="mt-1 text-[8px] text-[#8a918c]">
                Average across all markets
              </p>

            </div>

          </div>

          {/* ==============================
              MARKET TABLE
          ================================ */}

          <h2 className="mb-3 mt-5 text-[13px] font-bold text-[#273029]">
            Today&apos;s Prices by Market
          </h2>

          {marketRows.length > 0 ? (
            <div className="overflow-x-auto rounded-[8px] border border-[#dfe6e1]">

              <table className="w-full min-w-[650px] border-collapse">

                <thead className="bg-[#fafcfa]">

                  <tr className="border-b border-[#dfe6e1]">

                    <th className="px-3 py-[9px] text-left text-[8px] font-medium text-[#6d766f]">
                      Market
                    </th>

                    <th className="px-3 py-[9px] text-left text-[8px] font-medium text-[#6d766f]">
                      Division
                    </th>

                    <th className="px-3 py-[9px] text-right text-[8px] font-medium text-[#6d766f]">
                      Minimum
                    </th>

                    <th className="px-3 py-[9px] text-right text-[8px] font-medium text-[#6d766f]">
                      Maximum
                    </th>

                    <th className="px-3 py-[9px] text-right text-[8px] font-medium text-[#6d766f]">
                      Average
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {marketRows.map(
                    (market, index) => (
                      <tr
                        key={index}
                        className="border-b border-[#dfe6e1] last:border-b-0"
                      >

                        <td className="px-3 py-[9px] text-[8px] font-medium text-[#323a34]">
                          {market.name}
                        </td>

                        <td className="px-3 py-[9px] text-[8px] text-[#525b54]">
                          {market.division}
                        </td>

                        <td className="px-3 py-[9px] text-right text-[8px] text-[#323a34]">
                          ৳{market.min.toLocaleString()}
                        </td>

                        <td className="px-3 py-[9px] text-right text-[8px] text-[#323a34]">
                          ৳{market.max.toLocaleString()}
                        </td>

                        <td className="px-3 py-[9px] text-right text-[8px] font-semibold text-[#202820]">
                          ৳{market.average.toLocaleString()}
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          ) : (
            <div className="rounded-[8px] border border-[#dfe6e1] px-4 py-7 text-center">
              <p className="text-[9px] text-[#737c76]">
                Market information is currently unavailable.
              </p>
            </div>
          )}

        </section>

      </div>
    </main>
  );
}