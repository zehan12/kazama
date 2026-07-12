import type { Metadata } from 'next'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'useRequest | Kazama',
}

const useRequestCode = `import { useModel, useModelState, useModelDispatchers, useModelEffectsLoading, useModelEffectsError } from './store';

function DashboardStats() {
  // Uses the globally configured Axios instance under the hood
  const { data, loading, error, refresh } = store.useRequest(
    () => store.config.request.get('/api/stats'),
    {
      refreshOnWindowFocus: true,
      pollingInterval: 5000,
      retryCount: 3
    }
  );

  if (loading) return <div>Loading stats...</div>;
  if (error) return <div>Error fetching stats.</div>;

  return (
    <div>
      <p>Active Users: {data.activeUsers}</p>
      <button onClick={refresh}>Refresh Manually</button>
    </div>
  );
}`

export default async function DocsUseRequestPage() {
  return (
    <DocsPageFrame
      eyebrow="api & data fetching"
      title="useRequest"
      description="Advanced data fetching powered by Ahooks."
    >
      <div className="flex flex-col gap-12 text-fg">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Overview</h2>
          <p className="text-muted leading-relaxed">
            <code>kazama</code> exposes a <code>useRequest</code> hook on your generated store instance. This is a direct wrapper around the highly popular <code>ahooks</code> <code>useRequest</code> library, but it comes pre-injected with your configured HTTP client.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Usage</h2>
          <div className="overflow-hidden rounded-[var(--kazama-radius)] border border-line bg-base">
            <CodeBlock code={useRequestCode} lang="tsx" filename="DashboardStats.tsx" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Features</h2>
          <p className="text-muted leading-relaxed">
            Because this is powered by Ahooks, it inherits all of its enterprise-grade features:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted">
            <li>Auto-loading and error handling</li>
            <li>Polling and Debouncing</li>
            <li>Focus Revalidation</li>
            <li>Error Retry strategies</li>
            <li>SWR-like Cache and SWR features</li>
            <li>Dependent fetching (ready state)</li>
          </ul>
        </div>
      </div>
    </DocsPageFrame>
  )
}
