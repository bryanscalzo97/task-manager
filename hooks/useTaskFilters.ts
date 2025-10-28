import { FilterState, TaskPriority, TaskStatus } from '@/types/task';
import { useCallback, useMemo, useState } from 'react';
import { useTasks } from './useTasks';

export function useTaskFilters() {
  // Fetch tasks from the API
  const { data: tasks = [] } = useTasks();

  // State for filters
  const [filters, setFilters] = useState<FilterState>({
    status: 'All',
    priority: 'All',
  });

  // Actions for setting filters
  const setStatusFilter = useCallback((status: TaskStatus) => {
    setFilters((prev) => ({ ...prev, status }));
  }, []);
  const setPriorityFilter = useCallback((priority: TaskPriority | 'All') => {
    setFilters((prev) => ({ ...prev, priority }));
  }, []);
  const resetFilters = useCallback(() => {
    setFilters({ status: 'All', priority: 'All' });
  }, []);

  // Computed values for filtered tasks and tasks stats
  const getFilteredTasks = useCallback(
    (tasks: any[]) => {
      return tasks.filter((task) => {
        const statusMatch =
          filters.status === 'All' ||
          (filters.status === 'Completed' && task.completed) ||
          (filters.status === 'Pending' && !task.completed);

        const priorityMatch =
          filters.priority === 'All' || task.priority === filters.priority;

        return statusMatch && priorityMatch;
      });
    },
    [filters]
  );
  const getTaskStats = useCallback((tasks: any[]) => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  }, []);

  // Memoized computed values
  const filteredTasks = useMemo(
    () => getFilteredTasks(tasks),
    [tasks, getFilteredTasks]
  );
  const taskStats = useMemo(() => getTaskStats(tasks), [tasks, getTaskStats]);

  return {
    // State
    tasks: filteredTasks,
    allTasks: tasks,
    filters,
    taskStats,

    // Actions
    setStatusFilter,
    setPriorityFilter,
    resetFilters,
  };
}
