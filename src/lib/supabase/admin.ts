import { createClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase com privilégios de administrador (Service Role Key).
 *
 * ⚠️ Uso exclusivo no servidor (API routes / server actions).
 * Nunca importe este arquivo em um Client Component: a Service Role Key
 * ignora Row Level Security e concede acesso total ao banco.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase não configurado: defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env.local"
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
