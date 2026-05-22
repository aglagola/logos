"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { type AxiomAnalysis } from "@/types";
import { Atom, ChevronDown, ChevronRight, AlertTriangle, Layers, Brain, GitBranch, Zap } from "lucide-react";

const EXAMPLE_INPUT = "People should simply work harder to succeed.";

const LAYERS = [
  { key: "surface_claim", label: "Surface Claim", icon: Layers, depth: 0, color: "stone", description: "What is explicitly stated" },
  { key: "assumptions", label: "Supporting Assumptions", icon: ChevronDown, depth: 1, color: "blue", description: "What must be true for this to hold" },
  { key: "axioms", label: "Core Axioms", icon: Atom, depth: 2, color: "gold", description: "The foundational beliefs beneath" },
  { key: "counter_axioms", label: "Counter-Axioms", icon: GitBranch, depth: 3, color: "blue", description: "Axioms leading to opposite conclusions" },
  { key: "contradictions", label: "Internal Contradictions", icon: AlertTriangle, depth: 4, color: "danger", description: "Where the reasoning breaks against itself" },
  { key: "biases", label: "Detected Biases", icon: Brain, depth: 5, color: "gold", description: "Cognitive and cultural filters at work" },
];

function DepthLayer({ layer, data, open, onToggle }: {
  layer: typeof LAYERS[0];
  data: unknown;
  open: boolean;
  onToggle: () => void;
}) {
  const isEmpty = !data || (Array.isArray(data) && data.length === 0);
  const colorMap = {
    stone: { text: "text-stone", border: "border-[rgba(232,228,220,0.1)]", bg: "bg-[rgba(232,228,220,0.03)]", badge: "stone" as const },
    gold: { text: "text-gold", border: "border-[rgba(201,168,76,0.15)]", bg: "bg-[rgba(201,168,76,0.04)]", badge: "gold" as const },
    blue: { text: "text-[#6B8DC4]", border: "border-[rgba(74,111,165,0.15)]", bg: "bg-[rgba(74,111,165,0.04)]", badge: "blue" as const },
    danger: { text: "text-[#C97070]", border: "border-[rgba(139,58,58,0.2)]", bg: "bg-[rgba(139,58,58,0.04)]", badge: "danger" as const },
  };
  const c = colorMap[layer.color as keyof typeof colorMap];
  const Icon = layer.icon;
  const indent = layer.depth * 20;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: layer.depth * 0.08 }}
      style={{ marginLeft: indent }}
      className={`rounded-xl border ${c.border} ${c.bg} overflow-hidden mb-3`}
    >
      <button
        onClick={onToggle}
        disabled={isEmpty}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-[rgba(255,255,255,0.02)] transition-colors"
      >
        <Icon className={`w-4 h-4 flex-shrink-0 ${c.text}`} />
        <div className="flex-1 min-w-0">
          <span className={`text-[13px] font-semibold ${c.text}`}>{layer.label}</span>
          <span className="text-stone-ghost text-[12px] ml-2">{layer.description}</span>
        </div>
        {!isEmpty && (
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className={`w-4 h-4 ${c.text}`} />
          </motion.div>
        )}
        {isEmpty && <span className="text-stone-ghost text-[11px]">—</span>}
      </button>
      <AnimatePresence initial={false}>
        {open && !isEmpty && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-4 pb-4 border-t border-[rgba(255,255,255,0.04)]">
              <div className="pt-3 space-y-2">
                {layer.key === "surface_claim" && typeof data === "string" && (
                  <p className="text-stone text-[14px] leading-relaxed italic">&ldquo;{data}&rdquo;</p>
                )}
                {layer.key === "assumptions" && Array.isArray(data) && data.map((a: { id: string; text: string; confidence: number }, i: number) => (
                  <div key={i} className="flex items-start gap-2">
                    <ChevronRight className="w-3 h-3 text-stone-ghost mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-stone-dim text-[13px]">{a.text}</span>
                      <Badge variant="stone" size="sm" className="ml-2">confidence {Math.round(a.confidence * 100)}%</Badge>
                    </div>
                  </div>
                ))}
                {(layer.key === "axioms" || layer.key === "counter_axioms") && Array.isArray(data) && data.map((a: { id: string; text: string; category: string; strength: string }, i: number) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${layer.key === "axioms" ? "bg-gold" : "bg-[#6B8DC4]"}`} />
                    <div>
                      <span className="text-stone-dim text-[13px]">{a.text}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={layer.key === "axioms" ? "gold" : "blue"} size="sm">{a.category}</Badge>
                        <Badge variant="stone" size="sm">{a.strength}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
                {layer.key === "contradictions" && Array.isArray(data) && data.map((c: { axiom_a: string; axiom_b: string; description: string; severity: string }, i: number) => (
                  <div key={i} className="fallacy-alert">
                    <div className="text-[12px] font-semibold text-[#C97070] mb-1">{c.description}</div>
                    <div className="text-[11px] text-stone-muted">
                      <span className="line-through opacity-50">{c.axiom_a}</span> contradicts <span className="line-through opacity-50">{c.axiom_b}</span>
                    </div>
                    <Badge variant="danger" size="sm" className="mt-1">{c.severity}</Badge>
                  </div>
                ))}
                {layer.key === "biases" && Array.isArray(data) && data.map((b: { name: string; description: string; category: string }, i: number) => (
                  <div key={i} className="flex items-start gap-2">
                    <Brain className="w-3 h-3 text-gold mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-gold text-[13px] font-semibold">{b.name}</span>
                      <p className="text-stone-muted text-[12px] mt-0.5">{b.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AxiomPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AxiomAnalysis | null>(null);
  const [openLayers, setOpenLayers] = useState<Set<string>>(new Set());
  const [error, setError] = useState("");

  const toggleLayer = (key: string) => {
    setOpenLayers(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  async function analyze() {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    setError("");
    try {
      const res = await fetch("/api/axioms/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
      if (!res.ok) throw new Error("Analysis failed");
      const data = await res.json();
      setResult(data);
      setOpenLayers(new Set(["surface_claim", "assumptions", "axioms"]));
    } catch {
      setError("The analysis encountered an error. Please check your API configuration.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[rgba(201,168,76,0.1)] flex items-center justify-center">
            <Atom className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h1 className="font-serif text-[32px] text-stone">Axiom Analysis</h1>
            <p className="text-stone-muted text-[14px]">Expose the foundations beneath any belief.</p>
          </div>
        </div>
      </motion.div>

      {/* Input */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
        <div className="relative">
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[rgba(201,168,76,0.1)] to-[rgba(74,111,165,0.1)] pointer-events-none" />
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Enter any belief, argument, opinion, or philosophical stance…"
            className="thought-chamber input-base w-full relative z-10"
            rows={4}
          />
        </div>
        <div className="flex items-center justify-between mt-3">
          <button
            onClick={() => setInput(EXAMPLE_INPUT)}
            className="text-[12px] text-stone-ghost hover:text-stone-muted transition-colors"
          >
            Use example →
          </button>
          <Button
            variant="primary"
            onClick={analyze}
            loading={loading}
            disabled={!input.trim()}
            icon={<Zap className="w-4 h-4" />}
          >
            {loading ? "Extracting foundations…" : "Expose the Foundation"}
          </Button>
        </div>
      </motion.div>

      {/* Error */}
      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fallacy-alert mb-6">
          <p className="text-[#C97070] text-[13px]">{error}</p>
        </motion.div>
      )}

      {/* Loading animation */}
      {loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-2 border-[rgba(201,168,76,0.1)]" />
            <div className="absolute inset-0 rounded-full border-2 border-t-gold animate-spin" />
            <div className="absolute inset-2 rounded-full border border-[rgba(74,111,165,0.2)] animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
          </div>
          <p className="text-stone-muted text-[14px]">Tracing the assumption…</p>
          <p className="text-stone-ghost text-[12px] mt-1">Descending through the layers of thought</p>
        </motion.div>
      )}

      {/* Results */}
      <AnimatePresence>
        {result && !loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="divider-gold flex-1" />
              <span className="text-gold text-[11px] tracking-widest uppercase font-semibold">Analysis Complete</span>
              <div className="divider-gold flex-1" />
            </div>

            {/* Value hierarchy & worldview summary */}
            {result.worldview_pattern && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass-gold rounded-xl p-4 mb-5">
                <div className="text-[11px] text-gold tracking-widest uppercase font-semibold mb-1.5">Worldview Pattern</div>
                <p className="text-stone-dim text-[14px] leading-relaxed">{result.worldview_pattern}</p>
                {result.value_hierarchy?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {result.value_hierarchy.map((v, i) => (
                      <Badge key={i} variant="gold" size="sm">
                        {i + 1}. {v}
                      </Badge>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Depth layers */}
            <div>
              {LAYERS.map(layer => {
                const layerData = layer.key === "surface_claim"
                  ? result.surface_claim
                  : result[layer.key as keyof AxiomAnalysis];
                return (
                  <DepthLayer
                    key={layer.key}
                    layer={layer}
                    data={layerData}
                    open={openLayers.has(layer.key)}
                    onToggle={() => toggleLayer(layer.key)}
                  />
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {!result && !loading && !error && (
        <div className="text-center py-16">
          <div className="w-12 h-12 rounded-full bg-[rgba(201,168,76,0.06)] border border-[rgba(201,168,76,0.1)] flex items-center justify-center mx-auto mb-4">
            <Atom className="w-6 h-6 text-stone-ghost" />
          </div>
          <p className="text-stone-ghost text-[14px]">Enter a belief above to begin the analysis.</p>
          <p className="text-stone-ghost text-[12px] mt-1">Every argument has roots. This is how you find them.</p>
        </div>
      )}
    </div>
  );
}
