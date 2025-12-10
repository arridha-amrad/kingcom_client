import { privateAxios } from '@/lib/axiosInterceptor'
import type { Cart } from '@/models/cart.model'
import { queryOptions } from '@tanstack/react-query'

export const cartKeys = {
  fetchCart: 'carts',
}

export const cartQueryOptions = queryOptions({
  queryKey: [cartKeys.fetchCart],
  queryFn: async () => {
    const res = await privateAxios.get<{ carts: Cart[] }>('/cart')
    return res.data
  },
  staleTime: 1000 * 60,
})
