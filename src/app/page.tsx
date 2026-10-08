import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PriceIncreased from "./components/PriceIncreased";
import PriceDecreased from "./components/PriceDecreased";
import AllProducts from "./components/AllProducts";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <PriceIncreased />
      <PriceDecreased />
      <AllProducts />
      <Footer />
    </main>
  );
}