import type { Metadata } from 'next'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'

export const metadata: Metadata = {
  title: 'Troubleshooting | Kizuna',
}

export default async function DocsTroubleshootingPage() {
  return (
    <DocsPageFrame
      eyebrow="advanced guides"
      title="Troubleshooting & FAQ"
      description="Common issues, error messages, and their solutions."
    >
      <div className="flex flex-col gap-12 text-fg">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold border-b border-line pb-2">Frequently Asked Questions</h2>
          
          <div className="space-y-2">
            <h3 className="font-medium text-fg">Why is my component not re-rendering when I mutate state?</h3>
            <p className="text-muted text-sm leading-relaxed">
              If you are mutating state inside a <code>reducer</code>, Immer handles the draft mutation correctly. However, if you attempt to mutate the state object <em>directly inside your React component</em> (e.g., <code>state.count = 1</code>), React will not detect the change because the reference hasn't been updated in the global store. Always use the auto-generated dispatchers.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-fg">Can I use this with Next.js App Router Server Components?</h3>
            <p className="text-muted text-sm leading-relaxed">
              Global state libraries that rely on React Context or external subscriptions (like this one, Redux, or Zustand) require the <code>"use client"</code> directive. You can fetch initial data on the server, pass it down as props, and initialize your client-side store with that data.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-fg">How does the <code>useLoader</code> cache work?</h3>
            <p className="text-muted text-sm leading-relaxed">
              The built-in cache is stored in memory. Every time you mount a <code>useLoader</code> hook, it registers a subscriber. When the last component using a specific <code>key</code> unmounts, the data remains in cache for the duration of the <code>retentionTime</code> (default 5 minutes) before being garbage collected.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-fg">Why are my async effects not triggering loading states?</h3>
            <p className="text-muted text-sm leading-relaxed">
              Ensure that your effect functions return a <code>Promise</code>. If you are using <code>async/await</code>, this is handled automatically. If you are returning a synchronous value or not awaiting an internal promise, the framework will immediately resolve the effect, causing the <code>isLoading</code> state to flip back to <code>false</code> instantaneously.
            </p>
          </div>
        </div>
      </div>
    </DocsPageFrame>
  )
}
