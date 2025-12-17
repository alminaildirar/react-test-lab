"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

function safeNext(next: string | null): string {
  if (!next) return "/todos";
  if (!next.startsWith("/")) return "/todos";
  if (next.startsWith("//")) return "/todos";
  return next;
}

async function readErrorMessage(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as { message?: string };
    return data?.message ?? "Login failed";
  } catch {
    return "Login failed";
  }
}

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = safeNext(params.get("next"));

  const [email, setEmail] = useState("mina@example.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!res.ok) {
      setError(await readErrorMessage(res));
      return;
    }

    router.push(next);
    router.refresh();
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 520, margin: "50px auto" }}>
        <h1 className="h1">Giriş</h1>
        <p className="h2">Cookie auth + middleware guard</p>

        <form onSubmit={onSubmit} aria-label="login-form">
          <div style={{ display: "grid", gap: 10 }}>
            <label>
              <div className="badge">Email</div>
              <input
                className="input"
                name="email"
                aria-label="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              />
            </label>

            <label>
              <div className="badge">Password</div>
              <input
                className="input"
                name="password"
                type="password"
                aria-label="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </label>

            {error && <p role="alert">{error}</p>}

            <button className="btn" disabled={loading} type="submit">
              {loading ? "Giriş yapılıyor..." : "Giriş yap"}
            </button>

            <p className="badge">
              Demo: <code>password = 123456</code> •{" "}
              <code>admin@example.com</code> → ADMIN
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
