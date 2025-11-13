import type { Cart } from '@/models/cart.model'
import { formatToIdr } from '@/utils'
import { CheckIcon, Trash } from 'lucide-react'
import { createContext, useContext, useState, type ReactNode } from 'react'
import ButtonQuantity from './Button/ButtonQuantity'
import { useQueryClient } from '@tanstack/react-query'
import { cacheKey } from '@/constants/cacheKey'
import { Checkbox } from '@headlessui/react'
import { useDeleteFromCartMutation } from '@/queryOptions/cart.queryOptions'

const CartCardContext = createContext<{ cart: Cart } | null>(null)

const useCartCardContext = () => {
  const context = useContext(CartCardContext)
  if (!context) {
    throw new Error('Please wrap inside CartCardContext Provider')
  }
  return context
}

const CartCard = ({ children, cart }: { cart: Cart; children: ReactNode }) => {
  return (
    <CartCardContext.Provider value={{ cart }}>
      <article className="flex w-full border p-4 rounded-xl border-foreground/20">
        {children}
      </article>
    </CartCardContext.Provider>
  )
}

CartCard.ProductImage = () => {
  const {
    cart: {
      product: { images },
    },
  } = useCartCardContext()
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
  )
}

CartCard.ProductName = () => {
  const {
    cart: {
      product: { name },
    },
  } = useCartCardContext()
  return (
    <h1 title={name} className="font-bold text-xl line-clamp-1">
      {name}
    </h1>
  )
}

CartCard.DeleteButton = () => {
  const { cart } = useCartCardContext()
  const { mutate } = useDeleteFromCartMutation()
  return (
    <button
      onClick={() => {
        mutate(cart.id)
      }}
      title="delete from cart"
      className="size-10 rounded-full flex items-center justify-center"
    >
      <Trash className="stroke-red-400" />
    </button>
  )
}

CartCard.Price = () => {
  const {
    cart: {
      product: { price, discount },
    },
  } = useCartCardContext()
  return (
    <div className="flex gap-2 text-foreground/50">
      <p>Price : </p>
      <p className="">{formatToIdr(price - (discount * price) / 100)}</p>
      <p className="line-through">{formatToIdr(price)}</p>
    </div>
  )
}

CartCard.Discount = () => {
  const {
    cart: {
      product: { discount },
    },
  } = useCartCardContext()
  return (
    <div className="inline ">
      <span className="text-foreground/50">Discount :</span>
      <p className="bg-red-500/10 w-fit inline text-red-500 rounded-full font-medium text-xs ml-2 py-1 px-2">
        -{discount}%
      </p>
    </div>
  )
}

CartCard.Weight = () => {
  const {
    cart: {
      product: { weight },
    },
  } = useCartCardContext()
  return <p className="text-foreground/50">Weight : {weight} kg</p>
}

CartCard.Total = () => {
  const {
    cart: {
      product: { price, discount },
      quantity,
    },
  } = useCartCardContext()
  return (
    <h2 className="font-bold text-2xl">
      {formatToIdr(
        Math.ceil((price - (price * discount) / 100) * quantity * 10) / 10
      )}
    </h2>
  )
}

CartCard.Quantity = () => {
  const qc = useQueryClient()
  const {
    cart: { quantity, id },
  } = useCartCardContext()

  const updateQuantity = (type: 'increase' | 'decrease') => {
    qc.setQueryData(
      [cacheKey.cart.getCarts],
      ({ carts }: { carts: Cart[] }) => {
        const updatedCarts = carts.map((c) => {
          if (c.id === id) {
            return {
              ...c,
              quantity: type === 'increase' ? c.quantity + 1 : c.quantity - 1,
            }
          }
          return c
        })
        return {
          carts: updatedCarts,
        }
      }
    )
  }

  return (
    <ButtonQuantity
      onDecrease={() => updateQuantity('decrease')}
      onIncrease={() => updateQuantity('increase')}
      value={quantity}
    />
  )
}

CartCard.Checkbox = () => {
  const [enabled, setEnabled] = useState(true)

  return (
    <Checkbox
      checked={enabled}
      onChange={setEnabled}
      className="group size-6 rounded-md bg-foreground/10 p-1 ring-1 ring-background/15 ring-inset focus:not-data-focus:outline-none data-focus:outline data-focus:outline-offset-2"
    >
      <CheckIcon className="hidden fill-background size-4 group-data-checked:block" />
    </Checkbox>
  )
}

export default CartCard
