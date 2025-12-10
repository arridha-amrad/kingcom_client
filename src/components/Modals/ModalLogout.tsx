import { useLogoutMutation } from '@/hooks/auth.hooks'
import { useNavigate } from '@tanstack/react-router'
import { type Dispatch, type SetStateAction } from 'react'
import Spinner from '../Spinner'
import Modal from './Modal'

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function ModalLogout({ isOpen, setIsOpen }: Props) {
  const { mutateAsync, isPending } = useLogoutMutation()
  const navigate = useNavigate()

  const logout = async () => {
    await mutateAsync()
    setIsOpen(false)
    navigate({
      to: '/login',
      replace: true,
    })
  }
  return (
    <Modal
      isOpen={isOpen}
      disableBackgroundClose
      onClose={() => setIsOpen(false)}
    >
      <div className="max-w-sm w-full">
        <Modal.Title title="Logout" />
        <Modal.Description description="This action will clear out your session. Are you sure to continue?" />
        <button
          className="w-full flex items-center justify-center bg-foreground py-2 rounded-xl text-background font-semibold"
          onClick={logout}
        >
          {isPending ? <Spinner /> : 'Yes, Log me out'}
        </button>
      </div>
    </Modal>
  )
}
