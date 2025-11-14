import { privateAxios } from '@/lib/axiosInterceptor'
import type { Order, Shipping } from '@/models/order.model'

export type PlaceOrderItem = {
  cartId: string
  productId: string
  quantity: number
}
export type PlaceOrderParams = {
  total: number
  items: PlaceOrderItem[]
  shipping: Shipping
}

export const placeOrder = async (params: PlaceOrderParams) => {
  try {
    const res = await privateAxios.post<{ message: string }>('/order', params)
    return res.data
  } catch (err) {
    throw err
  }
}

export const fetchMyOrder = async () => {
  try {
    const res = await privateAxios.get<{ orders: Order[] }>('/order')
    return res.data
  } catch (err) {
    throw err
  }
}
