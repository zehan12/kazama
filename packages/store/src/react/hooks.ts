import { useSyncExternalStore, useContext } from 'react';
import { useRequest as useAhooksRequest } from 'ahooks';
import type { Options, Result, Service, Plugin } from 'ahooks/lib/useRequest/src/types';
import type { AxiosRequestConfig } from 'axios';
import { request as defaultRequest } from '../network/request';

export function createHooks(
  getState: () => Record<string, any>,
  getEffectsState: () => Record<string, any>,
  dispatchers: Record<string, any>,
  listeners: Set<() => void>,
  requestClient?: any,
  StoreContext?: React.Context<boolean>
) {
  const checkProvider = () => {
    if (StoreContext) {
      const hasProvider = useContext(StoreContext);
      if (!hasProvider) {
        throw new Error('You must wrap your application in <Provider> to use this hook.');
      }
    }
  };

  const useModel = (key: string) => {
    checkProvider();
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
    checkProvider();
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
    checkProvider();
    return dispatchers[key];
  };

  const useModelEffectsState = (key: string) => {
    checkProvider();
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
    checkProvider();
    const effects = useModelEffectsState(key);
    const loadingState: Record<string, boolean> = {};
    for (const eKey in effects) {
      loadingState[eKey] = effects[eKey].isLoading;
    }
    return loadingState;
  };

  const useModelEffectsError = (key: string) => {
    checkProvider();
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

  const useRequest = <TData, TParams extends any[]>(
    service: string | AxiosRequestConfig | Service<TData, TParams>,
    options?: Options<TData, TParams>,
    plugins?: Plugin<TData, TParams>[]
  ) => {
    checkProvider();
    let s: Service<TData, TParams>;
    const activeRequest = requestClient || defaultRequest;
    if (typeof service === 'function') {
      s = service as Service<TData, TParams>;
    } else if (typeof service === 'string') {
      s = async (...extraOptions: TParams) => {
        return activeRequest({ url: service, ...extraOptions });
      };
    } else {
      const config = service as AxiosRequestConfig;
      s = async (...extraOptions: TParams) => {
        return activeRequest({ ...config, ...extraOptions });
      };
    }
    const req = useAhooksRequest(s, {
      manual: true,
      ...options,
    }, plugins);
    
    return {
      ...req,
      request: req.run,
      requestAsync: req.runAsync,
    };
  };

  return {
    useModel,
    useModelState,
    useModelDispatchers,
    useModelEffectsState,
    useModelEffectsLoading,
    useModelEffectsError,
    useRequest,
  };
}
