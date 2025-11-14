import { useLogin } from '@/hooks/auth/useLogin'
import { useAppForm } from '@/hooks/useAppForm'
import { setAccessToken } from '@/lib/axiosInterceptor'
import { useLoginMutation } from '@/queryOptions/auth.queryOptions'
import { loginSchema } from '@/schemas/auth.schema'
import { Description, DialogTitle } from '@headlessui/react'
import { Link, useRouter, useRouterState } from '@tanstack/react-router'
import { type Dispatch, type SetStateAction } from 'react'
import toast from 'react-hot-toast'

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  setIsLogin: Dispatch<SetStateAction<boolean>>
}

export default function FormLogin({ setIsOpen, setIsLogin }: Props) {
  const { mutateAsync, isPending } = useLoginMutation()
  const form = useAppForm({
    defaultValues: {
      identity: '',
      password: '',
    },
    validators: {
      onChange: loginSchema,
    },
    async onSubmit({ value: { identity, password } }) {
      await mutateAsync({
        identity,
        password,
      })
      setIsOpen(false)
    },
  })
  return (
    <fieldset disabled={isPending}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="space-y-4 w-xs"
      >
        <div className="w-full space-y-4 py-8">
          <form.AppField name="identity">
            {(field) => (
              <field.AuthTextField
                type="text"
                placeholder="Username or email"
              />
            )}
          </form.AppField>
          <form.AppField name="password">
            {(field) => (
              <field.AuthTextField type="password" placeholder="Password" />
            )}
          </form.AppField>
          <form.AppForm>
            <form.AuthSubscribeBtn label="Login" />
          </form.AppForm>
        </div>
        <div className="text-center">
          <Link className="text-foreground/50 hover:text-foreground" to="/">
            Forgot Password
          </Link>
        </div>
        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className="underline underline-offset-4"
          >
            Sign Up
          </button>
        </div>
      </form>
    </fieldset>
  )
}
