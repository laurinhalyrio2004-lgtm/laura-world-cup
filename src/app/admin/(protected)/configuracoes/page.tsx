"use client";

import { FormEvent, useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { EventConfig } from "@/types";

export default function ConfiguracoesPage() {
  const [config, setConfig] = useState<EventConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((json) => setConfig(json.config))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!config) return;
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/config", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_date: config.event_date,
          event_time: config.event_time,
          address: config.address,
          map_url: config.map_url || "",
          notes: config.notes || "",
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Erro ao salvar.");
      setConfig(json.config);
      setMessage("Configurações salvas com sucesso.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-xl">
      <header className="mb-8">
        <span className="eyebrow text-[10px] text-gold-deep">Chapter 22</span>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold mt-1">Configurações</h1>
        <p className="text-sm text-slate mt-1">Dados exibidos na página de cada convidado.</p>
      </header>

      {loading || !config ? (
        <div className="h-96 rounded-2xl bg-line/40 animate-pulse" />
      ) : (
        <Card>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-2">
                <span className="eyebrow text-[10px] text-slate">Data</span>
                <input
                  type="date"
                  value={config.event_date}
                  onChange={(e) => setConfig({ ...config, event_date: e.target.value })}
                  className="rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="eyebrow text-[10px] text-slate">Horário</span>
                <input
                  type="time"
                  value={config.event_time}
                  onChange={(e) => setConfig({ ...config, event_time: e.target.value })}
                  className="rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="eyebrow text-[10px] text-slate">Endereço</span>
              <input
                value={config.address}
                onChange={(e) => setConfig({ ...config, address: e.target.value })}
                placeholder="Ex: Espaço Arena, São Paulo — SP"
                className="rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="eyebrow text-[10px] text-slate">Link do mapa (opcional)</span>
              <input
                value={config.map_url ?? ""}
                onChange={(e) => setConfig({ ...config, map_url: e.target.value })}
                placeholder="https://maps.google.com/..."
                className="rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              />
              <span className="text-xs text-slate">
                Se vazio, o botão &ldquo;Abrir localização&rdquo; usa o endereço acima automaticamente.
              </span>
            </label>

            <label className="flex flex-col gap-2">
              <span className="eyebrow text-[10px] text-slate">Observações</span>
              <textarea
                value={config.notes ?? ""}
                onChange={(e) => setConfig({ ...config, notes: e.target.value })}
                rows={3}
                className="rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold resize-none"
              />
            </label>

            {message && <p className="text-xs text-team-green-deep">{message}</p>}
            {error && <p className="text-xs text-team-red">{error}</p>}

            <Button type="submit" loading={saving} className="w-full sm:w-fit">
              Salvar alterações
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
