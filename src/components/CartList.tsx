import type { Cart } from '@/models/cart.model'
import CartCard from './CartCard'
import { AnimatePresence, motion } from 'motion/react'

type Props = {
  carts: Cart[]
}

function CartList({ carts }: Props) {
  return (
    <AnimatePresence initial={false}>
      <motion.div layout className="w-full space-y-4">
        {carts.map((c) => (
          <motion.div
            key={c.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
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
                <div className="flex items-center gap-2">
                  <CartCard.Checkbox />
                  <CartCard.DeleteButton />
                </div>
                <CartCard.Quantity />
              </div>
            </CartCard>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}

export default CartList
