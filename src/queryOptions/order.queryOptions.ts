import { fetchMyOrder } from '@/api/order.api'
import { privateAxios } from '@/lib/axiosInterceptor'
import type { Shipping } from '@/models/order.model'
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { cartKeys } from './cart.queryOptions'

const orderKeys = {
  fetchOrders: 'orders',
}

type PlaceOrderItem = {
  cartId: string
  productId: string
  quantity: number
  priceAtOrder: number
  discountAtOrder: number
  finalPriceAtOrder: number
}
type PlaceOrderParams = {
  total: number
  items: PlaceOrderItem[]
  shipping: Shipping
}

export const usePlaceOrderMutation = () => {
  const qc = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (params: PlaceOrderParams) => {
      const res = await privateAxios.post<{ message: string }>('/order', params)
      return res.data
    },
    onError(err) {
      console.log(err)
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message)
      }
    },
    onSuccess: ({ message }) => {
      qc.invalidateQueries({ queryKey: [cartKeys.fetchCart] })
      qc.invalidateQueries({ queryKey: [orderKeys.fetchOrders] })
      toast.success(message)
      navigate({ to: '/orders' })
    },
  })
}

export const ordersQueryOptions = queryOptions({
  queryKey: [orderKeys.fetchOrders],
  queryFn: fetchMyOrder,
})
