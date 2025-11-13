import { privateAxios } from '@/lib/axiosInterceptor';
import type { Cart } from '@/models/cart.model';
import { AxiosError } from 'axios';

const routes = {
  fetchCart: '/cart',
  addToCart: '/cart/add',
};

export const addToCart = async (productId: string, quantity: number) => {
  try {
    const res = await privateAxios.post<{ message: string }>(routes.addToCart, {
      productId,
      quantity,
    });
    const data = res.data;
    return data.message;
  } catch (err) {
    console.log(err);
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.message);
    }
    throw err;
  }
};

export const fetchCart = async () => {
  // await new Promise((res) => setTimeout(res, 5000));
  try {
    const res = await privateAxios.get<{ carts: Cart[] }>(routes.fetchCart);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.error);
    }
    throw err;
  }
};
