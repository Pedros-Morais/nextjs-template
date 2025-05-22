'use client';

import { create } from 'zustand';
import { createSelectors } from './zustandUtils';

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  incrementBy: (value: number) => void;
}

const useCounterStoreBase = create<CounterState>()((set) => ({
  count: 0,
  
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  incrementBy: (value: number) => set((state) => ({ count: state.count + value })),
}));

export const useCounterStore = createSelectors(useCounterStoreBase);
