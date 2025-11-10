'use client';

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { useSearch } from '@tanstack/react-router';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import FormEmailVerification from '../Forms/auth/FormEmailVerification';
import FormLogin from '../Forms/auth/FormLogin';
import FormSignup from '../Forms/auth/FormSignup';

export default function ModalLoginOrSignup() {
  const [isOpen, setIsOpen] = useState(false);
  const search = useSearch({ strict: false }) as any;

  const [isLogin, setIsLogin] = useState(true);
  const [registrationResult, setRegistrationResult] = useState({
    message: '',
    token: '',
  });

  useEffect(() => {
    setIsOpen(search.login === 'required');
  }, [search.login]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 rounded-xl border font-medium border-foreground/20"
      >
        Login
      </button>
      <Dialog open={isOpen} onClose={() => {}} className="relative z-50">
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
            ) : !!registrationResult.token ? (
              <FormEmailVerification
                registrationResult={registrationResult}
                setIsOpen={setIsOpen}
              />
            ) : (
              <FormSignup
                setIsLogin={setIsLogin}
                setRegistrationResult={setRegistrationResult}
              />
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
