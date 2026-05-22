"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.05)] mt-32">
      <div className="content-max py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-[#A8882C] flex items-center justify-center">
                <span className="text-[#0B0B0D] font-serif text-sm font-bold">Λ</span>
              </div>
              <span className="font-serif text-lg text-stone">Logos</span>
            </div>
            <p className="text-stone-muted text-sm leading-relaxed max-w-xs">
              An operating system for structured human thought. Debate ideas, uncover hidden assumptions, and refine your reasoning with AI.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-stone text-[12px] font-semibold tracking-widest uppercase mb-4">Product</h4>
            <ul className="space-y-3">
              {[
                ["Features", "/#features"],
                ["Debate Arena", "/debate"],
                ["Axiom Analysis", "/axioms"],
                ["Pricing", "/pricing"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-stone-muted text-sm hover:text-stone transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-stone text-[12px] font-semibold tracking-widest uppercase mb-4">Company</h4>
            <ul className="space-y-3">
              {[
                ["About", "/#about"],
                ["Privacy", "/#"],
                ["Terms", "/#"],
                ["Contact", "/#"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-stone-muted text-sm hover:text-stone transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider my-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-stone-ghost text-[12px]">
            © {new Date().getFullYear()} Logos. All rights reserved.
          </p>
          <p className="text-stone-ghost text-[12px] font-serif italic">
            "The unexamined life is not worth living." — Socrates
          </p>
        </div>
      </div>
    </footer>
  );
}
