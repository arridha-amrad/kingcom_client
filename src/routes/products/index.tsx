import ProductFilter from '@/components/ProductFilter';
import Products from '@/components/Products';
import ProductPaginatedButton from '@/components/ProductsPaginatedButton';
import { cacheKey } from '@/constants/cacheKey';
import { fetchProducts } from '@/hooks/product/useGetProducts';
import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { ChevronRightIcon } from 'lucide-react';

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
  loader({ context, deps: { limit, name, page } }) {
    const result = context.queryClient.ensureQueryData({
      queryKey: [cacheKey.product.getProducts],
      queryFn: () => fetchProducts({ limit, name, page }),
    });
    return result;
  },
});

function RouteComponent() {
  const result = Route.useLoaderData();
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
          {result && <ProductPaginatedButton totalPages={result.totalPage} />}
        </div>
      </div>
    </main>
  );
}
