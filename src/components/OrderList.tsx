import { useGetAuth } from '@/hooks/auth/useGetAuth'
import { useGetTransactions } from '@/hooks/transactions/useGetTransactions'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import OrderItem from './OrderItem'

export default function OrderList() {
  return (
    <div className="space-y-4 my-4">
      {transactions?.map((t) => (
        <OrderItem key={t.id} item={t} />
      ))}
    </div>
  )
}
