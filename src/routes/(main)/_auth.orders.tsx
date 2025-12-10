import OrderItem from '@/components/OrderItem'
import { ordersQueryOptions } from '@/queryOptions/order.queryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { ChevronRight, Loader2 } from 'lucide-react'
import { useEffect } from 'react'

export const Route = createFileRoute('/(main)/_auth/orders')({
  component: RouteComponent,
  loader: async ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(ordersQueryOptions)
  },
  pendingComponent: () => (
    <div className="flex my-4 flex-col items-center justify-center w-full">
      <Loader2 className="animate-spin size-7" />
      <span>Loading your orders...</span>
    </div>
  ),
})

function RouteComponent() {
  useEffect(() => {
    const midtransScriptUrl = import.meta.env.VITE_MIDTRANS_SCRIPT_URL
    const myMidtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY
    let scriptTag = document.createElement('script')
    scriptTag.src = midtransScriptUrl
    scriptTag.setAttribute('data-client-key', myMidtransClientKey)
    document.body.appendChild(scriptTag)
    return () => {
      document.body.removeChild(scriptTag)
    }
  }, [])

  const {
    data: { orders },
  } = useSuspenseQuery(ordersQueryOptions)

  return (
    <main className="px-4">
      <section
        id="breadcrumb"
        className="flex py-6 justify-center md:justify-start text-foreground/50 items-center gap-2"
      >
        <p>Home</p>
        <ChevronRight />
        <p className="text-foreground">Transactions</p>
      </section>
      <div className="space-y-4 my-4">
        {orders?.map((order) => (
          <OrderItem key={order.id} item={order} />
        ))}
      </div>
    </main>
  )
}
