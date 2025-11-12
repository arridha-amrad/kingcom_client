import { addToCart, fetchCart } from '@/api/cartsApi';
import { cacheKey } from '@/constants/cacheKey';
import { queryClient } from '@/main';
import { queryOptions, useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import toast from 'react-hot-toast';

export const cartQueryOptions = queryOptions({
  queryKey: [cacheKey.cart.getCarts],
  queryFn: fetchCart,
  staleTime: 1000 * 60,
});

export const useAddToCartMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => addToCart(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [cacheKey.cart.getCarts] });
      toast.success('Added to cart');
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
        });
        return;
      }
      toast.error(error.message);
    },
  });
};
