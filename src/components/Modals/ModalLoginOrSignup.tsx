'use client'

import { useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import FormEmailVerification from '../Forms/AuthForm/FormEmailVerification'
import FormLogin from '../Forms/AuthForm/FormLogin'
import FormSignup from '../Forms/AuthForm/FormSignup'
import Modal from './Modal'

export default function ModalLoginOrSignup() {
  const [isOpen, setIsOpen] = useState(false)
  const search = useSearch({ strict: false }) as any

  const [isLogin, setIsLogin] = useState(true)
  const [registrationResult, setRegistrationResult] = useState({
    message: '',
    token: '',
  })

  useEffect(() => {
    setIsOpen(search.login === 'required')
  }, [search.login])

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 rounded-xl border font-medium border-foreground/20"
      >
        Login
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="w-full max-w-sm">
          <Modal.Title title={isLogin ? 'Login' : 'Signup'} />
          <Modal.Description
            description={
              isLogin ? "Let's start using your account" : 'Create new account'
            }
          />
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
        </div>
      </Modal>
    </>
  )
}
