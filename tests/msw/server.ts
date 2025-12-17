import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

let todos = [
  { id: "1", title: "Learn Testing", completed: false },
  { id: "2", title: "Build Responsive UI", completed: true },
];

export const server = setupServer(
  http.get("/api/todos", () => HttpResponse.json(todos)),

  http.post("/api/todos", async ({ request }) => {
    const body = (await request.json()) as { title: string };
    const newTodo = {
      id: String(Date.now()),
      title: body.title,
      completed: false,
    };
    todos = [newTodo, ...todos];
    return HttpResponse.json(newTodo, { status: 201 });
  })
);
