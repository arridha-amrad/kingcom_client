import ProductFilter from "@/ProductFilter";
import Products from "@/components/Products";
import ProductPaginatedButton from "@/components/ProductsPaginatedButton";
import { ChevronRightIcon } from "lucide-react";
import { Suspense } from "react";

function Page() {
  return (
    <main className="w-full px-4">
      <section
        id="breadcrumb"
        className="flex py-6 justify-center md:justify-start text-foreground/50 items-center gap-2"
      >
        <p>Home</p>
        <ChevronRightIcon />
        <p>Products</p>
        <ChevronRightIcon />
        <p className="text-foreground font-medium">All</p>
      </section>
      <div className="flex gap-4 pb-8">
        <div className="max-w-xs md:block hidden">
          <ProductFilter />
        </div>
        <div className="h-full w-full">
          <Products />
          <div className="xl:max-w-7xl w-full mx-auto my-8 h-px bg-black/10"></div>
          <Suspense>
            <ProductPaginatedButton totalPages={7} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

export default Page;
