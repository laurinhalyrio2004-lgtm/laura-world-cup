"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { Guest } from "@/types";

export function ConfirmSection({ guest }: { guest: Guest }) {
  const [status, setStatus] = useState(guest.status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConfirm() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/guests/${guest.slug}/confirm`, { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Não foi possível confirmar.");
      setStatus("confirmado");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  if (status === "confirmado") {
    return (
      <div className="animate-stamp text-center rounded-2xl py-8 px-6 bg-gold-soft border border-gold">
        <CheckCircle2 size={30} className="mx-auto mb-3 text-gold-deep" />
        <div className="font-display text-lg font-bold text-gold-deep">Presença confirmada!</div>
        <p className="text-sm mt-1 text-gold-deep">Nos vemos na Laura World Cup!</p>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={handleConfirm}
        disabled={loading}
        className="w-full rounded-2xl py-4 text-base font-bold font-display bg-gold text-ink transition-all active:scale-[.97] disabled:opacity-60 hover:bg-gold-deep hover:text-paper"
      >
        {loading ? "Confirmando…" : "Confirmar Presença"}
      </button>
      {error && <p className="text-xs text-team-red mt-2 text-center">{error}</p>}
    </div>
  );
}
