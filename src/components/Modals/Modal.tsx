import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { X } from 'lucide-react'
import { type HTMLAttributes, type ReactNode } from 'react'

export default function Modal({
  children,
  onClose,
  isOpen,
  disableBackgroundClose = false,
}: {
  children: ReactNode
  isOpen: boolean
  onClose: VoidFunction
  disableBackgroundClose?: boolean
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={disableBackgroundClose ? () => {} : onClose}
      className="z-50 relative"
    >
      <DialogBackdrop
        transition
        className="bg-background/70 fixed inset-0 backdrop-blur duration-300 ease-out data-closed:opacity-0"
      />
      <div className="flex w-screen p-4 fixed inset-0 items-center justify-center">
        <DialogPanel
          transition
          className="border border-foreground/20 relative z-50 shadow-2xl bg-background backdrop-blur-2xl rounded-2xl px-8 py-12 duration-300 ease-out data-closed:scale-95 data-closed:opacity-0"
        >
          <div className="absolute inset-0 blur-3xl -z-50 bg-foreground/10" />

          <button onClick={onClose} className="absolute top-4 right-4">
            <X className="stroke-foreground/50 hover:stroke-foreground transition-colors ease-in duration-100" />
          </button>

          {children}
        </DialogPanel>
      </div>
    </Dialog>
  )
}

Modal.Title = ({ title }: { title: string }) => {
  return (
    <DialogTitle className="font-bold text-4xl text-center">
      {title}
    </DialogTitle>
  )
}

Modal.Description = ({ description }: { description: string }) => {
  return (
    <Description as="div" className="my-4 text-center">
      <p>{description}</p>
    </Description>
  )
}

type ModalContentProps = {
  children: ReactNode
} & HTMLAttributes<HTMLDivElement>
Modal.Content = ({ children, ...props }: ModalContentProps) => {
  return <div {...props}>{children}</div>
}
