import type { Metadata } from "next";
import "./globals.css";
import { ModalProvider } from "./components/ModalProvider";
import ChatWidget from "./components/ChatWidget";

export const metadata: Metadata = {
  title: "Melers Pesulapalvelut — Kotiovelle. Puhtaana.",
  description: "Laadukkaat pesu- ja tekstiilihuoltopalvelut kotiin ja yrityksille Turussa. Melers Pesulapalvelut — luotettava kumppani vuodesta 1967.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&family=Sora:wght@400;500;600;700&family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full">
        <ModalProvider>
          {children}
          <ChatWidget />
        </ModalProvider>
      </body>
    </html>
  );
}
