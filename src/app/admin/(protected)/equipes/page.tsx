"use client";

import { useGuests } from "@/hooks/useGuests";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";

export default function EquipesPage() {
  const { guests, loading } = useGuests();
  const green = guests.filter((g) => g.team === "verde");
  const red = guests.filter((g) => g.team === "vermelho");
  const blue = guests.filter((g) => g.team === "azul");

  return (
    <div className="max-w-5xl">
      <header className="mb-8">
        <span className="eyebrow text-[10px] text-gold-deep">Chapter 22</span>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold mt-1">Equipes</h1>
        <p className="text-sm text-slate mt-1">Escalação atual dos dois times.</p>
      </header>

      {loading ? (
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="h-96 rounded-2xl bg-line/40 animate-pulse" />
          <div className="h-96 rounded-2xl bg-line/40 animate-pulse" />
          <div className="h-96 rounded-2xl bg-line/40 animate-pulse" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-3 gap-4">
          <TeamRoster title="Equipe Verde" emoji="🟩" color="team-green" guests={green} />
          <TeamRoster title="Equipe Vermelha" emoji="🟥" color="team-red" guests={red} />
          <TeamRoster title="Equipe Azul" emoji="🟦" color="team-blue" guests={blue} />
        </div>
      )}
    </div>
  );
}

const TITLE_COLOR: Record<"team-green" | "team-red" | "team-blue", string> = {
  "team-green": "text-team-green-deep",
  "team-red": "text-team-red-deep",
  "team-blue": "text-team-blue-deep",
};

function TeamRoster({
  title,
  emoji,
  color,
  guests,
}: {
  title: string;
  emoji: string;
  color: "team-green" | "team-red" | "team-blue";
  guests: { id: string; name: string; status: "confirmado" | "convocado" }[];
}) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-xl">{emoji}</span>
          <span className={`font-display font-semibold ${TITLE_COLOR[color]}`}>{title}</span>
        </div>
        <span className="eyebrow text-[10px] text-slate">{guests.length} jogadores</span>
      </div>
      {guests.length === 0 ? (
        <p className="text-sm text-slate">Nenhum convidado nesta equipe ainda.</p>
      ) : (
        <ul className="flex flex-col gap-1">
          {guests.map((guest) => (
            <li
              key={guest.id}
              className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-bone transition-colors"
            >
              <span className="text-sm font-medium">{guest.name}</span>
              <StatusBadge status={guest.status} />
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
