"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(
    new RegExp(
      "(^| )" + name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") + "=([^;]+)"
    )
  );

  return match ? decodeURIComponent(match[2]) : null;
}

export default function UserPanel() {
  const router = useRouter();

  const [role] = useState<string | null>(() => readCookie("role"));

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
