import { cartQueryOptions } from '@/queryOptions/cart.queryOptions';
import ShippingForm from '@/ShippingForm';
import { useQuery } from '@tanstack/react-query';
import { Truck } from 'lucide-react';
import { useState } from 'react';
import Modal from '../Modal';

export default function ModalShippingOptions() {
  const cartsQuery = useQuery(cartQueryOptions);

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
        <div className="w-full max-w-sm">
          <Modal.Title title="Choose Courier" />
          <Modal.Description description="Select your shipping address and courier service." />
          <ShippingForm carts={cartsQuery.data?.carts ?? []}>
            <ShippingForm.Destination>
              <ShippingForm.SelectProvince />
              <ShippingForm.SelectCity />
              <ShippingForm.SelectDistrict />
              <ShippingForm.InputHomeAddress />
              <ShippingForm.FindShippingServiceButton />
            </ShippingForm.Destination>
            <ShippingForm.AvailableCouriers />
            <ShippingForm.PickCourier callback={() => setOpen(false)} />
          </ShippingForm>
        </div>
      </Modal>
    </>
  );
}
