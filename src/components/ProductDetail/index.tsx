import { cn } from '@/utils';
import { useState } from 'react';
import Description from './Description';
import type { Product } from '@/models/product.model';

type Props = {
  product: Product;
};

function ProductDetail({ product }: Props) {
  const [showImage, setShowImage] = useState(product.images[0]);
  return (
    <section
      id="product-detail"
      className="lg:flex block items-start justify-center lg:justify-start px-4 gap-8 w-full lg:min-h-[530px] mb-16 mx-auto"
    >
      <div className="lg:flex hidden flex-col gap-2 h-full">
        {product.images.map((img, i) => (
          <div
            key={i}
            className={cn(
              'aspect-square overflow-hidden rounded-xl',
              img === showImage &&
                'ring-2 ring-offset-2 ring-offset-background ring-foreground/50',
            )}
            onClick={() => {
              setShowImage(img);
            }}
          >
            <img
              className="aspect-square object-cover"
              src={img.url}
              alt={product.name}
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
      <div className="w-[444px] lg:block flex justify-self-center lg:shrink-0 h-full rounded-3xl overflow-hidden">
        <div className="w-full h-[530px] overflow-hidden">
          <img
            src={showImage?.url}
            alt="details"
            width={444}
            height={530}
            className="object-cover h-full w-full"
          />
        </div>
      </div>
      <div className="lg:hidden flex gap-2 h-max w-full justify-center my-4">
        {product.images.map((img, i) => (
          <div
            key={i}
            className={cn(
              'aspect-square overflow-hidden rounded-xl',
              img === showImage &&
                'ring-2 ring-offset-2 ring-offset-background ring-foreground/50',
            )}
            onClick={() => {
              setShowImage(img);
            }}
          >
            <img
              className="aspect-square object-cover"
              src={img.url}
              alt={product.name}
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
      <Description product={product} />
    </section>
  );
}

export default ProductDetail;
