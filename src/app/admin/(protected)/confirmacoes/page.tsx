"use client";

import { useState } from "react";
import { useGuests } from "@/hooks/useGuests";
import { Card, ProgressBar } from "@/components/ui/Card";
import { TeamBadge } from "@/components/ui/Badge";
import { computeStats } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function ConfirmacoesPage() {
  const { guests, loading } = useGuests();
  const [filter, setFilter] = useState<"todos" | "confirmado" | "convocado">("todos");
  const stats = computeStats(guests);

  const filtered = guests.filter((g) => filter === "todos" || g.status === filter);
  const sorted = [...filtered].sort((a, b) => {
    if (!a.confirmed_at && !b.confirmed_at) return a.name.localeCompare(b.name);
    if (!a.confirmed_at) return 1;
    if (!b.confirmed_at) return -1;
    return b.confirmed_at.localeCompare(a.confirmed_at);
  });

  return (
    <div className="max-w-5xl">
      <header className="mb-8">
        <span className="eyebrow text-[10px] text-gold-deep">Chapter 22</span>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold mt-1">Confirmações</h1>
        <p className="text-sm text-slate mt-1">Acompanhe quem já confirmou presença.</p>
      </header>

      <Card className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="eyebrow text-[10px] text-slate">
            {stats.confirmed} de {stats.total} confirmados
          </span>
          <span className="text-sm font-semibold">{stats.confirmationRate}%</span>
        </div>
        <ProgressBar value={stats.confirmationRate} />
      </Card>

      <div className="flex gap-2 mb-4">
        {(["todos", "confirmado", "convocado"] as const).map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
              filter === option ? "border-ink bg-ink text-paper" : "border-line text-slate hover:bg-bone"
            )}
          >
            {option === "todos" ? "Todos" : option === "confirmado" ? "Confirmados" : "Pendentes"}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="h-64 rounded-2xl bg-line/40 animate-pulse" />
      ) : sorted.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line py-16 text-center text-sm text-slate">
          Nenhum convidado nesta categoria.
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {sorted.map((guest) => (
            <li key={guest.id}>
              <Card className="flex items-center justify-between py-4 hover:translate-y-0">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      guest.status === "confirmado" ? "bg-gold" : "bg-slate-light"
                    )}
                  />
                  <div>
                    <div className="text-sm font-semibold">{guest.name}</div>
                    <div className="text-xs text-slate">
                      {guest.confirmed_at
                        ? `Confirmado em ${new Date(guest.confirmed_at).toLocaleString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}`
                        : "Ainda não confirmou"}
                    </div>
                  </div>
                </div>
                <TeamBadge team={guest.team} />
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
