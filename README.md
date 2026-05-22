# Logos — AI-Powered Debate & Reasoning Platform

> *An operating system for structured human thought.*

Logos is a production-grade platform for AI-powered debate, axiom extraction, contradiction detection, and cognitive analytics. It helps users debate ideas, uncover hidden assumptions, detect fallacies, and systematically improve their reasoning.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, TypeScript, Tailwind v4 |
| Animations | Framer Motion |
| AI | OpenAI GPT-4o |
| Auth | Clerk |
| Database | Supabase (PostgreSQL) |
| Payments | Stripe |
| Deployment | Vercel |

---

## Features

- **7 Debate Modes** — Structured, Socratic, Devil's Advocate, First Principles, Philosophy, Executive, AI vs AI
- **Axiom Extraction** — 6-layer depth analysis: surface claim → assumptions → axioms → counter-axioms → contradictions → biases
- **Real-time Scoring** — Logic, Persuasion, Clarity, Nuance, Evidence per turn
- **Fallacy Detection** — 10+ logical fallacies identified inline
- **AI Coach** — Post-debate philosophical mentorship
- **Cognitive Dashboard** — Track reasoning improvement over time
- **Reasoning Radar** — 6-dimension cognitive profile visualization

---

## Quick Start

### 1. Clone & Install
```bash
git clone <your-repo>
cd logos
npm install
```

### 2. Configure Environment Variables
```bash
cp .env.example .env.local
```

Fill in these keys in `.env.local`:

| Variable | Source |
|----------|--------|
| `OPENAI_API_KEY` | [platform.openai.com](https://platform.openai.com) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project settings |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project settings |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase project settings |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | [dashboard.clerk.com](https://dashboard.clerk.com) |
| `CLERK_SECRET_KEY` | Clerk dashboard |
| `STRIPE_SECRET_KEY` | [dashboard.stripe.com](https://dashboard.stripe.com) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe dashboard |
| `STRIPE_WEBHOOK_SECRET` | From `stripe listen` or dashboard |
| `STRIPE_PRICE_PRO_MONTHLY` | Stripe product price ID |
| `STRIPE_PRICE_ENTERPRISE_MONTHLY` | Stripe product price ID |

### 3. Set Up Database
Run the schema in your Supabase SQL editor:
```bash
# Copy contents of supabase/schema.sql into Supabase → SQL Editor → Run
```

### 4. Start Development Server
```bash
npm run dev
# → http://localhost:3000
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — full cinematic hero + features + pricing |
| `/dashboard` | Cognitive metrics, quick actions, recent debates |
| `/debate` | Debate arena landing |
| `/debate/new` | 3-step debate wizard (topic → mode → config) |
| `/debate/session` | Live split-screen debate with streaming AI |
| `/axioms` | Axiom analysis — 6-layer belief deconstruction |
| `/history` | Past debates with scores and fallacy tracking |
| `/profile` | Reasoning radar chart + milestones |
| `/settings` | Account, subscription, notifications |
| `/pricing` | Free / Pro / Enterprise plans |
| `/sign-in` | Clerk auth |
| `/sign-up` | Clerk auth |

---

## API Routes

| Endpoint | Description |
|----------|-------------|
| `POST /api/debate/message` | Streaming debate response (Edge Runtime) |
| `POST /api/axioms/analyze` | Axiom extraction (JSON structured output) |
| `GET /api/stripe/checkout` | Create Stripe checkout session |

---

## Deployment (Vercel)

```bash
npm install -g vercel
vercel --prod
```

Set all environment variables in the Vercel dashboard under **Settings → Environment Variables**.

### Stripe Webhooks
After deployment:
```bash
stripe listen --forward-to https://your-app.vercel.app/api/webhooks/stripe
```

Or configure in the Stripe dashboard → Webhooks → Add endpoint.

---

## Design System

The design system is CSS-first (Tailwind v4) defined in `src/app/globals.css`:

| Token | Value |
|-------|-------|
| Background | `#0B0B0D` |
| Gold accent | `#C9A84C` |
| Stone white | `#E8E4DC` |
| Philosophical blue | `#4A6FA5` |
| Heading font | Instrument Serif |
| Body font | Inter |

---

## Architecture

```
src/
├── app/
│   ├── (app)/              ← Authenticated app shell
│   │   ├── dashboard/
│   │   ├── debate/
│   │   ├── axioms/
│   │   ├── history/
│   │   ├── profile/
│   │   └── settings/
│   ├── api/
│   │   ├── debate/message/ ← Streaming edge route
│   │   ├── axioms/analyze/ ← Axiom extraction
│   │   └── stripe/         ← Payment routes
│   ├── sign-in/
│   ├── sign-up/
│   ├── pricing/
│   ├── globals.css         ← Full design system
│   ├── layout.tsx
│   └── page.tsx            ← Landing page
├── components/
│   ├── layout/             ← Navbar, Sidebar, Footer
│   └── ui/                 ← Button, Card, Badge, Modal…
├── lib/
│   ├── ai/
│   │   ├── client.ts       ← OpenAI singleton
│   │   └── prompts/        ← Modular system prompts
│   ├── supabase.ts
│   └── stripe.ts
├── middleware.ts            ← Clerk route protection
└── types/index.ts          ← Full TypeScript type system
supabase/
└── schema.sql              ← Database schema + RLS policies
```

---

## License

MIT — Built with intention.

> *"The unexamined life is not worth living." — Socrates*
