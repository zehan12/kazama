import type { Metadata } from 'next'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'State & Reducers | Kazama',
}

const basicStateCode = `import { createStore } from 'kazama-core';

const models = {
  todos: {
    state: {
      items: [],
      filter: 'ALL'
    },
    reducers: {
      addTodo(state, payload: string) {
        // Direct mutation powered by Immer
        state.items.push({ id: Date.now(), text: payload, done: false });
      },
      setFilter(state, payload: 'ALL' | 'DONE' | 'ACTIVE') {
        state.filter = payload;
      },
      toggleTodo(state, id: number) {
        const todo = state.items.find((t: any) => t.id === id);
        if (todo) todo.done = !todo.done;
      }
    }
  }
};

export const store = createStore(models);`

const componentCode = `import { useModel, useModelState, useModelDispatchers, useModelEffectsLoading, useModelEffectsError } from './store';

function TodoApp() {
  const [state, dispatchers] = useModel('todos');

  return (
    <div>
      <button onClick={() => dispatchers.addTodo('New Task')}>
        Add Task
      </button>
      
      <ul>
        {state.items.map((todo: any) => (
          <li 
            key={todo.id} 
            onClick={() => dispatchers.toggleTodo(todo.id)}
            style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}`

export default async function DocsStateAndReducersPage() {
  return (
    <DocsPageFrame
      eyebrow="store management"
      title="State & Reducers"
      description="Manage synchronous data with immutable mutations."
    >
      <div className="flex flex-col gap-12 text-fg">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Defining State</h2>
          <p className="text-muted leading-relaxed">
            Every model in your store begins with a <code>state</code> object. This object acts as the single source of truth for that specific domain.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Writing Reducers</h2>
          <p className="text-muted leading-relaxed">
            Reducers are synchronous functions that modify your state. Because <code>kazama</code> uses <strong>Immer</strong> under the hood, the <code>state</code> argument you receive in a reducer is actually a mutable draft. 
          </p>
          <p className="text-muted leading-relaxed">
            You can <code>push</code> to arrays, delete keys, and reassign nested properties without having to spread objects (e.g. <code>...state</code>).
          </p>
          <div className="overflow-hidden rounded-[var(--kazama-radius)] border border-line bg-base">
            <CodeBlock code={basicStateCode} lang="typescript" filename="store.ts" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Auto-Generated Dispatchers</h2>
          <p className="text-muted leading-relaxed">
            Unlike traditional Redux, there are no action types or manual dispatch functions. Your reducer names automatically become the names of your dispatcher functions.
          </p>
          <div className="overflow-hidden rounded-[var(--kazama-radius)] border border-line bg-base">
            <CodeBlock code={componentCode} lang="tsx" filename="TodoApp.tsx" />
          </div>
        </div>
      </div>
    </DocsPageFrame>
  )
}
