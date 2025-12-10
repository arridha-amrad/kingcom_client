import CartList from '@/components/CartList'
import CartSummaryCard from '@/components/CartSummaryCard'
import ModalShippingOptions from '@/components/Modals/ModalShippingOptions'
import { cartQueryOptions } from '@/queryOptions/cart.queryOptions'
import { provincesQueryOptions } from '@/queryOptions/shipping.queryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { ChevronRight, Loader2 } from 'lucide-react'

export const Route = createFileRoute('/(main)/_auth/cart')({
  component: RouteComponent,
  loader: async ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(cartQueryOptions)
    queryClient.ensureQueryData(provincesQueryOptions)
  },
  pendingComponent: () => (
    <div className="flex my-4 flex-col items-center justify-center w-full">
      <Loader2 className="animate-spin size-7" />
      <span>Loading your carts...</span>
    </div>
  ),
})

function RouteComponent() {
  const { data } = useSuspenseQuery(cartQueryOptions)

  return (
    <main className="w-full mx-auto px-4">
      <section
        id="breadcrumb"
        className="flex py-6 justify-center md:justify-start text-foreground/50 items-center gap-2"
      >
        <p>Home</p>
        <ChevronRight />
        <p className="text-foreground">Cart</p>
      </section>
      {data.carts.length > 0 ? (
        <section className="flex lg:flex-row flex-col gap-8">
          <CartList carts={data.carts} />
          <CartSummaryCard carts={data.carts}>
            <CartSummaryCard.SubTotal />
            <CartSummaryCard.Shipping>
              <ModalShippingOptions />
            </CartSummaryCard.Shipping>
            <CartSummaryCard.Total />
            <CartSummaryCard.CouponContainer>
              <CartSummaryCard.CouponInput />
              <CartSummaryCard.ApplyCouponButton />
            </CartSummaryCard.CouponContainer>
            <CartSummaryCard.PlaceOrderButton />
          </CartSummaryCard>
        </section>
      ) : (
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
      )}
      <div className="xl:mb-48 mb-16"></div>
    </main>
  )
}
