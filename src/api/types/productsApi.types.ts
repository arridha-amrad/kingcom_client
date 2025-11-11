import type { Product } from '@/models/product.model';
import type { PaginatedResponse } from './paginated.types';

export type GetProductsResponse = PaginatedResponse<Product>;

export type GetProductResponse = {
  product: Product;
};

export type FetchProductsParams = {
  name?: string;
  limit?: string;
  page?: string;
};
