import { Task } from '@/types/task';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_STORAGE_KEY = '@task_manager_tasks';

export async function loadTasks(): Promise<Task[]> {
  try {
    const tasksJson = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
    if (tasksJson) {
      const tasks = JSON.parse(tasksJson);
      return tasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
      }));
    }
    return [];
  } catch (error) {
    console.error('Error loading tasks from storage:', error);
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  try {
    const tasksJson = JSON.stringify(tasks);
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, tasksJson);
  } catch (error) {
    console.error('Error saving tasks to storage:', error);
    throw error;
  }
}

export async function clearAllTasks(): Promise<void> {
  try {
    await AsyncStorage.removeItem(TASKS_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing tasks from storage:', error);
    throw error;
  }
}
