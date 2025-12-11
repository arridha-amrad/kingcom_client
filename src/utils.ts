import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatToIdr = (finalPrice: number) => {
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(finalPrice)
  return formatted
}

export const transactionDateFormatter = (date: Date) => {
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
  return formattedDate
}

export const getAfterDiscountPrice = (price: number, discount: number) => {
  const priceAfterDiscount = Math.ceil(price - (price * discount) / 100)
  return priceAfterDiscount
}

export const getFinalPrice = (
  price: number,
  discount: number,
  quantity: number
) => {
  const priceAfterDiscount = getAfterDiscountPrice(price, discount)
  return priceAfterDiscount * quantity
}
