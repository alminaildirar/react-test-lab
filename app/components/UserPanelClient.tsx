"use client";

import { useRouter } from "next/navigation";
import React from "react";

type Props = { role: string | null };

export default function UserPanelClient({ role }: Props) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="userPanel" aria-label="user-panel">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div>
          <div className="badge">Session</div>
          <div style={{ fontWeight: 700 }}>Logged in</div>
        </div>

        {role && (
          <span
            className={`pill ${role === "admin" ? "pillAdmin" : "pillUser"}`}
          >
            {role.toUpperCase()}
          </span>
        )}
      </div>

      <button className="btn btnDanger" type="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
