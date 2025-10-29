import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { FilterProvider } from 'src/contexts/FilterContext';
import { ThemeProvider, useTheme } from 'src/contexts/ThemeContext';
import { SortOrder, TaskStatus } from 'src/models/task';
import { loadTasks } from 'src/utils/storage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 3,
      refetchOnMount: false,
    },
  },
});

function useInitializeTasks() {
  useEffect(() => {
    const initializeTasks = async () => {
      try {
        const storedTasks = await loadTasks();
        if (storedTasks && storedTasks.length > 0) {
          queryClient.setQueryData(
            ['tasks', TaskStatus.All, TaskStatus.All, '', SortOrder.Desc],
            storedTasks
          );
        }
      } catch (error) {
        console.error('[Init] Failed to initialize tasks from storage:', error);
      }
    };
    initializeTasks();
  }, []);
}

function RootLayoutNav() {
  const { isDark } = useTheme();

  return (
    <NavigationThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen
          name='add-task'
          options={{
            presentation: 'modal',
            headerShown: false,
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name='filters'
          options={{
            presentation: 'modal',
            headerShown: false,
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name='edit-task'
          options={{
            presentation: 'modal',
            headerShown: false,
            animation: 'slide_from_bottom',
          }}
        />
      </Stack>
      <StatusBar style='auto' />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  useInitializeTasks();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <FilterProvider>
          <RootLayoutNav />
        </FilterProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
