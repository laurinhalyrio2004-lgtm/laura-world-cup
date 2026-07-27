"use client";

import { useCallback, useEffect, useState } from "react";
import type { Guest, GuestInput, Team } from "@/types";

export function useGuests() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/guests");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Erro ao carregar convidados.");
      setGuests(json.guests as Guest[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createGuest = useCallback(
    async (input: GuestInput) => {
      const res = await fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Erro ao criar convidado.");
      await refresh();
      return json.guest as Guest;
    },
    [refresh]
  );

  const updateGuest = useCallback(
    async (slug: string, patch: Partial<{ name: string; team: Team }>) => {
      const res = await fetch(`/api/guests/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Erro ao atualizar convidado.");
      await refresh();
      return json.guest as Guest;
    },
    [refresh]
  );

  const deleteGuest = useCallback(
    async (slug: string) => {
      const res = await fetch(`/api/guests/${slug}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Erro ao excluir convidado.");
      await refresh();
    },
    [refresh]
  );

  return { guests, loading, error, refresh, createGuest, updateGuest, deleteGuest };
}
