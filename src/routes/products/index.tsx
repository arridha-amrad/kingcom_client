import ProductFilter from '@/components/ProductFilter';
import Products from '@/components/Products';
import ProductPaginatedButton from '@/components/ProductsPaginatedButton';
import { productsQueryOptions } from '@/queryOptions/product.queryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';

import { createFileRoute } from '@tanstack/react-router';
import { ChevronRightIcon, Loader2 } from 'lucide-react';

export const Route = createFileRoute('/products/')({
  component: RouteComponent,
  loaderDeps: ({ search }) => {
    const { name, limit, page } = search as any;
    return {
      name,
      limit,
      page,
    };
  },
  loader({ context: { queryClient }, deps }) {
    queryClient.ensureQueryData(productsQueryOptions(deps));
  },
  pendingComponent: () => (
    <div className="flex justify-center w-full">
      <Loader2 className="animate-spin size-7" />
    </div>
  ),
});

function RouteComponent() {
  const deps = Route.useLoaderDeps();
  const { data } = useSuspenseQuery(productsQueryOptions(deps));

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
          <Products products={data.items} />
          <div className="xl:max-w-7xl w-full mx-auto my-8 h-px bg-black/10"></div>
          <ProductPaginatedButton totalPages={data.totalPage} />
        </div>
      </div>
    </main>
  );
}
