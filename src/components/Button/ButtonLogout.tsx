import { useRouter, useLocation } from '@tanstack/react-router'
import Spinner from '../Spinner'
import { useLogoutMutation } from '@/hooks/auth.hooks'

type Props = {
  callback: VoidFunction
}
export default function ButtonLogout({ callback }: Props) {
  const { mutateAsync, isPending } = useLogoutMutation()
  const router = useRouter()
  const location = useLocation()

  const logout = async () => {
    await mutateAsync()
    callback()
    router.navigate({
      to: location.pathname,
    })
  }
  return (
    <button
      className="w-full flex items-center justify-center bg-foreground py-2 rounded-xl text-background font-semibold"
      onClick={logout}
    >
      {isPending ? <Spinner /> : 'Yes, Log me out'}
    </button>
  )
}
