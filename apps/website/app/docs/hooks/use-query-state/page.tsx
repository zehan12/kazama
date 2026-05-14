import type { Metadata } from 'next'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'useQueryState | Musubi',
}

const basicCode = `import { useQueryState, parseAsInteger } from '@musubi/core';

function Pagination() {
  // Syncs the "page" URL parameter with a fallback of 1
  const [page, setPage] = useQueryState(
    'page', 
    parseAsInteger.withDefault(1)
  );

  return (
    <button onClick={() => setPage(page + 1)}>
      Next Page ({page})
    </button>
  );
}`

const batchingCode = `import { useQueryState, parseAsString, parseAsInteger } from '@musubi/core';

function Filters() {
  const [query, setQuery] = useQueryState('q', parseAsString.withDefault(''));
  const [page, setPage] = useQueryState('p', parseAsInteger.withDefault(1));

  const handleReset = () => {
    // Both state updates are batched into a single URL replacement
    setQuery('');
    setPage(1);
  };
}`

export default async function DocsUseQueryStatePage() {
  return (
    <DocsPageFrame
      eyebrow="hooks"
      title="useQueryState"
      description="Bidirectional synchronization between React state and the browser URL."
    >
      <div className="flex flex-col gap-12 text-fg">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Overview</h2>
          <p className="text-muted">
            The <code>useQueryState</code> hook behaves exactly like <code>useState</code>, but it persists the state within the URL's search parameters. This makes your UI shareable, bookmarkable, and history-aware.
          </p>
          <div className="overflow-hidden rounded-[var(--musubi-radius)] border border-line bg-base">
            <CodeBlock code={basicCode} lang="tsx" filename="Pagination.tsx" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Type-Safe Parsers</h2>
          <p className="text-muted leading-relaxed">
            Because URLs only store strings, we provide a suite of parsers to automatically serialize and deserialize your data:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted">
            <li><code>parseAsString</code></li>
            <li><code>parseAsInteger</code></li>
            <li><code>parseAsFloat</code></li>
            <li><code>parseAsBoolean</code></li>
            <li><code>parseAsArrayOf(parser)</code></li>
            <li><code>parseAsJson&lt;T&gt;()</code></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">URL Batching</h2>
          <p className="text-muted leading-relaxed">
            If you have multiple components updating different query parameters at the same time, updating the <code>window.history</code> sequentially would cause race conditions. <code>@musubi/core</code> intelligently batches synchronous updates together into a single history transition.
          </p>
          <div className="overflow-hidden rounded-[var(--musubi-radius)] border border-line bg-base">
            <CodeBlock code={batchingCode} lang="tsx" filename="Filters.tsx" />
          </div>
        </div>
      </div>
    </DocsPageFrame>
  )
}
