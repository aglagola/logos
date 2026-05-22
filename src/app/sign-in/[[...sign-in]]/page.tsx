"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Placeholder: redirect to dashboard
    await new Promise((r) => setTimeout(r, 600));
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0B0D] px-4">
      {/* Background orbs */}
      <div className="orb orb-gold absolute w-[500px] h-[500px] top-[-100px] left-[-100px] animate-slow-drift opacity-40" />
      <div className="orb orb-blue absolute w-[400px] h-[400px] bottom-[-50px] right-[-100px] animate-slow-drift opacity-30" style={{ animationDelay: "-8s" }} />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold to-[#A8882C] flex items-center justify-center shadow-[0_0_40px_rgba(201,168,76,0.35)]">
              <span className="text-[#0B0B0D] font-serif text-2xl font-bold">Λ</span>
            </div>
            <span className="font-serif text-xl text-stone">Logos</span>
          </Link>
          <h1 className="font-serif text-[28px] text-stone mt-4">Welcome back.</h1>
          <p className="text-stone-muted text-sm mt-1">Continue your reasoning journey.</p>
        </div>

        {/* Card */}
        <div className="glass rounded-2xl p-8 border border-[rgba(255,255,255,0.08)] shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-stone-muted text-[12px] font-medium block mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="input-base"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="text-stone-muted text-[12px] font-medium block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input-base pr-11"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-ghost hover:text-stone-muted transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              className="w-full justify-center mt-2"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In
            </Button>
          </form>

          <div className="divider my-5" />

          <p className="text-center text-stone-muted text-[13px]">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-gold hover:text-gold-light transition-colors">
              Create one
            </Link>
          </p>
        </div>

        <p className="text-center text-stone-ghost text-[11px] mt-5">
          Auth powered by Clerk · Add your keys in <code className="text-gold text-[10px]">.env.local</code>
        </p>
      </motion.div>
    </div>
  );
}
