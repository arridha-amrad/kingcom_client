import { privateAxios } from '@/lib/axiosInterceptor'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import toast from 'react-hot-toast'
import { errorHandler } from './helper'

export const cartKeys = {
  fetchCart: 'carts',
}

export const useRemoveCartItemMutation = () => {
  const navigate = useNavigate()
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (cartId: string) => {
      try {
        const res = await privateAxios.delete<{ message: string }>(
          `/cart/${cartId}`
        )
        const data = res.data
        return data.message
      } catch (err) {
        errorHandler(err)
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [cartKeys.fetchCart] })
      toast.success('Item removed from cart')
    },
    onError(error) {
      if (error.message === 'Unauthorized') {
        navigate({
          to: '/login',
          replace: true,
          search: {
            redirect: location.href,
          },
        })
        return
      }
      toast.error(error.message)
    },
  })
}

export function useAddToCartMutation() {
  const qc = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (params: { productId: string; quantity: number }) => {
      try {
        const res = await privateAxios.post<{ message: string }>(
          '/cart',
          params
        )
        const data = res.data
        return data.message
      } catch (err) {
        errorHandler(err)
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [cartKeys.fetchCart] })
      toast.success('Added to cart')
    },
    onError(error) {
      if (error.message === 'Unauthorized') {
        navigate({
          to: '/login',
          replace: true,
          search: {
            redirect: location.href,
          },
        })
        return
      }
      toast.error(error.message)
    },
  })
}
