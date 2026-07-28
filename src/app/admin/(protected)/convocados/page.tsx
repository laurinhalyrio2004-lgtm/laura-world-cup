"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { useGuests } from "@/hooks/useGuests";
import { GuestTable } from "@/components/admin/GuestTable";
import { GuestFormModal } from "@/components/admin/GuestFormModal";
import { Button } from "@/components/ui/Button";
import type { Guest } from "@/types";

export default function ConvocadosPage() {
  const { guests, loading, createGuest, updateGuest, deleteGuest } = useGuests();
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [siteUrl, setSiteUrl] = useState("");

  useMemo(() => {
    if (typeof window !== "undefined") setSiteUrl(window.location.origin);
  }, []);

  const filtered = guests.filter((g) => g.name.toLowerCase().includes(query.toLowerCase()));

  function openCreateModal() {
    setEditingGuest(null);
    setModalOpen(true);
  }

  function openEditModal(guest: Guest) {
    setEditingGuest(guest);
    setModalOpen(true);
  }

  async function handleSubmit(input: { name: string; team: Guest["team"] }) {
    if (editingGuest) {
      await updateGuest(editingGuest.slug, input);
    } else {
      await createGuest(input);
    }
  }

  async function handleDelete(guest: Guest) {
    if (confirm(`Excluir o convite de ${guest.name}? Esta ação não pode ser desfeita.`)) {
      await deleteGuest(guest.slug);
    }
  }

  async function handleSwitchTeam(guest: Guest) {
    const order: Guest["team"][] = ["verde", "vermelho", "azul"];
    const next = order[(order.indexOf(guest.team) + 1) % order.length];
    await updateGuest(guest.slug, { team: next });
  }

  return (
    <div className="max-w-5xl">
      <header className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <span className="eyebrow text-[10px] text-gold-deep">Chapter 22</span>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold mt-1">Convocados</h1>
          <p className="text-sm text-slate mt-1">Gerencie os convidados e seus links pessoais.</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus size={16} /> Novo Convidado
        </Button>
      </header>

      <div className="mb-4 flex items-center gap-2 rounded-xl border border-line bg-paper px-3 py-2.5 max-w-xs">
        <Search size={14} className="text-slate" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar convidado…"
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      {loading ? (
        <div className="h-64 rounded-2xl bg-line/40 animate-pulse" />
      ) : (
        <GuestTable
          guests={filtered}
          onEdit={openEditModal}
          onDelete={handleDelete}
          onSwitchTeam={handleSwitchTeam}
          siteUrl={siteUrl}
        />
      )}

      <GuestFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialGuest={editingGuest}
      />
    </div>
  );
}
