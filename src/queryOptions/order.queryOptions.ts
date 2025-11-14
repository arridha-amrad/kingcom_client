import {
  fetchMyOrder,
  placeOrder,
  type PlaceOrderParams,
} from '@/api/order.api'
import { cacheKey } from '@/constants/cacheKey'
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

export const usePlaceOrderMutation = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (params: PlaceOrderParams) => placeOrder(params),
    onError(err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message)
      }
      console.log(err)
    },
    onSuccess: ({ message }) => {
      qc.invalidateQueries({ queryKey: [cacheKey.cart.getCarts] })
      toast.success(message)
    },
  })
}

export const ordersQueryOptions = queryOptions({
  queryKey: [cacheKey.order.getOrders],
  queryFn: fetchMyOrder,
})
