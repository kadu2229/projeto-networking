"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-primary text-white shadow-md fixed w-full z-50 top-0 left-0">
      <div className="container flex justify-between items-center py-4">
        <h1 className="text-xl font-bold">
          <Link href="/">Networking</Link>
        </h1>

        {/* Botão Mobile */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Menu Desktop */}
        <ul className="hidden md:flex gap-6 text-sm font-medium">
          <li className="hover:text-accent transition-colors">
            <Link href="/">Início</Link>
          </li>
          <li className="hover:text-accent transition-colors">
            <Link href="/reunioes">Reuniões</Link>
          </li>
          <li className="hover:text-accent transition-colors">
            <Link href="/admin">Admin</Link>
          </li>
        </ul>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-primary/95 px-4 pb-4">
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="block py-2 hover:text-accent"
              >
                Início
              </Link>
            </li>
            <li>
              <Link
                href="/reunioes"
                onClick={() => setMenuOpen(false)}
                className="block py-2 hover:text-accent"
              >
                Reuniões
              </Link>
            </li>
            <li>
              <Link
                href="/admin"
                onClick={() => setMenuOpen(false)}
                className="block py-2 hover:text-accent"
              >
                Admin
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
