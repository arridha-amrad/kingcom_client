export type Product = {
  id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  slug: string;
  price: number;
  description: string;
  stock: number;
  images: ProductImage[];
  weight: number;
  discount: number;
  rating: number | null;
  video_url: string | null;
  specification: string | null;
};

export type ProductImage = {
  id: number;
  url: string;
};
