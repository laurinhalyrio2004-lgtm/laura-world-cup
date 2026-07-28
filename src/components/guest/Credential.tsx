import { Check } from "lucide-react";
import { TeamBadge } from "@/components/ui/Badge";
import type { Guest } from "@/types";

const TEAM_COLOR = {
  verde: { base: "#1E7A4C", deep: "#14532D" },
  vermelho: { base: "#A6362B", deep: "#7A2620" },
  azul: { base: "#2C5AA0", deep: "#1E3F73" },
};

export function Credential({ guest }: { guest: Guest }) {
  const confirmed = guest.status === "confirmado";
  const initial = guest.name.trim().charAt(0).toUpperCase();
  const color = TEAM_COLOR[guest.team];

  return (
    <div className="relative mx-auto max-w-[340px]">
      <div
        className="perforation rounded-2xl overflow-hidden border-[1.5px] border-gold"
        style={{ boxShadow: "0 20px 50px -20px rgba(198,161,91,.35)" }}
      >
        <div className="h-2" style={{ background: color.base }} />
        <div className="p-6 bg-paper">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-1.5">
              <span className="text-gold-deep">🏆</span>
              <span className="eyebrow text-[9px] text-gold-deep">Laura World Cup</span>
            </div>
            <span className="eyebrow text-[9px] text-slate">Chapter 22</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div
              className="flex items-center justify-center rounded-full font-display text-2xl font-bold shrink-0 h-[58px] w-[58px] border-[1.5px]"
              style={{ background: `${color.base}1c`, color: color.deep, borderColor: color.base }}
            >
              {initial}
            </div>
            <div className="min-w-0">
              <div className="font-display text-xl font-semibold leading-tight truncate">{guest.name}</div>
              <TeamBadge team={guest.team} className="mt-1" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-dashed border-line">
            <div>
              <div className="eyebrow text-[8px] text-slate mb-1">Status</div>
              <div className={`font-display text-sm font-bold ${confirmed ? "text-gold-deep" : "text-slate"}`}>
                {confirmed ? "CONFIRMADO" : "CONVOCADO"}
              </div>
            </div>
            <div className="flex gap-0.5">
              {Array.from({ length: 14 }).map((_, i) => (
                <span
                  key={i}
                  className="w-[2px] h-[22px]"
                  style={{ background: i % 3 === 0 ? "#0B0B0C" : "#A6A29A", opacity: i % 3 === 0 ? 1 : 0.4 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {confirmed && (
        <div
          className="animate-stamp absolute -top-3 -right-3 flex items-center justify-center rounded-full h-16 w-16 bg-gold"
          style={{ transform: "rotate(-10deg)", boxShadow: "0 8px 20px rgba(0,0,0,.25)" }}
        >
          <Check size={18} className="text-ink" />
        </div>
      )}
    </div>
  );
}