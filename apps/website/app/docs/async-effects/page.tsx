import type { Metadata } from 'next'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'Async Effects | Musubi',
}

const effectsCode = `import { createStore } from '@musubi/core';

const models = {
  auth: {
    state: {
      user: null,
      isAuthenticated: false,
    },
    reducers: {
      setUser(state, user) {
        state.user = user;
        state.isAuthenticated = !!user;
      }
    },
    effects: (dispatchers) => ({
      async login(credentials, rootState) {
        // The framework automatically sets isLoading to true
        
        const response = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify(credentials)
        });
        
        if (!response.ok) {
          throw new Error('Invalid credentials'); 
          // The framework catches this and sets the error state
        }
        
        const user = await response.json();
        
        // Call a synchronous reducer to update the state
        dispatchers.auth.setUser(user);
        
        // The framework automatically sets isLoading to false
      }
    })
  }
};`

const componentCode = `import { store } from './store';

function LoginForm() {
  const dispatchers = store.useModelDispatchers('auth');
  
  // Magically track loading and error states for specific effects!
  const loading = store.useModelEffectsLoading('auth');
  const errors = store.useModelEffectsError('auth');

  const handleLogin = () => {
    dispatchers.login({ username: 'admin', password: 'password' });
  };

  return (
    <div>
      {errors.login?.value && <p className="error">{errors.login.error.message}</p>}
      
      <button disabled={loading.login} onClick={handleLogin}>
        {loading.login ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
}`

export default async function DocsAsyncEffectsPage() {
  return (
    <DocsPageFrame
      eyebrow="store management"
      title="Async Effects"
      description="Handle asynchronous logic with automated loading and error tracking."
    >
      <div className="flex flex-col gap-12 text-fg">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">The Pain of Async State</h2>
          <p className="text-muted leading-relaxed">
            In standard React, making an API call usually requires three <code>useState</code> hooks: one for the data, one for <code>isLoading</code>, and one for <code>error</code>. 
            <code>@musubi/core</code> automates this entirely.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Writing Effects</h2>
          <p className="text-muted leading-relaxed">
            Effects are defined as a function that returns an object of async functions. They receive the globally available <code>dispatchers</code> as an argument, allowing you to trigger reducers or other effects once your async task completes.
          </p>
          <div className="overflow-hidden rounded-[var(--musubi-radius)] border border-line bg-base">
            <CodeBlock code={effectsCode} lang="typescript" filename="store.ts" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Tracking Progress in Components</h2>
          <p className="text-muted leading-relaxed">
            You don't need to manually dispatch loading actions. Use the <code>useModelEffectsLoading</code> and <code>useModelEffectsError</code> hooks to tap into the automated tracking.
          </p>
          <div className="overflow-hidden rounded-[var(--musubi-radius)] border border-line bg-base">
            <CodeBlock code={componentCode} lang="tsx" filename="LoginForm.tsx" />
          </div>
        </div>
      </div>
    </DocsPageFrame>
  )
}
