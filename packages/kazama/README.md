# Kazama (風間)

Kazama is a high-performance React ecosystem for state, URL, and API management. It serves as a modern, lightweight, and modular alternative to Redux, built entirely on top of React's `useSyncExternalStore` and `immer` for predictable, immutable updates.

"Kazama" translates to "between the winds" or "place of the wind" in Japanese, reflecting the library's swift, lightweight, and refreshing approach to unifying various forms of React state (client state, server state, URL state) into a single cohesive toolkit.

📦 **NPM Package**: [https://www.npmjs.com/package/@zehankhan/kazama](https://www.npmjs.com/package/@zehankhan/kazama)  
🐙 **GitHub**: [https://github.com/zehan12/kazama](https://github.com/zehan12/kazama)

## Features

- **Zero-Boilerplate Global State**: Uses `immer` under the hood for mutable-style immutable state transitions.
- **First-Class Async Effect Tracking**: Automatically tracks loading, error, and success states of your async actions.
- **URL State Synchronization**: Type-safe and hydration-safe URL search parameter management (`window.location.search`).
- **API & Data Fetching**: Built-in request client, `useLoader` for cache-first fetching with Suspense/SWR, and `useAction` for mutations.
- **Extremely Lightweight**: No heavy external dependencies beyond `immer`, keeping bundle sizes extremely small (~3.8kB).
- **Built-in Persistence**: Easily persist your stores to `localStorage` or `sessionStorage` with safe hydration.

## Installation

```bash
npm install @zehankhan/kazama
# or
pnpm add @zehankhan/kazama
# or
yarn add @zehankhan/kazama
```

## Quick Start

### 1. Global Client State (Models)

Create a store with isolated models. Immer is built-in, so you can mutate the state directly in your reducers without needing to spread objects.

```tsx
import { createStore, createModel, useModel } from '@zehankhan/kazama';

// Define an isolated model
const todos = createModel({
  state: {
    items: [],
    filter: 'all'
  },
  reducers: {
    add(state, text: string) {
      state.items.unshift({ id: Date.now(), text, done: false });
    },
    toggle(state, id: number) {
      const item = state.items.find(i => i.id === id);
      if (item) item.done = !item.done; 
    }
  },
  effects: (dispatch) => ({
    async sync() {
      // Async effects track their own .isLoading state automatically!
      await api.post('/sync', store.getState().todos);
    }
  })
});

// Construct the store
export const store = createStore({
  models: { todos }
});

// Consuming state in a component
export function TaskBoard() {
  // Returns state and dispatchers
  const [state, dispatchers] = useModel(store, 'todos');
  
  return (
    <button onClick={() => dispatchers.add('Learn Kazama')}>
      Add Todo
    </button>
  );
}
```

### 2. URL State Management

Synchronize your React state with browser URL parameters natively and safely. Includes intelligent batching and handles SSR hydration perfectly.

```tsx
import { useQueryState, parseAsInteger } from '@zehankhan/kazama';

export function Demo() {
  const [hello, setHello] = useQueryState("hello", { defaultValue: "" });
  const [count, setCount] = useQueryState("count", parseAsInteger.withDefault(0));
  
  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      <input
        value={hello}
        placeholder="Enter your name"
        onChange={(e) => setHello(e.target.value || null)}
      />
      <p>Hello, {hello || "anonymous visitor"}!</p>
    </>
  );
}
```

### 3. Server State & Data Fetching

Manage cached network requests effortlessly with `useLoader` and the built-in HTTP client. Includes garbage collection and stale-while-revalidate background updates.

```tsx
import { useLoader, request } from "@zehankhan/kazama";

// Use the built-in HTTP client
async function fetchUser(id: string) {
  return await request.get(`/api/user/${id}`);
}

export function Profile({ id }) {
  const { data, isLoading, isFetching, refetch } = useLoader({
    key: ['user', id],
    loader: () => fetchUser(id),
    revalidateOnFocus: true
  });
  
  if (isLoading) return <p>Loading...</p>;
  
  return (
    <div>
      <p>Name: {data.name}</p>
      <button onClick={refetch}>
        {isFetching ? 'Updating...' : 'Refresh'}
      </button>
    </div>
  );
}
```

For un-cached, immediate requests directly tied to UI state, you can use `useRequest`:

```tsx
import { useRequest } from "@zehankhan/kazama";

export function TodoItem() {
  // Pass a URL directly — the library's built-in HTTP client handles the rest
  const { data, loading, request } = useRequest('/api/todos/42');
  
  return (
    <div>
      <button onClick={request} disabled={loading}>
        {loading ? 'Fetching...' : 'Fire Request'}
      </button>
      {data && <p>Todo: {data.title}</p>}
    </div>
  );
}
```

### 4. Automatic Persistence

Persist chosen models to storage securely with auto-hydration.

```tsx
import { createStore } from '@zehankhan/kazama';

export const store = createStore({
  models: { /* your models */ }
}, {
  persist: {
    key: 'my-app-settings',
    storage: 'localStorage',
    allowlist: ['settings'] // Only persist specific models!
  }
});
```

## Advanced Features
- **Time-Travel Debugging**: Includes out-of-the-box `undo()` and `redo()` support.
- **Granular Re-renders**: Select specific slices of state in `useModel(store, 'modelName', state => state.slice)`.
- **Global Interceptors**: Easily inject auth tokens and handle global errors using the built-in `request` client interceptors.

## License

MIT
