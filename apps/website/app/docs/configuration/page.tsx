import type { Metadata } from 'next'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'Configuration | Kazama',
}

const configCode = `import { createStore, request } from 'kazama';
import models from './models';

export const store = createStore(models, {
  // Used as the prefix for Redux DevTools and LocalStorage
  name: 'IceStore', 

  // Configure automatic state persistence
  persist: {
    key: 'ice-store-storage',
    storage: 'localStorage', // 'localStorage' or 'sessionStorage'
    allowlist: ['auth', 'theme'] // Array of model keys
  },

  // Inject a custom HTTP client (like the built-in request wrapper)
  request: request 
});`

export default async function DocsConfigurationPage() {
  return (
    <DocsPageFrame
      eyebrow="advanced guides"
      title="Configuration"
      description="Global options and defaults for your store instance."
    >
      <div className="flex flex-col gap-12 text-fg">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Store Config Object</h2>
          <p className="text-muted leading-relaxed">
            The <code>createStore</code> function accepts a second argument: a configuration object. This object controls the global behavior of your store, persistence plugins, and HTTP injection.
          </p>
          <div className="overflow-hidden rounded-[var(--kazama-radius)] border border-line bg-base">
            <CodeBlock code={configCode} lang="typescript" filename="store.ts" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Configuration Properties</h2>
          <ul className="list-disc pl-6 space-y-4 text-muted">
            <li>
              <strong><code>name?: string</code></strong><br />
              Defaults to <code>"Store"</code>. This name is used as the instance name in the Redux DevTools extension, allowing you to debug multiple stores independently.
            </li>
            <li>
              <strong><code>persist?: PersistConfig</code></strong><br />
              An optional configuration object to enable LocalStorage or SessionStorage hydration. You must provide a <code>key</code>, the <code>storage</code> type, and an optional <code>allowlist</code> of models to persist.
            </li>
            <li>
              <strong><code>request?: AxiosInstance</code></strong><br />
              An optional HTTP client. If provided, this instance will be automatically injected into hooks like <code>useRequest</code>, ensuring your global interceptors (like Auth headers) are applied everywhere.
            </li>
          </ul>
        </div>
      </div>
    </DocsPageFrame>
  )
}
