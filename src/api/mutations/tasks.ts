import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SortOrder, Task, TaskPriority, TaskStatus } from '../../models/task';
import { saveTasks } from '../../utils/storage';

const API_BASE = 'http://localhost:3000';

async function syncTasksToStorage(
  queryClient: ReturnType<typeof useQueryClient>
) {
  try {
    const allTasks = queryClient.getQueryData<Task[]>([
      'tasks',
      TaskStatus.All,
      TaskStatus.All,
      '',
      SortOrder.Desc,
    ]);
    if (allTasks && allTasks.length >= 0) {
      await saveTasks(allTasks);
    }
  } catch (error) {
    console.error('[Storage] Failed to sync tasks:', error);
  }
}

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
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousQueries = queryClient.getQueriesData({
        queryKey: ['tasks'],
      });

      queryClient.setQueriesData(
        { queryKey: ['tasks'] },
        (old: Task[] | undefined) => {
          if (!old) return old;
          const newTask: Task = {
            id: Date.now().toString(),
            text: variables.text,
            completed: false,
            priority: variables.priority,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          return [...old, newTask];
        }
      );

      return { previousQueries };
    },
    onError: (err, variables, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      await syncTasksToStorage(queryClient);
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
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousQueries = queryClient.getQueriesData({
        queryKey: ['tasks'],
      });

      queryClient.setQueriesData(
        { queryKey: ['tasks'] },
        (old: Task[] | undefined) => {
          if (!old) return old;
          return old.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          );
        }
      );

      return { previousQueries };
    },
    onError: (err, id, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      await syncTasksToStorage(queryClient);
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
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousQueries = queryClient.getQueriesData({
        queryKey: ['tasks'],
      });

      queryClient.setQueriesData(
        { queryKey: ['tasks'] },
        (old: Task[] | undefined) => {
          if (!old) return old;
          return old.filter((task) => task.id !== id);
        }
      );

      return { previousQueries };
    },
    onError: (err, id, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      await syncTasksToStorage(queryClient);
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
    onMutate: async ({ id, text, priority }) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousQueries = queryClient.getQueriesData({
        queryKey: ['tasks'],
      });

      queryClient.setQueriesData(
        { queryKey: ['tasks'] },
        (old: Task[] | undefined) => {
          if (!old) return old;
          return old.map((task) =>
            task.id === id
              ? { ...task, text: text.trim(), priority, updatedAt: new Date() }
              : task
          );
        }
      );

      return { previousQueries };
    },
    onError: (err, variables, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      await syncTasksToStorage(queryClient);
    },
  });
}
