import "@testing-library/jest-dom/vitest";
import React from "react";
import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { resetTodos, server } from "./testServer";
import { toBeLoadingButton } from "./matchers";

/* MSW lifecycle */
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  server.resetHandlers();
  resetTodos();
});
afterAll(() => server.close());

/* next/image mock */
vi.mock("next/image", () => ({
  default: (props: { src: string; alt: string }) => {
    return <img src={props.src} alt={props.alt} />;
  },
}));

/* next/link mock */
vi.mock("next/link", () => ({
  default: (props: { href: string; children: React.ReactNode }) => {
    return <a href={props.href}>{props.children}</a>;
  },
}));

/* next/navigation mock */
const push = vi.fn();
const refresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh }),
  useParams: () => ({ id: "1" }),
  useSearchParams: () => new URLSearchParams("next=/todos"),
}));

export const nextNavMocks = { push, refresh };

expect.extend({ toBeLoadingButton });
