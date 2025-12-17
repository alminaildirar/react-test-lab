"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

type Todo = { id: string; title: string; completed: boolean };
type Filter = "all" | "active" | "completed";

export default function TodosClient() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/todos");
        const json = (await res.json()) as Todo[];
        if (!cancelled) setTodos(json);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  async function addTodo(e: React.FormEvent) {
    e.preventDefault();
    const clean = title.trim();
    if (!clean) return;

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: clean }),
    });

    const todo = (await res.json()) as Todo;
    setTodos((t) => [todo, ...t]);
    setTitle("");
  }

  async function toggle(id: string) {
    await fetch(`/api/todos/${id}`, { method: "PATCH" });
    setTodos((t) =>
      t.map((x) => (x.id === id ? { ...x, completed: !x.completed } : x))
    );
  }

  async function remove(id: string) {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    setTodos((t) => t.filter((x) => x.id !== id));
  }

  const filteredTodos =
    filter === "all"
      ? todos
      : filter === "active"
      ? todos.filter((t) => !t.completed)
      : todos.filter((t) => t.completed);

  return (
    <>
      <form onSubmit={addTodo} className="todoForm">
        <input
          className="input"
          aria-label="new-todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add todo…"
        />
        <button className="btn" type="submit">
          Add
        </button>
      </form>

      <div
        className="row"
        style={{ justifyContent: "space-between", marginTop: 12 }}
      >
        <div className="tabs" aria-label="todo-filters">
          <button
            type="button"
            className={`tab ${filter === "all" ? "tabActive" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            type="button"
            className={`tab ${filter === "active" ? "tabActive" : ""}`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            type="button"
            className={`tab ${filter === "completed" ? "tabActive" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        <span className="badge">
          {filter === "all"
            ? `${todos.length} total`
            : `${filteredTodos.length} shown`}
        </span>
      </div>

      {loading && <p>Loading…</p>}

      {!loading && filteredTodos.length === 0 && (
        <p className="badge" style={{ marginTop: 14 }}>
          No items for this filter.
        </p>
      )}

      {!loading && filteredTodos.length > 0 && (
        <ul className="todoList">
          {filteredTodos.map((t) => (
            <li key={t.id} className="todoItem" data-completed={t.completed}>
              <div className="todoTitle">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggle(t.id)}
                />
                <Link href={`/todos/${t.id}`}>
                  <span
                    style={{
                      textDecoration: t.completed ? "line-through" : "none",
                    }}
                  >
                    {t.title}
                  </span>
                </Link>
              </div>

              <button
                className="btn"
                type="button"
                aria-label={`delete-${t.id}`}
                onClick={() => remove(t.id)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
