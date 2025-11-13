import { cartQueryOptions } from '@/queryOptions/cart.queryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import CartList from './CartList';
import CartSummaryCard from './CartSummaryCard';
import ModalChooseCourier from './Modals/ModalChooseCourier';

export default function CartWrapper() {
  const { data } = useSuspenseQuery(cartQueryOptions);
  if (data.carts.length === 0) {
    return (
      <div className="text-2xl font-extrabold py-4">Your cart is empty</div>
    );
  }
  return (
    <div className="flex lg:flex-row flex-col gap-8">
      <CartList cart={data.carts} />
      <CartSummaryCard carts={data.carts}>
        <CartSummaryCard.SubTotal />
        <CartSummaryCard.Shipping>
          <ModalChooseCourier />
        </CartSummaryCard.Shipping>
        <CartSummaryCard.Total />
        <CartSummaryCard.CouponContainer>
          <CartSummaryCard.CouponInput />
          <CartSummaryCard.ApplyCouponButton />
        </CartSummaryCard.CouponContainer>
        <CartSummaryCard.PlaceOrderButton />
      </CartSummaryCard>
    </div>
  );
}
