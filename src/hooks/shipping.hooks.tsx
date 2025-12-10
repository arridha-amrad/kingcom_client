import { publicAxios } from '@/lib/axiosInterceptor'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const useCostMutation = () => {
  return useMutation({
    mutationFn: async (params: {
      weight: number
      destinationId: number
      originId: number
    }) => {
      const res = await publicAxios.post<{
        costs: {
          name: string
          code: string
          service: string
          description: string
          cost: number
          etd: string
        }[]
      }>(`/shipping/cost`, params)
      return res.data
    },
    onError: (err) => {
      console.log(err)
      if (err instanceof Error) {
        toast.error(err.message)
      }
    },
  })
}
