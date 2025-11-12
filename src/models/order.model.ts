import type { Product } from './product.model';
import type { User } from './user.model';

export type Order = {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  paymentMethod: string | null;
  billingAddress: string | null;
  createdAt: Date;
  paidAt: Date | null;
  shippedAt: Date | null;
  shipping: Shipping;
  user: User;
  items: OrderItem[];
};

export type Shipping = {
  name: string;
  code: string;
  service: string;
  description: string;
  cost: number;
  etd: string;
  address: string;
};

export type OrderItem = {
  id: number;
  quantity: number;
  product: Product;
};
