"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { AlertTriangle, ChevronRight, TrendingUp } from "lucide-react";
import Link from "next/link";

const HISTORY = [
  { id: "1", topic: "Free will is compatible with determinism", mode: "Socratic Inquiry", date: "Today, 7:34 PM", scores: { logic: 78, persuasion: 72, clarity: 85 }, fallacies: ["Circular Reasoning"], duration: "18 min" },
  { id: "2", topic: "Meritocracy produces just outcomes", mode: "Devil's Advocate", date: "Yesterday, 2:11 PM", scores: { logic: 64, persuasion: 58, clarity: 70 }, fallacies: ["Survivorship Bias", "Hasty Generalization"], duration: "24 min" },
  { id: "3", topic: "Consciousness is purely physical", mode: "Philosophy Mode", date: "May 18, 4:00 PM", scores: { logic: 82, persuasion: 79, clarity: 88 }, fallacies: [], duration: "31 min" },
  { id: "4", topic: "Social media causes more harm than good", mode: "Structured Debate", date: "May 16, 9:15 AM", scores: { logic: 71, persuasion: 68, clarity: 76 }, fallacies: ["Appeal to Emotion"], duration: "22 min" },
];

export default function HistoryPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-[32px] text-stone mb-1">Debate History</h1>
          <p className="text-stone-muted text-[14px]">Your reasoning across time.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="glass rounded-xl px-4 py-2">
            <div className="text-[11px] text-stone-ghost mb-0.5">Avg. Logic</div>
            <div className="text-gold font-bold text-[18px]">74</div>
          </div>
          <div className="glass rounded-xl px-4 py-2">
            <div className="text-[11px] text-stone-ghost mb-0.5">Sessions</div>
            <div className="text-stone font-bold text-[18px]">{HISTORY.length}</div>
          </div>
        </div>
      </motion.div>

      <div className="space-y-3">
        {HISTORY.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link href={`/debate/${item.id}`}>
              <div className="card p-5 cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <h3 className="text-stone font-medium text-[15px] group-hover:text-gold transition-colors">{item.topic}</h3>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge variant="stone" size="sm">{item.mode}</Badge>
                      <span className="text-stone-ghost text-[12px]">{item.date}</span>
                      <span className="text-stone-ghost text-[12px]">· {item.duration}</span>
                      {item.fallacies.length > 0 && (
                        <span className="text-[#C97070] text-[12px] flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          {item.fallacies.join(", ")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="hidden sm:flex gap-3">
                      {Object.entries(item.scores).map(([k, v]) => (
                        <div key={k} className="text-center">
                          <div className="font-semibold text-[14px]" style={{ color: v >= 75 ? "#C9A84C" : v >= 60 ? "#6B8DC4" : "#C97070" }}>{v}</div>
                          <div className="text-stone-ghost text-[10px] capitalize">{k}</div>
                        </div>
                      ))}
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-ghost group-hover:text-stone-muted transition-colors" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
