// import { login, logout, me, type LoginParams } from '@/api/auth.api'
import { cacheKey } from '@/constants/cacheKey'
import { setAccessToken } from '@/lib/axiosInterceptor'
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useLocation, useRouter } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

// export const meQueryOptions = queryOptions({
//   enabled() {
//     const isAuth = localStorage.getItem(cacheKey.auth.me)
//     const isEnabled = !!isAuth && isAuth === 'true'
//     return isEnabled
//   },
//   queryKey: [cacheKey.auth.me],
//   retry: (value) => value === 2,
//   queryFn: async () => {
//     try {
//       const data = await me()
//       localStorage.setItem(cacheKey.auth.me, 'true')
//       return data
//     } catch (err) {
//       localStorage.setItem(cacheKey.auth.me, 'false')
//       return null
//     }
//   },
//   staleTime: 1000 * 60 * 5,
// })

// export const useLoginMutation = () => {
//   const router = useRouter()
//   const qc = useQueryClient()
//   const location = useLocation()
//   const search = location.search as { redirect: string | undefined }
//   return useMutation({
//     mutationFn: (params: LoginParams) => login(params),
//     onError: (err) => {
//       if (err instanceof AxiosError) {
//         toast.error(err.response?.data.message)
//         return
//       }
//       console.log(err)
//       toast.error('something went wrong')
//     },
//     onSuccess: async ({ token, user }) => {
//       setAccessToken(token)
//       qc.setQueryData([cacheKey.auth.me], { user })
//       localStorage.setItem(cacheKey.auth.me, 'true')
//       router.invalidate()
//       router.navigate({
//         to: search.redirect
//           ? new URL(search.redirect, window.location.origin).pathname
//           : '/',
//       })
//     },
//   })
// }

// export const useLogoutMutation = () => {
//   const router = useRouter()
//   const qc = useQueryClient()
//   const loc = useLocation()
//   return useMutation({
//     mutationFn: logout,
//     onError: (err) => {
//       if (err instanceof AxiosError) {
//         toast.error(err.response?.data.message)
//         return
//       }
//       console.log(err)
//       toast.error('something went wrong')
//     },
//     onSuccess: ({ message }) => {
//       toast(message)
//       qc.setQueryData([cacheKey.auth.me], { user: null })
//       localStorage.setItem(cacheKey.auth.me, 'false')
//       router.navigate({
//         to: loc.pathname,
//         reloadDocument: true,
//       })
//     },
//   })
// }
