import { api } from "@/utils/trpc";
import { TodoForm } from "./todo-form";
import { TodoItem } from "./todo-item";

export function TodoList() {
  const { data: todos, isLoading } = api.todo.list.useQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-500">読み込み中...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">ToDo リスト</h1>
      <TodoForm />
      <div className="space-y-2">
        {todos?.map((todo: any) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
        {todos?.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            タスクがありません
          </div>
        )}
      </div>
    </div>
  );
}
