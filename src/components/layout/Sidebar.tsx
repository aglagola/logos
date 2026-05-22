"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Swords,
  Atom,
  History,
  User,
  Settings,
  CreditCard,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/debate", label: "Debate Arena", icon: Swords },
  { href: "/axioms", label: "Axiom Analysis", icon: Atom },
  { href: "/history", label: "Debate History", icon: History },
];

const bottomItems = [
  { href: "/profile", label: "Profile", icon: User },
  { href: "/pricing", label: "Upgrade", icon: CreditCard },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 bottom-0 w-60 flex flex-col z-40"
      style={{
        background: "linear-gradient(180deg, #0D0D10 0%, #0B0B0D 100%)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-[rgba(255,255,255,0.05)]">
        <img 
          src="/logo.png" 
          className="w-8 h-8 object-contain" 
          alt="Logos Logo" 
        />
        <span className="font-serif text-base text-stone">Logos</span>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <div className="mb-4">
          <p className="px-3 text-[10px] font-semibold tracking-widest text-stone-ghost uppercase mb-2">
            Core
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 2 }}
                  className={cn("sidebar-nav-item", isActive && "active")}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                  {isActive && (
                    <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Pro Upgrade Card */}
      <div className="px-3 pb-3">
        <div className="glass-gold rounded-xl p-3 mb-3">
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-[12px] font-semibold text-gold">Upgrade to Pro</span>
          </div>
          <p className="text-[11px] text-stone-muted leading-relaxed mb-2.5">
            Unlock unlimited debates, belief mapping, and cognitive reports.
          </p>
          <Link href="/pricing">
            <button className="w-full text-[12px] font-medium text-[#0B0B0D] bg-gradient-to-r from-gold-light to-gold rounded-lg py-1.5 transition-opacity hover:opacity-90">
              View Plans
            </button>
          </Link>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="px-3 pb-4 border-t border-[rgba(255,255,255,0.05)] pt-3 space-y-0.5">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div className={cn("sidebar-nav-item", isActive && "active")}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </motion.aside>
  );
}
