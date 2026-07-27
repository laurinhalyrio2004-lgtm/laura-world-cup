-- ============================================================================
-- Laura World Cup — Chapter 22
-- Schema do banco de dados (Supabase / Postgres)
-- ============================================================================
-- Como usar: Supabase Dashboard > SQL Editor > cole este arquivo > Run.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ── Tabela: guests ──────────────────────────────────────────────────────────
create table if not exists public.guests (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  slug         text not null unique,
  team         text not null check (team in ('verde', 'vermelho')),
  status       text not null default 'convocado' check (status in ('convocado', 'confirmado')),
  confirmed_at timestamptz,
  created_at   timestamptz not null default now()
);

create index if not exists guests_slug_idx on public.guests (slug);
create index if not exists guests_team_idx on public.guests (team);

-- ── Tabela: event_config ─────────────────────────────────────────────────────
-- Linha única (id = 1) com os dados do evento, editável pelo painel admin.
create table if not exists public.event_config (
  id         smallint primary key default 1,
  event_date date not null default '2026-11-14',
  event_time text not null default '19:00',
  address    text not null default 'A definir',
  map_url    text,
  notes      text,
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);

insert into public.event_config (id, event_date, event_time, address, notes)
values (1, '2026-11-14', '19:00', 'A definir', 'Chegue com 20 minutos de antecedência para retirar sua credencial oficial na entrada.')
on conflict (id) do nothing;

-- ── Row Level Security ───────────────────────────────────────────────────────
-- Toda escrita (criar/editar/excluir convidados, editar configurações) passa
-- pelas rotas de API do Next.js usando a Service Role Key (lado do servidor),
-- que ignora RLS. O cliente público (anon key) só pode LER a linha do próprio
-- convidado — nunca a lista completa — e apenas através da rota de API, que
-- filtra por slug. Por isso mantemos RLS travado por padrão:

alter table public.guests enable row level security;
alter table public.event_config enable row level security;

-- Nenhuma policy de leitura/escrita é criada para o cliente anônimo:
-- todo acesso passa pelas API routes do servidor (service role), que
-- aplicam as próprias regras de negócio (ex: um convidado só pode
-- confirmar a própria presença, o admin autenticado pode gerenciar tudo).
