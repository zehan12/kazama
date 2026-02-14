import type { Metadata } from 'next'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'Core Concepts | React Store',
}

const modelsCode = `const models = {
  user: {
    // 1. Initial State
    state: {
      name: 'Guest',
      loggedIn: false,
    },
    // 2. Synchronous Reducers
    reducers: {
      login(state, payload) {
        state.name = payload.name;
        state.loggedIn = true;
      },
      logout(state) {
        state.name = 'Guest';
        state.loggedIn = false;
      }
    }
  }
}`

export default async function DocsCoreConceptsPage() {
  return (
    <DocsPageFrame
      eyebrow="architecture"
      title="Core Concepts"
      description="Understand how models, states, and reducers work together in @react-store/core."
    >
      <div className="flex flex-col gap-12">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-fg">The Model Architecture</h2>
          <p className="text-muted leading-relaxed">
            Unlike traditional Redux where actions and reducers are spread across multiple files, 
            <strong className="text-fg font-medium"> @react-store/core </strong> organizes everything into modular "Models". 
            Each model encapsulates its own state, synchronous reducers, and asynchronous effects.
          </p>
          <div className="overflow-hidden rounded-[var(--hiraki-radius)] border border-line bg-base mt-4">
            <CodeBlock code={modelsCode} lang="typescript" filename="models.ts" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-fg">Immer Integration</h2>
          <p className="text-muted leading-relaxed">
            You might have noticed that in the reducers above, we are directly mutating the <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">state</code> object. 
            Under the hood, @react-store/core wraps your reducers with Immer's <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">produce</code>. 
            This means you get the convenience of mutable syntax while retaining all the benefits of strict immutable state updates.
          </p>
        </div>
      </div>
    </DocsPageFrame>
  )
}
