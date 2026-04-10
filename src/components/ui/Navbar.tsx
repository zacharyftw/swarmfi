"use client";

import { Shuffle } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const navLinks = [
  { label: "Dashboard", href: "#dashboard" },
  { label: "Vaults", href: "#vaults" },
  { label: "Strategy", href: "#strategy" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Shuffle className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-foreground">
            Yield Mullet
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors duration-200 hover:text-primary"
            >
              {link.label}
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
    </nav>
  );
}
