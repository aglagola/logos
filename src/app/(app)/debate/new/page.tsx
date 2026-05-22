"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DEBATE_MODES, type DebateMode, type AIDifficulty, type DebateSide } from "@/types";
import { ArrowRight, ChevronLeft, Sparkles, Check } from "lucide-react";

const DIFFICULTIES: { value: AIDifficulty; label: string; desc: string; icon: string }[] = [
  { value: "novice", label: "Accessible", desc: "Patient guidance through logical structure", icon: "🌱" },
  { value: "intermediate", label: "Substantive", desc: "Genuine challenge with constructive critique", icon: "⚖️" },
  { value: "expert", label: "Rigorous", desc: "No mercy — every imprecision challenged", icon: "⚡" },
  { value: "socratic", label: "Socratic", desc: "Pure inquiry — only questions, never statements", icon: "🏛️" },
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

  const steps = ["Topic Selection", "Debate Arena", "Configuration"];

  async function handleStart() {
    if (!topic.trim()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    router.push(`/debate/session?topic=${encodeURIComponent(topic)}&mode=${mode}&side=${side}&difficulty=${difficulty}`);
  }

  // Animation variants
  const slideVariants = {
    initial: { opacity: 0, x: 25 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
    exit: { opacity: 0, x: -25, transition: { duration: 0.25, ease: "easeIn" as const } }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 sm:p-12 overflow-hidden">
      {/* Background ambient light */}
      <div className="orb orb-blue absolute w-[500px] h-[500px] -bottom-[100px] -left-[100px] opacity-20 pointer-events-none" />
      <div className="orb orb-gold absolute w-[400px] h-[400px] -top-[100px] -right-[100px] opacity-15 pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl">
        
        {/* Progress Header */}
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <div className="flex items-center gap-2 mb-4 justify-center">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center">
                <div 
                  className={`flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-bold font-mono transition-all duration-300 border ${
                    i < step 
                      ? "bg-gold border-gold text-[#0B0B0D]" 
                      : i === step 
                      ? "border-gold text-gold shadow-[0_0_15px_rgba(201,168,76,0.2)]" 
                      : "border-[rgba(255,255,255,0.08)] text-stone-ghost"
                  }`}
                >
                  {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-8 sm:w-16 h-px ${i < step ? "bg-gold" : "bg-[rgba(255,255,255,0.08)]"} mx-2 transition-colors duration-300`} />
                )}
              </div>
            ))}
          </div>
          <span className="text-[11px] uppercase tracking-widest text-gold font-bold font-mono">
            Step {step + 1}: {steps[step]}
          </span>
        </div>

        <div className="glass rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(17,17,20,0.5)] p-6 sm:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
          <AnimatePresence mode="wait">
            {/* Step 0: Topic Selection */}
            {step === 0 && (
              <motion.div 
                key="topic" 
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="font-serif text-[32px] text-stone leading-tight">What shall we examine?</h2>
                  <p className="text-stone-muted text-xs mt-1">Enter any belief, claim, or argument to begin the dialectic.</p>
                </div>

                <div className="relative">
                  <textarea
                    className="thought-chamber input-base w-full min-h-[120px] text-[14px]"
                    placeholder="e.g. Technology alienates us from authentic experience, or Free will is compatible with determinism..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    rows={4}
                  />
                  <div className="absolute right-3 bottom-3 text-[10px] text-stone-ghost font-mono">
                    {topic.length} characters
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-3 h-3 text-gold" />
                    <span className="text-[10px] uppercase tracking-widest text-stone-ghost font-bold">Suggested Themes</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_TOPICS.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTopic(t)}
                        className="text-[11px] text-stone-muted border border-[rgba(255,255,255,0.05)] rounded-lg px-3 py-1.5 hover:text-stone hover:border-[rgba(201,168,76,0.2)] hover:bg-[rgba(201,168,76,0.03)] transition-all duration-200"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="primary" 
                  className="w-full justify-center py-3" 
                  disabled={!topic.trim()} 
                  onClick={() => setStep(1)} 
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Proceed to Arena
                </Button>
              </motion.div>
            )}

            {/* Step 1: Mode Selection */}
            {step === 1 && (
              <motion.div 
                key="mode" 
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="font-serif text-[32px] text-stone leading-tight">Choose your arena.</h2>
                  <p className="text-stone-muted text-xs mt-1">Each structure guides the conversation differently.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-1">
                  {(Object.entries(DEBATE_MODES) as [DebateMode, typeof DEBATE_MODES[DebateMode]][]).map(([key, m]) => (
                    <div
                      key={key}
                      onClick={() => setMode(key)}
                      className={`mode-card relative flex flex-col justify-between ${mode === key ? "selected border-gold" : ""}`}
                    >
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-lg">{m.icon}</span>
                          {m.tier !== "free" && <Badge variant="gold" size="sm">{m.tier}</Badge>}
                        </div>
                        <div className="text-stone font-semibold text-[13px] mb-1">{m.label}</div>
                        <div className="text-stone-muted text-[11px] leading-relaxed font-light">{m.description}</div>
                      </div>
                      {mode === key && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-gold flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-[#0B0B0D] stroke-[3]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button variant="ghost" onClick={() => setStep(0)} icon={<ChevronLeft className="w-4 h-4" />} className="flex-1 justify-center py-3">Back</Button>
                  <Button variant="primary" onClick={() => setStep(2)} icon={<ArrowRight className="w-4 h-4" />} className="flex-1 justify-center py-3">Configure Terms</Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Configuration */}
            {step === 2 && (
              <motion.div 
                key="config" 
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="font-serif text-[32px] text-stone leading-tight">Configure the Dialectic</h2>
                  <p className="text-stone-muted text-xs mt-1">Set your position and the intensity of the examination.</p>
                </div>

                {/* Side Selection */}
                <div className="space-y-3">
                  <label className="text-[11px] uppercase tracking-widest text-stone-ghost font-bold">Your Stance</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(["for", "against"] as DebateSide[]).map((s) => (
                      <div
                        key={s}
                        onClick={() => setSide(s)}
                        className={`mode-card relative text-center py-4 flex flex-col items-center justify-center ${side === s ? "selected border-gold" : ""}`}
                      >
                        <div className="text-2xl mb-1.5">{s === "for" ? "🛡️" : "⚔️"}</div>
                        <div className="text-stone font-medium text-[13px] capitalize">I Defend {s === "for" ? "Pro" : "Con"}</div>
                        {side === s && (
                          <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-gold flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 text-[#0B0B0D] stroke-[3]" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Difficulty Selection */}
                <div className="space-y-3">
                  <label className="text-[11px] uppercase tracking-widest text-stone-ghost font-bold">AI Rigor</label>
                  <div className="grid grid-cols-2 gap-3">
                    {DIFFICULTIES.map((d) => (
                      <div
                        key={d.value}
                        onClick={() => setDifficulty(d.value)}
                        className={`mode-card relative text-left p-4 flex flex-col justify-between ${difficulty === d.value ? "selected border-gold" : ""}`}
                      >
                        <div>
                          <div className="text-lg mb-1.5">{d.icon}</div>
                          <div className="text-stone font-semibold text-[13px] mb-0.5">{d.label}</div>
                          <div className="text-stone-muted text-[11px] font-light leading-snug">{d.desc}</div>
                        </div>
                        {difficulty === d.value && (
                          <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-gold flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 text-[#0B0B0D] stroke-[3]" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="ghost" onClick={() => setStep(1)} icon={<ChevronLeft className="w-4 h-4" />} className="flex-1 justify-center py-3">Back</Button>
                  <Button variant="primary" loading={loading} onClick={handleStart} icon={<ArrowRight className="w-4 h-4" />} className="flex-1 justify-center py-3">
                    Initialize Debate
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
