import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { requestIsAdmin } from "@/lib/auth";

const updateSchema = z.object({
  name: z.string().trim().min(2).optional(),
  team: z.enum(["verde", "vermelho"]).optional(),
});

/**
 * GET público: usado pela página /convite/[slug] para carregar os dados
 * do convidado. Retorna apenas os campos necessários para a experiência
 * do convite — nunca a lista completa de convidados.
 */
export async function GET(_request: NextRequest, { params }: { params: { slug: string } }) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("slug", params.slug)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Convidado não encontrado." }, { status: 404 });
  }

  return NextResponse.json({ guest: data });
}

export async function PATCH(request: NextRequest, { params }: { params: { slug: string } }) {
  if (!requestIsAdmin(request)) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const json = await request.json().catch(() => null);
  const parsed = updateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("guests")
    .update(parsed.data)
    .eq("slug", params.slug)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ guest: data });
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  if (!requestIsAdmin(request)) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("guests").delete().eq("slug", params.slug);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
