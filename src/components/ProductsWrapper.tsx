import type { FetchProductsParams } from '@/api/types/productsApi.types';
import { productsQueryOptions } from '@/queryOptions/product.queryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import Products from './Products';
import ProductPaginatedButton from './ProductsPaginatedButton';

type Props = {
  deps: FetchProductsParams;
};

export default function ProductsWrapper({ deps }: Props) {
  const { data } = useSuspenseQuery(productsQueryOptions(deps));

  return (
    <div className="h-full w-full">
      <Products products={data.items} />
      <div className="xl:max-w-7xl w-full mx-auto my-8 h-px bg-black/10"></div>
      <ProductPaginatedButton totalPages={data.totalPage} />
    </div>
  );
}
