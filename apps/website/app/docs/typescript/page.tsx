import type { Metadata } from 'next'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'TypeScript Guide | Kazama',
}

const typeGuideCode = `import { createStore, createModel } from '@kazama/core';

// 1. Define your domain types
interface User {
  id: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

// 2. Use createModel as an identity function for perfect type inference
const authModel = createModel({
  state: {
    user: null,
    token: null,
  } as AuthState,
  
  reducers: {
    setCredentials(state, payload: { user: User; token: string }) {
      state.user = payload.user;
      state.token = payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    }
  },
  
  // The 'dispatchers' argument is fully typed!
  effects: (dispatchers) => ({
    async login(credentials: LoginDto) {
      const data = await api.post('/login', credentials);
      // TypeScript knows exactly what payload setCredentials requires
      dispatchers.auth.setCredentials(data);
    }
  })
});

const models = { auth: authModel };

// 3. Store and Hooks are automatically typed
export const store = createStore(models);`

export default async function DocsTypeScriptPage() {
  return (
    <DocsPageFrame
      eyebrow="advanced guides"
      title="TypeScript Guide"
      description="Achieve 100% type safety and perfect editor autocomplete."
    >
      <div className="flex flex-col gap-12 text-fg">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Overview</h2>
          <p className="text-muted leading-relaxed">
            <code>kazama</code> is written in TypeScript and is designed to provide end-to-end type safety without requiring you to manually define massive global state interfaces.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">The createModel Helper</h2>
          <p className="text-muted leading-relaxed">
            The secret to perfect inference is the <code>createModel</code> utility. This is simply an identity function (it returns exactly what you pass it) at runtime. However, at compile time, it deeply infers the state, reducers, and effects of your model.
          </p>
          <div className="overflow-hidden rounded-[var(--kazama-radius)] border border-line bg-base">
            <CodeBlock code={typeGuideCode} lang="typescript" filename="models/auth.ts" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Hooks Inference</h2>
          <p className="text-muted leading-relaxed">
            Because the store is typed from the models, your React components get perfect autocomplete:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted">
            <li><code>useModel('auth')</code> will autocomplete the model keys.</li>
            <li>The <code>state</code> returned will be inferred as <code>AuthState</code>.</li>
            <li>The <code>dispatchers</code> object will correctly require the arguments defined in your reducers and effects.</li>
          </ul>
        </div>
      </div>
    </DocsPageFrame>
  )
}
