"use client";
import { useBookingModal } from "./ModalProvider";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export default function BookingButton({ className, children }: Props) {
  const { openBookingModal } = useBookingModal();
  return (
    <button onClick={openBookingModal} className={className}>
      {children}
    </button>
  );
}
