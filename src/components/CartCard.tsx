import type { Cart } from '@/models/cart.model';
import { createContext, useContext, type ReactNode } from 'react';

const CartCardContext = createContext<{ cart: Cart } | null>(null);

const useCartCardContext = () => {
  const context = useContext(CartCardContext);
  if (!context) {
    throw new Error('Please wrap inside CartCardContext Provider');
  }
  return context;
};

const CartCard = ({ children, cart }: { cart: Cart; children: ReactNode }) => {
  return (
    <CartCardContext.Provider value={{ cart }}>
      <article className="flex gap-4 h-max">{children}</article>;
    </CartCardContext.Provider>
  );
};

CartCard.ProductImage = () => {
  const {
    cart: {
      product: { images },
    },
  } = useCartCardContext();
  return (
    <div className="lg:size-[124px] size-[90px] shrink-0 rounded-3xl overflow-hidden">
      <img
        width={250}
        height={250}
        src={images[0].url}
        alt="cart image"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

CartCard.ProductName = () => {
  const {
    cart: {
      product: { name },
    },
  } = useCartCardContext();
  return (
    <h1 title={name} className="font-bold text-xl line-clamp-1">
      {name}
    </h1>
  );
};

export default CartCard;
