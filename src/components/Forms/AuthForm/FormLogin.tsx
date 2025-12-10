import { useLoginMutation } from '@/hooks/auth.hooks'
import { useAppForm } from '@/hooks/useAppForm'
import { loginSchema } from '@/schemas/auth.schema'
import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import { User, Lock } from 'lucide-react'

export default function FormLogin() {
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
      if (result) {
        navigate({
          to: redirect || '/',
        })
      }
    },
  })
  return (
    <div className="max-w-sm w-full">
      <h1 className="font-header text-4xl tracking-wide">Login</h1>
      <p className="py-2 text-foreground/50">
        Login enables safe access to personalized user features.
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
                  placeholder="Username or email"
                  icon={<User className="stroke-foreground/50" />}
                />
              )}
            </form.AppField>
            <form.AppField name="password">
              {(field) => (
                <field.AuthTextField
                  type="password"
                  placeholder="Password"
                  icon={<Lock className="stroke-foreground/50" />}
                />
              )}
            </form.AppField>
            <form.AppForm>
              <form.AuthSubscribeBtn label="Login" />
            </form.AppForm>
          </div>
          <div className="text-center">
            <Link
              className="text-foreground/50 hover:text-foreground"
              to="/forgot-password"
            >
              Forgot Password
            </Link>
          </div>
          <div className=" flex items-center gap-2 justify-center">
            <p className="text-foreground/50">Don't have an account?</p>
            <Link
              className="text-foreground/50 hover:text-foreground"
              to="/signup"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </fieldset>
    </div>
  )
}
