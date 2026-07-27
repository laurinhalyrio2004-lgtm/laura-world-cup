import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Rota pública: o convidado confirma a própria presença a partir da
 * página do convite. Só altera o registro correspondente ao slug da URL,
 * nunca expõe ou modifica outros convidados.
 */
export async function POST(_request: NextRequest, { params }: { params: { slug: string } }) {
  const supabase = createAdminClient();

  const { data: guest, error: findError } = await supabase
    .from("guests")
    .select("id, status")
    .eq("slug", params.slug)
    .maybeSingle();

  if (findError) {
    return NextResponse.json({ error: findError.message }, { status: 500 });
  }
  if (!guest) {
    return NextResponse.json({ error: "Convidado não encontrado." }, { status: 404 });
  }

  if (guest.status === "confirmado") {
    const { data } = await supabase.from("guests").select("*").eq("slug", params.slug).single();
    return NextResponse.json({ guest: data });
  }

  const { data, error } = await supabase
    .from("guests")
    .update({ status: "confirmado", confirmed_at: new Date().toISOString() })
    .eq("slug", params.slug)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ guest: data });
}
