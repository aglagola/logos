"use client";

import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { type Message, type TurnScores, type Fallacy, DEBATE_MODES, type DebateMode, type AIDifficulty, type DebateSide, FALLACY_LABELS } from "@/types";
import { Send, AlertTriangle, Brain, Zap, Star, RotateCcw, ChevronDown } from "lucide-react";

function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-[11px] text-stone-ghost uppercase tracking-wide">{label}</span>
        <span className="text-[12px] font-semibold" style={{ color }}>{value}</span>
      </div>
      <div className="h-1 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

function DebateSessionInner() {
  const params = useSearchParams();
  const topic = params.get("topic") || "The nature of consciousness";
  const mode = (params.get("mode") as DebateMode) || "ai_vs_user";
  const side = (params.get("side") as DebateSide) || "for";
  const difficulty = (params.get("difficulty") as AIDifficulty) || "intermediate";

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [lastScores, setLastScores] = useState<TurnScores | null>(null);
  const [lastFallacies, setLastFallacies] = useState<Fallacy[]>([]);
  const [round, setRound] = useState(1);
  const [elapsed, setElapsed] = useState(0);
  const [showScores, setShowScores] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Seed opening message
  useEffect(() => {
    const intro: Message = {
      id: "intro",
      session_id: "demo",
      role: "assistant",
      content: `The proposition before us: **"${topic}"**\n\nYou have taken the position ${side === "for" ? "in favor" : "against"} this claim. I will engage you rigorously, without mercy but with intellectual integrity.\n\nState your opening argument.`,
      created_at: new Date().toISOString(),
    };
    setMessages([intro]);
  }, [topic, side]);

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const sendMessage = useCallback(async () => {
    if (!input.trim() || streaming) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      session_id: "demo",
      role: "user",
      content: input,
      created_at: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setStreaming(true);
    setRound(r => r + 1);

    // Stream AI response
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      session_id: "demo",
      role: "assistant",
      content: "",
      created_at: new Date().toISOString(),
    };
    setMessages(prev => [...prev, aiMsg]);

    try {
      const res = await fetch("/api/debate/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })), mode, side, difficulty, topic }),
      });
      if (!res.ok || !res.body) throw new Error("Stream failed");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        // Extract clean content (strip score/fallacy blocks for display)
        const display = full.replace(/```scores[\s\S]*?```/g, "").replace(/```fallacies[\s\S]*?```/g, "").trim();
        setMessages(prev => prev.map(m => m.id === aiMsg.id ? { ...m, content: display } : m));
      }
      // Parse scores
      const scoreMatch = full.match(/```scores\n([\s\S]*?)\n```/);
      if (scoreMatch) {
        try { setLastScores(JSON.parse(scoreMatch[1])); setShowScores(true); } catch {}
      }
      const fallacyMatch = full.match(/```fallacies\n([\s\S]*?)\n```/);
      if (fallacyMatch) {
        try { setLastFallacies(JSON.parse(fallacyMatch[1])); } catch {}
      }
    } catch {
      setMessages(prev => prev.map(m => m.id === aiMsg.id ? { ...m, content: "A network error occurred. Please try again." } : m));
    } finally {
      setStreaming(false);
    }
  }, [input, streaming, messages, mode, side, difficulty, topic]);

  const isUserTurn = !streaming;
  const modeLabel = DEBATE_MODES[mode]?.label || mode;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left: User Panel */}
      <div className={`flex-1 flex flex-col debate-panel ${isUserTurn ? "debate-panel-active-user" : "debate-panel-user"} m-4 mr-2 transition-all duration-500`}>
        <div className="p-4 border-b border-[rgba(201,168,76,0.1)] flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gold animate-pulse-glow" />
          <span className="text-gold text-[13px] font-semibold">Your Position</span>
          <Badge variant="gold" size="sm">{side === "for" ? "For" : "Against"}</Badge>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.filter(m => m.role === "user").map(msg => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <div className="bubble-user text-stone-dim text-[14px] leading-relaxed whitespace-pre-wrap">{msg.content}</div>
            </motion.div>
          ))}
        </div>
        <div className="p-4 border-t border-[rgba(201,168,76,0.08)]">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder={isUserTurn ? "State your argument…" : "Awaiting AI response…"}
            disabled={!isUserTurn}
            className="thought-chamber input-base w-full text-[14px] mb-3"
            rows={3}
          />
          <Button variant="primary" onClick={sendMessage} loading={streaming} disabled={!input.trim()} icon={<Send className="w-4 h-4" />} className="w-full justify-center">
            Submit Argument
          </Button>
        </div>
      </div>

      {/* Center: HUD */}
      <div className="w-48 flex flex-col gap-3 py-4 flex-shrink-0">
        {/* Topic */}
        <div className="glass rounded-xl p-3 text-center">
          <div className="text-[10px] text-stone-ghost uppercase tracking-widest mb-1">Topic</div>
          <div className="text-stone text-[11px] leading-snug font-medium">{topic.slice(0, 60)}{topic.length > 60 ? "…" : ""}</div>
        </div>
        {/* Stats */}
        <div className="glass rounded-xl p-3 space-y-2.5">
          <div className="flex justify-between">
            <span className="text-stone-ghost text-[11px]">Round</span>
            <span className="text-gold font-bold text-[13px]">{round}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-ghost text-[11px]">Time</span>
            <span className="text-stone text-[12px] font-mono">{formatTime(elapsed)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-ghost text-[11px]">Mode</span>
            <span className="text-[#6B8DC4] text-[11px] font-medium text-right leading-tight">{modeLabel}</span>
          </div>
        </div>
        {/* Scores */}
        <AnimatePresence>
          {showScores && lastScores && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass rounded-xl p-3 space-y-2">
              <div className="text-[10px] text-stone-ghost uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Brain className="w-3 h-3 text-gold" /> Your Scores
              </div>
              <ScoreBar label="Logic" value={lastScores.logic} color="#C9A84C" />
              <ScoreBar label="Persuasion" value={lastScores.persuasion} color="#6B8DC4" />
              <ScoreBar label="Clarity" value={lastScores.clarity} color="#6BA880" />
              <ScoreBar label="Nuance" value={lastScores.nuance} color="#A07840" />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Fallacies */}
        <AnimatePresence>
          {lastFallacies.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {lastFallacies.map((f, i) => (
                <div key={i} className="fallacy-alert mb-2">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <AlertTriangle className="w-3 h-3 text-[#C97070]" />
                    <span className="text-[11px] font-semibold text-[#C97070]">{f.label}</span>
                  </div>
                  <p className="text-[10px] text-stone-muted leading-relaxed">{f.description}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right: AI Panel */}
      <div className={`flex-1 flex flex-col debate-panel ${!isUserTurn ? "debate-panel-active-ai" : "debate-panel-ai"} m-4 ml-2 transition-all duration-500`}>
        <div className="p-4 border-b border-[rgba(74,111,165,0.1)] flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${streaming ? "bg-[#6B8DC4] animate-pulse" : "bg-[rgba(74,111,165,0.4)]"}`} />
          <span className="text-[#6B8DC4] text-[13px] font-semibold">Logos AI</span>
          <Badge variant="blue" size="sm">{difficulty}</Badge>
          {streaming && <span className="text-stone-ghost text-[11px] ml-auto animate-pulse">Formulating…</span>}
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.filter(m => m.role === "assistant").map((msg, idx) => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <div className={`bubble-ai text-stone-dim text-[14px] leading-relaxed whitespace-pre-wrap ${streaming && idx === messages.filter(m => m.role === "assistant").length - 1 ? "streaming-cursor" : ""}`}>
                {msg.content || <span className="text-stone-ghost italic">Thinking…</span>}
              </div>
            </motion.div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}

export default function DebateSessionPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center"><span className="text-stone-muted">Loading arena…</span></div>}>
      <DebateSessionInner />
    </Suspense>
  );
}
