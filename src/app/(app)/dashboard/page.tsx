"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Swords, Atom, History, Brain, TrendingUp, ChevronRight, Flame, Target, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const RECENT_DEBATES = [
  { id: "1", topic: "Free will is compatible with determinism", mode: "Socratic Inquiry", score: 78, date: "2h ago", fallacies: 1 },
  { id: "2", topic: "Meritocracy produces just outcomes", mode: "Devil's Advocate", score: 64, date: "Yesterday", fallacies: 2 },
  { id: "3", topic: "Consciousness is purely physical", mode: "Philosophy Mode", score: 82, date: "3 days ago", fallacies: 0 },
];

const QUICK_ACTIONS = [
  { href: "/debate/new", icon: Swords, label: "Start New Debate", desc: "Engage the AI in structured opposition", color: "gold", badge: null },
  { href: "/axioms", icon: Atom, label: "Analyze a Belief", desc: "Expose the foundations of any argument", color: "blue", badge: null },
  { href: "/history", icon: History, label: "Review History", desc: "Study your past debates and patterns", color: "stone", badge: null },
  { href: "/profile", icon: Brain, label: "AI Coach Feedback", desc: "Receive targeted reasoning improvements", color: "gold", badge: "Pro" },
];

function ScoreRing({ score, size = 80 }: { score: number; size?: number }) {
  const r = (size - 12) / 2;
  const circumference = 2 * Math.PI * r;
  const filled = (score / 100) * circumference;
  const color = score >= 75 ? "#C9A84C" : score >= 50 ? "#4A6FA5" : "#8B3A3A";

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="score-ring">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - filled }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      <span className="absolute font-bold text-stone text-[18px]">{score}</span>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-serif text-[36px] text-stone mb-1">Good evening.</h1>
            <p className="text-stone-muted text-[15px]">Your reasoning grows stronger with every session.</p>
          </div>
          <Link href="/debate/new">
            <Button variant="primary" icon={<Swords className="w-4 h-4" />}>New Debate</Button>
          </Link>
        </div>
      </motion.div>

      {/* Cognitive Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        {[
          { label: "Reasoning Score", value: 74, icon: Brain, type: "ring" },
          { label: "Consistency", value: 81, icon: Target, type: "ring" },
          { label: "Fallacy Rate", value: "1.4/session", icon: AlertTriangle, type: "text" },
          { label: "Debates", value: "24", icon: Flame, type: "text" },
        ].map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.07 }}
            className="card p-5 flex flex-col items-center text-center"
          >
            {metric.type === "ring" ? (
              <ScoreRing score={metric.value as number} size={64} />
            ) : (
              <div className="w-16 h-16 flex items-center justify-center">
                <span className="font-serif text-[28px] text-gold">{metric.value}</span>
              </div>
            )}
            <p className="text-stone-muted text-[12px] mt-2 leading-tight">{metric.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
        <h2 className="text-stone font-semibold text-[15px] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {QUICK_ACTIONS.map((action, i) => {
            const Icon = action.icon;
            return (
              <Link key={action.href} href={action.href}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className={`card ${action.color === "gold" ? "card-gold" : ""} p-5 flex items-center gap-4 cursor-pointer group`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${action.color === "gold" ? "bg-[rgba(201,168,76,0.1)] text-gold" : action.color === "blue" ? "bg-[rgba(74,111,165,0.1)] text-[#6B8DC4]" : "bg-[rgba(255,255,255,0.05)] text-stone-muted"}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-stone font-medium text-[14px]">{action.label}</span>
                      {action.badge && <Badge variant="gold" size="sm">{action.badge}</Badge>}
                    </div>
                    <p className="text-stone-muted text-[12.5px] mt-0.5">{action.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-ghost group-hover:text-stone-muted transition-colors flex-shrink-0" />
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Debates */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-stone font-semibold text-[15px]">Recent Debates</h2>
          <Link href="/history" className="text-gold text-[13px] hover:text-gold-light transition-colors flex items-center gap-1">
            View all <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {RECENT_DEBATES.map((debate, i) => (
            <motion.div
              key={debate.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.08 }}
            >
              <Link href={`/debate/${debate.id}`}>
                <div className="card p-4 flex items-center gap-4 group cursor-pointer">
                  <div className="flex-1 min-w-0">
                    <p className="text-stone text-[14px] font-medium truncate">{debate.topic}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <Badge variant="stone" size="sm">{debate.mode}</Badge>
                      {debate.fallacies > 0 && (
                        <span className="text-[11px] text-[#C97070] flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          {debate.fallacies} fallac{debate.fallacies === 1 ? "y" : "ies"}
                        </span>
                      )}
                      <span className="text-stone-ghost text-[12px]">{debate.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                      <div className="text-[13px] font-semibold" style={{ color: debate.score >= 75 ? "#C9A84C" : debate.score >= 60 ? "#6B8DC4" : "#C97070" }}>
                        {debate.score}
                      </div>
                      <div className="text-[10px] text-stone-ghost">Logic</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-ghost group-hover:text-stone-muted transition-colors" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
