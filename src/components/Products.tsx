import { ChevronDown } from 'lucide-react';

import ModalFilter from './ModalFilter';
import useGetProducts from '@/hooks/product/useGetProducts';
import Spinner from './Spinner';
import ProductCard from './Product';
import { useLoaderData } from '@tanstack/react-router';

function Products() {
  const data = useLoaderData({
    from: '/products/',
  });

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
        {data &&
          data.items.map((pr, i) => <ProductCard product={pr} key={i} />)}
      </div>
    </section>
  );
}

export default Products;
