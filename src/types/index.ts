// ============================================================
// LOGOS — Core TypeScript Types
// ============================================================

export type UserTier = "free" | "pro" | "enterprise";

export interface User {
  id: string;
  clerk_id: string;
  email: string;
  name: string;
  avatar_url?: string;
  tier: UserTier;
  created_at: string;
}

export type DebateMode =
  | "ai_vs_user"
  | "devils_advocate"
  | "socratic"
  | "first_principles"
  | "philosophy"
  | "executive"
  | "ai_vs_ai";

export type DebateStatus = "setup" | "active" | "completed";

export type DebateSide = "for" | "against";

export type AIDifficulty = "novice" | "intermediate" | "expert" | "socratic";

export interface DebateSession {
  id: string;
  user_id: string;
  topic: string;
  mode: DebateMode;
  side: DebateSide;
  difficulty: AIDifficulty;
  status: DebateStatus;
  created_at: string;
  updated_at?: string;
  final_scores?: ScoreSummary;
}

export interface Message {
  id: string;
  session_id: string;
  role: "user" | "assistant" | "system";
  content: string;
  created_at: string;
  scores?: TurnScores;
  fallacies?: Fallacy[];
}

export interface TurnScores {
  logic: number;        // 0-100
  persuasion: number;   // 0-100
  clarity: number;      // 0-100
  nuance: number;       // 0-100
  evidence: number;     // 0-100
}

export interface ScoreSummary {
  logic: number;
  persuasion: number;
  clarity: number;
  nuance: number;
  evidence: number;
  openMindedness: number;
  emotionalStability: number;
  overall: number;
}

export type FallacyType =
  | "strawman"
  | "ad_hominem"
  | "circular_reasoning"
  | "false_dilemma"
  | "slippery_slope"
  | "appeal_to_emotion"
  | "confirmation_bias"
  | "hasty_generalization"
  | "false_cause"
  | "appeal_to_authority";

export interface Fallacy {
  type: FallacyType;
  label: string;
  description: string;
  severity: "low" | "medium" | "high";
  quote?: string;
}

export interface AxiomAnalysis {
  id: string;
  user_id: string;
  input_text: string;
  surface_claim: string;
  assumptions: Assumption[];
  axioms: Axiom[];
  counter_axioms: Axiom[];
  contradictions: Contradiction[];
  biases: Bias[];
  value_hierarchy: string[];
  worldview_pattern: string;
  created_at: string;
}

export interface Assumption {
  id: string;
  text: string;
  depth: number;
  confidence: number;
}

export interface Axiom {
  id: string;
  text: string;
  category: string;
  strength: "strong" | "moderate" | "weak";
  children?: Axiom[];
}

export interface Contradiction {
  axiom_a: string;
  axiom_b: string;
  description: string;
  severity: "minor" | "moderate" | "major";
}

export interface Bias {
  name: string;
  description: string;
  category: "cognitive" | "social" | "emotional";
}

export interface BeliefTreeNode {
  id: string;
  name: string;
  type: "claim" | "assumption" | "axiom" | "counter";
  strength?: number;
  children?: BeliefTreeNode[];
}

export interface CognitiveMetrics {
  reasoning_score: number;
  consistency_score: number;
  fallacy_frequency: number;
  strongest_categories: string[];
  debates_count: number;
  improvement_rate: number;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  tier: UserTier;
  status: "active" | "canceled" | "past_due";
  period_end: string;
}

export const DEBATE_MODES: Record<DebateMode, { label: string; description: string; icon: string; tier: UserTier }> = {
  ai_vs_user: {
    label: "Structured Debate",
    description: "Engage in formal argumentation. The AI defends a position while you challenge it.",
    icon: "⚖️",
    tier: "free",
  },
  devils_advocate: {
    label: "Devil's Advocate",
    description: "The AI argues against your position regardless of its own view, exposing weaknesses.",
    icon: "😈",
    tier: "free",
  },
  socratic: {
    label: "Socratic Inquiry",
    description: "The AI guides you through questions, revealing assumptions you didn't know you held.",
    icon: "🏛️",
    tier: "free",
  },
  first_principles: {
    label: "First Principles",
    description: "Decompose arguments to their most fundamental truths. Rebuild from the ground up.",
    icon: "⚛️",
    tier: "pro",
  },
  philosophy: {
    label: "Philosophy Mode",
    description: "Deep philosophical discourse drawing on major schools of thought across history.",
    icon: "🧠",
    tier: "pro",
  },
  executive: {
    label: "Executive Objection",
    description: "Simulate high-stakes boardroom opposition. Pressure-test ideas against sharp scrutiny.",
    icon: "💼",
    tier: "pro",
  },
  ai_vs_ai: {
    label: "AI vs AI",
    description: "Watch two AI perspectives engage autonomously. Observe the logical structure of debate.",
    icon: "🤖",
    tier: "pro",
  },
};

export const FALLACY_LABELS: Record<FallacyType, string> = {
  strawman: "Strawman",
  ad_hominem: "Ad Hominem",
  circular_reasoning: "Circular Reasoning",
  false_dilemma: "False Dilemma",
  slippery_slope: "Slippery Slope",
  appeal_to_emotion: "Appeal to Emotion",
  confirmation_bias: "Confirmation Bias",
  hasty_generalization: "Hasty Generalization",
  false_cause: "False Cause",
  appeal_to_authority: "Appeal to Authority",
};
