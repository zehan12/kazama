import { useSyncExternalStore } from 'react';

export function createHooks(
  getState: () => Record<string, any>,
  getEffectsState: () => Record<string, any>,
  dispatchers: Record<string, any>,
  listeners: Set<() => void>
) {
  const useModel = (key: string) => {
    const localState = useSyncExternalStore(
      (listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
      () => getState()[key],
      () => getState()[key]
    );

    return [localState, dispatchers[key]];
  };

  const useModelState = (key: string) => {
    return useSyncExternalStore(
      (listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
      () => getState()[key],
      () => getState()[key]
    );
  };

  const useModelDispatchers = (key: string) => {
    return dispatchers[key];
  };

  const useModelEffectsState = (key: string) => {
    const localEffects = useSyncExternalStore(
      (listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
      () => getEffectsState()[key],
      () => getEffectsState()[key]
    );

    return localEffects;
  };

  const useModelEffectsLoading = (key: string) => {
    const effects = useModelEffectsState(key);
    const loadingState: Record<string, boolean> = {};
    for (const eKey in effects) {
      loadingState[eKey] = effects[eKey].isLoading;
    }
    return loadingState;
  };

  const useModelEffectsError = (key: string) => {
    const effects = useModelEffectsState(key);
    const errorState: Record<string, { error: any; value: boolean }> = {};
    for (const eKey in effects) {
      errorState[eKey] = {
        error: effects[eKey].error,
        value: !!effects[eKey].error,
      };
    }
    return errorState;
  };

  return {
    useModel,
    useModelState,
    useModelDispatchers,
    useModelEffectsState,
    useModelEffectsLoading,
    useModelEffectsError,
  };
}
