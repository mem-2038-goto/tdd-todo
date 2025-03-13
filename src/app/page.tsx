"use client";

import { TodoList } from "@/components/todo/todo-list";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <TodoList />
      </div>
    </div>
  );
}
