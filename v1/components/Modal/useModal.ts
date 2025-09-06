import { useRef } from "react";

function useModal() {
  const ref = useRef<HTMLDialogElement>(null);

  const onOpen = () => {
    if (ref.current) {
      ref.current.showModal();
    }
  };

  const onClose = () => {
    if (ref.current) {
      ref.current.close();
    }
  };

  return { ref, onOpen, onClose };
}

export default useModal;
