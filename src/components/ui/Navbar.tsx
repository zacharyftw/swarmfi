"use client";

import { Shuffle } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const navLinks = [
  { label: "Strategy", href: "#strategy" },
  { label: "Vaults", href: "#vaults" },
  { label: "Dashboard", href: "#dashboard" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Shuffle className="h-6 w-6 text-primary" />
            <div className="absolute inset-0 blur-md bg-primary/30 rounded-full" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Yield Mullet
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors duration-200 hover:text-primary relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Connect button */}
        <ConnectButton
          chainStatus="icon"
          showBalance={false}
          accountStatus="address"
        />
      </div>

      {/* Subtle bottom divider with gradient */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border-highlight/20 to-transparent" />
    </nav>
  );
}
