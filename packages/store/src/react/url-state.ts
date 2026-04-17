import { useState, useEffect, useCallback } from 'react';
import type { Parser } from './parsers';

// URL Update Batcher
let queuedSearchParams: URLSearchParams | null = null;
let updateTimeout: ReturnType<typeof setTimeout> | null = null;
let currentHistoryMode: 'push' | 'replace' = 'replace';

function flushUrlUpdates() {
  if (!queuedSearchParams) return;
  const newSearch = queuedSearchParams.toString();
  const newUrl = window.location.pathname + (newSearch ? '?' + newSearch : '');
  if (currentHistoryMode === 'push') {
    window.history.pushState(null, '', newUrl);
  } else {
    window.history.replaceState(null, '', newUrl);
  }
  queuedSearchParams = null;
  currentHistoryMode = 'replace';

  // Dispatch event for cross-hook synchronization
  window.dispatchEvent(new Event('pushstate'));
}

function queueUrlUpdate(key: string, value: string | null, history: 'push' | 'replace' = 'replace', throttleMs: number = 50) {
  if (!queuedSearchParams) {
    queuedSearchParams = new URLSearchParams(window.location.search);
  }
  if (value === null) {
    queuedSearchParams.delete(key);
  } else {
    queuedSearchParams.set(key, value);
  }
  
  if (history === 'push') currentHistoryMode = 'push';

  if (updateTimeout) clearTimeout(updateTimeout);
  if (throttleMs > 0) {
    updateTimeout = setTimeout(flushUrlUpdates, throttleMs);
  } else {
    Promise.resolve().then(flushUrlUpdates);
  }
}

export function useQueryState<T = string>(key: string, parser?: Parser<T>) {
  const options = parser?.options || {};
  const { history = 'replace', clearOnDefault = true, throttleMs = 50 } = options;

  const [value, setInternalValue] = useState<T | null>(() => {
    if (typeof window === 'undefined') return parser?.defaultValue ?? null;
    const searchParams = new URLSearchParams(window.location.search);
    const urlVal = searchParams.get(key);
    if (urlVal !== null) {
      return parser?.parse ? parser.parse(urlVal) : (urlVal as unknown as T);
    }
    return parser?.defaultValue ?? null;
  });

  // Cross-hook sync
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const syncFromUrl = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const urlVal = searchParams.get(key);
      
      let parsedVal: T | null = null;
      if (urlVal !== null) {
        parsedVal = parser?.parse ? parser.parse(urlVal) : (urlVal as unknown as T);
      } else if (parser?.defaultValue !== undefined) {
        parsedVal = parser.defaultValue;
      }

      setInternalValue((prev) => {
        if (parser?.serialize && prev !== null && parsedVal !== null) {
          if (parser.serialize(prev) === parser.serialize(parsedVal)) return prev;
        } else if (prev === parsedVal) {
          return prev;
        }
        return parsedVal;
      });
    };
    
    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    window.addEventListener('pushstate', syncFromUrl);
    return () => {
      window.removeEventListener('popstate', syncFromUrl);
      window.removeEventListener('pushstate', syncFromUrl);
    };
  }, [key, parser]);

  const setValue = useCallback((newValue: T | ((old: T | null) => T | null) | null) => {
    setInternalValue((prev) => {
      const resolvedValue = typeof newValue === 'function' ? (newValue as Function)(prev) : newValue;
      
      let serializedVal: string = '';
      let shouldClear = false;

      if (resolvedValue === undefined || resolvedValue === null) {
        shouldClear = true;
      } else if (clearOnDefault && parser?.defaultValue !== undefined && resolvedValue === parser.defaultValue) {
        shouldClear = true;
      } else {
        serializedVal = parser?.serialize ? parser.serialize(resolvedValue) : String(resolvedValue);
        if (serializedVal === '') shouldClear = true;
      }

      const searchParams = queuedSearchParams || new URLSearchParams(window.location.search);
      const urlVal = searchParams.get(key);

      let changed = false;
      if (shouldClear) {
        if (searchParams.has(key)) changed = true;
      } else {
        if (urlVal !== serializedVal) changed = true;
      }

      if (changed) {
        queueUrlUpdate(key, shouldClear ? null : serializedVal, history, throttleMs);
      }
      
      return resolvedValue;
    });
  }, [key, history, clearOnDefault, parser?.defaultValue, throttleMs]);

  return [value as T, setValue] as const;
}
