import crypto from "crypto";

// Stateless, HMAC-signed token identifying "this browser already registered
// for event X as email Y" — same idea as src/lib/download-token.ts, but with
// its own secret (EVENT_REG_TOKEN_SECRET) so the two token types can never be
// confused or replayed against each other, and a JSON+base64 payload rather
// than dot-joined fields, since an email address routinely contains dots
// itself and would break a naive positional split.
//
// This only gates a UI convenience (skip re-typing an email on a return
// visit) — it is never trusted as authorization by itself. The caller always
// does a live Supabase lookup by (event_slug, email) after verifying the
// token, so a forged or expired token just falls back to showing the form.

const TOKEN_TTL_MS = 180 * 24 * 60 * 60 * 1000; // 180 days

interface TokenPayload {
  s: string; // event slug
  e: string; // email
  x: number; // expiry (ms epoch)
}

function getSecret(): string {
  const secret = process.env.EVENT_REG_TOKEN_SECRET;
  if (!secret) throw new Error("EVENT_REG_TOKEN_SECRET is not set");
  return secret;
}

function sign(payloadB64: string): string {
  return crypto.createHmac("sha256", getSecret()).update(payloadB64).digest("hex");
}

export function signEventRegistrationToken(eventSlug: string, email: string): string {
  const payload: TokenPayload = { s: eventSlug, e: email, x: Date.now() + TOKEN_TTL_MS };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = sign(payloadB64);
  return `${payloadB64}.${signature}`;
}

export function verifyEventRegistrationToken(
  token: string,
  expectedEventSlug: string
): { email: string } | null {
  try {
    const [payloadB64, signature] = token.split(".");
    if (!payloadB64 || !signature) return null;

    const expectedSignature = sign(payloadB64);
    const signatureBuf = Buffer.from(signature);
    const expectedBuf = Buffer.from(expectedSignature);
    if (signatureBuf.length !== expectedBuf.length) return null;
    if (!crypto.timingSafeEqual(signatureBuf, expectedBuf)) return null;

    const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf-8")) as Partial<TokenPayload>;
    if (!payload.s || !payload.e || !payload.x) return null;
    if (Date.now() > payload.x) return null;
    // Never trust the slug encoded in the token alone — always cross-check
    // against the page's own slug before treating this as a match.
    if (payload.s !== expectedEventSlug) return null;

    return { email: payload.e };
  } catch {
    return null;
  }
}
