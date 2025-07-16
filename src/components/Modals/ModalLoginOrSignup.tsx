import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import { useState } from "react";
import FormLogin from "../Forms/FormLogin";
import FormSignup from "../Forms/FormSignup";

export default function ModalLoginOrSignup() {
  const [isOpen, setIsOpen] = useState(false);

  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 rounded-xl border-2 font-semibold border-foreground/20"
      >
        Login
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-background/70 backdrop-blur duration-300 ease-out data-closed:opacity-0"
        />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            transition
            className="max-w-sm w-full border border-foreground/20 relative z-50 shadow-2xl bg-background backdrop-blur-2xl rounded-2xl px-8 py-12 duration-300 ease-out data-closed:scale-95 data-closed:opacity-0"
          >
            <div className="absolute inset-0 blur-3xl -z-50 bg-foreground/10" />
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-[4%] right-[5%]"
            >
              <X className="stroke-foreground/50 hover:stroke-foreground transition-colors ease-in duration-100" />
            </button>
            {isLogin ? (
              <FormLogin setIsLogin={setIsLogin} setIsOpen={setIsOpen} />
            ) : (
              <FormSignup setIsLogin={setIsLogin} setIsOpen={setIsOpen} />
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
