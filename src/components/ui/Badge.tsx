"use client";

import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "gold" | "blue" | "danger" | "success" | "stone";
  size?: "sm" | "md";
}

export function Badge({ variant = "stone", size = "md", className, children, ...props }: BadgeProps) {
  const variants = {
    gold: "badge-gold",
    blue: "badge-blue",
    danger: "badge-danger",
    success: "badge-success",
    stone: "badge-stone",
  };
  const sizes = {
    sm: "text-[10px] px-1.5 py-0.5",
    md: "text-[11px] px-2 py-1",
  };

  return (
    <span className={cn("badge", variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
}

export function ScoreBadge({ score, label }: { score: number; label: string }) {
  const variant = score >= 75 ? "success" : score >= 50 ? "gold" : "danger";
  return (
    <Badge variant={variant}>
      {label}: {score}
    </Badge>
  );
}
