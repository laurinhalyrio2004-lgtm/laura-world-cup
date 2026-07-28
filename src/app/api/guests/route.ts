import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { requestIsAdmin } from "@/lib/auth";
import { uniqueSlug } from "@/lib/utils";

const createSchema = z.object({
  name: z.string().trim().min(2, "Informe o nome completo do convidado."),
  team: z.enum(["verde", "vermelho", "azul"]),
});

export async function GET(request: NextRequest) {
  if (!requestIsAdmin(request)) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ guests: data });
}

export async function POST(request: NextRequest) {
  if (!requestIsAdmin(request)) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const json = await request.json().catch(() => null);
  const parsed = createSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Dados inválidos." },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();

  const { data: existing, error: existingError } = await supabase
    .from("guests")
    .select("slug");
  if (existingError) {
    return NextResponse.json({ error: existingError.message }, { status: 500 });
  }

  const slug = uniqueSlug(parsed.data.name, new Set(existing?.map((g) => g.slug) ?? []));

  const { data, error } = await supabase
    .from("guests")
    .insert({ name: parsed.data.name, team: parsed.data.team, slug })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ guest: data }, { status: 201 });
}
