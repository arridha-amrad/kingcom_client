import FormResetPassword from '@/components/Forms/AuthForm/FormResetPassword'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/reset-password')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Kingcom | Reset Password' }],
  }),
})

function RouteComponent() {
  return <FormResetPassword />
}
