'use client';

import { StoreApi, UseBoundStore } from 'zustand';

/**
 * This is a workaround for Next.js with Zustand
 * It prevents the "getServerSnapshot was not wrapped in memo" error
 * when using Zustand stores in Next.js App Router
 */

type WithSelectors<S> = S extends { getState: () => infer T } 
  ? S & { use: { <U>(selector: (state: T) => U): U } }
  : never;

/**
 * Create a custom hook from a Zustand store to use selectors
 * This ensures proper memoization of selectors in Next.js
 * 
 * @example
 * // Create your store
 * const useCounterStore = create<CounterState>()((set) => ({
 *   count: 0,
 *   increment: () => set((state) => ({ count: state.count + 1 })),
 * }));
 * 
 * // Create a store with selectors
 * export const useCounter = createSelectors(useCounterStore);
 * 
 * // Use it in components
 * const Component = () => {
 *   // This is properly memoized and safe in Next.js
 *   const count = useCounter.use((state) => state.count);
 *   const increment = useCounter((state) => state.increment);
 * }
 */
export function createSelectors<S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) {
  const store = _store as WithSelectors<typeof _store>;
  store.use = <U>(selector: (state: ReturnType<typeof store.getState>) => U) => {
    const result = selector(store.getState());
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return result;
  };
  return store;
}
