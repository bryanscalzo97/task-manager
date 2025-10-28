import { router } from 'expo-router';
import { StyleSheet } from 'react-native';

import { FloatingActionButton } from '@/components/FloatingActionButton';
import { TaskList } from '@/components/TaskList';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function HomeScreen() {
  const handleAddTask = () => {
    router.push('/add-task');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type='title'>Task Manager</ThemedText>
        <ThemeToggle />
      </ThemedView>

      <TaskList />
      <FloatingActionButton onPress={handleAddTask} disabled={false} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
});
