import { useFilterContext } from '@/contexts/FilterContext';
import { useMemo } from 'react';
import { useTasks } from './useTasks';

export function useTaskFilters() {
  // Get filters from shared context
  const {
    filters,
    setStatusFilter,
    setPriorityFilter,
    setSortOrder,
    resetFilters,
  } = useFilterContext();

  // Fetch filtered tasks from the API using server-side filters
  const {
    data: tasks = [],
    isLoading,
    error,
    refetch,
  } = useTasks({
    status: filters.status,
    priority: filters.priority,
    sortOrder: filters.sortOrder,
  });

  // Fetch all tasks (unfiltered) for statistics
  const { data: allTasks = [] } = useTasks();

  // Computed values for tasks stats (based on all tasks, not filtered)
  const taskStats = useMemo(() => {
    const total = allTasks.length;
    const completed = allTasks.filter((task) => task.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [allTasks]);

  return {
    // State
    tasks,
    filters,
    taskStats,

    // Actions
    setStatusFilter,
    setPriorityFilter,
    setSortOrder,
    resetFilters,

    // Query state
    isLoading,
    error,
    refetch,
  };
}
