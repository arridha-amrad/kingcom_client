import FormSignup from '@/components/Forms/AuthForm/FormSignup'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/signup')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Kingcom | Signup' }],
  }),
})

function RouteComponent() {
  return <FormSignup />
}
