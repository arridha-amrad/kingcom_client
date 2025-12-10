import Logo from '@/assets/images/kingkom.png'
import FormResetPassword from '@/components/Forms/AuthForm/FormResetPassword'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/reset-password')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="w-full flex mx-auto px-4 min-h-screen gap-x-10 container">
      <div className="flex-1">
        <img className="w-full h-full object-cover" src={Logo} alt="Logo" />
      </div>
      <div className="flex-1 min-h-screen flex w-max items-center">
        <FormResetPassword />
      </div>
    </main>
  )
}
