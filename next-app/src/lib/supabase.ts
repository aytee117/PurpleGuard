import { createClient } from "@supabase/supabase-js";

// Service-role key — server-only, must never be exposed via NEXT_PUBLIC_ or
// imported from a "use client" file. Only ever called from Route Handlers,
// which are already gated by honeypot + Turnstile checks.
export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY is not set");
  }
  return createClient(url, key, { auth: { persistSession: false } });
}
