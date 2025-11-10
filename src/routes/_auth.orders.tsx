import OrderList from '@/components/OrderList';
import {
  getMyTransactions,
  queryKey,
} from '@/hooks/transactions/useGetTransactions';
import { createFileRoute } from '@tanstack/react-router';
import { ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

export const Route = createFileRoute('/_auth/orders')({
  component: RouteComponent,
  loader: async ({ context }) => {
    const t = await context.queryClient.ensureQueryData({
      queryKey: [queryKey],
      queryFn: getMyTransactions,
    });
    return t;
  },
  onError(err) {
    console.log('transaction route error : ', err);
  },
});

function RouteComponent() {
  useEffect(() => {
    const midtransScriptUrl = import.meta.env.VITE_MIDTRANS_SCRIPT_URL;
    const myMidtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
    let scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute('data-client-key', myMidtransClientKey);
    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

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
      <div className="text-2xl font-bold">Transaction List</div>
      <OrderList />
    </main>
  );
}
