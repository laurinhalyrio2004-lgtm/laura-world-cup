"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Trophy,
  LayoutDashboard,
  Users,
  Shield,
  CheckCircle2,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/convocados", label: "Convocados", icon: Users },
  { href: "/admin/equipes", label: "Equipes", icon: Shield },
  { href: "/admin/confirmacoes", label: "Confirmações", icon: CheckCircle2 },
  { href: "/admin/configuracoes", label: "Configurações", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-bone">
      {/* Topbar (mobile) */}
      <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between border-b border-line bg-bone/90 backdrop-blur px-4 py-3">
        <div className="flex items-center gap-2">
          <Trophy size={16} className="text-gold-deep" />
          <span className="font-display text-sm font-semibold">Central de Comando</span>
        </div>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="rounded-lg p-2 hover:bg-line/60"
          aria-label="Abrir menu"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      <div className="lg:flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "border-r border-line bg-paper lg:w-64 lg:shrink-0 lg:sticky lg:top-0 lg:h-screen",
            "lg:flex lg:flex-col",
            menuOpen ? "block" : "hidden lg:flex"
          )}
        >
          <div className="hidden lg:flex items-center gap-2 px-6 py-6 border-b border-line">
            <Trophy size={18} className="text-gold-deep" />
            <div>
              <div className="font-display text-sm font-semibold leading-tight">Laura World Cup</div>
              <div className="eyebrow text-[9px] text-slate">Central de Comando</div>
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-ink text-paper"
                      : "text-slate hover:bg-bone hover:text-ink"
                  )}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-3 border-t border-line">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate hover:bg-team-red-soft hover:text-team-red-deep transition-colors"
            >
              <LogOut size={16} />
              Sair
            </button>
          </div>
        </aside>

        <main className="flex-1 min-w-0 px-4 py-6 sm:px-8 sm:py-10">{children}</main>
      </div>
    </div>
  );
}
