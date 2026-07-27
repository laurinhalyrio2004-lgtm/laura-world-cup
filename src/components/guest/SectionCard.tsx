import { LucideIcon } from "lucide-react";

export function SectionCard({
  title,
  icon: Icon,
  children,
  className = "",
}: {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`animate-rise rounded-2xl p-6 border border-white/[.08] bg-white/[.03] ${className}`}
    >
      <div className="flex items-center gap-2 mb-5">
        <Icon size={15} className="text-gold" />
        <span className="eyebrow text-[11px] text-paper">{title}</span>
      </div>
      {children}
    </div>
  );
}

export function InfoRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-white/[.06] last:border-0">
      <Icon size={15} className="text-gold mt-0.5 shrink-0" />
      <div>
        <div className="eyebrow text-[9px] text-white/40">{label}</div>
        <div className="text-sm text-paper">{value}</div>
      </div>
    </div>
  );
}
