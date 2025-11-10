import { privateAxios } from '@/lib/axiosInterceptor';
import type { Order } from '@/types/api/transaction';
import { formatToIdr, transactionDateFormatter } from '@/utils';
import { useNavigate } from '@tanstack/react-router';
import { Ship, ShoppingBasket } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  item: Order;
}

const payViaMidtrans = async (orderId: string) => {
  let snapToken: string;
  try {
    window.snap.show();
    const res = await privateAxios.get(`/midtrans/${orderId}/token`);
    snapToken = res.data.token;
    if (!snapToken) {
      window.snap.hide();
      throw new Error('Something went wrong');
    }
    window.snap.pay(snapToken);
  } catch (err) {
    console.log(err);
    toast.error('Failed to get your transaction token. Please try again.');
  }
};

export default function OrderItem({ item }: Props) {
  const navigate = useNavigate();

  const pay = async () => {
    await payViaMidtrans(item.id);
  };

  return (
    <div
      key={item.id}
      className="border border-foreground/20 rounded-2xl px-8 py-4 space-y-4"
    >
      <div className="flex items-center gap-4">
        <ShoppingBasket className="size-6 stroke-foreground fill-foreground" />
        <h1>Shopping</h1>
        <p>{transactionDateFormatter(new Date(item.createdAt))}</p>
        <div className="text-background bg-foreground pt-1 px-4 pb-1.5 rounded">
          {item.status}
        </div>
        <p>{item.orderNumber}</p>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-4">
          {item.orderItems.map((i) => (
            <div className="flex items-start gap-4" key={i.id}>
              <div className="pr-4">
                <img
                  className="size-25 object-cover aspect-square"
                  alt={i.product.images[0].url}
                  src={i.product.images[0].url}
                />
              </div>
              <div className="">
                <div className="line-clamp-1 font-semibold">
                  {i.product.name}
                </div>
                {i.product.discount > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="text-red-600">
                      <div className="bg-red-500/10 w-fit text-red-500 rounded-full font-medium text-xs flex items-center justify-center py-1 px-2">
                        -{i.product.discount}%
                      </div>
                    </div>
                    <div className="text-foreground/70 line-through">
                      {formatToIdr(i.product.price)}
                    </div>
                  </div>
                )}
                {i.product.discount > 0 ? (
                  <div className="font-light text-foreground/70">
                    {i.quantity} x{' '}
                    {formatToIdr(
                      i.product.price -
                        (i.product.price * i.product.discount) / 100,
                    )}
                  </div>
                ) : (
                  <div className="font-light text-foreground/70">
                    {i.quantity} x {formatToIdr(i.product.price)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center flex-col">
          <h1 className="font-bold">Order Total</h1>
          <h2>{formatToIdr(item.total)}</h2>
          <button
            onClick={pay}
            className="bg-foreground disabled:brightness-75 mt-4 text-background px-4 py-2 rounded-2xl font-medium"
          >
            Pay
          </button>
        </div>
      </div>
      <div className="mt-4 rounded-2xl w-fit py-2 bg-foreground text-background px-4">
        <div className="flex items-center gap-4">
          <Ship className="size-6 stroke-background" />
          <p>{item.shipping.service}</p>
          <p>{item.shipping.name}</p>
          <p>{item.shipping.etd}</p>
          <div>To: {item.shipping.address}</div>
          <div className="text-background">
            {formatToIdr(item.shipping.cost)}
          </div>
        </div>
      </div>
    </div>
  );
}
