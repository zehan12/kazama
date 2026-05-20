import type { Metadata } from 'next'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'Performance | Kizuna',
}

const badRenderCode = `function Avatar() {
  // ❌ Subscribes to the entire user model. 
  // Will re-render if the user's "email" or "preferences" change!
  const [user] = store.useModel('user');
  
  return <img src={user.avatarUrl} />;
}`

const goodRenderCode = `function Avatar() {
  // ✅ Subscribes ONLY to the avatarUrl.
  // Will NOT re-render if other user properties change.
  const avatarUrl = store.useModelState('user', (state) => state.avatarUrl);
  
  return <img src={avatarUrl} />;
}`

export default async function DocsPerformancePage() {
  return (
    <DocsPageFrame
      eyebrow="advanced guides"
      title="Performance Optimization"
      description="Keep your application running at 60fps by preventing unnecessary re-renders."
    >
      <div className="flex flex-col gap-12 text-fg">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">The useSyncExternalStore Advantage</h2>
          <p className="text-muted leading-relaxed">
            Because <code>kizuna</code> is built on top of React 18's <code>useSyncExternalStore</code>, it avoids the "zombie child" problems and tearing issues commonly associated with older Context-based state management libraries. State subscriptions are inherently concurrent-safe.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Selector Optimization</h2>
          <p className="text-muted leading-relaxed">
            By default, calling <code>useModel('user')</code> subscribes your component to the <em>entire</em> <code>user</code> model. Any change to any property in that model will trigger a re-render. To optimize this, you can pass a selector function to <code>useModelState</code>.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-[var(--kizuna-radius)] border border-line bg-base">
              <CodeBlock code={badRenderCode} lang="tsx" filename="Anti-pattern" />
            </div>
            <div className="overflow-hidden rounded-[var(--kizuna-radius)] border border-line bg-base">
              <CodeBlock code={goodRenderCode} lang="tsx" filename="Optimized" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Dispatch-Only Subscriptions</h2>
          <p className="text-muted leading-relaxed">
            If a component only needs to trigger actions (like a Button), use <code>useModelDispatchers('modelKey')</code>. This hook will never trigger a re-render when the state changes, keeping your UI incredibly snappy.
          </p>
        </div>
      </div>
    </DocsPageFrame>
  )
}
