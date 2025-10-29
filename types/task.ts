export type TaskPriority = 'High' | 'Medium' | 'Low';

export type TaskStatus = 'All' | 'Completed' | 'Pending';

export type Task = {
  id: string;
  text: string;
  completed: boolean;
  priority: TaskPriority;
  createdAt: Date;
  updatedAt: Date;
};

export type SortOrder = 'asc' | 'desc';

export type FilterState = {
  status: TaskStatus;
  priority: TaskPriority | 'All';
  sortOrder: SortOrder;
};
