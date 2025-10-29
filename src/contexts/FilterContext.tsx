import React, { createContext, useContext, useState } from 'react';
import {
  FilterState,
  SortOrder,
  TaskPriority,
  TaskStatus,
} from '../models/task';

type FilterContextType = {
  filters: FilterState;
  setStatusFilter: (status: TaskStatus) => void;
  setPriorityFilter: (priority: TaskPriority | TaskStatus.All) => void;
  setSortOrder: (order: SortOrder) => void;
  resetFilters: () => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FilterState>({
    status: TaskStatus.All,
    priority: TaskStatus.All,
    sortOrder: SortOrder.Desc,
  });

  const setStatusFilter = (status: TaskStatus) => {
    setFilters((prev) => ({ ...prev, status }));
  };

  const setPriorityFilter = (priority: TaskPriority | TaskStatus.All) => {
    setFilters((prev) => ({ ...prev, priority }));
  };

  const setSortOrder = (sortOrder: SortOrder) => {
    setFilters((prev) => ({ ...prev, sortOrder }));
  };

  const resetFilters = () => {
    setFilters({
      status: TaskStatus.All,
      priority: TaskStatus.All,
      sortOrder: SortOrder.Desc,
    });
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        setStatusFilter,
        setPriorityFilter,
        setSortOrder,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilterContext() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
}
