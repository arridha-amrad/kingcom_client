import type { Cart } from '@/models/cart.model';
import { Fragment } from 'react';
import CartItem from './CartItem';

type Props = {
  cart: Cart[];
};

function CartList({ cart }: Props) {
  // const { data: auth } = useGetAuth();
  // const { data, isPending } = useGetCart(auth);
  // if (isPending) {
  //   return (
  //     <div className="flex items-center justify-center fill-foreground">
  //       <Spinner />
  //     </div>
  //   );
  // }
  // if (!data) return null;
  return (
    <div className="border space-y-8 flex-2 border-foreground/10 p-6 rounded-3xl">
      {cart.map((c, i) => (
        <Fragment key={c.id}>
          <CartItem key={c.id} item={c} />
          {i + 1 !== cart.length && (
            <div className="w-full h-px bg-foreground/10"></div>
          )}
        </Fragment>
      ))}
    </div>
  );
}

export default CartList;
