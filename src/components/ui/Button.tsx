import { Button as HeadlessButton } from '@headlessui/react'
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

const Button = ({
  children,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <HeadlessButton
      {...props}
      className="px-4 py-2 rounded-xl border font-medium border-foreground/20"
    >
      {children}
    </HeadlessButton>
  )
}

export default Button
