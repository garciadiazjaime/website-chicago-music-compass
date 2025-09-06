import React, { forwardRef, ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal = forwardRef<HTMLDialogElement, ModalProps>(({ children, onClose }, ref) => {
  return (
    <dialog ref={ref} className="relative text-center w-full md:w-2/3 lg:w-1/2 backdrop:backdrop-blur-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tl  to-blue-950 from-red-950">
      <button className="absolute top-0 right-0 text-xl w-10 h-10 bg-rose-600 hover:bg-sky-300 text-white focus-visible:outline-none" onClick={onClose}>&times;</button>
      <div className="m-3 p-5 md:p-10 text-white border-rose-500 border">
        {children}
      </div>
    </dialog>
  );
});

Modal.displayName = 'Modal';

export default Modal;
