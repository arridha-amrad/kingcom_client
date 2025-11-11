export interface CreteProductResponse {
  message: string;
}

export interface Product {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  name: string;
  slug: string;
  price: number;
  description: string;
  specification: string;
  stock: number;
  video_url: string;
  images: ProductImage[];
  weight: number;
  discount: number;
  // coming soon
  rating?: number | null;
}

export interface ProductImage {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null | Date;
  url: string;
  product_id: string;
}

export interface AddToCartResponse {
  message: string;
}
