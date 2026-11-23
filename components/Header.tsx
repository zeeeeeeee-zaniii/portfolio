"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="brand" aria-label="Zainab Fatima — home">
          <span className="brand-badge">ZF</span>
          <span>
            <span className="brand-name">Zainab Fatima</span>
            <br />
            <span className="brand-role">Web Developer &amp; AI Creator</span>
          </span>
        </Link>

        <nav className="main-nav" aria-label="Main">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <Link href="/admin" className="admin-link">
            🔐 Admin
          </Link>
          <a href="#contact" className="btn btn-rose btn-small header-cta">
            Contact Me
          </a>
          <button
            type="button"
            className="menu-btn"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <nav className={`mobile-nav${open ? " open" : ""}`} aria-label="Mobile">
        {NAV.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)}>
          Contact Me
        </a>
      </nav>
    </header>
  );
}
