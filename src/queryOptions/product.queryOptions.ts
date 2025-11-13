import {
  fetchProductBySlug,
  fetchProducts,
  type FetchProductsParams,
} from '@/api/product.api';
import { cacheKey } from '@/constants/cacheKey';
import { queryOptions } from '@tanstack/react-query';

export const productsQueryOptions = (params: FetchProductsParams) =>
  queryOptions({
    queryKey: [
      cacheKey.product.getProducts,
      params.name,
      params.limit,
      params.page,
    ],
    queryFn: () => fetchProducts(params),
    staleTime: 1000 * 60,
  });

export const productQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: [cacheKey.product.getProduct, slug],
    queryFn: () => fetchProductBySlug(slug),
    staleTime: 1000 * 60,
  });
