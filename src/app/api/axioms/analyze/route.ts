import { NextRequest, NextResponse } from "next/server";
import openai from "@/lib/ai/client";
import { getAxiomSystemPrompt } from "@/lib/ai/prompts/axiom";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text?.trim()) {
      return NextResponse.json({ error: "No input text provided" }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.3,
      max_tokens: 2000,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: getAxiomSystemPrompt() },
        { role: "user", content: `Analyze this statement:\n\n"${text}"` },
      ],
    });

    const raw = completion.choices[0]?.message?.content || "{}";
    const parsed = JSON.parse(raw);

    // Add IDs and ensure structure
    const result = {
      id: crypto.randomUUID(),
      user_id: "demo",
      input_text: text,
      surface_claim: parsed.surface_claim || text,
      assumptions: (parsed.assumptions || []).map((a: Record<string, unknown>, i: number) => ({ id: `a-${i}`, ...a })),
      axioms: (parsed.axioms || []).map((a: Record<string, unknown>, i: number) => ({ id: `ax-${i}`, ...a })),
      counter_axioms: (parsed.counter_axioms || []).map((a: Record<string, unknown>, i: number) => ({ id: `ca-${i}`, ...a })),
      contradictions: parsed.contradictions || [],
      biases: parsed.biases || [],
      value_hierarchy: parsed.value_hierarchy || [],
      worldview_pattern: parsed.worldview_pattern || "",
      created_at: new Date().toISOString(),
    };

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Analysis failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
