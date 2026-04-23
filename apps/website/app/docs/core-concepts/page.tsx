import type { Metadata } from 'next'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'

export const metadata: Metadata = {
  title: 'Core Concepts | React Store',
}

export default async function DocsCoreConceptsPage() {
  return (
    <DocsPageFrame
      eyebrow="getting started"
      title="Core Concepts"
      description="Understand the philosophy and architecture behind @react-store/core."
    >
      <div className="flex flex-col gap-12 text-fg">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">1. The Store & Models</h2>
          <p className="text-muted leading-relaxed">
            Unlike Redux which relies on a single massive reducer tree, or Zustand which uses a single hook-bound store, we structure state into logical domains called <strong>Models</strong>. 
          </p>
          <p className="text-muted leading-relaxed">
            A model groups together its <code>state</code>, synchronous <code>reducers</code>, and asynchronous <code>effects</code>. These models are then combined into a single <code>Store</code>, giving you the best of both worlds: modular code with a unified global state tree.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">2. Auto-generated Dispatchers</h2>
          <p className="text-muted leading-relaxed">
            You don't need to write manual <code>dispatch(&#123; type: 'ACTION', payload &#125;)</code> calls. When you define a reducer or effect, the library automatically generates a strongly-typed <strong>dispatcher function</strong>.
          </p>
          <p className="text-muted leading-relaxed">
            If you have a reducer named <code>increment</code> on the <code>counter</code> model, you simply call <code>dispatchers.increment()</code> in your components.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">3. Direct Mutation via Immer</h2>
          <p className="text-muted leading-relaxed">
            Writing immutable update logic manually can be tedious. Because we use <strong>Immer</strong> under the hood, your reducers receive a "draft" of the state. You can mutate this draft directly (e.g., <code>state.count += 1</code>) and it safely produces a new immutable state tree behind the scenes.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">4. Automated Effect Tracking</h2>
          <p className="text-muted leading-relaxed">
            Managing loading spinners and error messages for API calls is a universal pain point. In our architecture, every asynchronous <code>effect</code> automatically manages its own <code>isLoading</code> and <code>error</code> states globally. 
          </p>
          <p className="text-muted leading-relaxed">
            Components can easily tap into these variables using the <code>useModelEffectsState</code> hook.
          </p>
        </div>
      </div>
    </DocsPageFrame>
  )
}
