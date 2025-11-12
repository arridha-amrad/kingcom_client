import type { Product } from './product.model';

export type Cart = {
  id: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
};
