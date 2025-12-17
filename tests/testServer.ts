import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

type Todo = { id: string; title: string; completed: boolean };

let todos: Todo[] = [
  { id: "1", title: "Learn Testing", completed: false },
  { id: "2", title: "Build Responsive UI", completed: true },
];

export function resetTodos() {
  todos = [
    { id: "1", title: "Learn Testing", completed: false },
    { id: "2", title: "Build Responsive UI", completed: true },
  ];
}

export const server = setupServer(
  http.get("/api/todos", () => {
    return HttpResponse.json(todos);
  }),

  http.post("/api/todos", async ({ request }) => {
    const body = (await request.json()) as { title?: string };
    const title = body.title?.trim();
    if (!title)
      return HttpResponse.json({ message: "Title required" }, { status: 400 });

    const todo: Todo = { id: String(Date.now()), title, completed: false };
    todos.unshift(todo);
    return HttpResponse.json(todo, { status: 201 });
  }),

  http.get("/api/todos/:id", ({ params }) => {
    const id = String(params.id);
    const todo = todos.find((t) => t.id === id);
    if (!todo)
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    return HttpResponse.json(todo);
  }),

  http.patch("/api/todos/:id", ({ params }) => {
    const id = String(params.id);
    const todo = todos.find((t) => t.id === id);
    if (!todo)
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    todo.completed = !todo.completed;
    return HttpResponse.json({ ok: true });
  }),

  http.delete("/api/todos/:id", ({ params }) => {
    const id = String(params.id);
    todos = todos.filter((t) => t.id !== id);
    return HttpResponse.json({ ok: true });
  }),

  http.post("/api/logout", () => {
    return HttpResponse.json({ ok: true });
  })
);
