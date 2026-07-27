import { HTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-paper p-6 transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-22px_rgba(11,11,12,.25)]",
        className
      )}
      {...props}
    />
  );
}

export function ProgressBar({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="h-2 w-full rounded-full bg-line overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-gold-deep to-gold transition-all duration-700 ease-out"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

export function StatCard({
  label,
  value,
  icon: Icon,
  accent = "ink",
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  accent?: "ink" | "gold" | "green" | "red";
}) {
  const accentColor = {
    ink: "text-ink",
    gold: "text-gold-deep",
    green: "text-team-green-deep",
    red: "text-team-red-deep",
  }[accent];

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="eyebrow text-[10px] text-slate">{label}</span>
        <Icon size={16} className={accentColor} />
      </div>
      <span className="font-display text-3xl font-semibold leading-none">{value}</span>
    </Card>
  );
}
