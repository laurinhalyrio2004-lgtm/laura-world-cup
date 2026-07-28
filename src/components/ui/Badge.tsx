import { cn } from "@/lib/utils";
import type { Team, GuestStatus } from "@/types";

const teamStyles: Record<Team, string> = {
  verde: "bg-team-green-soft text-team-green-deep border-team-green/30",
  vermelho: "bg-team-red-soft text-team-red-deep border-team-red/30",
  azul: "bg-team-blue-soft text-team-blue-deep border-team-blue/30",
};

const teamLabel: Record<Team, string> = {
  verde: "Equipe Verde",
  vermelho: "Equipe Vermelha",
  azul: "Equipe Azul",
};

export function TeamBadge({ team, className }: { team: Team; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold",
        teamStyles[team],
        className
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          team === "verde" ? "bg-team-green" : team === "vermelho" ? "bg-team-red" : "bg-team-blue"
        )}
      />
      {teamLabel[team]}
    </span>
  );
}

const statusStyles: Record<GuestStatus, string> = {
  confirmado: "bg-gold-soft text-gold-deep border-gold/40",
  convocado: "bg-slate/10 text-slate border-slate/20",
};

const statusLabel: Record<GuestStatus, string> = {
  confirmado: "Confirmado",
  convocado: "Convocado",
};

export function StatusBadge({ status, className }: { status: GuestStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold",
        statusStyles[status],
        className
      )}
    >
      {statusLabel[status]}
    </span>
  );
}
