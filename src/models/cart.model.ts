import type { Product } from './product.model'

export type Cart = {
  id: string
  quantity: number
  isChecked: boolean
  createdAt: Date
  updatedAt: Date
  product: Product
}
