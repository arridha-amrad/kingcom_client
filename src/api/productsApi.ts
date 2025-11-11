import { publicAxios } from '@/lib/axiosInterceptor';
import type {
  FetchProductsParams,
  GetProductResponse,
  GetProductsResponse,
} from './types/productsApi.types';
import { AxiosError } from 'axios';

export const fetchProducts = async (params: FetchProductsParams) => {
  const name = params.name ?? '';
  const limit = params.limit ?? '';
  const page = params.page ?? '';
  const url = `/products?name=${name}&limit=${limit}&page=${page}`;

  // await new Promise((res) => setTimeout(res, 5000));

  try {
    const res = await publicAxios.get<GetProductsResponse>(url);
    const data = res.data;
    return data;
  } catch (err) {
    console.log(err);
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.error);
    }
    throw err;
  }
};

export const fetchProductBySlug = async (slug: string) => {
  // await new Promise((res) => setTimeout(res, 5000));

  try {
    const res = await publicAxios.get<GetProductResponse>(`/products/${slug}`);
    const data = res.data;
    console.log(data);

    return data;
  } catch (err) {
    console.log(err);
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.error);
    }
    throw err;
  }
};
