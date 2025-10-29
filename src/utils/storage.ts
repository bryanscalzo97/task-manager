import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../models/task';

const STORAGE_KEY = '@tasks';

export async function saveTasks(tasks: Task[]): Promise<void> {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        tasks.map((task) => ({
          ...task,
          createdAt: task.createdAt.toISOString(),
          updatedAt: task.updatedAt.toISOString(),
        }))
      )
    );
  } catch (error) {
    console.error('[Storage] Failed to save tasks:', error);
    throw new Error('Failed to persist tasks locally');
  }
}

export async function loadTasks(): Promise<Task[] | null> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const tasks = JSON.parse(stored);
    return tasks.map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt),
    }));
  } catch (error) {
    console.error('[Storage] Failed to load tasks:', error);
    return null;
  }
}
