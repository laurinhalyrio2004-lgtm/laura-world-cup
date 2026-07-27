"use client";

import { FormEvent, useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Guest, Team } from "@/types";

interface GuestFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: { name: string; team: Team }) => Promise<void>;
  initialGuest?: Guest | null;
}

export function GuestFormModal({ open, onClose, onSubmit, initialGuest }: GuestFormModalProps) {
  const [name, setName] = useState("");
  const [team, setTeam] = useState<Team>("verde");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setName(initialGuest?.name ?? "");
      setTeam(initialGuest?.team ?? "verde");
      setError(null);
    }
  }, [open, initialGuest]);

  if (!open) return null;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({ name: name.trim(), team });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/50 backdrop-blur-sm p-0 sm:p-6">
      <div className="w-full sm:max-w-sm rounded-t-3xl sm:rounded-2xl bg-paper p-6 animate-rise">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-lg font-semibold">
            {initialGuest ? "Editar convidado" : "Novo convidado"}
          </h2>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-bone" aria-label="Fechar">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <span className="eyebrow text-[10px] text-slate">Nome completo</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              autoFocus
              placeholder="Ex: João Pedro Silva"
              className="rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
            />
          </label>

          <div className="flex flex-col gap-2">
            <span className="eyebrow text-[10px] text-slate">Equipe</span>
            <div className="grid grid-cols-2 gap-2">
              {(["verde", "vermelho"] as Team[]).map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => setTeam(option)}
                  className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
                    team === option
                      ? option === "verde"
                        ? "border-team-green bg-team-green-soft text-team-green-deep"
                        : "border-team-red bg-team-red-soft text-team-red-deep"
                      : "border-line text-slate hover:bg-bone"
                  }`}
                >
                  {option === "verde" ? "🟩 Verde" : "🟥 Vermelho"}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-xs text-team-red">{error}</p>}

          <Button type="submit" loading={submitting} className="w-full">
            {initialGuest ? "Salvar alterações" : "Criar convite"}
          </Button>
        </form>
      </div>
    </div>
  );
}
