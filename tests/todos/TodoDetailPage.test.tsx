import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import TodoDetailPage from "../../app/todos/[id]/page";
import { server } from "../testServer";

describe("TodoDetailPage", () => {
  test("renders todo details", async () => {
    render(<TodoDetailPage />);
    expect(await screen.findByText("Todo Detail")).toBeInTheDocument();
    expect(await screen.findByText("Learn Testing")).toBeInTheDocument();
  });

  test("renders not found when api returns 404", async () => {
    server.use(
      http.get("/api/todos/:id", () =>
        HttpResponse.json({ message: "Not found" }, { status: 404 })
      )
    );

    render(<TodoDetailPage />);
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Todo not found"
    );
    expect(
      screen.getByRole("link", { name: /back to todos/i })
    ).toBeInTheDocument();
  });
});
