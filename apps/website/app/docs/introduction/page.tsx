import type { Metadata } from 'next'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'

export const metadata: Metadata = {
  title: 'Introduction | Musubi',
}

export default async function DocsIntroductionPage() {
  return (
    <DocsPageFrame
      eyebrow="getting started"
      title="Introduction"
      description="Welcome to @musubi/core, the modern, all-in-one state and API management library for React."
    >
      <div className="flex flex-col gap-12 text-fg">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">What is @musubi/core?</h2>
          <p className="text-muted leading-relaxed">
            <code>@musubi/core</code> is a comprehensive library designed to eliminate the boilerplate associated with state management, data fetching, and URL synchronization in modern React applications. 
          </p>
          <p className="text-muted leading-relaxed">
            By leveraging React 18's <code>useSyncExternalStore</code> and the immutable drafting power of <code>Immer</code>, we provide a developer experience that is type-safe, highly performant, and incredibly simple.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Why does it exist?</h2>
          <p className="text-muted leading-relaxed">
            Historically, React developers have had to stitch together multiple libraries to build production-ready applications. You might use Redux or Zustand for global state, React Query or SWR for data fetching, Nuqs for URL state, and Axios for HTTP requests.
          </p>
          <p className="text-muted leading-relaxed">
            This fragmentation leads to context switching, bundle size bloat, and complex synchronization logic. <code>@musubi/core</code> unifies these concerns into a single, cohesive architecture.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Key Features</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted">
            <li><strong>Zero Boilerplate Global State:</strong> Define models with state and reducers. We generate the dispatchers and hooks automatically.</li>
            <li><strong>Built-in Mutability via Immer:</strong> Mutate state directly in your reducers without worrying about immutable object spreading.</li>
            <li><strong>Automated Loading & Error Tracking:</strong> Async effects automatically track their <code>isLoading</code> and <code>error</code> states. No more manual <code>setLoading(true)</code>.</li>
            <li><strong>Advanced Data Fetching:</strong> The built-in <code>useLoader</code> and <code>useAction</code> provide caching, polling, background revalidation, and React Suspense out of the box.</li>
            <li><strong>URL State Synchronization:</strong> The <code>useQueryState</code> hook provides type-safe, bidirectional syncing of your component state to the browser URL.</li>
            <li><strong>Time Travel Debugging:</strong> First-class support for undo/redo and Redux DevTools integration.</li>
            <li><strong>Tiny Footprint:</strong> Everything compiles down to a ~3.8kB (minified + gzipped) payload.</li>
          </ul>
        </div>

      </div>
    </DocsPageFrame>
  )
}
