import Hero from "./components/Hero";
import PriceIncreased from "./components/PriceIncreased";
import PriceDecreased from "./components/PriceDecreased";
import AllProducts from "./components/AllProducts";

export default function Home() {
  return (
    <main>
      <Hero />
      <PriceIncreased />
      <PriceDecreased />
      <AllProducts />
    </main>
  );
}