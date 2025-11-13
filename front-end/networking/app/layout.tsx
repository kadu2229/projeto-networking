import "./globals.css";
import Navbar from "@/components/NavBar";
import { Toaster } from "react-hot-toast";
import React from "react";
import "./globals.css";


export const metadata = {
  title: "Networking",
  description: "Sistema de reuniões e check-ins",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 text-gray-900 min-h-screen">
        <Navbar />
        <main className="p-4">{children}</main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
