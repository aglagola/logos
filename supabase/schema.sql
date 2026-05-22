-- =============================================
-- LOGOS — Supabase Database Schema
-- Run in Supabase SQL Editor
-- =============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users
create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  clerk_id text unique not null,
  email text not null,
  name text,
  avatar_url text,
  tier text not null default 'free' check (tier in ('free', 'pro', 'enterprise')),
  created_at timestamptz default now()
);

-- Debate Sessions
create table if not exists debate_sessions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  topic text not null,
  mode text not null,
  side text not null default 'for',
  difficulty text not null default 'intermediate',
  status text not null default 'active' check (status in ('setup', 'active', 'completed')),
  final_scores jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Messages
create table if not exists messages (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid references debate_sessions(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  scores jsonb,
  fallacies jsonb,
  created_at timestamptz default now()
);

-- Axiom Analyses
create table if not exists axiom_analyses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  input_text text not null,
  surface_claim text,
  assumptions jsonb default '[]',
  axioms jsonb default '[]',
  counter_axioms jsonb default '[]',
  contradictions jsonb default '[]',
  biases jsonb default '[]',
  value_hierarchy jsonb default '[]',
  worldview_pattern text,
  created_at timestamptz default now()
);

-- Subscriptions
create table if not exists subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text unique,
  tier text not null default 'free',
  status text not null default 'active',
  period_end timestamptz,
  created_at timestamptz default now()
);

-- RLS
alter table users enable row level security;
alter table debate_sessions enable row level security;
alter table messages enable row level security;
alter table axiom_analyses enable row level security;
alter table subscriptions enable row level security;

-- Policies (users can only see their own data)
create policy "Users own data" on users for all using (auth.uid()::text = clerk_id);
create policy "Users own sessions" on debate_sessions for all using (user_id in (select id from users where clerk_id = auth.uid()::text));
create policy "Users own messages" on messages for all using (session_id in (select id from debate_sessions where user_id in (select id from users where clerk_id = auth.uid()::text)));
create policy "Users own analyses" on axiom_analyses for all using (user_id in (select id from users where clerk_id = auth.uid()::text));
create policy "Users own subscriptions" on subscriptions for all using (user_id in (select id from users where clerk_id = auth.uid()::text));
