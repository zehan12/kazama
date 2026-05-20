import type { Metadata } from 'next'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'Time Travel | Kizuna',
}

const timeTravelCode = `import { store } from './store';

function EditorToolbar() {
  return (
    <div className="flex gap-4">
      <button onClick={() => store.undo()}>
        Undo
      </button>
      
      <button onClick={() => store.redo()}>
        Redo
      </button>
    </div>
  );
}`

export default async function DocsTimeTravelPage() {
  return (
    <DocsPageFrame
      eyebrow="store management"
      title="Time Travel"
      description="Built-in undo and redo capabilities out of the box."
    >
      <div className="flex flex-col gap-12 text-fg">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Overview</h2>
          <p className="text-muted leading-relaxed">
            Because <code>kizuna</code> enforces immutable state updates via Immer, it naturally keeps a history of state transitions. The library exposes a simple API to traverse this history.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Using Undo and Redo</h2>
          <p className="text-muted leading-relaxed">
            The store instance exports <code>undo()</code> and <code>redo()</code> functions. Calling these will instantly revert or advance the global state, and all subscribed components will re-render automatically.
          </p>
          <div className="overflow-hidden rounded-[var(--kizuna-radius)] border border-line bg-base">
            <CodeBlock code={timeTravelCode} lang="tsx" filename="EditorToolbar.tsx" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Redux DevTools Integration</h2>
          <p className="text-muted leading-relaxed">
            In addition to programmatic time-travel, if you have the <strong>Redux DevTools Extension</strong> installed in your browser, the store automatically connects to it. You can visually inspect every dispatched action, view the state diffs, and time-travel directly from your browser's developer tools.
          </p>
        </div>
      </div>
    </DocsPageFrame>
  )
}
