import Navbar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="bg-background text-gray-800 min-h-screen pt-16">
        <Navbar />
        <main className="container py-8">{children}</main>

        <footer className="bg-gray-100 text-center text-sm py-4 mt-8 text-gray-500 border-t">
          © {new Date().getFullYear()} Networking — Desenvolvido por Pood
        </footer>
      </body>
    </html>
  );
}
