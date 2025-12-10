import { privateAxios } from '@/lib/axiosInterceptor'
import { useMutation } from '@tanstack/react-query'
import { errorHandler } from './helper'

const routes = {
  addToCart: '/cart',
}

export function useAddToCart() {
  return useMutation({
    mutationFn: async (params: { productId: string; quantity: number }) => {
      try {
        const res = await privateAxios.post<{ message: string }>(
          routes.addToCart,
          params
        )
        const data = res.data
        return data.message
      } catch (err) {
        errorHandler(err)
      }
    },
  })
}
