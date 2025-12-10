import { useSignupMutation } from '@/hooks/auth.hooks'
import { useAppForm } from '@/hooks/useAppForm'
import { signupSchema, type SignupParams } from '@/schemas/auth.schema'
import { Link, useNavigate } from '@tanstack/react-router'
import { Mail, User, Lock, UserRoundIcon } from 'lucide-react'
import toast from 'react-hot-toast'

export default function FormSignup() {
  const navigate = useNavigate()
  const { isPending, mutateAsync } = useSignupMutation()
  const form = useAppForm({
    defaultValues: {
      name: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    } as SignupParams,
    validators: {
      onChange: signupSchema,
      onSubmit: signupSchema,
    },
    async onSubmit({ value, formApi }) {
      const id = toast.loading('Submitting your data...')
      try {
        const data = await mutateAsync(value)
        if (data) {
          toast.success('Registration is successful', { id })
          formApi.reset()
          navigate({
            to: '/verify',
            search: { token: data.token, message: data.message },
          })
        }
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message, { id })
        }
      }
    },
  })
  return (
    <div className="max-w-sm w-full">
      <h1 className="font-header text-4xl tracking-wide">Signup</h1>
      <p className="py-2 text-foreground/50">
        Register securely to unlock features and account access.
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
            <form.AppField name="name">
              {(field) => (
                <field.AuthTextField
                  icon={<User className="stroke-foreground/50" />}
                  type="text"
                  placeholder="Name"
                />
              )}
            </form.AppField>
            <form.AppField name="email">
              {(field) => (
                <field.AuthTextField
                  icon={<Mail className="stroke-foreground/50" />}
                  type="text"
                  placeholder="Email Address"
                />
              )}
            </form.AppField>
            <form.AppField name="username">
              {(field) => (
                <field.AuthTextField
                  icon={<UserRoundIcon className="stroke-foreground/50" />}
                  type="text"
                  placeholder="Username"
                />
              )}
            </form.AppField>
            <form.AppField name="password">
              {(field) => (
                <field.AuthTextField
                  icon={<Lock className="stroke-foreground/50" />}
                  type="password"
                  placeholder="Password"
                />
              )}
            </form.AppField>
            <form.AppField name="confirmPassword">
              {(field) => (
                <field.AuthTextField
                  icon={<Lock className="stroke-foreground/50" />}
                  type="password"
                  placeholder="Confirm Password"
                />
              )}
            </form.AppField>
            <form.AppForm>
              <form.AuthSubscribeBtn label="Sign up" />
            </form.AppForm>
          </div>
          <div className=" flex items-center gap-2 justify-center">
            <p className="text-foreground/50">Already have an account?</p>
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
