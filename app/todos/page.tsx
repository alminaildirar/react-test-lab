import UserPanelServer from "../components/UserPanelServer";
import TodosClient from "./TodosClient";

export default function TodosPage() {
  return (
    <div className="container">
      <div className="shell">
        <aside className="card sidebar">
          <h1 className="h1">Todos</h1>
          <p className="h2">CRUD + Responsive Grid/Flex</p>

          <UserPanelServer />
        </aside>

        <main className="card">
          <TodosClient />
        </main>
      </div>
    </div>
  );
}
