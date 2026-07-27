import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { requestIsAdmin } from "@/lib/auth";

const updateSchema = z.object({
  event_date: z.string().min(1),
  event_time: z.string().min(1),
  address: z.string().min(1),
  map_url: z.string().url().optional().or(z.literal("")).nullable(),
  notes: z.string().optional().nullable(),
});

export async function GET() {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("event_config").select("*").eq("id", 1).single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ config: data });
}

export async function PATCH(request: NextRequest) {
  if (!requestIsAdmin(request)) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const json = await request.json().catch(() => null);
  const parsed = updateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Dados inválidos." },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("event_config")
    .update({ ...parsed.data, updated_at: new Date().toISOString() })
    .eq("id", 1)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ config: data });
}
