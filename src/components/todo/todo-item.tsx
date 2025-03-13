import { api } from "@/utils/trpc";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const utils = api.useContext();

  const updateTodo = api.todo.update.useMutation({
    onSuccess: () => {
      utils.todo.list.invalidate();
    },
  });

  const deleteTodo = api.todo.delete.useMutation({
    onSuccess: () => {
      utils.todo.list.invalidate();
    },
  });

  const toggleComplete = () => {
    updateTodo.mutate({
      id: todo.id,
      completed: !todo.completed,
    });
  };

  const handleDelete = () => {
    if (confirm("このタスクを削除してもよろしいですか？")) {
      deleteTodo.mutate({ id: todo.id });
    }
  };

  return (
    <div className="flex items-center gap-2 p-4 border rounded-lg mb-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggleComplete}
        className="h-5 w-5 rounded border-gray-300 focus:ring-blue-500"
      />
      <span
        className={`flex-1 ${
          todo.completed ? "line-through text-gray-500" : ""
        }`}
      >
        {todo.title}
      </span>
      <button
        onClick={handleDelete}
        className="text-red-500 hover:text-red-700 focus:outline-none"
      >
        削除
      </button>
    </div>
  );
}
