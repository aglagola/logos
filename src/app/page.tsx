"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowRight, Brain, Atom, GitBranch, Shield, Zap, BarChart3, ChevronRight, Star } from "lucide-react";
import { useRef } from "react";

const FEATURES = [
  { icon: Brain, label: "Debate Arena", desc: "Real-time AI debate across 7 distinct modes. Structured, Socratic, Devil's Advocate, and more.", color: "gold" },
  { icon: Atom, label: "Axiom Extraction", desc: "Reveal the hidden foundations beneath any belief. Surface assumptions you didn't know you held.", color: "blue" },
  { icon: GitBranch, label: "Contradiction Detection", desc: "Identify where your reasoning breaks down internally. Map logical conflicts with precision.", color: "gold" },
  { icon: Shield, label: "Fallacy Detection", desc: "Real-time identification of 10+ logical fallacies as you argue. Learn by seeing your patterns.", color: "blue" },
  { icon: BarChart3, label: "Cognitive Scoring", desc: "Track logic, persuasion, clarity, and nuance across every debate. Watch your reasoning evolve.", color: "gold" },
  { icon: Zap, label: "AI Coach", desc: "Post-debate analysis from a philosophical mentor. Targeted feedback to accelerate your improvement.", color: "blue" },
];

const TESTIMONIALS = [
  { quote: "Logos made me realize I had been arguing from assumptions I never examined. That's intellectually humbling and transformative.", author: "Dr. James Harrington", role: "Professor of Philosophy" },
  { quote: "I used Logos to stress-test our company's strategic thesis before a board presentation. It found three contradictions we hadn't noticed.", author: "Sarah Chen", role: "Chief Strategy Officer" },
  { quote: "The axiom extraction feature is unlike anything I've seen. It doesn't just argue — it reveals the architecture of thought.", author: "Marcus Webb", role: "Independent Scholar" },
];

const FAQ_ITEMS = [
  { question: "What makes Logos different from a regular AI chatbot?", answer: "Logos is not designed to chat — it's designed to think with you. Every interaction is structured around logical rigor: extracting axioms, detecting fallacies, scoring reasoning quality, and revealing hidden assumptions. It's a cognitive tool, not a conversational assistant." },
  { question: "What are the debate modes?", answer: "Logos offers 7 modes: Structured Debate (AI takes the opposing side), Devil's Advocate (AI challenges whatever you believe), Socratic Inquiry (AI only asks questions), First Principles (deconstruct to foundations), Philosophy Mode (draws on major philosophical traditions), Executive Objection (simulate boardroom pressure), and AI vs AI (watch two perspectives debate autonomously)." },
  { question: "What is axiom extraction?", answer: "Axiom extraction is a process that takes any statement — a belief, opinion, or argument — and reverse-engineers it down to its most fundamental assumptions. These are the premises you've never questioned, the values you've never named, the logical foundations your worldview rests on." },
  { question: "Can I export my debate transcripts and analyses?", answer: "Yes — Pro and Enterprise users can export full debate transcripts, axiom analyses, cognitive reports, and belief maps as PDF or structured JSON." },
  { question: "Is my data private?", answer: "Absolutely. Your debates and analyses are private by default. We do not use your data to train AI models. Enterprise users have additional data sovereignty options." },
];

const DEMO_TRANSCRIPT = [
  { role: "user", text: "People who work hard will always succeed." },
  { role: "ai", text: "That claim rests on an unstated premise: that effort and outcome are causally linked in a linear, meritocratic way. But what axiom justifies this? Does the claim account for structural constraints on opportunity?" },
  { role: "user", text: "Yes — anyone can overcome obstacles with enough determination." },
  { role: "ai", text: "Notice you've introduced a second axiom: that individual agency is always sufficient to overcome systemic conditions. These two axioms — meritocracy and unlimited agency — are doing enormous work. Are you prepared to defend them?" },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <div className="page-wrapper noise-overlay">
      {/* ── HERO ───────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 grid-overlay opacity-40" />
        {/* Orbs */}
        <div className="orb orb-gold absolute w-[600px] h-[600px] top-[-100px] left-[-100px] animate-slow-drift" style={{ animationDuration: "25s" }} />
        <div className="orb orb-blue absolute w-[500px] h-[500px] bottom-[-50px] right-[-100px] animate-slow-drift" style={{ animationDuration: "30s", animationDelay: "-10s" }} />
        <div className="orb orb-gold absolute w-[300px] h-[300px] bottom-[20%] left-[30%] animate-slow-drift" style={{ animationDuration: "20s", animationDelay: "-5s" }} />

        {/* Floating axiom nodes */}
        {[
          { x: "15%", y: "25%", label: "Free will", delay: 0 },
          { x: "80%", y: "20%", label: "Determinism", delay: 1.5 },
          { x: "10%", y: "65%", label: "Causality", delay: 0.8 },
          { x: "75%", y: "70%", label: "Consciousness", delay: 2.2 },
          { x: "50%", y: "15%", label: "Axiom", delay: 1.1 },
        ].map((node, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.35, scale: 1 }}
            transition={{ delay: node.delay + 0.5, duration: 1 }}
            className="absolute hidden lg:block"
            style={{ left: node.x, top: node.y }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4 + i, ease: "easeInOut", delay: node.delay }}
              className="glass border border-[rgba(201,168,76,0.15)] rounded-xl px-3 py-1.5 text-[11px] text-stone-muted font-medium backdrop-blur-sm"
            >
              {node.label}
            </motion.div>
          </motion.div>
        ))}

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 text-center content-max max-w-4xl pt-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="badge badge-gold mb-6 inline-flex">
              <Star className="w-3 h-3" />
              AI-Powered Reasoning Engine
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-[56px] md:text-[80px] lg:text-[96px] leading-[1.0] tracking-tight mb-6"
          >
            <span className="text-gradient-stone">Sharpen Your Mind</span>
            <br />
            <span className="text-gradient-gold italic">Through Opposition.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-stone-muted text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto mb-12 font-light"
          >
            Debate ideas, uncover hidden assumptions, and refine your reasoning with AI. 
            An operating system for structured human thought.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/sign-up">
              <Button variant="primary" size="lg" icon={<Zap className="w-4 h-4" />}>
                Start Debating
              </Button>
            </Link>
            <Link href="/axioms">
              <Button variant="ghost" size="lg" icon={<Atom className="w-4 h-4" />}>
                Analyze My Thinking
              </Button>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-stone-ghost text-sm mt-6"
          >
            Free to start · No credit card required
          </motion.p>
        </motion.div>

        {/* Demo transcript preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 hidden md:block"
        >
          <div className="glass rounded-2xl p-5 border border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse-glow" />
              <span className="text-[11px] text-stone-ghost tracking-widest uppercase">Live Debate Preview</span>
            </div>
            <div className="space-y-3">
              {DEMO_TRANSCRIPT.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === "user" ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 + i * 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}
                >
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-xl text-[12px] leading-relaxed ${msg.role === "user" ? "bubble-user text-stone-dim" : "bubble-ai text-stone-dim"}`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FEATURES ───────────────────────────────────── */}
      <section id="features" className="py-32 relative">
        <div className="content-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-[42px] md:text-[56px] text-gradient-stone mb-4">
              The Complete Reasoning Stack
            </h2>
            <p className="text-stone-muted text-lg max-w-xl mx-auto">
              Every tool you need to think more clearly, argue more precisely, and reason more honestly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`card ${f.color === "gold" ? "card-gold" : ""} p-6 group`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${f.color === "gold" ? "bg-[rgba(201,168,76,0.1)] text-gold" : "bg-[rgba(74,111,165,0.1)] text-blue"}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-stone font-semibold text-[16px] mb-2">{f.label}</h3>
                  <p className="text-stone-muted text-[13.5px] leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────── */}
      <section id="about" className="py-20 relative">
        <div className="content-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-[40px] md:text-[52px] text-gradient-stone mb-4">
              How It Works
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Enter a belief or topic", desc: "Type any idea, belief, argument, or stance. Logos begins by understanding the full structure of what you've stated — and what you haven't." },
              { step: "02", title: "Engage or Analyze", desc: "Choose to debate the idea in real-time, extract its hidden axioms, or run a full contradictions analysis. The AI adapts to your chosen mode." },
              { step: "03", title: "Refine your reasoning", desc: "Receive scored feedback, fallacy detection, and philosophical coaching. Track your cognitive improvement across every session." },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.2)] flex items-center justify-center mx-auto mb-6">
                  <span className="text-gold font-mono text-[13px] font-bold">{s.step}</span>
                </div>
                <h3 className="text-stone font-semibold text-lg mb-3">{s.title}</h3>
                <p className="text-stone-muted text-[14px] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AXIOM DEMO ─────────────────────────────────── */}
      <section className="py-20">
        <div className="content-max">
          <div className="glass rounded-3xl p-8 md:p-12 border border-[rgba(255,255,255,0.06)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <span className="badge badge-gold mb-4 inline-flex">Signature Feature</span>
                <h2 className="font-serif text-[36px] md:text-[48px] text-gradient-stone mb-4">
                  Expose the Foundation
                </h2>
                <p className="text-stone-muted text-[15px] leading-relaxed mb-6">
                  Every argument rests on assumptions. Every assumption rests on axioms. 
                  Logos reveals the architecture beneath the surface — the beliefs you hold without knowing you hold them.
                </p>
                <Link href="/axioms">
                  <Button variant="outline-gold" icon={<ArrowRight className="w-4 h-4" />}>
                    Try Axiom Analysis
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Input Statement", text: "People should simply work harder to succeed.", depth: 0 },
                  { label: "Supporting Assumption", text: "Effort reliably produces proportional outcomes", depth: 1 },
                  { label: "Core Axiom", text: "Individual agency outweighs systemic limitations", depth: 2 },
                  { label: "Counter-Axiom", text: "Opportunity distribution is fundamentally unequal", depth: 3 },
                  { label: "Detected Bias", text: "Survivorship bias · Fundamental attribution error", depth: 4 },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`axiom-layer-${item.depth} rounded-xl p-4 border border-[rgba(255,255,255,0.05)]`}
                    style={{ marginLeft: `${item.depth * 16}px` }}
                  >
                    <div className="text-[10px] font-bold text-stone-ghost tracking-widest uppercase mb-1">{item.label}</div>
                    <div className="text-stone-dim text-[13px]">{item.text}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────── */}
      <section className="py-20">
        <div className="content-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-[40px] text-gradient-stone mb-3">What Thinkers Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card card-gold p-6"
              >
                <p className="text-stone-dim text-[14px] leading-relaxed italic mb-5">"{t.quote}"</p>
                <div>
                  <div className="text-stone font-semibold text-[13px]">{t.author}</div>
                  <div className="text-stone-ghost text-[12px] mt-0.5">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING PREVIEW ────────────────────────────── */}
      <section className="py-20">
        <div className="content-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-[40px] text-gradient-stone mb-3">Simple Pricing</h2>
            <p className="text-stone-muted">Begin free. Scale your thinking.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: "Free", price: "$0", desc: "Begin your reasoning journey", features: ["3 debates / day", "Basic axiom analysis", "Standard scoring", "Debate history (7 days)"], cta: "Get Started", variant: "default" },
              { name: "Pro", price: "$19", period: "/mo", desc: "For serious thinkers", features: ["Unlimited debates", "Advanced axiom extraction", "Belief mapping & trees", "Cognitive reports", "AI coaching", "Export transcripts", "All debate modes"], cta: "Upgrade to Pro", variant: "featured" },
              { name: "Enterprise", price: "Custom", desc: "For teams and institutions", features: ["Everything in Pro", "Team debates", "Custom AI personas", "API access", "Data sovereignty", "Dedicated support"], cta: "Contact Sales", variant: "default" },
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={plan.variant === "featured" ? "pricing-card pricing-card-featured" : "pricing-card"}
              >
                {plan.variant === "featured" && (
                  <div className="badge badge-gold mb-3 inline-flex">Most Popular</div>
                )}
                <div className="text-stone font-semibold text-[15px] mb-1">{plan.name}</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-serif text-[40px] text-gradient-gold">{plan.price}</span>
                  {plan.period && <span className="text-stone-muted text-sm">{plan.period}</span>}
                </div>
                <p className="text-stone-muted text-[13px] mb-6">{plan.desc}</p>
                <ul className="space-y-2.5 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-stone-dim text-[13px]">
                      <ChevronRight className="w-3 h-3 text-gold flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.name === "Enterprise" ? "/contact" : "/sign-up"}>
                  <Button
                    variant={plan.variant === "featured" ? "primary" : "ghost"}
                    className="w-full justify-center"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────── */}
      <section className="py-20">
        <div className="content-max max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-[40px] text-gradient-stone mb-3">Questions</h2>
          </motion.div>
          <Accordion items={FAQ_ITEMS} />
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────── */}
      <section className="py-20">
        <div className="content-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-gold rounded-3xl p-12 md:p-20 text-center border border-[rgba(201,168,76,0.15)] relative overflow-hidden"
          >
            <div className="orb orb-gold absolute w-[400px] h-[400px] top-[-100px] left-[-100px] animate-slow-drift" />
            <div className="relative z-10">
              <h2 className="font-serif text-[48px] md:text-[64px] text-gradient-stone mb-4">
                Begin the Examined Life.
              </h2>
              <p className="text-stone-muted text-lg mb-10 max-w-xl mx-auto">
                The unexamined belief is not worth holding. Start questioning with precision.
              </p>
              <Link href="/sign-up">
                <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                  Start Debating — It&apos;s Free
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
