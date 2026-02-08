import React, { createContext, useMemo } from 'react';
import { useSyncExternalStore } from 'react';
import { produce } from 'immer';

export function createModel<State, Reducers, Effects>(model: {
  state: State;
  reducers?: Reducers;
  effects?: (dispatch: any) => Effects;
}) {
  return model;
}

export function createStore(models: Record<string, any>, config?: { name?: string }) {
  const listeners = new Set<() => void>();
  let state: Record<string, any> = {};
  let effectsState: Record<string, any> = {};

  let pastStates: Array<Record<string, any>> = [];
  let futureStates: Array<Record<string, any>> = [];

  for (const key in models) {
    state[key] = models[key].state;
    effectsState[key] = {};
  }

  // Connect to Redux DevTools
  const devTools =
    typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect({ name: config?.name || 'React Store' })
      : null;

  if (devTools) {
    devTools.init(state);
    
    // Subscribe to time-travel events
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

  function notify() {
    listeners.forEach((listener) => listener());
  }

  const dispatchers: Record<string, any> = {};
  
  // First initialize dispatchers and reducers
  for (const key in models) {
    const model = models[key];
    dispatchers[key] = {};

    if (model.reducers) {
      for (const rKey in model.reducers) {
        dispatchers[key][rKey] = (payload: any) => {
          const nextState = produce(state[key], (draft: any) => {
            const ret = model.reducers[rKey](draft, payload);
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
  }

  // Then initialize effects, passing all dispatchers so they can call each other
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
            };
            const result = await effectFuncs[eKey].call(context, payload, state[key]);
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

  const useModel = (key: string) => {
    const localState = useSyncExternalStore(
      (listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
      () => state[key],
      () => state[key]
    );

    return [localState, dispatchers[key]];
  };

  const useModelEffectsState = (key: string) => {
    const localEffects = useSyncExternalStore(
      (listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
      () => effectsState[key],
      () => effectsState[key]
    );

    return localEffects;
  };

  const withModel = (key: string) => (Component: any) => {
    return (props: any) => {
      const [modelState, modelDispatchers] = useModel(key);
      const modelProps = { [key]: [modelState, modelDispatchers] };
      return React.createElement(Component, { ...props, ...modelProps });
    };
  };

  return {
    Provider,
    useModel,
    useModelEffectsState,
    withModel,
    getState,
    undo,
    redo,
  };
}
