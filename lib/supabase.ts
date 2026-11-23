// Server-only helper for talking to Supabase PostgREST with the secret key.
// Never import this from a client component.

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY || "";

export function supabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_SECRET_KEY);
}

export async function supabaseFetch(
  path: string,
  init: RequestInit = {}
): Promise<Response> {
  if (!supabaseConfigured()) {
    throw new Error("Supabase env vars are not configured");
  }
  const url = `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/${path}`;
  return fetch(url, {
    ...init,
    headers: {
      apikey: SUPABASE_SECRET_KEY,
      Authorization: `Bearer ${SUPABASE_SECRET_KEY}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  website_type: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}
