import { NextResponse, type NextRequest } from "next/server";
import { supabaseFetch, supabaseConfigured, type ContactMessage } from "@/lib/supabase";
import { isAdminRequest } from "@/lib/adminAuth";

function guard(req: NextRequest): NextResponse | null {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  if (!supabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase is not configured yet." },
      { status: 503 }
    );
  }
  return null;
}

export async function GET(req: NextRequest) {
  const blocked = guard(req);
  if (blocked) return blocked;

  const res = await supabaseFetch(
    "contact_messages?select=*&order=created_at.desc"
  );
  if (!res.ok) {
    console.error("Supabase list failed:", res.status, await res.text());
    return NextResponse.json(
      { error: "Could not load messages." },
      { status: 502 }
    );
  }
  const messages = (await res.json()) as ContactMessage[];
  return NextResponse.json({ messages });
}

export async function PATCH(req: NextRequest) {
  const blocked = guard(req);
  if (blocked) return blocked;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  const id = String(body.id || "");
  if (!id) {
    return NextResponse.json({ error: "Missing message id." }, { status: 400 });
  }
  const isRead = Boolean(body.is_read);

  const res = await supabaseFetch(
    `contact_messages?id=eq.${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ is_read: isRead }),
    }
  );
  if (!res.ok) {
    console.error("Supabase update failed:", res.status, await res.text());
    return NextResponse.json(
      { error: "Could not update the message." },
      { status: 502 }
    );
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const blocked = guard(req);
  if (blocked) return blocked;

  const id = req.nextUrl.searchParams.get("id") || "";
  if (!id) {
    return NextResponse.json({ error: "Missing message id." }, { status: 400 });
  }

  const res = await supabaseFetch(
    `contact_messages?id=eq.${encodeURIComponent(id)}`,
    { method: "DELETE", headers: { Prefer: "return=minimal" } }
  );
  if (!res.ok) {
    console.error("Supabase delete failed:", res.status, await res.text());
    return NextResponse.json(
      { error: "Could not delete the message." },
      { status: 502 }
    );
  }
  return NextResponse.json({ ok: true });
}
