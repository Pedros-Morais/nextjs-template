'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createSelectors } from './zustandUtils';

// Define Todo item type
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

// Stats type definition for better type safety
export interface TodoStats {
  total: number;
  completed: number;
  active: number;
}

// Define the store state type
interface TodoState {
  // State
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  clearCompleted: () => void;
  
  // Async actions
  fetchTodos: () => Promise<void>;
  
  // Derived state (computed values)
  getTodoById: (id: string) => Todo | undefined;
  getCompletedTodos: () => Todo[];
  getActiveTodos: () => Todo[];
  getStats: () => TodoStats;
}

// Create the base store with persistence
const useTodoStoreBase = create<TodoState>()(
  persist(
    (set, get) => ({
      // Initial state
      todos: [],
      isLoading: false,
      error: null,
  
      // Actions to update state
      addTodo: (text: string) => {
        const newTodo: Todo = {
          id: Date.now().toString(),
          text,
          completed: false,
          createdAt: Date.now(),
        };
        
        set((state) => ({
          todos: [...state.todos, newTodo],
        }));
      },
      
      toggleTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }));
      },
      
      removeTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },
      
      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        }));
      },
      
      // Async action example
      fetchTodos: async () => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          // Example response data
          const mockTodos: Todo[] = [
            {
              id: '1',
              text: 'Learn Zustand',
              completed: true,
              createdAt: Date.now() - 86400000,
            },
            {
              id: '2',
              text: 'Build a Next.js app with Zustand',
              completed: false,
              createdAt: Date.now(),
            },
          ];
          
          set({ todos: mockTodos, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch todos',
            isLoading: false 
          });
        }
      },
      
      // Derived state (computed values)
      getTodoById: (id: string) => {
        return get().todos.find((todo) => todo.id === id);
      },
      
      getCompletedTodos: () => {
        return get().todos.filter((todo) => todo.completed);
      },
      
      getActiveTodos: () => {
        return get().todos.filter((todo) => !todo.completed);
      },
      
      getStats: () => {
        const todos = get().todos;
        const completed = todos.filter((todo) => todo.completed).length;
        
        return {
          total: todos.length,
          completed,
          active: todos.length - completed,
        };
      },
    }),
    { 
      name: 'todo-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ todos: state.todos }), // Only persist todos
    }
  )
);

// Create and export the store with selectors
export const useTodoStore = createSelectors(useTodoStoreBase);

// Custom hook for optimized component re-renders
export function useTodoStats(): TodoStats {
  const stats = useTodoStore.use((state) => ({
    total: state.todos.length,
    completed: state.todos.filter((todo) => todo.completed).length,
    active: state.todos.filter((todo) => !todo.completed).length
  }));
  
  return stats;
}
