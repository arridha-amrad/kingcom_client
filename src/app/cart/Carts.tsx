"use client";

import { Fragment, useEffect } from "react";
import { Item, useCartStore } from "../../stores/cartStore";
import CartItem from "@/components/CartItem";

type Props = {
  items: Item[];
};

function Carts({ items }: Props) {
  const setItems = useCartStore((store) => store.setItems);
  const cartItems = useCartStore((store) => store.items);

  useEffect(() => {
    setItems(items);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="border space-y-8 flex-2 border-foreground/20 p-6 rounded-3xl">
      {cartItems.map((cart, i) => (
        <Fragment key={cart.id}>
          <CartItem key={cart.id} item={cart} />
          {i + 1 !== cartItems.length && (
            <div className="w-full h-px bg-foreground/20"></div>
          )}
        </Fragment>
      ))}
    </div>
  );
}

export default Carts;
