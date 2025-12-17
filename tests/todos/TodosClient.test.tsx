import TodosClient from "@/app/todos/TodosClient";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("TodosClient", () => {
  test("loads todos and filters (all/active/completed)", async () => {
    render(<TodosClient />);

    // load
    expect(await screen.findByText("Learn Testing")).toBeInTheDocument();
    expect(screen.getByText("Build Responsive UI")).toBeInTheDocument();

    // completed filter
    await userEvent.click(screen.getByRole("button", { name: "Completed" }));
    expect(screen.queryByText("Learn Testing")).not.toBeInTheDocument();
    expect(screen.getByText("Build Responsive UI")).toBeInTheDocument();

    // active filter
    await userEvent.click(screen.getByRole("button", { name: "Active" }));
    expect(screen.getByText("Learn Testing")).toBeInTheDocument();
    expect(screen.queryByText("Build Responsive UI")).not.toBeInTheDocument();
  });

  test("adds, toggles and deletes a todo", async () => {
    render(<TodosClient />);

    // wait load
    await screen.findByText("Learn Testing");

    // add
    const input = screen.getByLabelText("new-todo");
    await userEvent.type(input, "Write tests{enter}");
    expect(await screen.findByText("Write tests")).toBeInTheDocument();

    const li = screen.getByText("Write tests").closest("li");
    expect(li).not.toBeNull();
    if (!li) return;

    // toggle
    const checkbox = within(li).getByRole("checkbox");
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    // derive id from link href
    const link = within(li).getByRole("link", { name: "Write tests" });
    const href = link.getAttribute("href") ?? "";
    const todoId = href.split("/").pop() ?? "";

    // delete by accessible name
    const delBtn = within(li).getByRole("button", { name: `delete-${todoId}` });
    await userEvent.click(delBtn);

    expect(screen.queryByText("Write tests")).not.toBeInTheDocument();
  });
});
