import FormForgotPassword from '@/components/Forms/AuthForm/FormForgotPassword'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/forgot-password')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Kingcom | Forgot Password' }],
  }),
})

function RouteComponent() {
  return <FormForgotPassword />
}
