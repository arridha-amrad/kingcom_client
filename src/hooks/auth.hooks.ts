import {
  getAccessToken,
  privateAxios,
  publicAxios,
  setAccessToken,
} from '@/lib/axiosInterceptor'
import type { User } from '@/models/user.model'
import type {
  ForgotPasswordParams,
  LoginParams,
  ResetPasswordParams,
  SignupParams,
} from '@/schemas/auth.schema'
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { errorHandler } from './helper'

const routes = {
  forgotPassword: '/auth/forgot-password',
  login: '/auth/login',
  logout: '/auth/logout',
  me: '/auth/me',
  refreshToken: '/auth/refresh-token',
  resendVerificationToken: '/auth/resend-verification',
  resetPassword: '/auth/reset-password',
  signup: '/auth/signup',
  verifyAccount: '/auth/verify-account',
}

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: async (params: ForgotPasswordParams) => {
      try {
        const res = await publicAxios.post<{ message: string }>(
          routes.forgotPassword,
          params
        )
        return res.data
      } catch (err: unknown) {
        errorHandler(err)
      }
    },
  })
}

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: async (params: SignupParams) => {
      try {
        const res = await publicAxios.post<{
          token: string
          message: string
        }>(routes.signup, params)
        return res.data
      } catch (err: unknown) {
        console.log(err)
        errorHandler(err)
      }
    },
  })
}

export const useLoginMutation = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (params: LoginParams) => {
      try {
        const res = await publicAxios.post<{
          user: User
          token: string
        }>(routes.login, params)
        return res.data
      } catch (err: unknown) {
        console.log(err)
        errorHandler(err)
      }
    },
    onSuccess(data) {
      if (!data) return
      localStorage.setItem('auth', 'true')
      setAccessToken(data.token)
      qc.setQueryData(['me'], data.user)
    },
  })
}

export const useVerifyMutation = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (params: { code: string; token: string }) => {
      try {
        const res = await publicAxios.post<{ user: User; token: string }>(
          routes.verifyAccount,
          params
        )
        return res.data
      } catch (err: unknown) {
        errorHandler(err)
      }
    },
    onSuccess: (data) => {
      if (!data) return
      localStorage.setItem('auth', 'true')
      qc.setQueryData(['me'], data.user)
    },
  })
}

export const useLogoutMutation = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      try {
        const res = await privateAxios.post<{ message: string }>(routes.logout)
        return res.data
      } catch (err: unknown) {
        errorHandler(err)
      }
    },
    onSuccess(data) {
      if (!data) return
      localStorage.setItem('auth', 'false')
      qc.setQueryData(['me'], null)
    },
  })
}

export const getAuthQueryOptions = () =>
  queryOptions({
    queryKey: ['me'],
    retry(failureCount: number) {
      if (failureCount == 2) {
        localStorage.setItem('auth', 'false')
      }
      return failureCount < 2
    },
    staleTime: 5 * 60 * 1000,
    enabled: () => {
      const auth = localStorage.getItem('auth')
      return !!auth && auth === 'true'
    },
    queryFn: async () => {
      try {
        if (!getAccessToken()) {
          const res = await privateAxios.post<{ token: string }>(
            routes.refreshToken
          )
          const newToken = res.data.token
          setAccessToken(newToken)
        }
        const res = await privateAxios.get<{ user: User }>(routes.me)
        return res.data.user
      } catch (err) {
        errorHandler(err)
      }
    },
  })

export const useFetchAuth = () => {
  return useQuery(getAuthQueryOptions())
}

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: async (params: ResetPasswordParams & { token: string }) => {
      try {
        const res = await privateAxios.post<{ message: string }>(
          routes.resetPassword,
          params
        )
        return res.data
      } catch (err: unknown) {
        errorHandler(err)
      }
    },
  })
}
