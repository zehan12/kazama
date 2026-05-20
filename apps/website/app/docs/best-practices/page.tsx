import type { Metadata } from 'next'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'Best Practices | Kizuna',
}

const badPattern = `// ❌ Anti-pattern: Monolithic Model
const appModel = {
  state: {
    user: null,
    todos: [],
    theme: 'dark',
    sidebarOpen: false
  },
  reducers: { ... }
};`

const goodPattern = `// ✅ Best Practice: Domain-Driven Models
const authModel = { ... };
const todoModel = { ... };
const uiModel = { ... };

export const store = createStore({
  auth: authModel,
  todos: todoModel,
  ui: uiModel
});`

export default async function DocsBestPracticesPage() {
  return (
    <DocsPageFrame
      eyebrow="advanced guides"
      title="Best Practices"
      description="Architectural recommendations for building scalable applications."
    >
      <div className="flex flex-col gap-12 text-fg">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">1. Domain-Driven Models</h2>
          <p className="text-muted leading-relaxed">
            Avoid throwing all of your application state into a single, massive model. Break your state down into logical domains (e.g., Auth, Tasks, Settings, UI). This makes your codebase easier to navigate and improves React's rendering performance, as components will only subscribe to the specific domain they care about.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-[var(--kizuna-radius)] border border-line bg-base">
              <CodeBlock code={badPattern} lang="typescript" filename="Anti-pattern" />
            </div>
            <div className="overflow-hidden rounded-[var(--kizuna-radius)] border border-line bg-base">
              <CodeBlock code={goodPattern} lang="typescript" filename="Best Practice" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">2. Server State vs Global State</h2>
          <p className="text-muted leading-relaxed">
            Not all data belongs in your global store models.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted">
            <li><strong>Server State</strong> (e.g., Paginated lists, search results, individual product details) should usually be handled by <code>useLoader</code> or <code>useRequest</code>. These hooks provide caching and background revalidation.</li>
            <li><strong>Global State</strong> (e.g., Theme, User Session, Shopping Cart) should be placed in your Store Models because it is synchronously mutated by user actions.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">3. Use createModel for Types</h2>
          <p className="text-muted leading-relaxed">
            Always wrap your model definitions in the <code>createModel()</code> helper function. While it does nothing at runtime, it forces TypeScript to infer your state and payload types deeply, saving you from writing massive global interfaces.
          </p>
        </div>
      </div>
    </DocsPageFrame>
  )
}
