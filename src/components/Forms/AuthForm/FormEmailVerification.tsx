import { useVerifyMutation } from '@/hooks/auth.hooks'
import { useAppForm } from '@/hooks/useAppForm'
import { setAccessToken } from '@/lib/axiosInterceptor'
import { emailVerificationSchema } from '@/schemas/auth.schema'
import { Description, DialogTitle } from '@headlessui/react'
import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import { QrCode } from 'lucide-react'
import toast from 'react-hot-toast'

export default function FormEmailVerification() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get('token')
  const message = searchParams.get('message')

  const navigate = useNavigate()

  const { mutateAsync, isPending } = useVerifyMutation()
  const form = useAppForm({
    defaultValues: {
      code: '',
    },
    validators: {
      onChange: emailVerificationSchema,
    },
    async onSubmit({ value: { code }, formApi }) {
      if (!token) {
        toast.error('Token is required')
        return
      }
      const id = toast.loading('Submitting your data...')
      try {
        const data = await mutateAsync({
          code,
          token,
        })
        if (data) {
          setAccessToken(data.token)
        }
        formApi.reset()
        toast.success('Email verification is successful', { id })
        navigate({ to: '/' })
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message, { id })
        }
      }
    },
  })
  return (
    <div className="max-w-sm w-full">
      <h1 className="font-header text-4xl tracking-wide">Verify Account</h1>
      <p className="py-2 text-foreground/50">
        Verification protects accounts by confirming user authenticity
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
          <div className="w-full py-4 space-y-4">
            <form.AppField name="code">
              {(field) => (
                <field.AuthTextField
                  icon={<QrCode className="stroke-foreground/50" />}
                  type="text"
                  placeholder="Code"
                />
              )}
            </form.AppField>
            <form.AppForm>
              <form.AuthSubscribeBtn label="Verify My Account" />
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
