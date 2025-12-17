import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { ok: false, message: "Missing credentials" },
      { status: 400 }
    );
  }

  const role = String(email).startsWith("admin") ? "admin" : "user";

  const res = NextResponse.json({ ok: true, role });

  res.cookies.set("session", "valid", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
  });

  res.cookies.set("role", role, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
  });

  return res;
}
