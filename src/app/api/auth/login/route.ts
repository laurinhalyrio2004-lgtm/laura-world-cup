import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ADMIN_SESSION_COOKIE, createAdminSessionToken, verifyAdminPasscode } from "@/lib/auth";

const bodySchema = z.object({
  passcode: z.string().min(1, "Informe a senha de acesso."),
});

export async function POST(request: NextRequest) {
  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "Senha inválida." }, { status: 400 });
  }

  let isValid: boolean;
  try {
    isValid = verifyAdminPasscode(parsed.data.passcode);
  } catch {
    return NextResponse.json(
      { error: "Painel administrativo não configurado. Defina ADMIN_PASSCODE no servidor." },
      { status: 500 }
    );
  }

  if (!isValid) {
    return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, createAdminSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
