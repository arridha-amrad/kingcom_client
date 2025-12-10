import { getAuthQueryOptions } from '@/hooks/auth.hooks'
import { useQuery } from '@tanstack/react-query'
import UserDropdown from '../Dropdowns/UserDropDown'
import ModalLoginOrSignup from '../Modals/ModalLoginOrSignup'
import Spinner from '../Spinner'

export default function ButtonUser() {
  const { data, isLoading } = useQuery(getAuthQueryOptions())
  if (isLoading) {
    return (
      <button className="fill-foreground">
        <Spinner />
      </button>
    )
  }
  if (!data) {
    return <ModalLoginOrSignup />
  } else {
    return <UserDropdown />
  }
}
