export enum TaskPriority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export enum TaskStatus {
  All = 'All',
  Completed = 'Completed',
  Pending = 'Pending',
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export type Task = {
  id: string;
  text: string;
  completed: boolean;
  priority: TaskPriority;
  createdAt: Date;
  updatedAt: Date;
};

export type FilterState = {
  status: TaskStatus;
  priority: TaskPriority | typeof TaskStatus.All;
  sortOrder: SortOrder;
};

export type TaskFilters = {
  status?: TaskStatus;
  priority?: TaskPriority | TaskStatus.All;
  search?: string;
  sortOrder?: SortOrder;
};
