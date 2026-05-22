"use client";

import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { type Message, type TurnScores, type Fallacy, DEBATE_MODES, type DebateMode, type AIDifficulty, type DebateSide, FALLACY_LABELS } from "@/types";
import { Send, AlertTriangle, Brain, Zap, Clock, ShieldAlert, Sparkles } from "lucide-react";

function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-[10px] font-mono tracking-wider text-stone-muted">
        <span>{label}</span>
        <span className="font-semibold text-stone">{value}%</span>
      </div>
      <div className="h-1.5 bg-[rgba(255,255,255,0.03)] rounded-full overflow-hidden border border-[rgba(255,255,255,0.02)]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color} 0%, ${color}CC 100%)` }}
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
    <div className="flex h-screen w-full overflow-hidden bg-[#0B0B0D]">
      {/* Left Area: Chronological Socratic Chat Feed */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Topic Header Banner */}
        <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(13,13,16,0.3)] backdrop-blur-md flex items-center justify-between flex-shrink-0">
          <div className="min-w-0">
            <span className="text-[10px] uppercase tracking-widest text-gold font-bold font-mono">Dialectic Topic</span>
            <h1 className="text-stone text-[14px] font-medium truncate mt-0.5 max-w-xl">
              {topic}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="stone" size="sm" className="capitalize">
              {side === "for" ? "Defending Thesis" : "Opposing Thesis"}
            </Badge>
          </div>
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 scrollbar-thin">
          <AnimatePresence initial={false}>
            {messages.map((msg) => {
              const isAI = msg.role === "assistant";
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${isAI ? "justify-start" : "justify-end"}`}
                >
                  <div className={`max-w-[75%] sm:max-w-[70%] space-y-1.5`}>
                    {/* Role Label */}
                    <div className={`flex items-center gap-2 text-[10px] uppercase tracking-wider font-semibold font-mono ${isAI ? "text-[#6B8DC4] justify-start" : "text-gold justify-end"}`}>
                      {isAI ? (
                        <>
                          <Brain className="w-3 h-3" />
                          <span>Logos AI ({difficulty})</span>
                        </>
                      ) : (
                        <>
                          <span>You ({side === "for" ? "Pro" : "Con"})</span>
                        </>
                      )}
                    </div>

                    {/* Chat Bubble */}
                    <div className={isAI ? "bubble-ai" : "bubble-user"}>
                      <p className={`text-[14px] leading-relaxed text-stone-dim whitespace-pre-wrap ${streaming && msg.id === messages[messages.length - 1]?.id && isAI ? "streaming-cursor" : ""}`}>
                        {msg.content || <span className="text-stone-ghost italic">Tracing argument...</span>}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Floating Input Area */}
        <div className="p-6 border-t border-[rgba(255,255,255,0.05)] bg-[rgba(13,13,16,0.3)] backdrop-blur-md flex-shrink-0">
          <div className="max-w-3xl mx-auto relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder={isUserTurn ? "State your argument..." : "Awaiting response..."}
              disabled={!isUserTurn}
              className="thought-chamber input-base w-full pr-14 text-[14px]"
              rows={2}
            />
            <div className="absolute right-3.5 bottom-3.5">
              <Button
                variant="primary"
                onClick={sendMessage}
                loading={streaming}
                disabled={!input.trim() || !isUserTurn}
                icon={<Send className="w-3.5 h-3.5" />}
                className="rounded-lg p-2.5 min-w-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Area: Analytical HUD Sidebar */}
      <div className="w-80 border-l border-[rgba(255,255,255,0.05)] bg-[#0D0D10] flex flex-col h-full overflow-y-auto p-6 space-y-6 flex-shrink-0">
        
        {/* Session Info Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-stone-ghost font-bold">Analytics Panel</span>
            <div className="flex items-center gap-1.5 text-stone-muted text-xs">
              <Clock className="w-3.5 h-3.5 text-stone-ghost" />
              <span className="font-mono">{formatTime(elapsed)}</span>
            </div>
          </div>
          
          <div className="glass rounded-xl border border-[rgba(255,255,255,0.05)] p-4 space-y-3 bg-[rgba(17,17,20,0.4)]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-muted">Rigor Mode</span>
              <span className="text-[#6B8DC4] font-medium">{modeLabel}</span>
            </div>
            <div className="h-px bg-[rgba(255,255,255,0.04)]" />
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-muted">Round Count</span>
              <span className="text-gold font-mono font-bold">{round}</span>
            </div>
          </div>
        </div>

        {/* Real-time Scores Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-[10px] uppercase tracking-widest text-stone-ghost font-bold">Cognitive Scoring</span>
          </div>

          <div className="glass rounded-xl border border-[rgba(255,255,255,0.05)] p-4 space-y-4 bg-[rgba(17,17,20,0.4)]">
            {lastScores ? (
              <>
                <ScoreBar label="Logic Rigor" value={lastScores.logic} color="#C9A84C" />
                <ScoreBar label="Persuasiveness" value={lastScores.persuasion} color="#4A6FA5" />
                <ScoreBar label="Semantic Clarity" value={lastScores.clarity} color="#4A7C59" />
                <ScoreBar label="Perspective Nuance" value={lastScores.nuance} color="#A07840" />
              </>
            ) : (
              <div className="text-center py-6">
                <Brain className="w-8 h-8 text-stone-ghost mx-auto mb-2 opacity-50" />
                <p className="text-stone-muted text-xs font-light">Submit an argument to initiate cognitive metrics.</p>
              </div>
            )}
          </div>
        </div>

        {/* Fallacies Warning Section */}
        <div className="space-y-3 flex-1 flex flex-col justify-end">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-3.5 h-3.5 text-[#C97070]" />
            <span className="text-[10px] uppercase tracking-widest text-[#C97070] font-bold">Rigor Anomalies</span>
          </div>

          <div className="flex-1 min-h-[120px] overflow-y-auto space-y-3 pr-1">
            {lastFallacies.length > 0 ? (
              lastFallacies.map((f, i) => (
                <div key={i} className="fallacy-alert space-y-1 animate-fade-in">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#C97070]" />
                    <span className="text-[11px] font-semibold text-[#C97070] uppercase font-mono tracking-wider">{f.label}</span>
                  </div>
                  <p className="text-[11px] text-stone-muted leading-relaxed font-light">{f.description}</p>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center border border-dashed border-[rgba(255,255,255,0.04)] rounded-xl p-4 text-center">
                <span className="text-xs text-stone-ghost">No fallacies identified.</span>
                <p className="text-[10px] text-stone-ghost mt-0.5">Logical structure remains pristine.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DebateSessionPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center bg-[#0B0B0D]"><span className="text-stone-muted font-light">Entering Dialectic Arena...</span></div>}>
      <DebateSessionInner />
    </Suspense>
  );
}
