import { CodeBlock } from '@/components/ui/code-block'
import { CopyButton } from '@/components/ui/copy-button'

const basicExample = `import { createStore } from '@zehankhan/kazama';
import { user } from './models/user';

const store = createStore({ user }, { name: 'AppStore' });

export const { useModel, useModelEffectsState } = store;
export default store;`

const modelExample = `
export const user = {
  state: {
    username: 'Guest',
    id: '000'
  },
  reducers: {
    update(state, payload) {
      state.username = payload.username;
      state.id = payload.id;
    }
  },
  effects: (dispatch) => ({
    async getUserInfo() {
      const res = await fetch('/api/user/1');
      const data = await res.json();
      dispatch.user.update({
        username: data.username,
        id: data.id
      });
    }
  })
};`

const componentExample = `import { useModel, useModelEffectsState } from './store';

function UserProfile() {
  const [state, dispatchers] = useModel('user');
  const { getUserInfo } = useModelEffectsState('user');

  return (
    <div>
      <span>Username: {state.username}</span>
      <span>ID: {state.id}</span>
      
      {getUserInfo.error && (
        <span style={{ color: 'red' }}>
          {String(getUserInfo.error.message || 'Error occurred')}
        </span>
      )}

      <button 
        onClick={() => dispatchers.getUserInfo()}
        disabled={getUserInfo.isLoading}
      >
        {getUserInfo.isLoading ? 'Loading...' : 'Fetch User'}
      </button>
    </div>
  );
}`

export function CodeShowcase() {
  return (
    <section className="w-full border-b border-line">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 sm:py-16">
        <p className="text-xs font-mono text-dim mb-2">usage</p>
        <h2 className="text-2xl font-bold text-fg mb-4">Zero Boilerplate State Management</h2>
        <p className="text-sm text-muted max-w-lg mb-10 leading-relaxed">
          Simple API: define models, create the store, and use the hooks. No{' '}
          <code className="font-mono text-xs bg-raised px-1.5 py-0.5 border border-line">Context Providers</code>,{' '}
          <code className="font-mono text-xs bg-raised px-1.5 py-0.5 border border-line">connect()</code>, or boilerplate needed.
        </p>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="min-w-0 flex flex-col gap-6">
            <div className="min-w-0 border border-line bg-surface rounded-[var(--kazama-radius)] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-line bg-raised">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                    <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
                    <span className="w-2 h-2 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-xs font-mono text-dim ml-2">store.ts</span>
                </div>
                <CopyButton text={basicExample} />
              </div>
              <CodeBlock code={basicExample} lang="tsx" />
            </div>

            <div className="min-w-0 border border-line bg-surface rounded-[var(--kazama-radius)] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-line bg-raised">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                    <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
                    <span className="w-2 h-2 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-xs font-mono text-dim ml-2">model.ts</span>
                </div>
                <CopyButton text={modelExample} />
              </div>
              <CodeBlock code={modelExample} lang="tsx" />
            </div>
          </div>

          <div className="min-w-0 border border-line bg-surface rounded-[var(--kazama-radius)] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-line bg-raised">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                  <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
                  <span className="w-2 h-2 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-xs font-mono text-dim ml-2">component.tsx</span>
              </div>
              <CopyButton text={componentExample} />
            </div>
            <CodeBlock code={componentExample} lang="tsx" />
          </div>

        </div>
      </div>
    </section>
  )
}
