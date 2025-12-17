import { NextResponse } from "next/server";
import { todosStore, type Todo } from "./store";

export async function GET() {
  return NextResponse.json(todosStore);
}

export async function POST(req: Request) {
  const body = (await req.json()) as { title?: string };
  const title = body.title?.trim();

  if (!title) {
    return NextResponse.json({ message: "Title required" }, { status: 400 });
  }

  const todo: Todo = { id: String(Date.now()), title, completed: false };
  todosStore.unshift(todo);

  return NextResponse.json(todo, { status: 201 });
}
