import { useAddToCartMutation } from '@/queryOptions/cart.queryOptions';

interface Props {
  productId: string;
  quantity: number;
}

export default function AddToCart({ productId, quantity }: Props) {
  const { mutate, isPending } = useAddToCartMutation();

  return (
    <button
      disabled={isPending}
      onClick={() => mutate({ productId, quantity })}
      className="flex-2 disabled:brightness-75 font-semibold h-13 bg-foreground text-background rounded-full"
    >
      Add To Cart
    </button>
  );
}
