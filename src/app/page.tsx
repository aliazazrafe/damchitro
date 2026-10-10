import Hero from "./components/Hero";
import PriceIncreased from "./components/PriceIncreased";
import PriceDecreased from "./components/PriceDecreased";
import AllProducts from "./components/AllProducts";
import SocialLoginToast from "./components/SocialLoginToast";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main>
      <SocialLoginToast />

      <Hero />
      <PriceIncreased />
      <PriceDecreased />
      <AllProducts />
    </main>
  );
}