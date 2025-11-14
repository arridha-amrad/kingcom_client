import { privateAxios, publicAxios } from '@/lib/axiosInterceptor'
import { AxiosError } from 'axios'
import type { PaginatedResponse } from './types/paginated.types'
import type { Product } from '@/models/product.model'

export type FetchProductsParams = {
  name?: string
  limit?: string
  page?: string
}

export type GetProductsResponse = PaginatedResponse<Product>

export const fetchProducts = async (params?: FetchProductsParams) => {
  const name = params?.name ?? ''
  const limit = params?.limit ?? ''
  const page = params?.page ?? ''
  const url = `/products?name=${name}&limit=${limit}&page=${page}`
  try {
    const res = await publicAxios.get<GetProductsResponse>(url)
    const data = res.data
    return data
  } catch (err) {
    console.log(err)
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.error)
    }
    throw err
  }
}

export type GetProductResponse = {
  product: Product | null
}

export const fetchProductBySlug = async (slug: string) => {
  await new Promise((res) => setTimeout(res, 2000))
  try {
    const res = await publicAxios.get<GetProductResponse>(`/products/${slug}`)
    const data = res.data
    return data
  } catch (err) {
    console.log(err)
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.error)
    }
    throw err
  }
}

type CreateProductParams = {
  name: string
  weight: number
  price: number
  description: string
  stock: number
  discount: number | null
  specification: string | null
  videoUrl: string | null
  images: string[]
}
export const createProduct = async (params: CreateProductParams) => {
  try {
    const res = await privateAxios.post<{ message: string }>(
      '/products',
      params
    )
    return res.data
  } catch (err) {
    throw err
  }
}
