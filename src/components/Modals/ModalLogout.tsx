import { type Dispatch, type SetStateAction } from 'react';
import ButtonLogout from '../Button/ButtonLogout';
import Modal from '../Modal';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ModalLogout({ isOpen, setIsOpen }: Props) {
  return (
    <Modal isOpen={isOpen} disableBackgroundClose onClose={() => setIsOpen(false)}>
      <div className="max-w-sm w-full">
        <Modal.Title title="Logout" />
        <Modal.Description description="This action will clear out your session. Are you sure to continue?" />
        <ButtonLogout callback={() => setIsOpen(false)} />
      </div>
    </Modal>
  );
}
