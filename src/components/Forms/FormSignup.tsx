import { Description, DialogTitle } from "@headlessui/react";
import TextInput from "./TextInput";

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

export default function FormSignup({ setIsOpen, setIsLogin }: Props) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    username: "",
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
        <DialogTitle className="font-bold text-4xl">Sign Up</DialogTitle>
        <Description>Create a new account</Description>
        <div className="w-full space-y-4 py-8">
          <TextInput
            placeholder="Name"
            name="name"
            value={formState.name}
            onChange={handleChange}
          />
          <TextInput
            placeholder="Email"
            name="email"
            value={formState.email}
            onChange={handleChange}
          />
          <TextInput
            placeholder="Username"
            name="username"
            value={formState.username}
            onChange={handleChange}
          />
          <TextInput
            placeholder="Password"
            name="password"
            value={formState.password}
            onChange={handleChange}
          />
          <button
            className="px-4 py-2 font-semibold bg-foreground w-full text-background rounded-full"
            onClick={() => setIsOpen(false)}
          >
            Sign Up
          </button>
        </div>
        <div className="text-center">
          <button
            onClick={() => setIsLogin(true)}
            className="underline underline-offset-4"
          >
            Login
          </button>
        </div>
      </form>
    </fieldset>
  );
}
