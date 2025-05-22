import { create, StateCreator } from 'zustand';
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';

// Type for middleware options
export type PersistConfig = {
  name: string;
  storage?: PersistOptions<any>['storage'];
  partialize?: (state: any) => Partial<any>;
  version?: number;
};

/**
 * Create a Zustand store with persistence capabilities
 * @param config Persistence configuration
 * @returns A store creator function
 */
export function createPersistentStore<T>(
  config: PersistConfig
) {
  return (stateCreator: StateCreator<T>) => {
    return create<T>()(persist(stateCreator, {
      name: config.name,
      storage: config.storage || createJSONStorage(() => localStorage),
      partialize: config.partialize,
      version: config.version,
    }));
  };
}

/**
 * Create a Zustand store without persistence
 * @returns A store creator function
 */
export function createStore<T>() {
  return (stateCreator: StateCreator<T>) => {
    return create<T>()(stateCreator);
  };
}

// Re-export useful utilities from zustand
export { shallow };
