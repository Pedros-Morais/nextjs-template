'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useCounterStore } from '@/store/useCounterStore';
import { useThemeStore } from '@/store/useThemeStore';
import { useTodoStore, useTodoStats, type TodoStats } from '@/store/useTodoStore';

export default function StateManagementPage() {
  const { t } = useTranslation();
  
  const count = useCounterStore.use((state) => state.count);
  const increment = useCounterStore.use((state) => state.increment);
  const decrement = useCounterStore.use((state) => state.decrement);
  const reset = useCounterStore.use((state) => state.reset);
  const incrementBy = useCounterStore.use((state) => state.incrementBy);
  
  const theme = useThemeStore.use((state) => state.theme);
  const setTheme = useThemeStore.use((state) => state.setTheme);
  
  const todos = useTodoStore.use((state) => state.todos);
  const isLoading = useTodoStore.use((state) => state.isLoading);
  const addTodo = useTodoStore.use((state) => state.addTodo);
  const toggleTodo = useTodoStore.use((state) => state.toggleTodo);
  const removeTodo = useTodoStore.use((state) => state.removeTodo);
  const fetchTodos = useTodoStore.use((state) => state.fetchTodos);
  
  const stats = useTodoStats();
  
  const [newTodo, setNewTodo] = useState('');
  
  useEffect(() => {
    if (todos.length === 0) {
      fetchTodos();
    }
  }, [fetchTodos, todos.length]);
  
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo('');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Zustand State Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Counter Example */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-semibold mb-4">Counter Example</h2>
          <div className="flex items-center justify-center mb-4">
            <span className="text-5xl font-bold">{count}</span>
          </div>
          <div className="flex gap-2 justify-center mb-4">
            <button
              onClick={decrement}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              -
            </button>
            <button
              onClick={increment}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              +
            </button>
          </div>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => incrementBy(5)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              +5
            </button>
            <button
              onClick={reset}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Reset
            </button>
          </div>
          
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
            <h3 className="text-lg font-medium mb-2">Implementation:</h3>
            <pre className="text-sm overflow-x-auto p-2 bg-gray-200 dark:bg-gray-700 rounded">
{`// Access state
const count = useCounterStore((state) => state.count);

// Access actions
const { increment, decrement, reset } = useCounterStore();

// Use in components
<button onClick={increment}>+</button>`}
            </pre>
          </div>
        </div>
        
        {/* Theme Example */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-semibold mb-4">Theme Example (Persistent)</h2>
          <div className="mb-4 text-center">
            <span className="text-xl font-medium">Current Theme: </span>
            <span className="font-bold">{theme}</span>
          </div>
          
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => setTheme('light')}
              className={`px-4 py-2 rounded-md transition-colors ${
                theme === 'light'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              Light
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`px-4 py-2 rounded-md transition-colors ${
                theme === 'dark'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              Dark
            </button>
            <button
              onClick={() => setTheme('system')}
              className={`px-4 py-2 rounded-md transition-colors ${
                theme === 'system'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              System
            </button>
          </div>
          
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
            <h3 className="text-lg font-medium mb-2">Implementation:</h3>
            <pre className="text-sm overflow-x-auto p-2 bg-gray-200 dark:bg-gray-700 rounded">
{`// Create persistent store
export const useThemeStore = createPersistentStore(
  { theme: 'system' },
  { name: 'theme-storage' }
)((set) => ({
  // State
  theme: 'system',
  
  // Actions
  setTheme: (theme) => set({ theme }),
}));

// Use in components
const theme = useThemeStore((state) => state.theme);
const setTheme = useThemeStore((state) => state.setTheme);`}
            </pre>
          </div>
        </div>
        
        {/* Todo Example */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Todo Example (Advanced)</h2>
          
          <div className="mb-4">
            <form onSubmit={handleAddTodo} className="flex gap-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo..."
                className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </form>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <div className="flex gap-4 justify-center text-sm font-medium">
                  <span>Total: {stats.total}</span>
                  <span>Active: {stats.active}</span>
                  <span>Completed: {stats.completed}</span>
                </div>
              </div>
              
              <ul className="space-y-2 mb-4">
                {todos.map((todo) => (
                  <li 
                    key={todo.id}
                    className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="h-4 w-4"
                      />
                      <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                        {todo.text}
                      </span>
                    </div>
                    <button
                      onClick={() => removeTodo(todo.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
          
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
            <h3 className="text-lg font-medium mb-2">Features Demonstrated:</h3>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Persistent storage with partialize (only store todos)</li>
              <li>Async actions (fetchTodos)</li>
              <li>Derived state (computed values like stats)</li>
              <li>Performance optimization with shallow comparison</li>
            </ul>
            
            <pre className="text-sm overflow-x-auto p-2 bg-gray-200 dark:bg-gray-700 rounded">
{`// Optimized selector with shallow comparison
export function useTodoStats() {
  return useTodoStore(
    state => state.getStats(),
    shallow
  );
}

// Using async actions
useEffect(() => {
  fetchTodos();
}, []);`}
            </pre>
          </div>
        </div>
      </div>
      
      {/* Zustand Features Overview */}
      <div className="mt-12 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-semibold mb-4">Why Use Zustand?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Advantages</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Simple and intuitive API</li>
              <li>Minimal boilerplate compared to Redux</li>
              <li>TypeScript support out of the box</li>
              <li>React hooks-based approach</li>
              <li>No providers needed</li>
              <li>Automatic performance optimization</li>
              <li>Small bundle size (~1KB)</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Features</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Persist state to localStorage/sessionStorage</li>
              <li>Middleware support (similar to Redux)</li>
              <li>Devtools support</li>
              <li>Transient updates (without re-renders)</li>
              <li>Async actions with no extra libraries</li>
              <li>Derived/computed state</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
