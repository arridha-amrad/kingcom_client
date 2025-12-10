import { privateAxios } from '@/lib/axiosInterceptor'
import type { Product } from '@/models/product.model'
import type { CreateProductRequest } from '@/schemas/product.schema'
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { errorHandler } from './helper'

const routes = {
  addProduct: '/products',
  fetchProducts: '/products',
  fetchBySlug: (slug: string) => `/products/${slug}`,
}

// MUTATION
export function useCreateProduct() {
  return useMutation({
    mutationFn: async (params: CreateProductRequest) => {
      try {
        const res = await privateAxios.post<{ message: string }>(
          routes.addProduct,
          params
        )
        const data = res.data
        console.log({ params })
        return data.message
      } catch (err: unknown) {
        errorHandler(err)
      }
    },
  })
}

// QUERY
export function useFetchProducts() {
  return useQuery(productsQueryOptions())
}

export default function useFetchProductBySlug(slug: string) {
  return useQuery(productQueryOptions(slug))
}

// QUERY OPTIONS
export const productsQueryOptions = () =>
  queryOptions({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        const res = await privateAxios.get<{ products: Product[] }>(
          routes.fetchProducts
        )
        return res.data.products
      } catch (err: unknown) {
        errorHandler(err)
      }
    },
  })

export const productQueryOptions = (slug: string) => {
  const qc = useQueryClient()
  return queryOptions({
    queryKey: ['get-products', slug],
    queryFn: async () => {
      try {
        const res = await privateAxios.get<{ product: Product }>(
          routes.fetchBySlug(slug)
        )
        return res.data.product
      } catch (err) {
        errorHandler(err)
      }
    },
    enabled: () => {
      const data = qc.getQueryData(['get-products', slug])
      return !data
    },
  })
}
