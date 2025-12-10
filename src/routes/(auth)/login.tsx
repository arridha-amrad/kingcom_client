import FormLogin from '@/components/Forms/AuthForm/FormLogin'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/login')({
  component: RouteComponent,
  head: () => ({ meta: [{ title: 'Kingcom | Login' }] }),
})

function RouteComponent() {
  return <FormLogin />
}
