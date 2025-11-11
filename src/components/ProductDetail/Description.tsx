import ColorOptions from '@/components/ColorOptions';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { SlidingNumber } from '../motion-primitives/slide-number';
import Rating from '../Rating';
import AddToCart from './AddToCartBtn';
import type { Product } from '@/models/product.model';
import { formatToIdr } from '@/utils';

type Props = {
  product: Product;
};

export default function ProductDetailDescription({
  product: { id, name, rating, discount, price, description },
}: Props) {
  const [total, setTotal] = useState(1);

  const increase = () => {
    setTotal((val) => (val += 1));
  };

  const decrease = () => {
    setTotal((val) => {
      if (val === 1) return val;
      return (val -= 1);
    });
  };

  return (
    <div className="flex-1 grow min-h-full max-w-lg lg:max-w-3xl gap-4 flex justify-self-center flex-col justify-between">
      <h1
        title={name}
        className="font-header leading-12 tracking-wide font-bold line-clamp-2 text-[40px]"
      >
        {name}
      </h1>
      {rating && <Rating value={rating} />}
      <div className="flex items-center gap-4">
        {discount && (
          <h1 className="font-bold text-3xl">
            {formatToIdr(price - (price * discount) / 100)}
          </h1>
        )}
        <h1 className="font-bold text-3xl text-foreground/50">
          {formatToIdr(price)}
        </h1>
        <div className="w-[72px] h-[34px] rounded-full bg-[#ff3333]/10 flex items-center justify-center font-medium text-red-500">
          -{discount}%
        </div>
      </div>
      <p className="font-light">{description}</p>
      <div className="w-full h-px bg-foreground/10" />
      <h1 className="font-light">Select Colors</h1>
      <ColorOptions />
      <div className="w-full h-px bg-foreground/10" />
      <div className="flex items-center gap-4">
        <div className="flex-1 flex h-13 bg-foreground text-background  rounded-full">
          <button
            onClick={decrease}
            className={'size-13 pl-1 flex items-center justify-center'}
          >
            <Minus />
          </button>
          <div className="flex-1 flex items-center justify-center">
            <SlidingNumber value={total} />
          </div>
          <button
            onClick={increase}
            className="flex pr-1 items-center justify-center size-13"
          >
            <Plus />
          </button>
        </div>
        <AddToCart productId={id} quantity={total} />
      </div>
    </div>
  );
}
