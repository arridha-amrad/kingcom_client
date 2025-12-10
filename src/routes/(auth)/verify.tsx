import FormEmailVerification from '@/components/Forms/AuthForm/FormEmailVerification'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/verify')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Kingcom | Verify Account' }],
  }),
})

function RouteComponent() {
  return <FormEmailVerification />
}
