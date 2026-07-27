"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Trophy, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Não foi possível entrar.");
        return;
      }
      const redirect = searchParams.get("redirect") || "/admin/dashboard";
      router.push(redirect);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="w-full max-w-sm animate-rise">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={20} className="text-gold" />
            <span className="eyebrow text-xs text-gold">Chapter 22</span>
          </div>
          <h1 className="font-display text-2xl font-semibold text-paper">Central de Comando</h1>
          <p className="text-sm text-white/50 mt-1">Acesso restrito ao organizador do evento.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/[.03] p-6 flex flex-col gap-4"
        >
          <label className="flex flex-col gap-2">
            <span className="eyebrow text-[10px] text-white/40">Senha de acesso</span>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-3 py-2.5">
              <Lock size={14} className="text-gold shrink-0" />
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                required
                autoFocus
                className="w-full bg-transparent text-sm text-paper placeholder:text-white/30 outline-none"
                placeholder="••••••••"
              />
            </div>
          </label>

          {error && <p className="text-xs text-team-red">{error}</p>}

          <Button type="submit" loading={loading} className="w-full mt-2">
            Entrar
          </Button>
        </form>
      </div>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
