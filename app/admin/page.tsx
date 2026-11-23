"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

interface Msg {
  id: string;
  name: string;
  email: string;
  website_type: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

type State = "loading" | "locked" | "ready" | "error";

export default function AdminPage() {
  const [state, setState] = useState<State>("loading");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loginError, setLoginError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/messages", { cache: "no-store" });
      if (res.status === 401) {
        setState("locked");
        return;
      }
      if (!res.ok) throw new Error("load failed");
      const data = await res.json();
      setMessages(data.messages || []);
      setState("ready");
    } catch {
      setState("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function onLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setLoginError("");
    const passcode = String(
      new FormData(e.currentTarget).get("passcode") || ""
    );
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setLoginError(data.error || "Incorrect passcode.");
        return;
      }
      await load();
    } catch {
      setLoginError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function toggleRead(msg: Msg) {
    const res = await fetch("/api/admin/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: msg.id, is_read: !msg.is_read }),
    });
    if (res.ok) {
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, is_read: !m.is_read } : m))
      );
    }
  }

  async function remove(msg: Msg) {
    if (!window.confirm(`Delete the message from ${msg.name}?`)) return;
    const res = await fetch(
      `/api/admin/messages?id=${encodeURIComponent(msg.id)}`,
      { method: "DELETE" }
    );
    if (res.ok) {
      setMessages((prev) => prev.filter((m) => m.id !== msg.id));
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setMessages([]);
    setState("locked");
  }

  const unread = messages.filter((m) => !m.is_read).length;

  return (
    <>
      <header className="site-header">
        <div className="wrap header-inner">
          <Link href="/" className="brand">
            <span className="brand-badge">ZF</span>
            <span>
              <span className="brand-name">Zainab Fatima</span>
              <br />
              <span className="brand-role">Admin Panel</span>
            </span>
          </Link>
          <div className="header-actions">
            <ThemeToggle />
            <Link href="/" className="admin-link">
              ← View site
            </Link>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <div className="wrap">
          {state === "loading" && <p className="empty-note">Loading…</p>}

          {state === "error" && (
            <p className="empty-note">
              Could not load the admin panel. Please refresh the page.
            </p>
          )}

          {state === "locked" && (
            <form className="admin-card" onSubmit={onLogin}>
              <h2 className="display" style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                🔐 Admin login
              </h2>
              <p style={{ color: "var(--muted)", fontSize: "0.92rem", marginBottom: "1.2rem" }}>
                Enter your passcode to read contact form messages.
              </p>
              <div className="field">
                <label htmlFor="passcode">Passcode</label>
                <input
                  id="passcode"
                  name="passcode"
                  type="password"
                  required
                  autoComplete="current-password"
                />
              </div>
              <button type="submit" className="btn btn-rose" disabled={busy}>
                {busy ? "Checking…" : "Open Inbox"}
              </button>
              {loginError && <p className="form-note err">{loginError}</p>}
            </form>
          )}

          {state === "ready" && (
            <>
              <div className="admin-head">
                <div>
                  <h2 className="display" style={{ fontSize: "1.7rem" }}>
                    Inbox
                  </h2>
                  <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                    {messages.length} message{messages.length === 1 ? "" : "s"} ·{" "}
                    {unread} unread
                  </p>
                </div>
                <button type="button" className="mini-btn" onClick={logout}>
                  Log out
                </button>
              </div>

              {messages.length === 0 ? (
                <p className="empty-note">
                  No messages yet. New contact form submissions will appear here.
                </p>
              ) : (
                <div className="msg-list">
                  {messages.map((m) => (
                    <article key={m.id} className={`msg${m.is_read ? "" : " unread"}`}>
                      <div className="msg-top">
                        <span className="msg-name">
                          {m.name}
                          {!m.is_read && " · new"}
                        </span>
                        <span className="msg-meta">
                          {new Date(m.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="msg-meta">
                        {m.email}
                        {m.website_type ? ` · ${m.website_type}` : ""}
                      </p>
                      <p className="msg-body">{m.message}</p>
                      <div className="msg-actions">
                        <a
                          className="mini-btn"
                          href={`mailto:${m.email}?subject=${encodeURIComponent(
                            "Re: your website enquiry"
                          )}`}
                        >
                          Reply by email
                        </a>
                        <button
                          type="button"
                          className="mini-btn"
                          onClick={() => toggleRead(m)}
                        >
                          {m.is_read ? "Mark unread" : "Mark read"}
                        </button>
                        <button
                          type="button"
                          className="mini-btn danger"
                          onClick={() => remove(m)}
                        >
                          Delete
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
