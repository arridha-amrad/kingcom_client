import { User } from "lucide-react";
import ModalLoginOrSignup from "../Modals/ModalLoginOrSignup";

export default function ButtonUser() {
  const isAuth = false;
  if (isAuth) {
    return (
      <button>
        <User />
      </button>
    );
  }
  return <ModalLoginOrSignup />;
}
