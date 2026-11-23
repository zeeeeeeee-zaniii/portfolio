// Server-only admin session helpers.
// The session cookie holds an HMAC-style token derived from ADMIN_PASSCODE,
// so the passcode itself never reaches the browser.

import { createHash } from "crypto";
import type { NextRequest } from "next/server";

export const ADMIN_COOKIE = "zf_admin_session";

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSCODE);
}

export function expectedToken(): string {
  const passcode = process.env.ADMIN_PASSCODE || "";
  return createHash("sha256")
    .update(`zainab-portfolio-admin:${passcode}`)
    .digest("hex");
}

export function checkPasscode(candidate: string): boolean {
  if (!adminConfigured()) return false;
  return candidate === process.env.ADMIN_PASSCODE;
}

export function isAdminRequest(req: NextRequest): boolean {
  if (!adminConfigured()) return false;
  const cookie = req.cookies.get(ADMIN_COOKIE);
  return Boolean(cookie && cookie.value === expectedToken());
}
