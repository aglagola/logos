"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Swords, Atom, History, Brain, ChevronRight, Flame, Target, AlertTriangle } from "lucide-react";
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

function ScoreRing({ score, size = 64 }: { score: number; size?: number }) {
  const r = (size - 8) / 2;
  const circumference = 2 * Math.PI * r;
  const filled = (score / 100) * circumference;
  const color = score >= 75 ? "#C9A84C" : score >= 50 ? "#4A6FA5" : "#8B3A3A";

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="score-ring">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="3" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - filled }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        />
      </svg>
      <span className="absolute font-mono text-[14px] font-medium text-stone">{score}</span>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen p-8 max-w-5xl mx-auto overflow-hidden">
      {/* Background ambient light */}
      <div className="orb orb-gold absolute w-[600px] h-[600px] -top-[200px] -right-[100px] opacity-25 pointer-events-none" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-[0.02] pointer-events-none" />

      <div className="relative z-10 space-y-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="font-serif text-[40px] tracking-tight text-gradient-stone leading-tight">
              Welcome back.
            </h1>
            <p className="text-stone-muted text-sm mt-1 font-light">
              Your reasoning grows sharper with every session. Keep questioning.
            </p>
          </div>
          <Link href="/debate/new">
            <Button variant="primary" size="md" icon={<Swords className="w-4 h-4" />}>
              New Debate
            </Button>
          </Link>
        </motion.div>

        {/* Unified Cognitive Metrics Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="glass rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(17,17,20,0.4)] p-6 grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-[rgba(255,255,255,0.05)] shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
        >
          {[
            { label: "Reasoning Score", value: 74, icon: Brain, type: "ring" },
            { label: "Consistency", value: 81, icon: Target, type: "ring" },
            { label: "Fallacy Rate", value: "1.4 / session", icon: AlertTriangle, type: "text" },
            { label: "Total Sessions", value: "24", icon: Flame, type: "text" },
          ].map((metric, i) => (
            <div 
              key={metric.label}
              className={`flex items-center gap-4 px-4 ${i >= 2 ? 'pt-6 md:pt-0' : ''} ${i === 1 ? 'pt-6 sm:pt-0' : ''}`}
            >
              <div className="flex-shrink-0">
                {metric.type === "ring" ? (
                  <ScoreRing score={metric.value as number} size={54} />
                ) : (
                  <div className="w-[54px] h-[54px] flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
                    <span className="font-serif text-2xl text-gold font-semibold">{metric.value}</span>
                  </div>
                )}
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-ghost font-semibold">{metric.label}</p>
                <p className="text-stone text-[13px] mt-0.5 font-medium">
                  {metric.label === "Reasoning Score" ? "Exemplary" :
                   metric.label === "Consistency" ? "High Rigor" :
                   metric.label === "Fallacy Rate" ? "Decreasing" : "Active Practitioner"}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-widest text-stone-ghost font-bold">Recommended Workspace</span>
            <div className="h-px flex-1 bg-[rgba(255,255,255,0.04)]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {QUICK_ACTIONS.map((action, i) => {
              const Icon = action.icon;
              return (
                <Link key={action.href} href={action.href}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="glass rounded-xl border border-[rgba(255,255,255,0.05)] bg-[rgba(17,17,20,0.3)] hover:bg-[rgba(201,168,76,0.02)] hover:border-[rgba(201,168,76,0.2)] p-5 flex items-center gap-4 cursor-pointer group transition-all duration-300"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                      action.color === "gold" 
                        ? "bg-[rgba(201,168,76,0.06)] text-gold group-hover:bg-[rgba(201,168,76,0.12)]" 
                        : action.color === "blue" 
                        ? "bg-[rgba(74,111,165,0.06)] text-[#6B8DC4] group-hover:bg-[rgba(74,111,165,0.12)]" 
                        : "bg-[rgba(255,255,255,0.03)] text-stone-muted group-hover:bg-[rgba(255,255,255,0.06)]"
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-stone font-medium text-[14px] group-hover:text-gold transition-colors duration-200">{action.label}</span>
                        {action.badge && <Badge variant="gold" size="sm">{action.badge}</Badge>}
                      </div>
                      <p className="text-stone-muted text-[12px] mt-0.5 font-light">{action.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-ghost group-hover:text-stone group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-widest text-stone-ghost font-bold">Recent Dialectics</span>
            <Link 
              href="/history" 
              className="text-gold text-[12px] hover:text-gold-light transition-colors flex items-center gap-1 font-medium"
            >
              History Log <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="glass rounded-xl border border-[rgba(255,255,255,0.05)] bg-[rgba(17,17,20,0.2)] overflow-hidden divide-y divide-[rgba(255,255,255,0.04)]">
            {RECENT_DEBATES.map((debate, i) => (
              <Link key={debate.id} href={`/debate/session?id=${debate.id}&topic=${encodeURIComponent(debate.topic)}&mode=socratic`}>
                <div className="p-4 flex items-center justify-between hover:bg-[rgba(255,255,255,0.01)] cursor-pointer group transition-colors duration-150">
                  <div className="flex-1 min-w-0 pr-4">
                    <p className="text-stone text-[14px] font-medium truncate group-hover:text-gold transition-colors duration-150">
                      {debate.topic}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[11px] text-stone-muted font-light">{debate.mode}</span>
                      <span className="text-[11px] text-stone-ghost">•</span>
                      <span className="text-[11px] text-stone-ghost font-mono">{debate.date}</span>
                      {debate.fallacies > 0 && (
                        <>
                          <span className="text-[11px] text-stone-ghost">•</span>
                          <span className="text-[11px] text-[#C97070] flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            {debate.fallacies} warning{debate.fallacies === 1 ? "" : "s"}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-right">
                      <span 
                        className="text-[14px] font-mono font-medium" 
                        style={{ color: debate.score >= 75 ? "#C9A84C" : debate.score >= 60 ? "#6B8DC4" : "#C97070" }}
                      >
                        {debate.score}%
                      </span>
                      <p className="text-[10px] text-stone-ghost uppercase tracking-wide">Rigor</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-ghost group-hover:text-stone group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
