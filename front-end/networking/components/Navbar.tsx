"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="logo">
          Networking
        </Link>

        {/* Botão hambúrguer */}
        <button className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Links */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <Link href="/">Login</Link>
          </li>
          <li>
            <Link href="/candidatura">Candidatura</Link>
          </li>
          <li>
            <Link href="/reunioes">Reuniões</Link>
          </li>
          <li>
            <Link href="/avisos">Avisos</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
