import ProductDetail from "@/components/ProductDetail";
import Tab from "@/components/ProductDetail/Tab";
import YouMightAlsoLike from "@/components/ShowCases/YouMightAlsoLike";
import { ChevronRight } from "lucide-react";

function Page() {
  return (
    <main className="px-4">
      <section
        id="breadcrumb"
        className="flex mx-auto py-6 justify-center lg:justify-start text-foreground/50 items-center gap-2"
      >
        <p>Home</p>
        <ChevronRight />
        <p>Products</p>
        <ChevronRight />
        <p>MotherBoard</p>
        <ChevronRight />
        <p className="text-foreground">Z890 AORUS ELITE X ICE</p>
      </section>
      <ProductDetail />
      <Tab />
      <YouMightAlsoLike />
      <div className="xl:mb-32 mb-16"></div>
    </main>
  );
}

export default Page;
