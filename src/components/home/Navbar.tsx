"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Upcoming Events", href: "/#upcoming-events" },
  { label: "Create Event", href: "/create-event" },
  { label: "All Events", href: "/events" },
  { label: "Gallery Showcase", href: "/#gallery" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#C99A4B]/30 bg-[#F7F1E3]/95 backdrop-blur-md">
      {/* Golden decorative top stripe */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#C99A4B] to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo + Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Milanmela Home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Milanmela.png"
              alt="Milanmela Logo"
              className="size-10 lg:size-12 rounded-full border-2 border-[#C99A4B]/50 object-cover shadow-sm transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col leading-tight">
              <span
                className="text-xl lg:text-2xl font-bold tracking-wide text-[#064B38]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Milanmela
              </span>
              <span
                className="text-[10px] tracking-widest text-[#C99A4B] uppercase hidden sm:block"
              >
                সংস্কৃতির ছোঁয়ায়
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-sm font-medium text-[#064B38] transition-colors hover:text-[#C83D2B] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-[#C83D2B] after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Avatar + Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Profile Avatar */}
            <button
              aria-label="User profile"
              className="flex items-center gap-2 rounded-full border border-[#C99A4B]/40 bg-white px-3 py-1.5 shadow-sm transition hover:border-[#C99A4B] hover:shadow-md"
            >
              <Avatar size="sm" className="border border-[#C99A4B]/60">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback className="bg-[#064B38] text-[#F7F1E3]">
                  <User className="size-3" />
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:block text-xs font-medium text-[#064B38]">
                Profile
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden flex items-center justify-center size-9 rounded-lg border border-[#C99A4B]/40 text-[#064B38] hover:bg-[#064B38]/5 transition"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#C99A4B]/20 bg-[#F7F1E3] px-4 py-4">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center py-2 text-sm font-medium text-[#064B38] border-b border-[#C99A4B]/20 hover:text-[#C83D2B] transition-colors last:border-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
