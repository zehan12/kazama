import type { Metadata } from 'next'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'Time Travel | React Store',
}

const programmaticCode = `import store from '@/lib/store';

// Move backward in time
store.undo();

// Move forward in time
store.redo();`

export default async function DocsTimeTravelPage() {
  return (
    <DocsPageFrame
      eyebrow="debugging & features"
      title="Time Travel"
      description="Leverage Redux DevTools for debugging, or build programmatic undo/redo right into your application."
    >
      <div className="flex flex-col gap-12">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-fg">Redux DevTools Integration</h2>
          <p className="text-muted leading-relaxed">
            @react-store/core automatically connects to the Redux DevTools browser extension out-of-the-box. 
            Every time a reducer fires, the new state is serialized and sent to the extension. This allows you to inspect payload data, 
            monitor <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">_START</code> and <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">_SUCCESS</code> events for your async effects, 
            and scrub back and forth through time to see how your UI responds.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-fg">Programmatic Undo / Redo</h2>
          <p className="text-muted leading-relaxed">
            Because the store utilizes Immer for immutable updates, we maintain a history stack under the hood. 
            This means you can provide undo/redo functionality directly to your users (perfect for WYSIWYG editors, canvas tools, or complex forms) with zero extra dependencies.
          </p>
          <div className="overflow-hidden rounded-[var(--hiraki-radius)] border border-line bg-base mt-4">
            <CodeBlock code={programmaticCode} lang="typescript" filename="time-travel.ts" />
          </div>
        </div>
      </div>
    </DocsPageFrame>
  )
}
