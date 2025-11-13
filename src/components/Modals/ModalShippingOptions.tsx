import { Truck } from 'lucide-react';
import Modal from '../Modal';
import ShippingForm from '../Forms/ShippingForm';
import { useState } from 'react';

export default function ModalShippingOptions() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex px-4 py-2 text-background font-medium bg-foreground rounded-2xl items-center gap-2"
      >
        Choose Courier
        <Truck className="size-5" />
      </button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <Modal.Title title="Choose Courier" />
        <Modal.Description description="Select your shipping address and courier service." />
        <div className="w-full max-w-sm">
          <ShippingForm />
        </div>
      </Modal>
    </>
  );
}
