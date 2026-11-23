"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "ok" | "err";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      setStatus("ok");
    } catch {
      setStatus("err");
    }
  }

  return (
    <form className="form-card" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="cf-name">Your name</label>
        <input id="cf-name" name="name" type="text" required autoComplete="name" placeholder="e.g. Alex Morgan" />
      </div>
      <div className="field">
        <label htmlFor="cf-email">Email</label>
        <input id="cf-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
      </div>
      <div className="field">
        <label htmlFor="cf-type">What kind of website do you need?</label>
        <select id="cf-type" name="website_type" defaultValue="Business Website">
          <option>Business Website</option>
          <option>Booking Website</option>
          <option>Online Ordering Website</option>
          <option>Landing Page</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="cf-message">Tell me about your project</label>
        <textarea id="cf-message" name="message" rows={5} required placeholder="What does your business do, and what should your website help with?" />
      </div>
      <button type="submit" className="btn btn-rose" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
      {status === "ok" && (
        <p className="form-note ok">Message sent — thank you! I will get back to you soon.</p>
      )}
      {status === "err" && (
        <p className="form-note err">
          Something went wrong while sending. Please try again, or DM me on Instagram instead.
        </p>
      )}
    </form>
  );
}
