import type { Metadata } from 'next'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'Data Fetching | React Store',
}

const loaderCode = `import { useLoader } from '@react-store/core';
import { request } from '@react-store/core'; // Built-in HTTP client

function UserProfile({ id }) {
  const { 
    data: user, 
    isLoading, 
    isError, 
    refetch,
    lastRevalidatedAt
  } = useLoader({
    // Unique cache key for this data
    key: ['user', String(id)], 
    
    // The function that fetches the data
    loader: async () => {
      return await request.get(\`/api/users/\${id}\`);
    },
    
    // Keep data fresh for 10 seconds without re-fetching
    maxAge: 10000, 
    
    // Auto-refresh the data every 5 seconds (optional)
    revalidateInterval: 5000 
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load user</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Last fetched: {new Date(lastRevalidatedAt).toLocaleTimeString()}</p>
      <button onClick={refetch}>Refresh Data</button>
    </div>
  );
}`

const actionCode = `import { useAction, useLoader } from '@react-store/core';
import { request } from '@react-store/core';

function EditProfile({ id }) {
  const { refetch } = useLoader({ key: ['user', String(id)], /* ...loader config */ });

  const { mutate, isLoading, error } = useAction(async (newName: string) => {
    return await request.patch(\`/api/users/\${id}\`, { name: newName });
  });

  const handleUpdate = () => {
    mutate('Jane Doe', {
      onSuccess: () => {
        // Automatically refresh the loader data after a successful mutation!
        refetch();
      },
      onError: (err) => {
        alert('Failed to update name: ' + err.message);
      }
    });
  };

  return (
    <div>
      <button onClick={handleUpdate} disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Update Name'}
      </button>
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
}`

export default async function DocsDataFetchingPage() {
  return (
    <DocsPageFrame
      eyebrow="Server State"
      title="Loaders & Actions"
      description="Modern, Remix-inspired data fetching and mutation hooks with built-in caching, polling, and auto-revalidation."
    >
      <div className="flex flex-col gap-12">
        
        {/* Intro */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-fg">Overview</h2>
          <p className="text-muted leading-relaxed">
            While standard stores are fantastic for client-side state, interacting with server-side data (APIs) requires caching, polling, and loading states. 
            <strong>@react-store/core</strong> provides a Remix-inspired paradigm: <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">useLoader</code> for fetching data, and <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">useAction</code> for modifying data.
          </p>
        </div>

        {/* useLoader Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-fg">Fetching Data with useLoader</h2>
          <p className="text-muted leading-relaxed">
            The <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">useLoader</code> hook handles fetching, caching, deduplication, and background polling. 
            When multiple components use the same <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">key</code>, they will share the same network request and cache.
          </p>
          <div className="overflow-hidden rounded-[var(--hiraki-radius)] border border-line bg-base mt-4">
            <CodeBlock code={loaderCode} lang="tsx" filename="UserProfile.tsx" />
          </div>
        </div>

        {/* Advanced Loader Features */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-fg">Advanced Loader Features</h2>
          <p className="text-muted leading-relaxed">
            The <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">useLoader</code> hook supports several advanced configurations to give you absolute control over your server state:
          </p>
          <ul className="list-disc pl-6 text-muted space-y-2 mt-2">
            <li><code className="text-fg bg-surface px-1 py-0.5 rounded text-xs">maxAge</code>: Milliseconds until data is considered stale. Before this time, cache hits bypass network requests entirely.</li>
            <li><code className="text-fg bg-surface px-1 py-0.5 rounded text-xs">retentionTime</code>: How long the cache holds data after all subscribers unmount (Garbage Collection). Defaults to 5 minutes.</li>
            <li><code className="text-fg bg-surface px-1 py-0.5 rounded text-xs">revalidateInterval</code>: Poll the endpoint automatically at a specific interval.</li>
            <li><code className="text-fg bg-surface px-1 py-0.5 rounded text-xs">revalidateOnFocus</code>: Automatically fetches fresh data when the user switches tabs back to your app (default: true).</li>
            <li><code className="text-fg bg-surface px-1 py-0.5 rounded text-xs">revalidateOnReconnect</code>: Automatically fetches fresh data when the network connection is restored (default: true).</li>
            <li><code className="text-fg bg-surface px-1 py-0.5 rounded text-xs">initialData</code>: Synchronously hydrates the cache with placeholder or SSR data so loading states are skipped.</li>
            <li><code className="text-fg bg-surface px-1 py-0.5 rounded text-xs">suspense</code>: Set to true to seamlessly integrate with React Suspense (<code className="text-fg bg-surface px-1 py-0.5 rounded text-xs">&lt;Suspense fallback=...&gt;</code>).</li>
            <li><code className="text-fg bg-surface px-1 py-0.5 rounded text-xs">enabled</code>: Set to false to temporarily pause the loader (useful for dependent queries).</li>
          </ul>
        </div>

        {/* useAction Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-fg">Modifying Data with useAction</h2>
          <p className="text-muted leading-relaxed">
            When you need to send data to the server (POST, PUT, DELETE, PATCH), use the <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">useAction</code> hook. 
            It provides <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">mutate</code> to trigger the action and gives you the loading and error states for your UI.
          </p>
          <div className="overflow-hidden rounded-[var(--hiraki-radius)] border border-line bg-base mt-4">
            <CodeBlock code={actionCode} lang="tsx" filename="EditProfile.tsx" />
          </div>
        </div>

      </div>
    </DocsPageFrame>
  )
}
