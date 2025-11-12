import UserDropdown from '../Dropdowns/UserDropDown';
import ModalLoginOrSignup from '../Modals/ModalLoginOrSignup';
import Spinner from '../Spinner';
import { useQuery } from '@tanstack/react-query';
import { meQueryOptions } from '@/queryOptions/auth.queryOptions';

export default function ButtonUser() {
  const { data, isLoading } = useQuery(meQueryOptions);
  if (isLoading) {
    return (
      <button className="fill-foreground">
        <Spinner />
      </button>
    );
  }
  if (!data?.user) {
    return <ModalLoginOrSignup />;
  } else {
    return <UserDropdown />;
  }
}
