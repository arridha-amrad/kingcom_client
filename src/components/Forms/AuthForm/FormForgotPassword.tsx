import { useLoginMutation } from '@/hooks/auth.hooks'
import { useAppForm } from '@/hooks/useAppForm'
import { loginSchema } from '@/schemas/auth.schema'
import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import { Mail } from 'lucide-react'

export default function FormForgotPassword() {
  const { mutateAsync, isPending } = useLoginMutation()
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)

  const form = useAppForm({
    defaultValues: {
      identity: '',
      password: '',
    },
    validators: {
      onChange: loginSchema,
    },
    async onSubmit({ value: { identity, password } }) {
      const result = await mutateAsync({
        identity,
        password,
      })
      const redirect = searchParams.get('redirect')
      if (result && redirect) {
        navigate({
          to: redirect,
        })
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
            <form.AppField name="identity">
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
