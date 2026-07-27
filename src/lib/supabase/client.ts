import { createBrowserClient } from "@supabase/ssr";

/**
 * Cliente Supabase para uso no navegador (anon key).
 * Reservado para funcionalidades públicas futuras (ex: placar ao vivo,
 * ranking, galeria de fotos). Hoje o app não faz leitura direta do
 * Supabase no cliente — tudo passa pelas API routes.
 */
export function createBrowserSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
