import Link from "next/link";
import { Trophy, SearchX } from "lucide-react";

export default function GuestNotFound() {
  return (
    <div className="min-h-screen bg-ink text-paper flex flex-col items-center justify-center px-6 text-center">
      <div className="flex items-center gap-2 mb-6">
        <Trophy size={18} className="text-gold" />
        <span className="eyebrow text-xs text-gold">Chapter 22</span>
      </div>
      <SearchX size={32} className="text-white/30 mb-4" />
      <h1 className="font-display text-2xl font-semibold mb-2">Convite não encontrado</h1>
      <p className="text-sm text-white/50 max-w-xs mb-8">
        Este link não corresponde a nenhum convidado da Laura World Cup. Verifique se você recebeu
        o link correto pelo WhatsApp.
      </p>
      <Link href="/" className="text-xs text-gold hover:text-gold-deep transition-colors">
        Voltar ao início
      </Link>
    </div>
  );
}
