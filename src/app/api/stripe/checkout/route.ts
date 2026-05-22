import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const PRICE_IDS: Record<string, string> = {
  pro: process.env.STRIPE_PRICE_PRO_MONTHLY || "price_pro_placeholder",
  enterprise: process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY || "price_enterprise_placeholder",
};

export async function GET(req: NextRequest) {
  const tier = req.nextUrl.searchParams.get("tier") || "pro";

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{ price: PRICE_IDS[tier], quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      metadata: { tier },
    });

    return NextResponse.redirect(session.url!);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Checkout error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
