import { useState, useEffect, useCallback, useMemo, useSyncExternalStore } from 'react';
import { request as defaultRequest } from '../network/request';

// Core Cache & Loader Client
interface LoaderOptions {
  key: string[];
  loader: () => Promise<any>;
  maxAge?: number;
  retentionTime?: number;
  enabled?: boolean;
  revalidateInterval?: number;
  revalidateOnFocus?: boolean;
  revalidateOnReconnect?: boolean;
  initialData?: any;
  suspense?: boolean;
}

interface LoaderState {
  data: any;
  error: any;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  lastRevalidatedAt: number;
}

class LoaderClient {
  private cache: Map<string, LoaderState> = new Map();
  private subscribers: Map<string, Set<() => void>> = new Map();
  private garbageCollectors: Map<string, ReturnType<typeof setTimeout>> = new Map();
  private defaultOptions: { loaders: Partial<LoaderOptions> } = {
    loaders: {
      maxAge: 0,
      retentionTime: 5 * 60 * 1000,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  };

  private getLoaderHash(key: string[]) {
    return JSON.stringify(key);
  }

  public getLoaderData(key: string[]) {
    return this.cache.get(this.getLoaderHash(key))?.data;
  }

  public setLoaderData(key: string[], data: any) {
    const hash = this.getLoaderHash(key);
    const state = this.cache.get(hash) || this.getDefaultState();
    this.updateLoaderState(hash, { ...state, data, lastRevalidatedAt: Date.now() });
  }

  public invalidateLoaders(key: string[]) {
    const hash = this.getLoaderHash(key);
    this.updateLoaderState(hash, { isFetching: true });
    // Revalidating logic would trigger here
  }

  private getDefaultState(): LoaderState {
    return { data: undefined, error: null, isLoading: true, isFetching: true, isError: false, lastRevalidatedAt: 0 };
  }

  public subscribe(key: string[], listener: () => void) {
    const hash = this.getLoaderHash(key);
    if (!this.subscribers.has(hash)) {
      this.subscribers.set(hash, new Set());
    }
    this.subscribers.get(hash)!.add(listener);

    // Cancel GC if someone subscribes
    if (this.garbageCollectors.has(hash)) {
      clearTimeout(this.garbageCollectors.get(hash)!);
      this.garbageCollectors.delete(hash);
    }

    return () => {
      const subs = this.subscribers.get(hash);
      if (subs) {
        subs.delete(listener);
        if (subs.size === 0) {
          this.scheduleGC(hash);
        }
      }
    };
  }

  private scheduleGC(hash: string) {
    const gcTime = this.defaultOptions.loaders.retentionTime || 300000;
    const timeout = setTimeout(() => {
      this.cache.delete(hash);
      this.subscribers.delete(hash);
    }, gcTime);
    this.garbageCollectors.set(hash, timeout);
  }

  private updateLoaderState(hash: string, partial: Partial<LoaderState>) {
    const current = this.cache.get(hash) || this.getDefaultState();
    const next = { ...current, ...partial };
    this.cache.set(hash, next);
    this.subscribers.get(hash)?.forEach(listener => listener());
  }

  public async fetchLoader(options: LoaderOptions, abortSignal?: AbortSignal) {
    const hash = this.getLoaderHash(options.key);
    const current = this.cache.get(hash);
    
    // Check maxAge threshold
    const maxAge = options.maxAge ?? this.defaultOptions.loaders.maxAge ?? 0;
    const isStale = !current || (Date.now() - current.lastRevalidatedAt) > maxAge;
    
    if (!isStale && current?.data !== undefined) {
      return current.data;
    }

    if (!current) {
      this.updateLoaderState(hash, { ...this.getDefaultState(), data: options.initialData, isLoading: options.initialData === undefined });
    } else {
      this.updateLoaderState(hash, { isFetching: true });
    }

    try {
      // In a real scenario we'd pass abortSignal to loader
      const data = await options.loader();
      this.updateLoaderState(hash, { data, isLoading: false, isFetching: false, isError: false, error: null, lastRevalidatedAt: Date.now() });
      return data;
    } catch (error: any) {
      this.updateLoaderState(hash, { error, isError: true, isLoading: false, isFetching: false });
      throw error;
    }
  }

  public getLoaderState(key: string[]) {
    return this.cache.get(this.getLoaderHash(key));
  }
}

export const defaultLoaderClient = new LoaderClient();

// Hooks
export function useLoader(options: LoaderOptions, client = defaultLoaderClient) {
  const hash = JSON.stringify(options.key);
  // Guarantee stable key array reference across renders
  const stableKey = useMemo(() => options.key, [hash]);
  const isEnabled = options.enabled !== false;
  
  // React Suspense integration
  if (options.suspense && isEnabled) {
    const state = client.getLoaderState(stableKey);
    const maxAge = options.maxAge ?? 0;
    const isStale = !state || (Date.now() - state.lastRevalidatedAt) > maxAge;
    if (!state?.data && isStale) {
      throw client.fetchLoader({ ...options, key: stableKey }); // Suspend
    }
  }

  const [defaultState] = useState(() => ({
    data: options.initialData,
    isLoading: options.initialData === undefined,
    isFetching: true,
    isError: false,
    error: null,
    lastRevalidatedAt: 0
  }));

  const subscribe = useCallback(
    (listener: () => void) => client.subscribe(stableKey, listener),
    [client, stableKey]
  );

  const getSnapshot = useCallback(
    () => client.getLoaderState(stableKey) || defaultState,
    [client, stableKey, defaultState]
  );

  const loaderState = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const fetch = useCallback(() => {
    if (isEnabled) {
      client.fetchLoader({ ...options, key: stableKey });
    }
  }, [stableKey, isEnabled]); // intentionally omitting client/options to prevent fetch looping

  // Polling / Intervals
  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    if (options.revalidateInterval && isEnabled) {
      const intervalId = setInterval(fetch, options.revalidateInterval);
      return () => clearInterval(intervalId);
    }
  }, [options.revalidateInterval, fetch, isEnabled]);

  // Window Focus & Network Reconnect
  useEffect(() => {
    const handleFocus = () => options.revalidateOnFocus !== false && fetch();
    const handleOnline = () => options.revalidateOnReconnect !== false && fetch();

    window.addEventListener('focus', handleFocus);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('online', handleOnline);
    };
  }, [fetch, options.revalidateOnFocus, options.revalidateOnReconnect]);

  return { ...loaderState, refetch: fetch };
}

export function useAction(actionFn: (variables: any) => Promise<any>) {
  const [state, setState] = useState({ data: null, error: null, isLoading: false, isError: false });

  const mutate = async (variables: any, options?: { onSuccess?: (data: any) => void, onError?: (err: any) => void }) => {
    setState({ data: null, error: null, isLoading: true, isError: false });
    try {
      const data = await actionFn(variables);
      setState({ data, error: null, isLoading: false, isError: false });
      options?.onSuccess?.(data);
      return data;
    } catch (error: any) {
      setState({ data: null, error, isLoading: false, isError: true });
      options?.onError?.(error);
      throw error;
    }
  };

  return { ...state, mutate };
}
