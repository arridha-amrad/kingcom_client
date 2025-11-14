import {
  fetchProductBySlug,
  fetchProducts,
  type FetchProductsParams,
  type GetProductResponse,
  type GetProductsResponse,
} from '@/api/product.api'
import { cacheKey } from '@/constants/cacheKey'
import { QueryClient, queryOptions } from '@tanstack/react-query'

export const productsQueryOptions = (params?: FetchProductsParams) =>
  queryOptions({
    queryKey: [
      cacheKey.product.getProducts,
      params?.name,
      params?.limit,
      params?.page,
    ],
    queryFn: () => fetchProducts(params),
    staleTime: 1000 * 60,
  })

export const productQueryOptions = (slug: string, qc?: QueryClient) => {
  return queryOptions({
    queryKey: [cacheKey.product.getProduct, slug],
    queryFn: () => fetchProductBySlug(slug),
    staleTime: 1000 * 60,
    placeholderData: () => {
      const results =
        qc?.getQueriesData({
          predicate: (query) =>
            query.queryKey[0] === cacheKey.product.getProducts,
        }) ?? []

      const allItems = results.flatMap(([_, data]) => {
        const res = data as GetProductsResponse | undefined
        return res?.items ?? []
      })

      const product = allItems.find((i) => i.slug === slug) ?? null

      return { product } satisfies GetProductResponse
    },
  })
}
