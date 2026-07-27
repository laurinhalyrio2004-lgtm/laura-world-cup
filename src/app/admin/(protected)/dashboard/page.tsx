"use client";

import { Users, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { useGuests } from "@/hooks/useGuests";
import { StatCard, Card, ProgressBar } from "@/components/ui/Card";
import { computeStats } from "@/lib/utils";

export default function DashboardPage() {
  const { guests, loading } = useGuests();
  const stats = computeStats(guests);

  return (
    <div className="max-w-5xl">
      <header className="mb-8">
        <span className="eyebrow text-[10px] text-gold-deep">Chapter 22</span>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold mt-1">Dashboard</h1>
        <p className="text-sm text-slate mt-1">Visão geral em tempo real do campeonato.</p>
      </header>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-line/40 animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total de convidados" value={stats.total} icon={Users} accent="ink" />
            <StatCard label="Confirmados" value={stats.confirmed} icon={CheckCircle2} accent="gold" />
            <StatCard label="Pendentes" value={stats.pending} icon={Clock} accent="ink" />
            <StatCard label="Taxa de confirmação" value={`${stats.confirmationRate}%`} icon={TrendingUp} accent="gold" />
          </div>

          <Card className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="eyebrow text-[10px] text-slate">Progresso de confirmações</span>
              <span className="text-sm font-semibold">{stats.confirmationRate}%</span>
            </div>
            <ProgressBar value={stats.confirmationRate} />
          </Card>

          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <Card className="flex items-center justify-between">
              <div>
                <div className="eyebrow text-[10px] text-slate mb-1">Time Verde</div>
                <div className="font-display text-3xl font-semibold text-team-green-deep">{stats.green}</div>
              </div>
              <span className="text-4xl">🟩</span>
            </Card>
            <Card className="flex items-center justify-between">
              <div>
                <div className="eyebrow text-[10px] text-slate mb-1">Time Vermelho</div>
                <div className="font-display text-3xl font-semibold text-team-red-deep">{stats.red}</div>
              </div>
              <span className="text-4xl">🟥</span>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
