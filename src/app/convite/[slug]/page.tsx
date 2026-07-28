import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { Calendar, Clock, MapPin, Award, ChevronRight, Trophy } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { Credential } from "@/components/guest/Credential";
import { TeamRevealCard } from "@/components/guest/TeamRevealCard";
import { SectionCard, InfoRow } from "@/components/guest/SectionCard";
import { ConfirmSection } from "@/components/guest/ConfirmSection";
import { formatDatePretty, mapUrlFor } from "@/lib/utils";
import type { EventConfig, Guest } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

async function getGuestAndConfig(slug: string) {
  const supabase = createAdminClient();

  const [{ data: guest }, { data: config }] = await Promise.all([
    supabase.from("guests").select("*").eq("slug", slug).maybeSingle(),
    supabase.from("event_config").select("*").eq("id", 1).single(),
  ]);

  return { guest: guest as Guest | null, config: config as EventConfig | null };
}

export default async function ConvitePage({ params }: { params: { slug: string } }) {
  noStore();
  const { guest, config } = await getGuestAndConfig(params.slug);

  if (!guest) {
    notFound();
  }

  const mapHref = mapUrlFor(config?.address ?? "", config?.map_url);

  const REGULAMENTO = [
    "Compareça utilizando a cor da sua equipe.",
    "O campeonato será composto por diversas gincanas.",
    "Mantenha o espírito esportivo.",
    "O objetivo principal é se divertir.",
    "Apenas uma equipe levantará a taça.",
  ];

  return (
    <div className="min-h-screen bg-ink text-paper">
      <div className="max-w-md mx-auto px-5 py-10 sm:py-14">
        <div className="text-center mb-10 animate-rise">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy size={16} className="text-gold" />
            <span className="eyebrow text-[10px] text-gold">Chapter 22</span>
          </div>
          <p className="text-sm text-white/60 mb-1">Olá, {guest.name.split(" ")[0]}!</p>
          <p className="text-sm text-white/60 mb-4">
            Você foi oficialmente convocado para participar da
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold leading-[1.05]">
            🏆 LAURA WORLD CUP
          </h1>
          <p className="eyebrow text-xs text-white/40 mt-2">Chapter 22</p>
        </div>

        <div className="animate-rise" style={{ animationDelay: "100ms" }}>
          <Credential guest={guest} />
        </div>

        <div className="mt-10 animate-rise" style={{ animationDelay: "160ms" }}>
          <SectionCard title="Detalhes da Partida" icon={Calendar}>
            <InfoRow icon={Calendar} label="Data" value={config ? formatDatePretty(config.event_date) : "A definir"} />
            <InfoRow icon={Clock} label="Horário" value={config?.event_time ?? "A definir"} />
            <InfoRow icon={MapPin} label="Endereço" value={config?.address ?? "A definir"} />
            {config?.notes && <p className="text-xs mt-3 leading-relaxed text-white/50">{config.notes}</p>}
            
              href={mapHref}
              target="_blank"
              rel="noreferrer"
              className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold bg-white/[.06] text-paper border border-white/[.14] hover:bg-white/[.1] transition-colors"
            >
              <MapPin size={14} className="text-gold" /> Abrir localização
            </a>
          </SectionCard>
        </div>

        <TeamRevealCard team={guest.team} />

        <div className="mt-8">
          <ConfirmSection guest={guest} />
        </div>

        <div className="mt-8">
          <SectionCard title="Regulamento do Campeonato" icon={Award}>
            <ul className="flex flex-col gap-3">
              {REGULAMENTO.map((rule) => (
                <li key={rule} className="flex items-start gap-3 text-sm text-white/70">
                  <ChevronRight size={14} className="text-gold mt-0.5 shrink-0" /> {rule}
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>

        <div className="text-center mt-12">
          <div className="eyebrow text-xs text-gold">#LauraFaz22 · #Chapter22 · #LauraWorldCup</div>
        </div>
      </div>
    </div>
  );
}
