import { useQuery } from '@tanstack/react-query';
import { SortOrder, Task, TaskFilters, TaskStatus } from '../../models/task';
import { loadTasks } from '../../utils/storage';

const API_BASE = 'http://localhost:3000';

function applyFilters(
  tasks: Task[],
  filters?: TaskFilters,
  sortOrder?: SortOrder
): Task[] {
  let filtered = [...tasks];

  if (filters?.status && filters.status !== TaskStatus.All) {
    filtered = filtered.filter(
      (task) => task.completed === (filters.status === TaskStatus.Completed)
    );
  }

  if (filters?.priority && filters.priority !== TaskStatus.All) {
    filtered = filtered.filter((task) => task.priority === filters.priority);
  }

  if (filters?.search?.trim()) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter((task) =>
      task.text.toLowerCase().includes(searchLower)
    );
  }

  const order = sortOrder || SortOrder.Desc;
  filtered.sort((a, b) => {
    const dateA = a.createdAt.getTime();
    const dateB = b.createdAt.getTime();
    return order === SortOrder.Asc ? dateA - dateB : dateB - dateA;
  });

  return filtered;
}

export function useTasks(filters?: TaskFilters) {
  const sortOrder = filters?.sortOrder || SortOrder.Desc;
  const queryKey = [
    'tasks',
    filters?.status || TaskStatus.All,
    filters?.priority || TaskStatus.All,
    filters?.search || '',
    sortOrder,
  ];

  return useQuery({
    queryKey,
    queryFn: async (): Promise<Task[]> => {
      let tasks: Task[] = [];

      try {
        const params = new URLSearchParams();
        if (filters?.status && filters.status !== TaskStatus.All) {
          params.append(
            'completed',
            filters.status === TaskStatus.Completed ? 'true' : 'false'
          );
        }
        if (filters?.priority && filters.priority !== TaskStatus.All) {
          params.append('priority', String(filters.priority));
        }
        if (filters?.search?.trim()) {
          params.append('q', filters.search.trim());
        }

        const url = `${API_BASE}/tasks${
          params.toString() ? `?${params.toString()}` : ''
        }`;
        const response = await fetch(url);

        if (response.ok) {
          const serverTasks = await response.json();
          tasks = serverTasks.map((task: any) => ({
            ...task,
            createdAt: new Date(task.createdAt),
            updatedAt: new Date(task.updatedAt),
          }));
        } else {
          throw new Error(`Server returned ${response.status}`);
        }
      } catch (error) {
        const stored = await loadTasks();
        if (stored) {
          tasks = stored;
        } else {
          throw new Error(
            'Failed to fetch tasks from server and no local backup available'
          );
        }
      }

      return applyFilters(tasks, filters, sortOrder);
    },
  });
}
