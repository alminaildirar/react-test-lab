"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Todo = { id: string; title: string; completed: boolean };

function isAbortError(err: unknown): boolean {
  return err instanceof DOMException && err.name === "AbortError";
}

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "Error";
}

export default function TodoDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [todo, setTodo] = useState<Todo | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Derived loading (effect içinde senkron reset yok)
  const isLoading = todo === null && error === null;

  useEffect(() => {
    const ac = new AbortController();
    let active = true;

    (async () => {
      try {
        const res = await fetch(`/api/todos/${id}`, { signal: ac.signal });
        if (!res.ok) throw new Error("Not found");

        const json = (await res.json()) as Todo;

        if (active) {
          setError(null);
          setTodo(json);
        }
      } catch (err: unknown) {
        if (isAbortError(err)) return;

        if (active) {
          setTodo(null);
          setError(getErrorMessage(err));
        }
      }
    })();

    return () => {
      active = false;
      ac.abort();
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="container">
        <div className="card" style={{ maxWidth: 780, margin: "0 auto" }}>
          <p>Loading…</p>
        </div>
      </div>
    );
  }

  if (error || !todo) {
    return (
      <div className="container">
        <div className="card" style={{ maxWidth: 780, margin: "0 auto" }}>
          <p role="alert">Todo not found</p>
          <Link className="btn" href="/todos">
            ← Back to Todos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 780, margin: "0 auto" }}>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div>
            <h1 className="h1" style={{ marginBottom: 4 }}>
              Todo Detail
            </h1>
            <p className="h2 prose" style={{ marginBottom: 0 }}>
              Routing + fetch + responsive image
            </p>
          </div>

          <span className={`pill ${todo.completed ? "pillAdmin" : "pillUser"}`}>
            {todo.completed ? "COMPLETED" : "PENDING"}
          </span>
        </div>

        <div className="media" style={{ marginTop: 14 }}>
          <Image
            src="/hero-todo.svg"
            alt="Todo hero"
            width={1200}
            height={600}
            style={{ width: "100%", height: "auto" }}
            sizes="(max-width: 768px) 100vw, 780px"
          />
        </div>

        <div style={{ marginTop: 16 }} className="prose">
          <p>
            <strong>ID:</strong> {todo.id}
          </p>
          <p>
            <strong>Title:</strong> {todo.title}
          </p>
        </div>

        <div className="row" style={{ marginTop: 16 }}>
          <Link className="btn" href="/todos">
            ← Back to Todos
          </Link>
        </div>
      </div>
    </div>
  );
}
