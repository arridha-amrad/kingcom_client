import { useForgotPasswordMutation } from '@/hooks/auth.hooks'
import { useAppForm } from '@/hooks/useAppForm'
import {
  forgotPasswordSchema,
  type ForgotPasswordParams,
} from '@/schemas/auth.schema'
import { Link } from '@tanstack/react-router'
import { Mail } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function FormForgotPassword() {
  const { mutateAsync, isPending } = useForgotPasswordMutation()

  const [message, setMessage] = useState<string | null>(null)

  const form = useAppForm({
    defaultValues: {
      email: '',
    } as ForgotPasswordParams,
    validators: {
      onChange: forgotPasswordSchema,
    },
    async onSubmit({ value: { email }, formApi }) {
      try {
        const result = await mutateAsync({
          email,
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
      <h1 className="font-header text-4xl tracking-wide leading-10">
        Forgot Password
      </h1>
      <p className="py-2 text-foreground/50">
        Recover account access using password reset link.{' '}
      </p>

      {!!message && (
        <div className="py-2">
          <p className="text-center text-green-500">{message}</p>
        </div>
      )}
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
            <form.AppField name="email">
              {(field) => (
                <field.AuthTextField
                  type="text"
                  placeholder="Email"
                  icon={<Mail className="stroke-foreground/50" />}
                />
              )}
            </form.AppField>
            <form.AppForm>
              <form.AuthSubscribeBtn label="Send Reset Link" />
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
