import { useMemo } from 'react';
import { useTasks } from '../api/queries/tasks';
import { useFilterContext } from '../contexts/FilterContext';

export function useTaskFilters() {
  const {
    filters,
    setStatusFilter,
    setPriorityFilter,
    setSortOrder,
    resetFilters,
  } = useFilterContext();

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

  const { data: allTasks = [] } = useTasks();

  const taskStats = useMemo(() => {
    const total = allTasks.length;
    const completed = allTasks.filter((task) => task.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [allTasks]);

  return {
    tasks,
    filters,
    taskStats,
    setStatusFilter,
    setPriorityFilter,
    setSortOrder,
    resetFilters,
    isLoading,
    error,
    refetch,
  };
}
