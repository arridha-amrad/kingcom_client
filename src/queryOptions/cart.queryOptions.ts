import { addToCart, deleteFromCart, fetchCart } from '@/api/cart.api'
import { cacheKey } from '@/constants/cacheKey'
import type { Cart } from '@/models/cart.model'
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import toast from 'react-hot-toast'

export const useDeleteFromCartMutation = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (cartId: string) => deleteFromCart(cartId),
    onMutate: (cartId: string) => {
      qc.setQueryData(
        [cacheKey.cart.getCarts],
        ({ carts }: { carts: Cart[] }) => {
          const updatedCarts = carts.filter((c) => c.id !== cartId)
          return {
            carts: updatedCarts,
          }
        }
      )
      toast.success('deleted')
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: [cacheKey.cart.getCarts] })
    },
  })
}

export const cartQueryOptions = queryOptions({
  queryKey: [cacheKey.cart.getCarts],
  queryFn: () => fetchCart(),
  staleTime: 1000 * 60,
})

export const useAddToCartMutation = () => {
  const qc = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: string
      quantity: number
    }) => addToCart(productId, quantity),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [cacheKey.cart.getCarts] })
      toast.success('Added to cart')
    },
    onError(error) {
      if (error.message === 'Unauthorized') {
        router.navigate({
          to: '/',
          replace: true,
          search: {
            login: 'required',
            redirect: location.href,
          },
        })
        return
      }
      toast.error(error.message)
    },
  })
}
