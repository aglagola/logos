"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Check, ChevronRight, Zap, Building2, Sparkles } from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: null,
    desc: "Begin your reasoning journey.",
    features: [
      "3 debates per day",
      "3 debate modes",
      "Basic axiom analysis",
      "Standard scoring",
      "7-day debate history",
    ],
    cta: "Get Started",
    href: "/sign-up",
    featured: false,
    icon: Zap,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    desc: "For serious, committed thinkers.",
    features: [
      "Unlimited debates",
      "All 7 debate modes",
      "Advanced axiom extraction",
      "Interactive belief tree",
      "Contradiction mapping",
      "Cognitive reports",
      "AI coaching",
      "Export transcripts & analyses",
      "Full debate history",
    ],
    cta: "Upgrade to Pro",
    href: "/api/stripe/checkout?tier=pro",
    featured: true,
    icon: Sparkles,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: null,
    desc: "For teams, institutions, and organizations.",
    features: [
      "Everything in Pro",
      "Team workspaces",
      "Custom AI personas",
      "API access",
      "SSO / SAML",
      "Data sovereignty",
      "Dedicated support",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    href: "/contact",
    featured: false,
    icon: Building2,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen py-20 px-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16 max-w-2xl mx-auto">
        <Badge variant="gold" className="mb-4 inline-flex">Pricing</Badge>
        <h1 className="font-serif text-[52px] md:text-[64px] text-gradient-stone mb-4">
          Invest in Your Mind.
        </h1>
        <p className="text-stone-muted text-lg">
          Begin for free. Scale your thinking as you grow.
        </p>
      </motion.div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {PLANS.map((plan, i) => {
          const Icon = plan.icon;
          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 flex flex-col ${plan.featured ? "pricing-card pricing-card-featured" : "pricing-card"}`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="gold">Most Popular</Badge>
                </div>
              )}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${plan.featured ? "bg-[rgba(201,168,76,0.15)] text-gold" : "bg-[rgba(255,255,255,0.05)] text-stone-muted"}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-stone font-semibold text-[16px] mb-1">{plan.name}</div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-serif text-[44px] text-gradient-gold">{plan.price}</span>
                {plan.period && <span className="text-stone-muted text-[14px]">{plan.period}</span>}
              </div>
              <p className="text-stone-muted text-[13px] mb-6">{plan.desc}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-stone-dim text-[13px]">
                    <Check className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${plan.featured ? "text-gold" : "text-[#6BA880]"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={plan.href}>
                <Button
                  variant={plan.featured ? "primary" : "ghost"}
                  className="w-full justify-center"
                  icon={<ChevronRight className="w-4 h-4" />}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Note */}
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center text-stone-ghost text-[13px] mt-10">
        All plans include a 14-day money-back guarantee. No questions asked.
      </motion.p>
    </div>
  );
}
