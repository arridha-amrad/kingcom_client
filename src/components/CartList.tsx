import type { Cart } from '@/models/cart.model';
import CartCard from './CartCard';

type Props = {
  carts: Cart[];
};

function CartList({ carts }: Props) {
  return (
    <section className="w-full space-y-4">
      {carts.map((c) => (
        <CartCard key={c.id} cart={c}>
          <div className="flex flex-1 gap-4">
            <CartCard.ProductImage />
            <div className="flex flex-col gap-2">
              <CartCard.ProductName />
              <CartCard.Price />
              <CartCard.Discount />
              <CartCard.Weight />
              <CartCard.Total />
            </div>
          </div>
          <div className="flex flex-col justify-between items-end">
            <CartCard.DeleteButton />
            <CartCard.Quantity />
          </div>
        </CartCard>
      ))}
    </section>
  );
}

export default CartList;
