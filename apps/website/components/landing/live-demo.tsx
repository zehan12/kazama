import { cn } from '@/lib/cn'
import { GlobalStoreDemoUI } from './store-demo'
import { StoreCodeTabs } from './store-code-tabs'
import { URLStateDemoUI } from './url-state-demo'
import { RequestDemoUI } from './request-demo'
import { UseRequestDemoUI } from './use-request-demo'
import { PersistDemoUI } from './persist-demo'
import { CodeBlock } from '@/components/ui/code-block'

const urlStateCode = `"use client";

import { parseAsInteger, useQueryState } from "musubi";

export function Demo() {
  const [hello, setHello] = useQueryState("hello", { defaultValue: "" });
  const [count, setCount] = useQueryState(
    "count",
    parseAsInteger.withDefault(0),
  );
  
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
}`

const requestCode = `"use client";

import { useLoader, request } from "musubi";

// Use the built-in HTTP client
async function fetchUser() {
  return await request.get('/api/user/1');
}

export function Profile() {
  const { data, isLoading, isFetching, refetch } = useLoader({
    key: ['user', '1'],
    loader: fetchUser,
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
}`

const useRequestCode = `"use client";

import { useRequest } from "musubi";

export function TodoItem() {
  // Pass a URL directly — the library's built-in HTTP client handles the rest
  const { data, loading, request } = useRequest('/api/todos/42');
  
  return (
    <div>
      <button onClick={request} disabled={loading}>
        {loading ? 'Fetching...' : 'Fire Request'}
      </button>
      
      {data && (
        <p>Todo: {data.title}</p>
      )}
    </div>
  );
}`

const persistCode = `import { createStore } from 'musubi';

export const store = createStore({
  settings: {
    state: { theme: 'dark', notifications: true },
    reducers: {
      toggleTheme(state) {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
      }
    }
  }
}, {
  persist: {
    key: 'my-app-settings',
    storage: 'localStorage',
    allowlist: ['settings'] // Only persist specific models!
  }
});`

const storeCode = `import { createStore } from 'musubi';
    state: {
      items: [{ id: 1, text: 'Learn Musubi', done: false }],
      filter: 'all' // 'all' | 'active' | 'completed'
    },
    reducers: {
      // Immer is built-in! Mutate deeply nested state directly.
      add(state, text: string) {
        state.items.unshift({ id: Date.now(), text, done: false });
      },
      toggle(state, id: number) {
        const item = state.items.find(i => i.id === id);
        if (item) item.done = !item.done; 
      },
      remove(state, id: number) {
        const index = state.items.findIndex(i => i.id === id);
        if (index !== -1) state.items.splice(index, 1);
      },
      setFilter(state, filter: string) {
        state.filter = filter;
      }
    },
    effects: (dispatch) => ({
      // Automatically tracks .isLoading for the UI!
      async sync() {
        await api.post('/sync', store.getState().todos);
      }
    })
  }
});`

const appCode = `"use client";

import { useModel, useModelEffectsState } from "musubi";
import { useState } from "react";

export function TaskBoard() {
  const [state, dispatchers] = useModel('todos');
  const { sync } = useModelEffectsState('todos');
  const [text, setText] = useState('');

  return (
    <div>
      <div className="header">
        <button onClick={() => dispatchers.sync()} disabled={sync?.isLoading}>
          {sync?.isLoading ? 'Syncing...' : 'Sync Data'}
        </button>
      </div>

      <form onSubmit={e => { e.preventDefault(); dispatchers.add(text); }}>
        <input value={text} onChange={e => setText(e.target.value)} />
      </form>

      <div className="filters">
        {['all', 'active', 'completed'].map(f => (
          <button key={f} onClick={() => dispatchers.setFilter(f)}>{f}</button>
        ))}
      </div>

      <ul>
        {state.items.map(item => (
          <li key={item.id} onClick={() => dispatchers.toggle(item.id)}>
            <span style={{ textDecoration: item.done ? 'line-through' : 'none' }}>
              {item.text}
            </span>
            <button onClick={() => dispatchers.remove(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      
      <div className="time-travel">
        <button onClick={() => store.undo()}>Undo</button>
        <button onClick={() => store.redo()}>Redo</button>
      </div>
    </div>
  );
}`



export function LiveDemo() {
  return (
    <section className="w-full border-b border-line bg-surface/50">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:py-24 text-center flex flex-col items-center">
        <p className="text-xs font-mono text-dim mb-2">interactive</p>
        <h2 className="text-2xl font-bold text-fg mb-4">See it in Action</h2>
        <p className="text-sm text-muted max-w-lg mx-auto mb-10 leading-relaxed">
          Experience the automatic async effect tracking and type-safe URL synchronization below.
        </p>

        <div className="w-full flex flex-col gap-16 text-left items-center">

          {/* First Demo - URL State */}
          <div className="w-full max-w-2xl flex flex-col">
            <h3 className="text-xl font-bold text-fg mb-2">State Management with URL</h3>
            <p className="text-sm text-muted mb-6 leading-relaxed">
              Synchronize your React state with the browser URL parameters natively. Features intelligent batching and type-safe parsers out of the box.
            </p>
            <div className="flex flex-col items-start bg-base border border-line rounded-[var(--musubi-radius)] p-6 shadow-sm w-full">
              <URLStateDemoUI />
              <div className="w-full overflow-hidden border border-line/40 bg-[#0d0d0d] rounded-xl relative mt-2">
                <CodeBlock code={urlStateCode} lang="tsx" theme="one-dark-pro" className="[&_pre]:!bg-transparent [&_pre]:!p-6" />
                <button className="absolute top-4 right-4 text-dim hover:text-white transition-colors cursor-pointer bg-transparent border-none p-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Second Demo - Global Store */}
          <div className="w-full max-w-2xl flex flex-col">
            <h3 className="text-xl font-bold text-fg mb-2">Global Store Models</h3>
            <p className="text-sm text-muted mb-6 leading-relaxed">
              Define your models and get deeply nested state mutations (via Immer), async effect tracking, and time-travel debugging with absolute zero boilerplate.
            </p>
            <div className="flex flex-col items-start bg-base border border-line rounded-[var(--musubi-radius)] p-6 shadow-sm w-full">
              <GlobalStoreDemoUI />
              <StoreCodeTabs 
                storeTab={<CodeBlock code={storeCode} lang="tsx" theme="one-dark-pro" className="[&_pre]:!bg-transparent [&_pre]:!p-6" />}
                appTab={<CodeBlock code={appCode} lang="tsx" theme="one-dark-pro" className="[&_pre]:!bg-transparent [&_pre]:!p-6" />}
              />
            </div>
          </div>

          {/* Third Demo - Server State (useLoader) */}
          <div className="w-full max-w-2xl flex flex-col">
            <h3 className="text-xl font-bold text-fg mb-2">Server State & Caching</h3>
            <p className="text-sm text-muted mb-6 leading-relaxed">
              Manage cached network requests effortlessly with <code className="text-xs bg-raised px-1.5 py-0.5 rounded-md text-fg">useLoader</code>. Features suspense support, garbage collection, and automatic stale-while-revalidate background updates.
            </p>
            <div className="flex flex-col items-start bg-base border border-line rounded-[var(--musubi-radius)] p-6 shadow-sm w-full">
              <RequestDemoUI />
              <div className="w-full overflow-hidden border border-line/40 bg-[#0d0d0d] rounded-xl relative mt-2">
                <CodeBlock code={requestCode} lang="tsx" theme="one-dark-pro" className="[&_pre]:!bg-transparent [&_pre]:!p-6" />
                <button className="absolute top-4 right-4 text-dim hover:text-white transition-colors cursor-pointer bg-transparent border-none p-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Fourth Demo - useRequest Hook */}
          <div className="w-full max-w-2xl flex flex-col">
            <h3 className="text-xl font-bold text-fg mb-2">The useRequest Hook</h3>
            <p className="text-sm text-muted mb-6 leading-relaxed">
              Need a quick network request tied to UI state? Our enhanced <code className="text-xs bg-raised px-1.5 py-0.5 rounded-md text-fg">useRequest</code> hook accepts URLs directly and gives you immediate loading and data states.
            </p>
            <div className="flex flex-col items-start bg-base border border-line rounded-[var(--musubi-radius)] p-6 shadow-sm w-full">
              <UseRequestDemoUI />
              <div className="w-full overflow-hidden border border-line/40 bg-[#0d0d0d] rounded-xl relative mt-2">
                <CodeBlock code={useRequestCode} lang="tsx" theme="one-dark-pro" className="[&_pre]:!bg-transparent [&_pre]:!p-6" />
                <button className="absolute top-4 right-4 text-dim hover:text-white transition-colors cursor-pointer bg-transparent border-none p-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Fifth Demo - Persist State */}
          <div className="w-full max-w-2xl flex flex-col">
            <h3 className="text-xl font-bold text-fg mb-2">Automatic Persistence</h3>
            <p className="text-sm text-muted mb-6 leading-relaxed">
              Persist your chosen models to <code className="text-xs bg-raised px-1.5 py-0.5 rounded-md text-fg">localStorage</code> or <code className="text-xs bg-raised px-1.5 py-0.5 rounded-md text-fg">sessionStorage</code> securely. It auto-hydrates on load and synchronizes state mutations seamlessly.
            </p>
            <div className="flex flex-col items-start bg-base border border-line rounded-[var(--musubi-radius)] p-6 shadow-sm w-full">
              <PersistDemoUI />
              <div className="w-full overflow-hidden border border-line/40 bg-[#0d0d0d] rounded-xl relative mt-2">
                <CodeBlock code={persistCode} lang="tsx" theme="one-dark-pro" className="[&_pre]:!bg-transparent [&_pre]:!p-6" />
                <button className="absolute top-4 right-4 text-dim hover:text-white transition-colors cursor-pointer bg-transparent border-none p-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
