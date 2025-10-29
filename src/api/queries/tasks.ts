import { useQuery } from '@tanstack/react-query';
import { SortOrder, Task, TaskFilters, TaskStatus } from '../../models/task';

const API_BASE = 'http://localhost:3000';

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
      const params = new URLSearchParams();

      if (filters?.status && filters.status !== TaskStatus.All) {
        const completed =
          filters.status === TaskStatus.Completed ? 'true' : 'false';
        params.append('completed', completed);
      }

      if (filters?.priority && filters.priority !== TaskStatus.All) {
        params.append('priority', String(filters.priority));
      }

      if (filters?.search && filters.search.trim()) {
        params.append('q', filters.search.trim());
      }

      const url = `${API_BASE}/tasks${
        params.toString() ? `?${params.toString()}` : ''
      }`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const tasks = await response.json();

      const tasksWithDates = tasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
      }));

      const sortedTasks = tasksWithDates.sort((a: Task, b: Task) => {
        const dateA = a.createdAt.getTime();
        const dateB = b.createdAt.getTime();
        return sortOrder === SortOrder.Asc ? dateA - dateB : dateB - dateA;
      });

      return sortedTasks;
    },
  });
}
