import type { Metadata } from 'next'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'useLoader | React Store',
}

const basicCode = `import { useLoader } from '@react-store/core';

async function fetchUser() {
  const res = await fetch('/api/user');
  return res.json();
}

function Profile() {
  const { data, isLoading, error } = useLoader({
    key: ['user', 'profile'],
    loader: fetchUser,
    revalidateOnFocus: true,
  });

  if (isLoading) return <Spinner />;
  if (error) return <Error />;
  
  return <div>Welcome, {data.name}!</div>;
}`

export default async function DocsUseLoaderPage() {
  return (
    <DocsPageFrame
      eyebrow="data fetching"
      title="useLoader"
      description="Powerful server state management with caching and background revalidation."
    >
      <div className="flex flex-col gap-12 text-fg">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Overview</h2>
          <p className="text-muted">
            <code>useLoader</code> provides an experience similar to React Query or SWR. It handles aggressive caching, deduplication, automated polling, and background revalidation.
          </p>
          <div className="overflow-hidden rounded-[var(--hiraki-radius)] border border-line bg-base">
            <CodeBlock code={basicCode} lang="tsx" filename="Profile.tsx" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Configuration Options</h2>
          <p className="text-muted leading-relaxed">
            The loader accepts a powerful set of options:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted">
            <li><code>key</code>: A deterministic array used for caching.</li>
            <li><code>loader</code>: An async function returning your data.</li>
            <li><code>maxAge</code>: How long the data is considered fresh before re-fetching.</li>
            <li><code>revalidateInterval</code>: Poll the API automatically at a fixed interval.</li>
            <li><code>revalidateOnFocus</code>: Refetch data when the browser tab becomes active.</li>
            <li><code>revalidateOnReconnect</code>: Refetch data when network connection is restored.</li>
            <li><code>suspense</code>: Set to true to throw promises for React Suspense boundaries.</li>
          </ul>
        </div>
      </div>
    </DocsPageFrame>
  )
}
