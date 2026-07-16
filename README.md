# Kazama (風間) 🍃

A high-performance React ecosystem for state, URL, and API management. It serves as a modern, lightweight (~3.8kB), and modular alternative to Redux, built entirely on top of React's `useSyncExternalStore` and `immer` for predictable, immutable updates.

"Kazama" translates to "between the winds" or "place of the wind" in Japanese, reflecting the library's swift, lightweight, and refreshing approach to unifying various forms of React state (client state, server state, URL state) into a single cohesive toolkit.

📦 **NPM Package**: [https://www.npmjs.com/package/kazama-core](https://www.npmjs.com/package/kazama-core)  
🐙 **GitHub**: [https://github.com/zehan12/kazama](https://github.com/zehan12/kazama)

---

## Workspace Structure

This repository is a monorepo managed with `pnpm` workspaces. It contains the core library, the documentation website, and several example applications demonstrating Kazama's capabilities.

### 📚 Core Library
- `packages/kazama`: The core state management library exported to NPM.

### 🌐 Documentation
- `apps/website`: The official Next.js 16 documentation and landing page, built with Tailwind CSS and Radix UI primitives.

### 💡 Examples
Located in the `examples/` directory, these apps showcase different patterns and use cases:
- **`advanced`**: A complex application showcasing cross-model state sharing, global request interceptors, and robust auth workflows.
- **`blog`**: A standard CRUD application demonstrating `useLoader` for cache-first data fetching.
- **`query`**: Demonstrates background refetching and stale-while-revalidate capabilities.
- **`request`**: Shows how to use the built-in HTTP request client.
- **`store`**: A minimal example of the core global state functionality.
- **`todos`**: The classic TodoMVC implemented with Kazama models.
- **`url-state`**: Demonstrates type-safe URL synchronization natively handling SSR hydration.

---

## Getting Started

### Installation

To install the library into your own project, use your preferred package manager:

```bash
npm install kazama-core
# or
pnpm add kazama-core
# or
yarn add kazama-core
```

### Quick Start (Global State)

Create a store with isolated models. Immer is built-in, so you can mutate the state directly in your reducers without needing to spread objects.

```tsx
import { createStore, createModel, useModel } from 'kazama-core';

// 1. Define an isolated model
const todos = createModel({
  state: {
    items: [],
  },
  reducers: {
    add(state, text: string) {
      state.items.unshift({ id: Date.now(), text, done: false });
    },
    toggle(state, id: number) {
      const item = state.items.find(i => i.id === id);
      if (item) item.done = !item.done; 
    }
  }
});

// 2. Construct the store
export const store = createStore({
  models: { todos }
});

// 3. Consume state in your components
export function TaskBoard() {
  const [state, dispatchers] = useModel(store, 'todos');
  
  return (
    <button onClick={() => dispatchers.add('Learn Kazama')}>
      Add Todo
    </button>
  );
}
```

### URL State Management

Synchronize your React state with browser URL parameters natively and safely. Includes intelligent batching and handles SSR hydration perfectly.

```tsx
import { useQueryState, parseAsInteger } from 'kazama-core';

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

### Server State & Data Fetching

Manage cached network requests effortlessly with `useLoader` and the built-in HTTP client. Includes garbage collection and stale-while-revalidate background updates.

```tsx
import { useLoader, request } from "kazama-core";

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

### Local Development

If you'd like to contribute or run the workspace locally:

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Run the core library in watch mode:**
   ```bash
   cd packages/kazama
   pnpm run dev
   ```

3. **Run the documentation website:**
   ```bash
   cd apps/website
   pnpm run dev
   ```

4. **Run any of the examples (e.g., todos):**
   ```bash
   cd examples/todos
   pnpm run dev
   ```

---

## Features at a Glance

- **Zero-Boilerplate Global State**: Uses `immer` under the hood for mutable-style immutable state transitions.
- **First-Class Async Effect Tracking**: Automatically tracks loading, error, and success states of your async actions.
- **URL State Synchronization**: Type-safe and hydration-safe URL search parameter management (`window.location.search`).
- **API & Data Fetching**: Built-in request client, `useLoader` for cache-first fetching with Suspense/SWR, and `useAction` for mutations.
- **Built-in Persistence**: Easily persist your stores to `localStorage` or `sessionStorage` with safe hydration.

For comprehensive documentation, APIs, and guides, please start the `apps/website` project or view the documentation online.

## License

MIT
