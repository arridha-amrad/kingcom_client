import { Description, DialogTitle } from "@headlessui/react";
import TextInput from "./TextInput";

import Link from "next/link";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Spinner from "../Spinner";

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

export default function FormLogin({ setIsOpen, setIsLogin }: Props) {
  const [formState, setFormState] = useState({
    identity: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <fieldset>
      <form className="space-y-4">
        <DialogTitle className="font-bold text-4xl">Login</DialogTitle>
        <Description>Login into your account</Description>
        <div className="w-full space-y-4 py-8">
          <TextInput
            placeholder="Username of email"
            name="identity"
            value={formState.identity}
            onChange={handleChange}
          />
          <TextInput
            placeholder="Password"
            name="password"
            value={formState.password}
            onChange={handleChange}
          />
          <button
            className="px-4 flex items-center justify-center gap-2 py-2 font-semibold bg-foreground w-full text-background rounded-full"
            onClick={() => setIsOpen(false)}
          >
            <Spinner />
          </button>
        </div>
        <div>
          <div className="text-center">
            <Link className="text-foreground/50 hover:text-foreground" href="/">
              Forgot Password
            </Link>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => setIsLogin(false)}
            className="underline underline-offset-4"
          >
            Sign Up
          </button>
        </div>
      </form>
    </fieldset>
  );
}
