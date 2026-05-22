import { NextRequest, NextResponse } from "next/server";
import openai from "@/lib/ai/client";
import { getDebateSystemPrompt } from "@/lib/ai/prompts/debate";
import { type DebateMode, type AIDifficulty, type DebateSide } from "@/types";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { messages, mode, side, difficulty, topic } = await req.json();

    if (!messages || !topic) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const systemPrompt = getDebateSystemPrompt(
      (mode as DebateMode) || "ai_vs_user",
      topic,
      (side as DebateSide) || "for",
      (difficulty as AIDifficulty) || "intermediate"
    );

    const stream = await openai.chat.completions.create({
      model: "gpt-4o",
      stream: true,
      max_tokens: 1200,
      temperature: 0.85,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.slice(-12), // keep last 12 messages for context
      ],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || "";
          controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
