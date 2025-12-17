import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import React from "react";
import LoginPage from "../../app/login/page";
import { nextNavMocks } from "../setupTests";
import { server } from "../testServer";

describe("LoginPage", () => {
  test("shows error on invalid credentials", async () => {
    server.use(
      http.post("/api/login", () =>
        HttpResponse.json(
          { ok: false, message: "Invalid credentials" },
          { status: 401 }
        )
      )
    );

    render(<LoginPage />);

    await userEvent.clear(screen.getByLabelText("password"));
    await userEvent.type(screen.getByLabelText("password"), "wrong{enter}");

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Invalid credentials"
    );
  });

  test("redirects to next on success", async () => {
    server.use(
      http.post("/api/login", () =>
        HttpResponse.json({ ok: true, role: "user" })
      )
    );

    render(<LoginPage />);

    await userEvent.clear(screen.getByLabelText("password"));
    await userEvent.type(screen.getByLabelText("password"), "123456{enter}");

    // setupTests: useSearchParams -> next=/todos
    expect(nextNavMocks.push).toHaveBeenCalledWith("/todos");
    expect(nextNavMocks.refresh).toHaveBeenCalled();
  });
});
