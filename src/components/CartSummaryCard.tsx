import type { PlaceOrderItem } from '@/api/order.api'
import { cacheKey } from '@/constants/cacheKey'
import type { Cart } from '@/models/cart.model'
import type { Shipping } from '@/models/order.model'
import { usePlaceOrderMutation } from '@/queryOptions/order.queryOptions'
import { formatToIdr, getAfterDiscountPrice, getFinalPrice } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { ArrowRightIcon, Tag, Truck } from 'lucide-react'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import toast from 'react-hot-toast'
import Spinner from './Spinner'

const calcCartSubtotal = (carts: Cart[]) => {
  const subTotal = carts
    .filter((c) => c.isChecked)
    .reduce((pv, cv) => {
      pv += getFinalPrice(cv.product.price, cv.product.discount, cv.quantity)
      return pv
    }, 0)
  return subTotal
}

const CartSummaryCardContext = createContext<{
  carts: Cart[]
  courier?: Shipping | null
  total: number
}>({ carts: [], courier: null, total: 0 })

const useCartSummaryContext = () => {
  const context = useContext(CartSummaryCardContext)
  if (!context) {
    throw new Error('Please wrap inside CartSummaryCardContext Provider')
  }
  return context
}

const CartSummaryCard = ({
  carts,
  children,
}: {
  children: ReactNode
  carts: Cart[]
}) => {
  const { data } = useQuery({
    queryKey: [cacheKey.cart.shipping],
    queryFn: () => null,
    enabled: false,
  })
  const courier = data as Shipping | undefined
  const [total, setTotal] = useState(0)
  useEffect(() => {
    if (!!courier) {
      setTotal(calcCartSubtotal(carts) + courier.cost)
    } else {
      setTotal(calcCartSubtotal(carts))
    }
  }, [courier, carts])
  return (
    <CartSummaryCardContext.Provider value={{ carts, courier, total }}>
      <article className="h-max w-full lg:max-w-md shrink-0 border space-y-6 border-foreground/20 p-6 rounded-3xl">
        <h1 className="font-bold text-2xl">Order Summary</h1>
        {children}
      </article>
    </CartSummaryCardContext.Provider>
  )
}

export default CartSummaryCard

CartSummaryCard.SubTotal = () => {
  const { carts } = useCartSummaryContext()

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-foreground/60 text-xl">SubTotal</h2>
      <h2 className="text-xl font-bold">
        {formatToIdr(calcCartSubtotal(carts) ?? 0)}
      </h2>
    </div>
  )
}

CartSummaryCard.Shipping = ({ children }: { children: ReactNode }) => {
  const { courier } = useCartSummaryContext()
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-foreground/60 text-xl">Delivery Fee</h2>
      {courier ? (
        <h2 className="text-xl font-bold">{formatToIdr(courier.cost)}</h2>
      ) : (
        children
      )}
    </div>
  )
}

CartSummaryCard.Total = () => {
  const { total } = useCartSummaryContext()
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl text-foreground/60">Total</h2>
      <h2 className="text-2xl font-bold">{formatToIdr(total)}</h2>
    </div>
  )
}

CartSummaryCard.CouponContainer = ({ children }: { children: ReactNode }) => {
  return <div className="h-12 w-full flex gap-4 items-center">{children}</div>
}

CartSummaryCard.CouponInput = () => {
  const [code, setCode] = useState('')
  return (
    <div className="flex-2 h-full">
      <div className="relative bg-foreground/10 text-foreground w-full h-full rounded-full overflow-hidden">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          type="text"
          placeholder="Add promo code"
          className="w-full h-full outline-0 pr-4 pl-12"
        />
        <div className="absolute pl-1 size-12 top-0 left-0 flex items-center justify-center">
          <Tag className="text-foreground/50" />
        </div>
      </div>
    </div>
  )
}

CartSummaryCard.ApplyCouponButton = () => {
  return (
    <button
      disabled={true}
      className="flex-1 disabled:brightness-50 disabled:cursor-default font-medium h-full bg-foreground rounded-full text-background"
    >
      Apply
    </button>
  )
}

CartSummaryCard.PlaceOrderButton = () => {
  const { mutateAsync, isPending } = usePlaceOrderMutation()
  const { courier, total, carts } = useCartSummaryContext()

  const placeOrder = async () => {
    if (!courier) {
      toast.error('courier is empty')
      return
    }
    await mutateAsync({
      items: carts
        .filter((c) => c.isChecked)
        .map((c) => ({
          cartId: c.id,
          productId: c.product.id,
          quantity: c.quantity,
          priceAtOrder: c.product.price,
          discountAtOrder: c.product.discount,
          finalPriceAtOrder: getFinalPrice(
            c.product.price,
            c.product.discount,
            c.quantity
          ),
        })),
      shipping: courier,
      total,
    })
  }

  return (
    <button
      disabled={!courier || isPending}
      onClick={placeOrder}
      className="h-15 rounded-full w-full disabled:cursor-default flex items-center justify-center gap-4 bg-foreground font-medium text-background disabled:brightness-50"
    >
      <span className="font-medium">Place Order</span>
      {isPending ? <Spinner /> : <ArrowRightIcon />}
    </button>
  )
}

CartSummaryCard.ButtonPickCourier = ({ onOpen }: { onOpen: VoidFunction }) => {
  return (
    <button
      onClick={onOpen}
      className="flex px-4 py-2 text-background font-medium bg-foreground rounded-2xl items-center gap-2"
    >
      Choose Courier
      <Truck className="size-5" />
    </button>
  )
}
