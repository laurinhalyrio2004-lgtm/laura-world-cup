import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Guest, GuestStats } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Converte um nome em slug único e amigável para URL (ex: "João Silva" -> "joao-silva"). */
export function slugify(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Gera um slug único acrescentando um sufixo numérico se já existir. */
export function uniqueSlug(base: string, existingSlugs: Set<string>): string {
  let slug = slugify(base);
  if (!slug) slug = "convidado";
  let candidate = slug;
  let counter = 2;
  while (existingSlugs.has(candidate)) {
    candidate = `${slug}-${counter}`;
    counter += 1;
  }
  return candidate;
}

export function computeStats(guests: Guest[]): GuestStats {
  const total = guests.length;
  const confirmed = guests.filter((g) => g.status === "confirmado").length;
  const green = guests.filter((g) => g.team === "verde").length;
  const red = guests.filter((g) => g.team === "vermelho").length;
  const blue = guests.filter((g) => g.team === "azul").length;
  return {
    total,
    confirmed,
    pending: total - confirmed,
    green,
    red,
    blue,
    confirmationRate: total === 0 ? 0 : Math.round((confirmed / total) * 100),
  };
}

const WEEKDAYS = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
];
const MONTHS = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

/** Formata uma data ISO (YYYY-MM-DD) de forma extensa em português. */
export function formatDatePretty(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  const date = new Date(Date.UTC(year, month - 1, day));
  const weekday = WEEKDAYS[date.getUTCDay()];
  const monthName = MONTHS[date.getUTCMonth()];
  return `${weekday}, ${day} de ${monthName} de ${year}`;
}

export function mapUrlFor(address: string, override?: string | null): string {
  if (override) return override;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}