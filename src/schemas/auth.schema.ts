import { z } from 'zod'

const passwordSchema = z
  .string()
  .min(1, 'password is required')
  .min(5, { message: 'be at least 5 characters long' })
  .regex(/[a-zA-Z]/, { message: 'contain at least one letter.' })
  .regex(/[0-9]/, { message: 'contain at least one number.' })
  .regex(/[^a-zA-Z0-9]/, {
    message: 'contain at least one special character.',
  })
  .trim()

export const signupSchema = z
  .object({
    name: z.string().min(1, 'identity is required'),
    email: z.email('invalid email address'),
    username: z.string().min(1, 'username is required'),
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwords do not match',
    path: ['confirmPassword'],
  })

export type SignupParams = z.infer<typeof signupSchema>

export const loginSchema = z.object({
  identity: z.string().min(1, 'Please input your username or email address'),
  password: z.string().min(1, 'password is required'),
})

export type LoginParams = z.infer<typeof loginSchema>

export const emailVerificationSchema = z.object({
  code: z.string().min(1, 'code is required'),
})

export type EmailVerificationParams = z.infer<typeof emailVerificationSchema>

export const forgotPasswordSchema = z.object({
  email: z.email('invalid email address'),
})

export type ForgotPasswordParams = z.infer<typeof forgotPasswordSchema>

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwords do not match',
    path: ['confirmPassword'],
  })

export type ResetPasswordParams = z.infer<typeof resetPasswordSchema>
