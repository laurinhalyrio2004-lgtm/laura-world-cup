"use client";

import { useState } from "react";
import { Pencil, Trash2, Copy, ExternalLink, Repeat, Check } from "lucide-react";
import { TeamBadge, StatusBadge } from "@/components/ui/Badge";
import type { Guest } from "@/types";

interface GuestTableProps {
  guests: Guest[];
  onEdit: (guest: Guest) => void;
  onDelete: (guest: Guest) => void;
  onSwitchTeam: (guest: Guest) => void;
  siteUrl: string;
}

export function GuestTable({ guests, onEdit, onDelete, onSwitchTeam, siteUrl }: GuestTableProps) {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  async function handleCopy(guest: Guest) {
    const url = `${siteUrl}/convite/${guest.slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedSlug(guest.slug);
      setTimeout(() => setCopiedSlug(null), 1600);
    } catch {
      // clipboard indisponível — ignora silenciosamente
    }
  }

  if (guests.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line py-16 text-center text-sm text-slate">
        Nenhum convidado cadastrado ainda. Clique em &ldquo;Novo Convidado&rdquo; para começar.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-line scrollbar-thin">
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr className="border-b border-line bg-bone/60 text-left">
            <th className="px-4 py-3 font-semibold text-slate eyebrow text-[10px]">Nome</th>
            <th className="px-4 py-3 font-semibold text-slate eyebrow text-[10px]">Equipe</th>
            <th className="px-4 py-3 font-semibold text-slate eyebrow text-[10px]">Status</th>
            <th className="px-4 py-3 font-semibold text-slate eyebrow text-[10px]">Confirmado em</th>
            <th className="px-4 py-3 font-semibold text-slate eyebrow text-[10px]">Link</th>
            <th className="px-4 py-3 font-semibold text-slate eyebrow text-[10px] text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id} className="border-b border-line last:border-0 hover:bg-bone/50 transition-colors">
              <td className="px-4 py-3 font-medium">{guest.name}</td>
              <td className="px-4 py-3">
                <TeamBadge team={guest.team} />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={guest.status} />
              </td>
              <td className="px-4 py-3 text-slate">
                {guest.confirmed_at
                  ? new Date(guest.confirmed_at).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "—"}
              </td>
              <td className="px-4 py-3 text-slate font-mono text-xs">/convite/{guest.slug}</td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  <button
                    title="Copiar link"
                    onClick={() => handleCopy(guest)}
                    className="rounded-lg p-2 hover:bg-bone text-slate hover:text-ink transition-colors"
                  >
                    {copiedSlug === guest.slug ? <Check size={14} className="text-team-green" /> : <Copy size={14} />}
                  </button>
                  <a
                    title="Abrir convite"
                    href={`/convite/${guest.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg p-2 hover:bg-bone text-slate hover:text-ink transition-colors"
                  >
                    <ExternalLink size={14} />
                  </a>
                  <button
                    title="Trocar de equipe"
                    onClick={() => onSwitchTeam(guest)}
                    className="rounded-lg p-2 hover:bg-bone text-slate hover:text-ink transition-colors"
                  >
                    <Repeat size={14} />
                  </button>
                  <button
                    title="Editar"
                    onClick={() => onEdit(guest)}
                    className="rounded-lg p-2 hover:bg-bone text-slate hover:text-ink transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    title="Excluir"
                    onClick={() => onDelete(guest)}
                    className="rounded-lg p-2 hover:bg-team-red-soft text-slate hover:text-team-red-deep transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
