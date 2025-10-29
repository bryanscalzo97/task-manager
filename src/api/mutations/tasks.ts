import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Task, TaskPriority } from '../../models/task';

const API_BASE = 'http://localhost:3000';

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

export function useToggleTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
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
      const getResponse = await fetch(`${API_BASE}/tasks/${id}`);
      if (!getResponse.ok) {
        throw new Error('Failed to fetch task');
      }
      const currentTask = await getResponse.json();

      const taskPayload = {
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
        body: JSON.stringify(taskPayload),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const updatedTask = await response.json();
      return updatedTask;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}
