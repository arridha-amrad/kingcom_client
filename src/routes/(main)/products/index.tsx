import ProductFilter from '@/components/ProductFilter'
import ProductsWrapper from '@/components/ProductsWrapper'
import { createFileRoute } from '@tanstack/react-router'
import { ChevronRightIcon, Loader2 } from 'lucide-react'
import { Suspense } from 'react'

export const Route = createFileRoute('/(main)/products/')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Kingcom | products' }],
  }),
  loaderDeps: ({ search }) => {
    const { name, limit, page } = search as any
    return {
      name,
      limit,
      page,
    }
  },
})

function Spinner() {
  return (
    <div className="flex justify-center w-full">
      <Loader2 className="animate-spin size-7" />
    </div>
  )
}

function RouteComponent() {
  const deps = Route.useLoaderDeps()

  return (
    <main className="w-full px-4">
      <section
        id="breadcrumb"
        className="flex py-6 justify-center md:justify-start text-foreground/50 items-center gap-2"
      >
        <p>Home</p>
        <ChevronRightIcon />
        <p>Products</p>
        <ChevronRightIcon />
        <p className="text-foreground font-medium">All</p>
      </section>
      <div className="flex gap-4 pb-8">
        <div className="max-w-xs md:block hidden">
          <ProductFilter />
        </div>
        <Suspense fallback={<Spinner />}>
          <ProductsWrapper deps={deps} />
        </Suspense>
      </div>
    </main>
  )
}
