"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import BookingModal from "./BookingModal";

interface ModalContextType {
  openBookingModal: () => void;
}

const ModalContext = createContext<ModalContextType>({ openBookingModal: () => {} });

export function useBookingModal() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ openBookingModal: () => setOpen(true) }}>
      {children}
      <BookingModal open={open} onClose={() => setOpen(false)} />
    </ModalContext.Provider>
  );
}
