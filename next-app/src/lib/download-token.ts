import crypto from "crypto";

const TOKEN_TTL_MS = 48 * 60 * 60 * 1000; // 48 hours

function getSecret(): string {
  const secret = process.env.DOWNLOAD_TOKEN_SECRET;
  if (!secret) throw new Error("DOWNLOAD_TOKEN_SECRET is not set");
  return secret;
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function createDownloadToken(documentSlug: string): string {
  const expires = Date.now() + TOKEN_TTL_MS;
  const payload = `${documentSlug}.${expires}`;
  const signature = sign(payload);
  return Buffer.from(`${payload}.${signature}`).toString("base64url");
}

export function verifyDownloadToken(token: string): { valid: boolean; documentSlug?: string } {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf-8");
    const [documentSlug, expiresStr, signature] = decoded.split(".");
    if (!documentSlug || !expiresStr || !signature) return { valid: false };

    const expectedSignature = sign(`${documentSlug}.${expiresStr}`);
    const signatureBuf = Buffer.from(signature);
    const expectedBuf = Buffer.from(expectedSignature);
    if (signatureBuf.length !== expectedBuf.length) return { valid: false };
    if (!crypto.timingSafeEqual(signatureBuf, expectedBuf)) return { valid: false };

    if (Date.now() > Number(expiresStr)) return { valid: false };

    return { valid: true, documentSlug };
  } catch {
    return { valid: false };
  }
}
