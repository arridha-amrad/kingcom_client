import ProductDetail from '@/components/ProductDetail'
import ProductDetailTabs from '@/components/ProductDetail/Tab'
import YouMightAlsoLike from '@/components/ShowCases/YouMightAlsoLike'
import { productQueryOptions } from '@/queryOptions/product.queryOptions'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { ChevronRight, Loader2 } from 'lucide-react'

export const Route = createFileRoute('/(main)/products/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  const { slug } = Route.useParams()
  const qc = useQueryClient()
  const { data, isFetching } = useQuery(productQueryOptions(slug, qc))
  const product = data?.product

  if (!data?.product && isFetching) {
    return (
      <div className="flex flex-col gap-y-2 items-center justify-center my-8">
        <Loader2 className="animate-spin size-10" />
        <p>Loading product...</p>
      </div>
    )
  }

  return (
    <main className="px-4">
      <section
        id="breadcrumb"
        className="flex mx-auto py-6 justify-center lg:justify-start text-foreground/50 items-center gap-2"
      >
        <p>Home</p>
        <ChevronRight />
        <p>Products</p>
        <ChevronRight />
        <p>MotherBoard</p>
        <ChevronRight />
        <p className="text-foreground">{data?.product?.name}</p>
      </section>
      {product ? (
        <>
          <ProductDetail product={product} />
          <ProductDetailTabs product={product} />
        </>
      ) : (
        <h2>Product not found</h2>
      )}
      <YouMightAlsoLike />
      <div className="xl:mb-32 mb-16"></div>
    </main>
  )
}
