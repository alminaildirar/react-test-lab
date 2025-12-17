import { NextResponse } from "next/server";
import { todosStore } from "../store";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_: Request, ctx: Ctx) {
  const { id } = await ctx.params;

  const todo = todosStore.find((t) => t.id === id);
  if (!todo) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(todo);
}

export async function PATCH(_: Request, ctx: Ctx) {
  const { id } = await ctx.params;

  const todo = todosStore.find((t) => t.id === id);
  if (!todo) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  todo.completed = !todo.completed;
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, ctx: Ctx) {
  const { id } = await ctx.params;

  const idx = todosStore.findIndex((t) => t.id === id);
  if (idx === -1) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  todosStore.splice(idx, 1);
  return NextResponse.json({ ok: true });
}
