import type { Metadata } from 'next'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'Async Effects | React Store',
}

const effectsCode = `const models = {
  user: {
    state: { data: null },
    reducers: {
      set(state, payload) {
        state.data = payload;
      }
    },
    // Effects are for asynchronous logic
    effects: (dispatch) => ({
      async fetchUser(id: string) {
        const res = await fetch(\`/api/users/\${id}\`);
        const data = await res.json();
        // Call synchronous reducers from effects
        dispatch.user.set(data);
      }
    })
  }
}`

const effectsComponent = `function UserProfile({ id }) {
  const [state, dispatchers] = store.useModel('user');
  
  // Magic: Auto-tracked loading and error states!
  const { fetchUser } = store.useModelEffectsState('user');

  return (
    <div>
      {fetchUser.error && <p>Error: {fetchUser.error.message}</p>}
      
      <button 
        onClick={() => dispatchers.fetchUser(id)}
        disabled={fetchUser.isLoading}
      >
        {fetchUser.isLoading ? 'Loading...' : 'Fetch'}
      </button>
      
      <p>{state.data?.name}</p>
    </div>
  );
}`

export default async function DocsAsyncEffectsPage() {
  return (
    <DocsPageFrame
      eyebrow="data fetching"
      title="Async Effects"
      description="Handle API calls and asynchronous logic with zero boilerplate and automatic status tracking."
    >
      <div className="flex flex-col gap-12">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-fg">Defining Effects</h2>
          <p className="text-muted leading-relaxed">
            While reducers must be synchronous and pure, you can define asynchronous logic in the <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">effects</code> block. 
            Effects have access to the global <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">dispatch</code> object, allowing them to trigger reducers across any model.
          </p>
          <div className="overflow-hidden rounded-[var(--hiraki-radius)] border border-line bg-base mt-4">
            <CodeBlock code={effectsCode} lang="typescript" filename="models.ts" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-fg">Auto-Tracked Loading & Errors</h2>
          <p className="text-muted leading-relaxed">
            The best feature of @react-store/core is its built-in effect tracker. You don't need to manually write reducers for <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">isLoading</code> or <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">isError</code> states. 
            The store tracks the promise resolution lifecycle for you, just like React Query or Redux Saga, and exposes it via the <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">useModelEffectsState</code> hook.
          </p>
          <div className="overflow-hidden rounded-[var(--hiraki-radius)] border border-line bg-base mt-4">
            <CodeBlock code={effectsComponent} lang="tsx" filename="Component.tsx" />
          </div>
        </div>
      </div>
    </DocsPageFrame>
  )
}
