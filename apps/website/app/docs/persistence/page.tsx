import type { Metadata } from 'next'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'State Persistence | Kazama',
}

const persistCode = `import { createStore } from 'kazama-core';
import models from './models';

export const store = createStore(models, {
  name: 'AppStore',
  persist: {
    key: 'my-app-storage',
    storage: 'localStorage', // or 'sessionStorage'
    allowlist: ['auth', 'settings'] // Only persist these models
  }
});`

export default async function DocsPersistencePage() {
  return (
    <DocsPageFrame
      eyebrow="store management"
      title="State Persistence"
      description="Save and restore state across browser sessions."
    >
      <div className="flex flex-col gap-12 text-fg">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Overview</h2>
          <p className="text-muted leading-relaxed">
            Often, you need to remember user preferences, themes, or authentication tokens after a page reload. The store provides a built-in <code>persist</code> configuration to automatically sync your state with the browser's storage APIs.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Configuration</h2>
          <p className="text-muted leading-relaxed">
            When creating the store, pass a <code>persist</code> object in the configuration options. It will automatically rehydrate the state on load, and save the state whenever a reducer is dispatched.
          </p>
          <div className="overflow-hidden rounded-[var(--kazama-radius)] border border-line bg-base">
            <CodeBlock code={persistCode} lang="typescript" filename="store.ts" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Options</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted">
            <li><code>key</code>: The string identifier used to save the data in the browser storage.</li>
            <li><code>storage</code>: Determines the storage engine. Defaults to <code>localStorage</code>, but supports <code>sessionStorage</code>.</li>
            <li><code>allowlist</code>: An array of model keys. If provided, only these specific models will be saved to storage. If omitted, the entire store state is saved.</li>
          </ul>
        </div>
      </div>
    </DocsPageFrame>
  )
}
