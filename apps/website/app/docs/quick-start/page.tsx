import type { Metadata } from 'next'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'Quick Start | Kizuna',
}

const installCode = `npm install kizuna
# or
pnpm add kizuna
# or
bun add kizuna`

const basicUsage = `import { createStore } from 'kizuna';

// 1. Define your models
const models = {
  counter: {
    state: { count: 0 },
    reducers: {
      increment(state) {
        state.count += 1;
      },
    },
  },
};

// 2. Create the store
const store = createStore(models, { name: 'MyStore' });
export default store;`

const basicComponent = `import store from './store';

function Counter() {
  // 3. Connect to the store using hooks
  const [state, dispatchers] = store.useModel('counter');

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatchers.increment()}>Increment</button>
    </div>
  );
}`

export default async function DocsQuickStartPage() {
  return (
    <DocsPageFrame
      eyebrow="getting started"
      title="Quick Start"
      description="Learn how to install and set up your first store using kizuna."
    >
      <div className="flex flex-col gap-12">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-fg">Installation</h2>
          <p className="text-muted">Install the package using your favorite package manager.</p>
          <div className="overflow-hidden rounded-[var(--kizuna-radius)] border border-line bg-base">
            <CodeBlock code={installCode} lang="bash" filename="terminal" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-fg">Basic Usage</h2>
          <p className="text-muted">Create a centralized store by defining models, state, and reducers. We use Immer under the hood, so you can mutate state directly.</p>
          <div className="overflow-hidden rounded-[var(--kizuna-radius)] border border-line bg-base">
            <CodeBlock code={basicUsage} lang="typescript" filename="store.ts" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-fg">Connecting Components</h2>
          <p className="text-muted">Use the automatically generated hooks to subscribe to state changes and dispatch actions.</p>
          <div className="overflow-hidden rounded-[var(--kizuna-radius)] border border-line bg-base">
            <CodeBlock code={basicComponent} lang="tsx" filename="Counter.tsx" />
          </div>
        </div>
      </div>
    </DocsPageFrame>
  )
}
