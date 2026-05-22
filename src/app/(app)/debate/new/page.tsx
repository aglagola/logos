"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DEBATE_MODES, type DebateMode, type AIDifficulty, type DebateSide } from "@/types";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const DIFFICULTIES: { value: AIDifficulty; label: string; desc: string }[] = [
  { value: "novice", label: "Accessible", desc: "Patient guidance through logical structure" },
  { value: "intermediate", label: "Substantive", desc: "Genuine challenge with constructive critique" },
  { value: "expert", label: "Rigorous", desc: "No mercy — every imprecision challenged" },
  { value: "socratic", label: "Socratic", desc: "Pure inquiry — only questions, never statements" },
];

const SUGGESTED_TOPICS = [
  "Free will is compatible with determinism",
  "Social media causes more harm than good",
  "Economic inequality is inevitable in a free market",
  "Consciousness is purely physical",
  "Meritocracy produces just outcomes",
  "Artificial intelligence poses an existential risk",
];

export default function NewDebatePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [topic, setTopic] = useState("");
  const [mode, setMode] = useState<DebateMode>("ai_vs_user");
  const [side, setSide] = useState<DebateSide>("for");
  const [difficulty, setDifficulty] = useState<AIDifficulty>("intermediate");
  const [loading, setLoading] = useState(false);

  const steps = ["Topic", "Mode", "Configuration"];

  async function handleStart() {
    if (!topic.trim()) return;
    setLoading(true);
    // In production: POST to /api/debate/create then navigate
    await new Promise(r => setTimeout(r, 800));
    router.push(`/debate/session?topic=${encodeURIComponent(topic)}&mode=${mode}&side=${side}&difficulty=${difficulty}`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-10 justify-center">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 ${i <= step ? "text-gold" : "text-stone-ghost"} transition-colors`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold border ${i < step ? "bg-gold border-gold text-[#0B0B0D]" : i === step ? "border-gold text-gold" : "border-[rgba(255,255,255,0.1)] text-stone-ghost"}`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span className="text-[13px] font-medium hidden sm:block">{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-12 h-px ${i < step ? "bg-gold" : "bg-[rgba(255,255,255,0.08)]"} mx-1 transition-colors`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 0: Topic */}
          {step === 0 && (
            <motion.div key="topic" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 className="font-serif text-[40px] text-stone mb-2 text-center">What shall we examine?</h1>
              <p className="text-stone-muted text-center mb-8">Enter any belief, argument, or proposition.</p>
              <textarea
                className="thought-chamber input-base w-full mb-4 text-[15px]"
                placeholder="Type your topic or belief…"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                rows={4}
              />
              <div className="mb-6">
                <p className="text-stone-ghost text-[12px] mb-2.5 uppercase tracking-widest font-semibold">Suggested topics</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_TOPICS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTopic(t)}
                      className="text-[12px] text-stone-muted border border-[rgba(255,255,255,0.06)] rounded-lg px-3 py-1.5 hover:text-stone hover:border-[rgba(201,168,76,0.2)] hover:bg-[rgba(201,168,76,0.04)] transition-all"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <Button variant="primary" className="w-full justify-center" disabled={!topic.trim()} onClick={() => setStep(1)} icon={<ArrowRight className="w-4 h-4" />}>
                Continue
              </Button>
            </motion.div>
          )}

          {/* Step 1: Mode */}
          {step === 1 && (
            <motion.div key="mode" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 className="font-serif text-[36px] text-stone mb-2 text-center">Choose your arena.</h1>
              <p className="text-stone-muted text-center mb-8">Each mode reveals different facets of thought.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {(Object.entries(DEBATE_MODES) as [DebateMode, typeof DEBATE_MODES[DebateMode]][]).map(([key, m]) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setMode(key)}
                    className={`mode-card text-left ${mode === key ? "selected" : ""}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xl">{m.icon}</span>
                      {m.tier !== "free" && <Badge variant="gold" size="sm">{m.tier}</Badge>}
                    </div>
                    <div className="text-stone font-semibold text-[14px] mb-1">{m.label}</div>
                    <div className="text-stone-muted text-[12px] leading-relaxed">{m.description}</div>
                  </motion.button>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="ghost" onClick={() => setStep(0)} icon={<ChevronLeft className="w-4 h-4" />} className="flex-1 justify-center">Back</Button>
                <Button variant="primary" onClick={() => setStep(2)} icon={<ArrowRight className="w-4 h-4" />} className="flex-1 justify-center">Continue</Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Config */}
          {step === 2 && (
            <motion.div key="config" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 className="font-serif text-[36px] text-stone mb-2 text-center">Configure your session.</h1>
              <p className="text-stone-muted text-center mb-8">Set the terms of engagement.</p>

              {/* Side */}
              <div className="mb-6">
                <label className="text-stone text-[13px] font-semibold mb-3 block">Your position on: <span className="text-gold italic">"{topic.slice(0, 50)}{topic.length > 50 ? "…" : ""}"</span></label>
                <div className="grid grid-cols-2 gap-3">
                  {(["for", "against"] as DebateSide[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSide(s)}
                      className={`mode-card text-center py-4 ${side === s ? "selected" : ""}`}
                    >
                      <div className="text-2xl mb-1">{s === "for" ? "👍" : "👎"}</div>
                      <div className="text-stone font-medium text-[14px] capitalize">I argue {s}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div className="mb-8">
                <label className="text-stone text-[13px] font-semibold mb-3 block">AI Intensity</label>
                <div className="grid grid-cols-2 gap-3">
                  {DIFFICULTIES.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setDifficulty(d.value)}
                      className={`mode-card text-left ${difficulty === d.value ? "selected" : ""}`}
                    >
                      <div className="text-stone font-semibold text-[13px] mb-0.5">{d.label}</div>
                      <div className="text-stone-muted text-[11px]">{d.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="ghost" onClick={() => setStep(1)} icon={<ChevronLeft className="w-4 h-4" />} className="flex-1 justify-center">Back</Button>
                <Button variant="primary" loading={loading} onClick={handleStart} icon={<ArrowRight className="w-4 h-4" />} className="flex-1 justify-center">
                  Begin Debate
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
