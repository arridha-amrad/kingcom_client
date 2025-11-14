import { ChevronDown } from 'lucide-react'
import ModalFilter from './Modals/ModalFilter'
import ProductCard from './ProductCard'
import type { Product } from '@/models/product.model'

type Props = {
  products: Product[]
}

function Products({ products }: Props) {
  return (
    <section id="products" className="flex-1 space-y-4">
      <div className="md:flex flex-wrap items-center justify-between">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-3xl">Products</h1>
          <ModalFilter />
        </div>
        <div className="flex gap-2">
          <p className="text-center">
            Showing 1-9 of 100 Products. Sort by:&nbsp;
          </p>
          <div className="font-bold flex items-center gap-2">
            Most Popular
            <ChevronDown />
          </div>
        </div>
      </div>
      <div className="grid xl:grid-cols-3 grid-cols-2 gap-y-8 gap-x-4 w-full">
        {products.map((pr, i) => (
          <ProductCard product={pr} key={i} />
        ))}
      </div>
    </section>
  )
}

export default Products
