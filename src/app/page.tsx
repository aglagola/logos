"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";
import { Accordion } from "@/components/ui/Accordion";
import { 
  ArrowRight, 
  Brain, 
  Atom, 
  GitBranch, 
  ShieldAlert, 
  Zap, 
  ChevronRight, 
  Check, 
  Eye, 
  Lock,
  BarChart3
} from "lucide-react";

// Interactive Simulator Data
const SIMULATOR_TEMPLATES = {
  ai: {
    input: "Artificial intelligence poses an existential risk to humanity.",
    claim: "Superintelligent systems will inevitably act against human survival.",
    assumptions: "AI systems will develop autonomous goals that conflict with human goals; alignment is mathematically impossible at scale.",
    axioms: "Intelligence corresponds to power; power seeking is a universal instrument of intelligent agents.",
    counter: "Cooperation and alignment are more efficient for intelligence scaling than conflict.",
    bias: "Anthropomorphic bias (projecting human expansionist tendencies onto machines)."
  },
  work: {
    input: "Success is purely a result of individual hard work.",
    claim: "Effort directly correlates to outcomes regardless of external conditions.",
    assumptions: "Societal structures are fair, and opportunities are equally accessible to anyone with determination.",
    axioms: "Individual agency operates independently of socio-economic starting conditions.",
    counter: "Systemic resources dictate the leverage, risk-tolerance, and return on individual effort.",
    bias: "Survivorship bias (focusing on success stories while ignoring systemic failures)."
  },
  social: {
    input: "Social media destroys organic human community.",
    claim: "Digital connection degrades the quality of real-world human relationships.",
    assumptions: "Physical proximity is a necessary condition for meaningful social connection.",
    axioms: "Human evolutionary biology requires physical social structures for authentic empathy.",
    counter: "Geographic constraints are artificial barriers; digital networks democratize community.",
    bias: "Declinism (romanticizing the pre-digital past as inherently superior)."
  }
};

const FAQ_ITEMS = [
  { question: "What is Logos?", answer: "Logos is a reasoning workspace designed to pressure-test your arguments, expose unstated beliefs, and detect logical fallacies. It combines Socratic AI agents with structural reasoning maps to help you think with absolute precision." },
  { question: "How does the Socratic AI work?", answer: "Instead of answering questions like a generic chat assistant, Logos uses a specialized orchestration layer that analyzes the premises of your statements. It identifies your underlying assumptions and forces you to defend them, using structured debate techniques." },
  { question: "What is Axiom Extraction?", answer: "Every claim sits on supporting assumptions, which rest on fundamental beliefs called axioms. Axiom Extraction reverse-engineers any statement to reveal these foundations, showing you the core premises your arguments rely on." },
  { question: "Is my session data private?", answer: "Yes. All debates, beliefs, and analyses are strictly private to your account. We do not use your session data to train public AI models. Enterprise accounts have options for dedicated database schemas." }
];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Interactive Simulator State
  const [selectedTemplate, setSelectedTemplate] = useState<"ai" | "work" | "social">("ai");
  const [simStep, setSimStep] = useState<"idle" | "analyzing" | "complete">("idle");

  const runSimulation = () => {
    setSimStep("analyzing");
    setTimeout(() => {
      setSimStep("complete");
    }, 1800);
  };

  const activeTemplate = SIMULATOR_TEMPLATES[selectedTemplate];

  return (
    <div ref={containerRef} className="page-wrapper bg-[#000000] text-white overflow-x-hidden">
      
      {/* ── HERO SECTION ─────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
        {/* Apple subtle grid & light gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(201,168,76,0.06),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[11px] uppercase tracking-widest text-stone-muted font-mono font-medium">
              Introducing Logos 1.0
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[48px] sm:text-[72px] lg:text-[88px] font-sans font-light tracking-tight leading-[1.05]"
          >
            Logic Engine
            <br />
            <span className="font-serif italic text-gradient-gold">&amp; Axioms AI.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-stone-muted text-lg sm:text-xl font-light max-w-2xl mx-auto leading-relaxed"
          >
            Debate complex ideas, uncover hidden assumptions, and map the logical architecture of your thoughts with a Socratic AI companion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/sign-up">
              <Button variant="primary" size="lg" className="rounded-full bg-white text-black hover:bg-white/90 border-none px-8 font-medium shadow-none py-3.5">
                Start Free Workspace
              </Button>
            </Link>
            <Link href="/axioms">
              <button className="text-stone-dim hover:text-stone text-[14px] font-medium transition-colors flex items-center gap-1">
                Explore Axioms <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Dynamic App Dashboard Mockup Frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.4 }}
          className="relative mt-20 w-full max-w-5xl px-4 z-10"
        >
          <div className="relative rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0C0C0E] shadow-[0_24px_80px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden aspect-[16/9]">
            {/* Mock Nav Bar */}
            <div className="h-12 border-b border-[rgba(255,255,255,0.05)] bg-[#0F0F12] flex items-center px-4 justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.1)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.1)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.1)]" />
              </div>
              <div className="text-[11px] font-mono text-stone-ghost">Logos Dialectic Arena — Active</div>
              <div className="w-12" />
            </div>

            {/* Mock Layout Workspace */}
            <div className="absolute inset-0 top-12 flex">
              {/* Left Column: Socratic Dialogue */}
              <div className="flex-1 flex flex-col border-r border-[rgba(255,255,255,0.04)] bg-[#0A0A0C] p-6 space-y-4 overflow-hidden">
                <div className="flex justify-end">
                  <div className="max-w-[70%] bg-[rgba(201,168,76,0.06)] border border-[rgba(201,168,76,0.15)] rounded-xl p-3.5 text-xs text-stone-dim leading-relaxed">
                    "Success is determined by individual hard work alone."
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[70%] bg-[#111114] border border-[rgba(255,255,255,0.06)] rounded-xl p-3.5 text-xs text-stone-dim leading-relaxed space-y-2">
                    <p className="text-[9px] uppercase tracking-wider text-[#6B8DC4] font-mono font-bold">Logos AI (Socratic)</p>
                    <p className="font-light">Does that claim assume opportunity distributions are uniform across society? What happens to your thesis if access to resources dictates outcomes more than labor effort?</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[70%] bg-[rgba(201,168,76,0.06)] border border-[rgba(201,168,76,0.15)] rounded-xl p-3.5 text-xs text-stone-dim leading-relaxed">
                    "People with grit will always find paths or create them."
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[70%] bg-[#111114] border border-[rgba(255,255,255,0.06)] rounded-xl p-3.5 text-xs text-stone-dim leading-relaxed space-y-2">
                    <p className="text-[9px] uppercase tracking-wider text-[#6B8DC4] font-mono font-bold">Logos AI (Socratic)</p>
                    <p className="font-light">You have now introduced a secondary axiom: that individual grit is unlimited and sufficient to override external reality. Is this a universally verifiable principle?</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Real-time Analysis */}
              <div className="w-72 bg-[#0C0C0E] p-6 flex flex-col justify-between border-l border-[rgba(255,255,255,0.04)]">
                <div className="space-y-5">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-stone-ghost font-bold font-mono">Cognitive Scores</span>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-stone-muted">Logic Rigor</span>
                        <span className="text-gold font-mono">78%</span>
                      </div>
                      <div className="h-1 bg-[rgba(255,255,255,0.04)] rounded-full overflow-hidden">
                        <div className="h-full bg-gold rounded-full w-[78%]" />
                      </div>
                      <div className="flex items-center justify-between text-[11px] mt-2">
                        <span className="text-stone-muted">Clarity</span>
                        <span className="text-[#6B8DC4] font-mono">84%</span>
                      </div>
                      <div className="h-1 bg-[rgba(255,255,255,0.04)] rounded-full overflow-hidden">
                        <div className="h-full bg-[#6B8DC4] rounded-full w-[84%]" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-stone-ghost font-bold font-mono">Fallacies Warned</span>
                    <div className="mt-2.5 p-3 rounded-lg bg-[rgba(139,58,58,0.05)] border border-[rgba(139,58,58,0.15)] space-y-1">
                      <span className="text-[10px] text-[#C97070] font-bold uppercase font-mono">Survivorship Bias</span>
                      <p className="text-[9.5px] text-stone-muted leading-relaxed font-light">Drawing generalized rules from outliers who survived constraints.</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 border border-dashed border-[rgba(255,255,255,0.05)] rounded-lg text-center text-[10px] text-stone-ghost font-mono">
                  Axioms Traced: 2
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── INTERACTIVE REDUCTIONIST SIMULATOR ───────────── */}
      <section className="py-32 relative border-t border-[rgba(255,255,255,0.05)] bg-[#050507]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <span className="text-[11px] uppercase tracking-widest text-gold font-bold font-mono">Dialectic Simulator</span>
            <h2 className="text-3xl sm:text-4xl font-sans font-light tracking-tight">Expose assumptions in real time</h2>
            <p className="text-stone-muted text-sm sm:text-base font-light max-w-xl mx-auto">Select a stance below and watch the Logos analysis parser extract the logical building blocks.</p>
          </div>

          {/* Selector Tabs */}
          <div className="flex justify-center gap-2 mb-8">
            {[
              { id: "ai", label: "Artificial Intelligence" },
              { id: "work", label: "Meritocracy" },
              { id: "social", label: "Digital Connections" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedTemplate(tab.id as any);
                  setSimStep("idle");
                }}
                className={`text-[12px] font-medium font-sans px-4 py-2 rounded-full border transition-all duration-200 ${
                  selectedTemplate === tab.id
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-stone-muted border-[rgba(255,255,255,0.08)] hover:text-stone hover:border-[rgba(255,255,255,0.15)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Simulator Box */}
          <div className="glass rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#0C0C0E] p-6 sm:p-8 space-y-6 shadow-[0_24px_50px_rgba(0,0,0,0.5)]">
            
            {/* Input Statement */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-stone-ghost font-bold font-mono">User Claim</span>
              <div className="p-4 rounded-xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)] text-stone text-[14px]">
                "{activeTemplate.input}"
              </div>
            </div>

            {/* Run Button / States */}
            {simStep === "idle" && (
              <Button 
                variant="primary" 
                onClick={runSimulation} 
                icon={<Zap className="w-4 h-4" />} 
                className="w-full justify-center py-3 bg-white text-black hover:bg-white/90 rounded-xl"
              >
                Deconstruct Claim
              </Button>
            )}

            {simStep === "analyzing" && (
              <div className="py-8 text-center space-y-3">
                <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-stone-muted text-xs font-mono">Parsing linguistic structure...</p>
              </div>
            )}

            {/* Output Steps */}
            {simStep === "complete" && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="space-y-4 pt-2 border-t border-[rgba(255,255,255,0.04)]"
              >
                {[
                  { label: "Surface Claim", text: activeTemplate.claim, depth: 0, color: "border-stone bg-[rgba(255,255,255,0.01)]" },
                  { label: "Supporting Assumption", text: activeTemplate.assumptions, depth: 1, color: "border-[rgba(74,111,165,0.2)] bg-[rgba(74,111,165,0.02)]" },
                  { label: "Fundamental Axiom", text: activeTemplate.axioms, depth: 2, color: "border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.03)]" },
                  { label: "Opposing Axiom", text: activeTemplate.counter, depth: 3, color: "border-[rgba(74,111,165,0.2)] bg-[rgba(74,111,165,0.02)]" },
                  { label: "Identified Fallacy / Bias", text: activeTemplate.bias, depth: 4, color: "border-[rgba(139,58,58,0.25)] bg-[rgba(139,58,58,0.03)]" }
                ].map((step, i) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    style={{ marginLeft: `${step.depth * 16}px` }}
                    className={`rounded-xl border p-4 ${step.color} relative`}
                  >
                    {/* Visual Branch Line connector */}
                    {step.depth > 0 && (
                      <div className="absolute -left-[16px] top-0 bottom-0 w-[1px] bg-[rgba(255,255,255,0.05)]" />
                    )}
                    <span className="text-[9px] uppercase tracking-widest text-stone-ghost font-bold font-mono block mb-1">{step.label}</span>
                    <p className="text-stone-dim text-[13px] leading-relaxed font-light">{step.text}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── BENTO SHOWER GRID ────────────────────────────── */}
      <section id="features" className="py-40 relative px-6">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-[11px] uppercase tracking-widest text-gold font-bold font-mono">Workspace Architecture</span>
            <h2 className="text-3xl sm:text-5xl font-sans font-light tracking-tight">The complete reasoning stack</h2>
            <p className="text-stone-muted text-sm sm:text-base font-light max-w-lg mx-auto">Every module built with mathematical alignment to clarify and strengthen individual reasoning.</p>
          </div>

          {/* Asymmetrical Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bento 1: Dialectics (Spans 2 columns on desktop) */}
            <div className="md:col-span-2 glass rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[#0C0C0E] p-8 flex flex-col justify-between shadow-[0_12px_30px_rgba(0,0,0,0.4)] aspect-[4/3] md:aspect-auto">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[rgba(201,168,76,0.06)] border border-[rgba(201,168,76,0.15)] flex items-center justify-center text-gold">
                  <Brain className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-medium text-stone">The Dialectic Engine</h3>
                <p className="text-stone-muted text-sm font-light leading-relaxed max-w-sm">Engage across 7 formal modes, including Socratic Inquiry and Devil&apos;s Advocate, to probe constraints, bounds, and validity.</p>
              </div>

              {/* Graphical insert */}
              <div className="border border-[rgba(255,255,255,0.04)] bg-[#08080A] rounded-xl p-4 mt-6 flex justify-between items-center text-[10px] font-mono text-stone-ghost">
                <div className="space-y-1">
                  <span>Structured Debate</span>
                  <div className="w-32 h-1 bg-[rgba(255,255,255,0.04)] rounded"><div className="w-3/4 h-full bg-gold rounded" /></div>
                </div>
                <div className="space-y-1">
                  <span>Devil&apos;s Advocate</span>
                  <div className="w-32 h-1 bg-[rgba(255,255,255,0.04)] rounded"><div className="w-1/2 h-full bg-[#6B8DC4] rounded" /></div>
                </div>
              </div>
            </div>

            {/* Bento 2: Cognitive Metrics */}
            <div className="glass rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[#0C0C0E] p-8 flex flex-col justify-between shadow-[0_12px_30px_rgba(0,0,0,0.4)]">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[rgba(74,111,165,0.06)] border border-[rgba(74,111,165,0.15)] flex items-center justify-center text-[#6B8DC4]">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-medium text-stone">Rigor Metrics</h3>
                <p className="text-stone-muted text-sm font-light leading-relaxed">Continuous scoring across logical coherence, clarity, emotional bias, and thesis development.</p>
              </div>

              {/* Graphic wheel */}
              <div className="mt-8 flex justify-center items-center">
                <div className="w-24 h-24 rounded-full border border-dashed border-[rgba(255,255,255,0.08)] flex items-center justify-center relative">
                  <div className="w-16 h-16 rounded-full border border-[rgba(201,168,76,0.2)] flex items-center justify-center text-xs font-mono text-gold font-bold">81%</div>
                  <div className="absolute top-0 right-2 w-2 h-2 rounded-full bg-gold" />
                </div>
              </div>
            </div>

            {/* Bento 3: Fallacy Shield */}
            <div className="glass rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[#0C0C0E] p-8 flex flex-col justify-between shadow-[0_12px_30px_rgba(0,0,0,0.4)]">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[rgba(139,58,58,0.06)] border border-[rgba(139,58,58,0.15)] flex items-center justify-center text-[#C97070]">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-medium text-stone">Fallacy Detection</h3>
                <p className="text-stone-muted text-sm font-light leading-relaxed">Real-time warning notifications when logical leaps, ad hominem attacks, or circular justifications are processed.</p>
              </div>

              <div className="mt-6 p-3 rounded-lg border border-[rgba(139,58,58,0.15)] bg-[rgba(139,58,58,0.02)] text-[10px] font-mono text-stone-ghost">
                <span className="text-[#C97070] font-bold">CIRCULAR REASONING</span>
                <p className="mt-1 font-light text-[9.5px]">Claiming the thesis is true because the thesis implies itself.</p>
              </div>
            </div>

            {/* Bento 4: Belief Mapping (Spans 2 columns on desktop) */}
            <div className="md:col-span-2 glass rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[#0C0C0E] p-8 flex flex-col justify-between shadow-[0_12px_30px_rgba(0,0,0,0.4)] aspect-[4/3] md:aspect-auto">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[rgba(201,168,76,0.06)] border border-[rgba(201,168,76,0.15)] flex items-center justify-center text-gold">
                  <Atom className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-medium text-stone">Axiomatic Mapping</h3>
                <p className="text-stone-muted text-sm font-light leading-relaxed max-w-sm">Watch your values, beliefs, and arguments visualised as interactive node hierarchies connecting premises to primary roots.</p>
              </div>

              {/* Graphic tree */}
              <div className="border border-[rgba(255,255,255,0.04)] bg-[#08080A] rounded-xl p-4 mt-6 space-y-3 font-mono text-[9px] text-stone-ghost relative overflow-hidden">
                <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-stone-muted" /> Thesis claim</div>
                <div className="pl-4 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#6B8DC4]" /> Assumption level</div>
                <div className="pl-8 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-gold" /> Axiomatic foundation</div>
                <div className="absolute right-6 bottom-4 text-[10px] font-light text-stone-ghost">Tree Depth: 3 layers</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SIMPLE PRICING ──────────────────────────────── */}
      <section className="py-40 border-t border-[rgba(255,255,255,0.05)] bg-[#050507]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <span className="text-[11px] uppercase tracking-widest text-gold font-bold font-mono">Pricing Structure</span>
            <h2 className="text-3xl sm:text-5xl font-sans font-light tracking-tight">Flexible tiers for logical scaling</h2>
            <p className="text-stone-muted text-sm sm:text-base font-light max-w-md mx-auto">Start with core tools and expand your dialectic space as needed.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto items-stretch">
            {[
              { name: "Free Edition", price: "$0", desc: "Core reasoning tools for active practitioners", features: ["3 debates / day", "Standard Socratic mode", "Axiom deconstruction", "7-day session log"], cta: "Access Free Workspace" },
              { name: "Pro Plan", price: "$19", desc: "Unlocking advanced engines, models, and trees", features: ["Unlimited debates", "Interactive belief trees", "All 7 dialectic modes", "Cognitive PDF exports", "Logic fallacy warnings"], cta: "Unlock Pro Workspace", featured: true },
              { name: "Enterprise", price: "Custom", desc: "For research, debate squads, and corporate stress tests", features: ["Dedicated model schemas", "Custom persona tuning", "Team workspace maps", "SLA support options"], cta: "Inquire Custom" }
            ].map(plan => (
              <div 
                key={plan.name}
                className={`glass rounded-2xl p-6 flex flex-col justify-between shadow-[0_12px_24px_rgba(0,0,0,0.3)] relative ${
                  plan.featured 
                    ? "border-gold bg-[rgba(201,168,76,0.02)] shadow-[0_20px_40px_rgba(201,168,76,0.03)]" 
                    : "border-[rgba(255,255,255,0.05)] bg-[#0C0C0E]"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-[#0B0B0D] font-mono text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">
                    Recommended Workspace
                  </div>
                )}
                <div>
                  <div className="text-[12px] font-mono text-stone-ghost uppercase tracking-wider mb-1">{plan.name}</div>
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="text-[36px] font-sans font-light tracking-tight text-white">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-stone-ghost text-xs">/mo</span>}
                  </div>
                  <p className="text-stone-muted text-xs font-light leading-relaxed mb-6">{plan.desc}</p>
                  
                  <div className="h-px bg-[rgba(255,255,255,0.04)] mb-6" />
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-xs text-stone-dim font-light">
                        <Check className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href="/sign-up" className="mt-auto">
                  <button className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    plan.featured
                      ? "bg-white text-black hover:bg-white/90"
                      : "bg-[rgba(255,255,255,0.03)] text-stone border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)]"
                  }`}>
                    {plan.cta}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────── */}
      <section className="py-40 relative px-6">
        <div className="max-w-2xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[11px] uppercase tracking-widest text-gold font-bold font-mono">Fidelity & Alignment</span>
            <h2 className="text-3xl sm:text-4xl font-sans font-light tracking-tight">Got questions?</h2>
            <p className="text-stone-muted text-sm font-light max-w-sm mx-auto">Standard details regarding operations, mechanics, and account billing.</p>
          </div>
          <div className="border border-[rgba(255,255,255,0.05)] rounded-2xl bg-[#0C0C0E] overflow-hidden p-2">
            <Accordion items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────── */}
      <section className="py-40 relative px-6 border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl border border-[rgba(255,255,255,0.06)] bg-gradient-to-br from-[#0C0C0E] to-[#08080A] p-12 sm:p-24 text-center relative overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_-10%,rgba(201,168,76,0.04),transparent_60%)] pointer-events-none" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl sm:text-6xl font-sans font-light tracking-tight">Begin the examined life.</h2>
              <p className="text-stone-muted text-sm sm:text-base font-light max-w-sm mx-auto leading-relaxed">The unexamined claim is not worth maintaining. Pressure-test your thesis today.</p>
              <div className="pt-4">
                <Link href="/sign-up">
                  <Button variant="primary" size="lg" className="rounded-full bg-white text-black hover:bg-white/90 border-none px-8 font-medium py-3.5">
                    Open Free Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
