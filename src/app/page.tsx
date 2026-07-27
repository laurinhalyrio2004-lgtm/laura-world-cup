import Link from "next/link";
import { Trophy } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-ink text-paper flex flex-col items-center justify-center px-6 text-center">
      <div className="flex items-center gap-2 mb-6 animate-rise">
        <Trophy size={20} className="text-gold" />
        <span className="eyebrow text-xs text-gold">Chapter 22</span>
      </div>
      <h1
        className="font-display text-4xl sm:text-6xl font-semibold leading-[1.05] mb-6 animate-rise"
        style={{ animationDelay: "80ms" }}
      >
        LAURA
        <br />
        WORLD CUP
      </h1>
      <p
        className="max-w-sm text-sm text-white/60 leading-relaxed mb-10 animate-rise"
        style={{ animationDelay: "160ms" }}
      >
        Um campeonato de gincanas entre amigos. Se você recebeu um convite pessoal
        pelo WhatsApp, abra o link para ver sua credencial.
      </p>
      <div className="eyebrow text-[11px] text-gold/80 animate-rise" style={{ animationDelay: "240ms" }}>
        #LauraFaz22 · #Chapter22 · #LauraWorldCup
      </div>
      <Link
        href="/admin/login"
        className="mt-16 text-[11px] text-white/25 hover:text-white/50 transition-colors"
      >
        Acesso administrativo
      </Link>
    </main>
  );
}
