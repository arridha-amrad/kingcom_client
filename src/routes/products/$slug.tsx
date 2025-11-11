import ProductDetail from '@/components/ProductDetail';
import Tab from '@/components/ProductDetail/Tab';
import YouMightAlsoLike from '@/components/ShowCases/YouMightAlsoLike';
import Spinner from '@/components/Spinner';
import { productQueryOptions } from '@/queryOptions/product.queryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { ChevronRight } from 'lucide-react';

export const Route = createFileRoute('/products/$slug')({
  component: RouteComponent,
  loader: ({ context: { queryClient }, params: { slug } }) => {
    queryClient.ensureQueryData(productQueryOptions(slug));
  },
});

function RouteComponent() {
  const { slug } = Route.useParams();
  const { data, isPending } = useSuspenseQuery(productQueryOptions(slug));

  if (isPending) {
    return (
      <div className="flex items-center justify-center mt-4">
        <div className="fill-foreground/50">
          <Spinner />
        </div>
      </div>
    );
  }

  if (!data) {
    return <p>Product not found</p>;
  }

  console.log(slug);

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
        <p className="text-foreground">{data.product.name}</p>
      </section>
      <ProductDetail product={data.product} />
      <Tab />
      <YouMightAlsoLike />
      <div className="xl:mb-32 mb-16"></div>
    </main>
  );
}
