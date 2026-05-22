"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline-gold" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "ghost", size = "md", loading, icon, children, disabled, ...props }, ref) => {
    const base = "btn-base select-none";
    const variants = {
      primary: "btn-primary",
      ghost: "btn-ghost",
      "outline-gold": "btn-outline-gold",
      outline: "bg-transparent text-white border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.15)] transition-all duration-200 rounded-full",
      danger: "bg-transparent text-[#FF453A] border border-[rgba(255,69,58,0.25)] hover:bg-[rgba(255,69,58,0.08)] transition-all duration-200 rounded-full",
    };
    const sizes = {
      sm: "text-[12px] px-3 py-2 gap-1.5",
      md: "text-[14px] px-5 py-2.5 gap-2",
      lg: "text-[15px] px-7 py-3.5 gap-2.5",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || loading ? 1 : 1.01 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        className={cn(base, variants[variant], sizes[size], (disabled || loading) && "opacity-50 cursor-not-allowed", className)}
        disabled={disabled || loading}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : icon ? (
          <span className="flex-shrink-0">{icon}</span>
        ) : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
