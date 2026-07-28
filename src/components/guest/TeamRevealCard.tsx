import type { Team } from "@/types";

const TEAM_CONFIG: Record
  Team,
  { emoji: string; label: string; color: string; colorClass: string }
> = {
  verde: {
    emoji: "🟩",
    label: "EQUIPE VERDE",
    color: "#1E7A4C",
    colorClass: "text-team-green-deep",
  },
  vermelho: {
    emoji: "🟥",
    label: "EQUIPE VERMELHA",
    color: "#A6362B",
    colorClass: "text-team-red-deep",
  },
  azul: {
    emoji: "🟦",
    label: "EQUIPE AZUL",
    color: "#2C5AA0",
    colorClass: "text-team-blue-deep",
  },
};

export function TeamRevealCard({ team }: { team: Team }) {
  const config = TEAM_CONFIG[team];
  const colorName = team === "verde" ? "verde" : team === "vermelho" ? "vermelha" : "azul";

  return (
    <div
      className="animate-rise mt-8 rounded-2xl overflow-hidden border"
      style={{ borderColor: `${config.color}55` }}
    >
      <div
        className="p-7 text-center"
        style={{ background: `linear-gradient(180deg, ${config.color}22, transparent)` }}
      >
        <div className="text-4xl mb-3">{config.emoji}</div>
        <div className={`font-display text-2xl font-bold mb-3 ${config.colorClass}`}>{config.label}</div>
        <p className="text-sm leading-relaxed text-white/70">
          Sua equipe contará com você para conquistar o campeonato. Compareça utilizando uma peça
          predominante na cor {colorName}.
        </p>
      </div>
    </div>
  );
}