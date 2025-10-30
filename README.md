### Task Manager — React Native (Expo)

#### Demo


https://github.com/user-attachments/assets/0bd5eb8a-da28-4278-905d-9cdec48f3fa2



#### Setup

- Install dependencies:
  ```bash
  npm install
  # or
  yarn
  ```
- Start mock API (json-server):
  ```bash
  yarn server
  ```
- Run the app:
  ```bash
  yarn start
  ```
  - iOS: press `i` (Simulator)
  - Android: press `a` (Emulator)
  - Or scan the QR with Expo Go

#### Tech Stack

- Expo + Expo Router (file-based routing in `app/`)
- React Query (cache, fetching, mutations with optimistic updates)
- AsyncStorage (local persistence)
- Context API (theme and filters)
- json-server (mock REST API using `data/db.json`)
- React Native Gesture Handler + Reanimated (swipe-to-reveal on task items)

#### Global State Choice

Chose Context API over Zustand because Expo already exposes theming through a `Context`, and this keeps patterns consistent with the Expo stack. Given the scoped requirements, Context is sufficient without adding another dependency.

#### Relevant Structure

- Screens: `app/index.tsx`, `app/add-task.tsx`, `app/edit-task.tsx`, `app/filters.tsx`
- Screen styles: `app/*.styles.ts`
- List & items:
  - `src/components/TaskList/TaskList.tsx`
  - `src/components/TaskItem/TaskItem.tsx`, `src/components/TaskItem/TaskItem.styles.ts`
- Theming: `src/contexts/ThemeContext.tsx`, `src/utils/use-theme-color.ts`, `constants/theme.ts`
- Filters: `src/contexts/FilterContext.tsx`, `src/hooks/useTaskFilters.ts`
- Data:
  - Queries: `src/api/queries/tasks.ts`
  - Mutations: `src/api/mutations/tasks.ts`
  - Persistence: `src/utils/storage.ts`
  - Mock DB: `data/db.json`
- Root/providers/gesture: `app/_layout.tsx`

#### Features per Requirement

- Add Tasks
  - Text input with validation (non-empty), “Add Task” button, clears after adding
  - Files: `app/add-task.tsx`, `app/add-task.styles.ts`
- Task List
  - `FlatList` rendering `TaskItem` with: text, checkbox (toggle complete), delete, priority badge (High/Med/Low), completed styling
  - Swipe left to reveal Edit/Delete (Reanimated + Gesture Handler)
  - Files: `src/components/TaskList/TaskList.tsx`, `src/components/TaskItem/*`
- Filtering System
  - Combined filters: Status (All/Completed/Pending), Priority (All/High/Med/Low), Sort (Newest/Oldest)
  - Modern chip-based UI with horizontal scroll
  - Files: `app/filters.tsx`, `app/filters.styles.ts`, `src/contexts/FilterContext.tsx`
- Data Persistence
  - `AsyncStorage` helpers: `saveTasks` / `loadTasks` (`src/utils/storage.ts`)
  - Cache bootstrap on startup via `useInitializeTasks` (`app/_layout.tsx`)
  - Fallback to local data if network fails (`useTasks`)
- Global State Management
  - `ThemeContext` and `FilterContext` with hooks
  - React Query for server/cache with optimistic updates on add/toggle/edit/delete
- Bonus
  - Pull-to-refresh with theme-aware spinner (`RefreshControl` uses theme `tintColor`)
  - Counters on Home (total/completed/pending)
  - Dark mode support throughout
  - Fixed bottom actions in modals: “Show tasks”, “Save Changes”, “Add Task”

#### How It Works

- On app start, tasks are loaded from `AsyncStorage` (if present) into the React Query cache.
- `useTasks` fetches from `json-server` first; if it fails, it loads from local storage and applies filters/sorting in memory.
- Mutations perform optimistic updates, rollback on error, and sync the final state to `AsyncStorage` on success.
- UI overview:
  - Home: title, filter button, theme toggle, stats, list with swipe actions
  - Filters: horizontal chips for status/priority, sort options, fixed footer “Show tasks”
  - Add/Edit: inputs with priority selector, fixed footer action buttons
