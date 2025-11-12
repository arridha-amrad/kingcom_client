import { privateAxios } from '@/lib/axiosInterceptor';
import type { Order, Shipping } from '@/models/order.model';

export type OrderItem = {
  cartID: string;
  productID: string;
  quantity: number;
};
export type PlaceOrderParams = {
  total: number;
  items: OrderItem[];
  shipping: Shipping;
};

export const placeOrder = async (params: PlaceOrderParams) => {
  try {
    const res = await privateAxios.post<{ message: string }>('/order', params);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const fetchMyOrder = async () => {
  try {
    const res = await privateAxios.get<{ orders: Order[] }>('/order/user');
    return res.data;
  } catch (err) {
    throw err;
  }
};
