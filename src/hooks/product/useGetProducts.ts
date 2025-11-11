import { cacheKey } from '@/constants/cacheKey';
import { publicAxios } from '@/lib/axiosInterceptor';
import type { GetProductsResponse } from '@/types/api/product';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export default function useGetProducts(params: FetchProductsParams) {
  return useQuery({
    queryKey: [cacheKey.product.getProducts],
    // enabled: () => {
    //   const data = qc.getQueryData([cacheKey.product.getProducts]) as
    //     | Product
    //     | null
    //     | undefined;
    //   return !data;
    // },
    retry(failureCount) {
      return failureCount === 2;
    },
    staleTime: 60 * 1000,
    queryFn: () => fetchProducts(params),
  });
}

export const fetchProducts = async (params: FetchProductsParams) => {
  const name = params.name ?? '';
  const limit = params.limit ?? '';
  const page = params.page ?? '';
  const url = `/products?name=${name}&limit=${limit}&page=${page}`;
  try {
    const res = await publicAxios.get<GetProductsResponse>(url);
    const data = res.data;
    return data;
  } catch (err) {
    console.log(err);
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.error);
    }
  }
};

type FetchProductsParams = {
  name?: string;
  limit?: string;
  page?: string;
};
