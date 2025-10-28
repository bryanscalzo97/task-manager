import { Task, TaskPriority } from '@/types/task';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const API_BASE = 'http://localhost:3000';

// Query for fetching tasks
export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async (): Promise<Task[]> => {
      const response = await fetch(`${API_BASE}/tasks`);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const tasks = await response.json();
      // Convert date strings back to Date objects
      return tasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
      }));
    },
  });
}

// Mutation for adding a task
export function useAddTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      text,
      priority,
    }: {
      text: string;
      priority: TaskPriority;
    }) => {
      const newTask: Task = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
        priority,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const response = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

// Mutation for toggling a task
export function useToggleTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      // First get the current task
      const getResponse = await fetch(`${API_BASE}/tasks/${id}`);
      if (!getResponse.ok) {
        throw new Error('Failed to fetch task');
      }
      const currentTask = await getResponse.json();

      const updatedTask = {
        ...currentTask,
        completed: !currentTask.completed,
        updatedAt: new Date(),
      };

      const response = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

// Mutation for deleting a task
export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

// Mutation for editing a task
export function useEditTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      text,
      priority,
    }: {
      id: string;
      text: string;
      priority: TaskPriority;
    }) => {
      // First get the current task
      const getResponse = await fetch(`${API_BASE}/tasks/${id}`);
      if (!getResponse.ok) {
        throw new Error('Failed to fetch task');
      }
      const currentTask = await getResponse.json();

      const updatedTask = {
        ...currentTask,
        text: text.trim(),
        priority,
        updatedAt: new Date(),
      };

      const response = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}
