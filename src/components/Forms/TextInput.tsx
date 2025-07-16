import { LockKeyhole, Mail, User, UserCircle } from "lucide-react";
import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function TextInput(props: Props) {
  return (
    <div className="relative w-full">
      <input
        className="bg-foreground/10 focus:ring-2 ring-foreground/50 pl-12 outline-0 w-full px-4 h-[3rem] rounded-full"
        {...props}
      />
      <div className="absolute top-0 left-0 aspect-square">
        <button className="h-[3rem] flex items-center justify-center aspect-square rounded-full">
          {props.name?.includes("email") && (
            <Mail className="stroke-foreground/20" />
          )}
          {props.name?.includes("password") && (
            <LockKeyhole className="stroke-foreground/20" />
          )}
          {props.name === "username" && (
            <UserCircle className="stroke-foreground/20" />
          )}
          {(props.name === "name" || props.name === "identity") && (
            <User className="stroke-foreground/20" />
          )}
        </button>
      </div>
    </div>
  );
}
