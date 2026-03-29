import type { Metadata } from 'next'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'useRequest | React Store',
}

const basicCode = `import { useModel, useRequest } from './store';

function UserDashboard() {
  // \`useRequest\` wraps ahooks, adding automatic integration with the global request instance
  const { data, loading, error, request } = useRequest('/api/dashboard/stats');

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <h1>Stats: {data?.totalUsers}</h1>
      {/* Manually trigger the request again */}
      <button onClick={() => request()}>Refresh Stats</button>
    </div>
  );
}`

const configCode = `const { data, loading, request } = useRequest(
  // 1. You can pass a full Axios config object instead of just a string
  { url: '/api/posts', method: 'POST' },
  
  // 2. You can pass ahooks options to control behavior
  {
    manual: true, // Wait for manual trigger (default in @react-store/core)
    debounceWait: 300,
    onSuccess: (result) => {
      console.log('Post created successfully:', result);
    }
  }
);

// Later in your component:
<button onClick={() => request({ data: { title: 'New Post' } })}>
  Create Post
</button>`

const manualCode = `// By default, useRequest returned from createStore has \`manual: true\`.
// This means it will NOT fire on mount unless you explicitly call request().

const { request, loading } = useRequest('/api/delete/1');

// This requires a user action
<button onClick={() => request()}>Delete Item</button>`

export default async function DocsUseRequestPage() {
  return (
    <DocsPageFrame
      eyebrow="Data & Network"
      title="useRequest Hook"
      description="A lightweight, powerful hook wrapping ahooks useRequest, deeply integrated with the store's network layer."
    >
      <div className="flex flex-col gap-12">
        
        {/* Intro */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-fg">Overview</h2>
          <p className="text-muted leading-relaxed">
            While <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">useLoader</code> is our Remix-inspired approach to Server State, some developers prefer the classic <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">ahooks</code> pattern. 
            When you call <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">createStore</code>, it exposes a <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">useRequest</code> hook that is automatically bound to your store's configured Axios instance.
          </p>
          <div className="overflow-hidden rounded-[var(--hiraki-radius)] border border-line bg-base mt-4">
            <CodeBlock code={basicCode} lang="tsx" filename="Dashboard.tsx" />
          </div>
        </div>

        {/* Manual Execution */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-fg">Manual Execution (Default)</h2>
          <p className="text-muted leading-relaxed">
            Unlike standard ahooks which fires immediately on mount, our <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">useRequest</code> sets <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">manual: true</code> by default. 
            This makes it highly suitable for user-driven actions (like button clicks) rather than just initial data fetching.
          </p>
          <div className="overflow-hidden rounded-[var(--hiraki-radius)] border border-line bg-base mt-4">
            <CodeBlock code={manualCode} lang="tsx" filename="DeleteButton.tsx" />
          </div>
        </div>

        {/* Advanced Config Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-fg">Advanced Configuration</h2>
          <p className="text-muted leading-relaxed">
            Because it wraps <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">ahooks</code>, you get access to powerful features like debouncing, polling, throttling, and dependency tracking. 
            You can pass an Axios config object as the first parameter, and ahooks options as the second parameter.
          </p>
          <div className="overflow-hidden rounded-[var(--hiraki-radius)] border border-line bg-base mt-4">
            <CodeBlock code={configCode} lang="tsx" filename="AdvancedOptions.tsx" />
          </div>
          <p className="text-muted leading-relaxed text-sm mt-2">
            <strong>Note:</strong> We map <code className="text-fg bg-surface px-1 py-0.5 rounded text-xs">req.run</code> to <code className="text-fg bg-surface px-1 py-0.5 rounded text-xs">request</code> and <code className="text-fg bg-surface px-1 py-0.5 rounded text-xs">req.runAsync</code> to <code className="text-fg bg-surface px-1 py-0.5 rounded text-xs">requestAsync</code> for a slightly more intuitive API!
          </p>
        </div>

      </div>
    </DocsPageFrame>
  )
}
