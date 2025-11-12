import CartWrapper from '@/components/CartWrapper';
import { createFileRoute } from '@tanstack/react-router';
import { ChevronRight, Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export const Route = createFileRoute('/_auth/cart')({
  component: RouteComponent,
});

function Spinner() {
  return (
    <div className="flex justify-center w-full">
      <Loader2 className="animate-spin size-7" />
    </div>
  );
}

function RouteComponent() {
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
      <section className="w-full">
        {/* {!carts ? (
          <div className="text-2xl font-extrabold py-4">Your cart is empty</div>
        ) : ( */}
        <Suspense fallback={<Spinner />}>
          <CartWrapper />
        </Suspense>
        {/* )} */}
      </section>
      <div className="xl:mb-48 mb-16"></div>
    </main>
  );
}
