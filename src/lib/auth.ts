import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_SESSION_COOKIE = "lwc_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 dias

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET não configurada no .env.local");
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

/** Gera o valor do cookie de sessão do admin: `${expiresAt}.${signature}` */
export function createAdminSessionToken(): string {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = String(expiresAt);
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

/** Verifica se um token de sessão de admin é válido e não expirou. */
export function isValidAdminSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  if (!timingSafeEqual(a, b)) return false;

  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt)) return false;
  return Date.now() < expiresAt;
}

/** Lê o cookie de sessão de uma requisição de rota de API e diz se é um admin válido. */
export function requestIsAdmin(request: Request): boolean {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${ADMIN_SESSION_COOKIE}=`));
  const token = match ? decodeURIComponent(match.split("=").slice(1).join("=")) : null;
  return isValidAdminSessionToken(token);
}

export function verifyAdminPasscode(passcode: string): boolean {
  const expected = process.env.ADMIN_PASSCODE;
  if (!expected) {
    throw new Error("ADMIN_PASSCODE não configurada no .env.local");
  }
  // Comparação de tempo constante para evitar timing attacks.
  const a = Buffer.from(passcode.padEnd(64, "\0"));
  const b = Buffer.from(expected.padEnd(64, "\0"));
  return a.length === b.length && timingSafeEqual(a, b) && passcode === expected;
}
