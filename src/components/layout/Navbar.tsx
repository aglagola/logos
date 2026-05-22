"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const isApp = pathname.startsWith("/dashboard") ||
                pathname.startsWith("/debate") ||
                pathname.startsWith("/axioms") ||
                pathname.startsWith("/history") ||
                pathname.startsWith("/profile") ||
                pathname.startsWith("/settings");

  if (isApp) return null;

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="glass border-b border-[rgba(255,255,255,0.06)]">
        <div className="content-max flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src="/logo.png" 
              className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-105" 
              alt="Logos Logo" 
            />
            <span className="font-serif text-lg text-stone tracking-wide group-hover:text-gold transition-colors duration-200">
              Logos
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-[13.5px] font-medium transition-all duration-150",
                  pathname === link.href
                    ? "text-gold bg-[rgba(201,168,76,0.08)]"
                    : "text-stone-muted hover:text-stone hover:bg-[rgba(255,255,255,0.04)]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="primary" size="sm">Begin</Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
