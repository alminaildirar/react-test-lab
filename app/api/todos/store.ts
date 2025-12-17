export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export const todosStore: Todo[] = [
  { id: "1", title: "Learn Testing", completed: false },
  { id: "2", title: "Build Responsive UI", completed: true },
];
