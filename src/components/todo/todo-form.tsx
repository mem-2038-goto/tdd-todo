import { useState } from "react";
import { api } from "@/utils/trpc";

export function TodoForm() {
  const [title, setTitle] = useState("");
  const utils = api.useContext();

  const createTodo = api.todo.create.useMutation({
    onSuccess: () => {
      setTitle("");
      utils.todo.list.invalidate();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    createTodo.mutate({ title: title.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="新しいタスクを入力..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          disabled={createTodo.isPending}
        >
          追加
        </button>
      </div>
    </form>
  );
}
