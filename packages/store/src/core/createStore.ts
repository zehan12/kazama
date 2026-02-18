import React, { createContext, useMemo } from 'react';
import { produce } from 'immer';
import type { StoreConfig } from '../types';
import { createHooks } from '../react/hooks';
import { createHOCs } from '../react/hocs';

export function createStore(models: Record<string, any>, config?: StoreConfig) {
  const listeners = new Set<() => void>();
  let state: Record<string, any> = {};
  let effectsState: Record<string, any> = {};

  let pastStates: Array<Record<string, any>> = [];
  let futureStates: Array<Record<string, any>> = [];

  for (const key in models) {
    state[key] = models[key].state;
    effectsState[key] = {};
  }

  if (config?.persist && typeof window !== 'undefined') {
    try {
      const storage = config.persist.storage === 'sessionStorage' ? window.sessionStorage : window.localStorage;
      const stored = storage.getItem(config.persist.key);
      if (stored) {
        const parsed = JSON.parse(stored);
        for (const key in parsed) {
          if (state[key] !== undefined) {
            state[key] = { ...state[key], ...parsed[key] };
          }
        }
      }
    } catch (e) {
      console.error('Failed to parse persisted state', e);
    }
  }

  const devTools =
    typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect({ name: config?.name || 'React Store' })
      : null;

  if (devTools) {
    devTools.init(state);

    devTools.subscribe((message: any) => {
      if (message.type === 'DISPATCH' && message.state) {
        state = JSON.parse(message.state);
        notify();
      }
    });
  }

  function getState() {
    return state;
  }

  function getEffectsState() {
    return effectsState;
  }

  let isNotifying = false;
  function notify() {
    if (isNotifying) return;
    isNotifying = true;

    listeners.forEach((listener) => listener());

    if (config?.persist && typeof window !== 'undefined') {
      try {
        const storage = config.persist.storage === 'sessionStorage' ? window.sessionStorage : window.localStorage;
        let stateToSave: Record<string, any> = state;
        if (config.persist.allowlist) {
          stateToSave = {};
          config.persist.allowlist.forEach(k => {
            if (state[k] !== undefined) stateToSave[k] = state[k];
          });
        }
        storage.setItem(config.persist.key, JSON.stringify(stateToSave));
      } catch (e) {
        console.error('Failed to persist state', e);
      }
    }

    isNotifying = false;
  }

  const dispatchers: Record<string, any> = {};

  for (const key in models) {
    const model = models[key];
    dispatchers[key] = {};

    const reducers = {
      setState: (prevState: any, payload: any) => ({
        ...prevState,
        ...payload,
      }),
      ...model.reducers,
    };

    for (const rKey in reducers) {
      dispatchers[key][rKey] = (payload: any) => {
        const nextState = produce(state[key], (draft: any) => {
          const ret = reducers[rKey](draft, payload);
          if (ret !== undefined) {
            return ret;
          }
        });
        if (nextState !== state[key]) {
          pastStates.push(state);
          futureStates = [];

          state = { ...state, [key]: nextState };

          if (devTools) {
            devTools.send({ type: `${key}/${rKey}`, payload }, state);
          }

          notify();
        }
      };
    }
  }

  for (const key in models) {
    const model = models[key];
    if (model.effects) {
      const effectFuncs = model.effects(dispatchers);
      for (const eKey in effectFuncs) {
        effectsState[key][eKey] = { isLoading: false, error: null };
        dispatchers[key][eKey] = async (payload: any) => {
          effectsState = produce(effectsState, (draft) => {
            draft[key][eKey] = { isLoading: true, error: null };
          });

          if (devTools) {
            devTools.send({ type: `${key}/${eKey}_START`, payload }, state);
          }
          notify();

          try {
            const context = {
              ...dispatchers[key],
              ...(config?.request ? { request: config.request } : {}),
            };
            const result = await effectFuncs[eKey].call(context, payload, state, config?.request);
            effectsState = produce(effectsState, (draft) => {
              draft[key][eKey] = { isLoading: false, error: null };
            });

            if (devTools) {
              devTools.send({ type: `${key}/${eKey}_SUCCESS`, payload }, state);
            }
            notify();
            return result;
          } catch (error) {
            effectsState = produce(effectsState, (draft) => {
              draft[key][eKey] = { isLoading: false, error };
            });

            if (devTools) {
              devTools.send({ type: `${key}/${eKey}_ERROR`, error }, state);
            }
            notify();
            throw error;
          }
        };
      }
    }
  }

  const StoreContext = createContext<boolean>(false);

  function undo() {
    if (pastStates.length === 0) return;
    const previousState = pastStates.pop()!;
    futureStates.push(state);
    state = previousState;
    if (devTools) {
      devTools.send({ type: `@@UNDO` }, state);
    }
    notify();
  }

  function redo() {
    if (futureStates.length === 0) return;
    const nextState = futureStates.pop()!;
    pastStates.push(state);
    state = nextState;
    if (devTools) {
      devTools.send({ type: `@@REDO` }, state);
    }
    notify();
  }

  const Provider = ({ initialStates, children }: any) => {
    useMemo(() => {
      if (initialStates) {
        let stateChanged = false;
        for (const key in initialStates) {
          if (state[key] !== undefined) {
            state = {
              ...state,
              [key]: { ...state[key], ...initialStates[key] }
            };
            stateChanged = true;
          }
        }
        if (stateChanged && devTools) {
          devTools.init(state);
        }
      }
    }, [initialStates]);

    return React.createElement(StoreContext.Provider, { value: true }, children);
  };

  const hooks = createHooks(getState, getEffectsState, dispatchers, listeners, config?.request);
  const hocs = createHOCs(hooks);

  const getModel = (key: string) => [state[key], dispatchers[key]];
  const getModelState = (key: string) => state[key];
  const getModelDispatchers = (key: string) => dispatchers[key];

  return {
    Provider,
    ...hooks,
    ...hocs,
    getModel,
    getModelState,
    getModelDispatchers,
    getState,
    undo,
    redo,
  };
}
