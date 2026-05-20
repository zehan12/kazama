import type { Metadata } from 'next'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'Effects State | Kizuna',
}

const effectsCode = `import { store } from './store';

function SubmitButton() {
  // Returns an object containing the loading state for all effects in the 'form' model
  const loading = store.useModelEffectsLoading('form');
  
  // Returns an object containing the error state for all effects
  const errors = store.useModelEffectsError('form');

  return (
    <div className="flex flex-col gap-2">
      <button disabled={loading.submitData}>
        {loading.submitData ? 'Submitting...' : 'Submit'}
      </button>
      
      {errors.submitData?.value && (
        <span className="text-red-500">{errors.submitData.error.message}</span>
      )}
    </div>
  );
}`

export default async function DocsEffectsStatePage() {
  return (
    <DocsPageFrame
      eyebrow="react hooks"
      title="Effects State"
      description="Tap into the automated loading and error tracking of your asynchronous effects."
    >
      <div className="flex flex-col gap-12 text-fg">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Overview</h2>
          <p className="text-muted leading-relaxed">
            When you define asynchronous <code>effects</code> in your models, the store automatically tracks their execution state. You can access this state using three specific hooks.
          </p>
          <div className="overflow-hidden rounded-[var(--kizuna-radius)] border border-line bg-base">
            <CodeBlock code={effectsCode} lang="tsx" filename="SubmitButton.tsx" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Available Hooks</h2>
          <ul className="list-disc pl-6 space-y-4 text-muted">
            <li>
              <strong><code>useModelEffectsLoading(modelKey)</code></strong>: 
              Returns an object where the keys are the names of your effects, and the values are booleans indicating if the effect is currently running.
            </li>
            <li>
              <strong><code>useModelEffectsError(modelKey)</code></strong>: 
              Returns an object where the keys are the names of your effects, and the values are an object containing <code>&#123; value: boolean, error: any &#125;</code>.
            </li>
            <li>
              <strong><code>useModelEffectsState(modelKey)</code></strong>: 
              Returns a combined object containing both the loading and error states for all effects. Useful if you need both in a single subscription.
            </li>
          </ul>
        </div>
      </div>
    </DocsPageFrame>
  )
}
