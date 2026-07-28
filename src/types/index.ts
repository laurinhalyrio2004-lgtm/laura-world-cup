export type Team = "verde" | "vermelho" | "azul";

export type GuestStatus = "convocado" | "confirmado";

export interface Guest {
  id: string;
  name: string;
  slug: string;
  team: Team;
  status: GuestStatus;
  confirmed_at: string | null;
  created_at: string;
}

export interface GuestInput {
  name: string;
  team: Team;
}

export interface EventConfig {
  id: number;
  event_date: string; // ISO date, e.g. 2026-11-14
  event_time: string; // e.g. "19:00"
  address: string;
  map_url: string | null;
  notes: string | null;
  updated_at: string;
}

export interface EventConfigInput {
  event_date: string;
  event_time: string;
  address: string;
  map_url?: string | null;
  notes?: string | null;
}

export interface GuestStats {
  total: number;
  confirmed: number;
  pending: number;
  green: number;
  red: number;
  blue: number;
  confirmationRate: number; // 0-100
}
