import { useResetPasswordMutation } from '@/hooks/auth.hooks'
import { useAppForm } from '@/hooks/useAppForm'
import {
  resetPasswordSchema,
  type ResetPasswordParams,
} from '@/schemas/auth.schema'
import { getRouteApi, Link } from '@tanstack/react-router'
import { Lock } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

const routeApi = getRouteApi('/(auth)/reset-password')

export default function FormResetPassword() {
  const routeSearch = routeApi.useSearch() as { token: string }

  const { mutateAsync, isPending } = useResetPasswordMutation()

  const [message, setMessage] = useState<string | null>(null)

  const form = useAppForm({
    defaultValues: {
      confirmPassword: '',
      password: '',
    } as ResetPasswordParams,
    validators: {
      onChange: resetPasswordSchema,
    },
    async onSubmit({ value: { confirmPassword, password }, formApi }) {
      try {
        const result = await mutateAsync({
          confirmPassword,
          password,
          token: routeSearch.token,
        })
        if (result) {
          setMessage(result.message)
          formApi.reset()
        }
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message)
        }
      }
    },
  })
  return (
    <div className="max-w-sm w-full">
      <h1 className="font-header text-4xl tracking-wide">Reset Password</h1>
      <p className="py-2 text-foreground/50">
        Update password securely to restore account access.
      </p>
      <div className="py-2">
        <p className="text-green-500 text-center">{message}</p>
      </div>
      <fieldset className="w-full" disabled={isPending}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="space-y-4 w-full"
        >
          <div className="w-full space-y-4 py-4">
            <form.AppField name="password">
              {(field) => (
                <field.AuthTextField
                  type="password"
                  placeholder="Password"
                  icon={<Lock className="stroke-foreground/50" />}
                />
              )}
            </form.AppField>
            <form.AppField name="confirmPassword">
              {(field) => (
                <field.AuthTextField
                  type="password"
                  placeholder="Confirm Password"
                  icon={<Lock className="stroke-foreground/50" />}
                />
              )}
            </form.AppField>
            <form.AppForm>
              <form.AuthSubscribeBtn label="Reset Password" />
            </form.AppForm>
          </div>
          <div className=" flex items-center gap-2 justify-center">
            <p className="text-foreground/50">Back to</p>
            <Link
              className="text-foreground/50 hover:text-foreground"
              to="/login"
            >
              Login
            </Link>
          </div>
        </form>
      </fieldset>
    </div>
  )
}
