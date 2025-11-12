import { useSuspenseQuery } from '@tanstack/react-query';
import Cart from './Cart';
import OrderSummary from './OrderSummary';
import OrderProvider from './Providers/OrderProvider';
import { cartQueryOptions } from '@/queryOptions/cart.queryOptions';

export default function CartWrapper() {
  const { data } = useSuspenseQuery(cartQueryOptions);
  return (
    <div className="flex lg:flex-row flex-col pt-6 gap-8">
      <Cart cart={data.carts} />
      <div className="w-full lg:max-w-md">
        <OrderProvider>
          <OrderSummary />
        </OrderProvider>
      </div>
    </div>
  );
}
