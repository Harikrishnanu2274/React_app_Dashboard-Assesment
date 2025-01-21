// src/services/taskService.ts
import { Task } from '../type';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
  const tasks = await response.json();
  return tasks.map((task: any) => ({
    id: task.id,
    title: task.title,
    status: task.completed ? 'Completed' : 'Pending',
    priority: 'Medium', // Default priority
  }));
};
